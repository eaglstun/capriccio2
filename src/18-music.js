// Vaporwave score — Strudel patterns over synthesized sources only.
//
// NEW for the vaporwave reskin; not part of the reconstructed bundle.
// Uses @strudel/core's Cyclist scheduler and @strudel/webaudio's
// synth output. No samples() calls, nothing fetched at runtime: the
// pads are the supersaw worklet (inlined as a data: URL), the drums
// are superdough's synth bass drum (sbd) and zzfx noise bursts, and
// the reverb impulse is generated procedurally by superdough.
//
// Like the Soundscape, this is a readout of the simulation:
//   - dusk slows the tempo, closes the filter, swells the volume, and
//     drops the kit to half-time
//   - while anything is under construction, a quiet arpeggio ticks
//     along with the chisels
//
// The piece also develops over wall-clock time, in stages:
//   0:00  pads and bass alone (exactly the original bed)
//   0:30  hi-hats on eighths, soft bass drum on quarters; a low
//         octave-doubled pad arrives for weight
//   1:00  snare on 2 and 4, the kick pattern opens up, a slow
//         counter-melody (one note per bar) enters high and thin;
//         the lead pad gains a light detuned unison
//   1:30  ride on quarters, a floor-tom fill every eighth bar, and
//         the 16-bar harmonic loop ends on a borrowed D major
//         (A Dorian) — one bright chord in a minor key, once, late.
//
// Harmony stays in A minor throughout: i–VI–III–VII (Am9 Fmaj9 Cmaj9
// Gadd9), with the second 4-bar pass suspended (sus2/sus4 — the 3rd
// removed so the chords hover), and, only in the last stage, that
// single Dadd9 where the diatonic chord would be Dm.

// Subpath imports keep the bundle honest: pulling the packages' index
// modules would drag in @strudel/core's repl (and with it the unrelated
// kabelsalat live-coding runtime) plus @strudel/draw's canvas visuals.
import { Cyclist } from "@strudel/core/cyclist.mjs";
import { stack, cat, seq, silence } from "@strudel/core/pattern.mjs";
import { note } from "@strudel/core/controls.mjs";
import {
  superdough,
  getAudioContext,
  initAudio,
  registerSynthSounds,
  registerZZFXSounds,
  getSuperdoughAudioController,
} from "superdough";

// @strudel/webaudio's webaudioOutput, inlined: importing it from the
// package would circle back through @strudel/core's index (repl and all)
const webaudioOutput = (hap, _deadline, hapDuration, cps, t) => {
  hap.ensureObjectValue();
  return superdough(hap.value, t, hapDuration, cps, hap.whole?.begin.valueOf());
};

// ------------------------------------------------------------------ harmony

// [chord voicing, bass root, counter-melody note] per bar.
// Plain pass: Am9 · Fmaj9 · Cmaj9 · Gadd9 — i VI III VII in A minor.
/**
 * The chord loop as MIDI note numbers, per bar: [notes, bass, counter].
 *
 * Am9 - Fmaj9 - Cmaj9 - Gadd9 = i - VI - III - VII in A minor. Everything else
 * in the score is colour inside that key rather than modulation.
 */
const BARS_PLAIN = [
  [[57, 60, 64, 67, 71], 33, 76], // Am9        · E5 counter
  [[53, 57, 60, 64, 67], 29, 72], // Fmaj9      · C5
  [[48, 52, 55, 59, 62], 24, 71], // Cmaj9      · B4
  [[43, 47, 50, 57, 62], 31, 74], // Gadd9      · D5
];
// Suspended pass: the 3rd lifted out so each chord hovers unresolved.
/** The same four chords with the 3rds lifted out — sus2/sus4. Hovering,
 * neither major nor minor, used for the second pass of the loop. */
const BARS_SUS = [
  [[57, 59, 64, 67, 71], 33, 76], // Asus2 (add 7/9)
  [[53, 55, 60, 64, 67], 29, 72], // Fsus2 (add 7/9)
  [[48, 50, 55, 59, 62], 24, 71], // Csus2 (add 7/9)
  [[43, 48, 50, 57, 62], 31, 74], // Gsus4 (add 9)
];
// Borrowed from A Dorian: D major where the diatonic chord would be Dm.
// Used once, at the end of the 16-bar loop, only in the last stage.
/**
 * Dadd9 — borrowed from A Dorian, where the diatonic chord would be Dm.
 *
 * One unearned major chord in a minor key, used EXACTLY ONCE and late. It is
 * the strongest single emotional move available in the mode and it stops
 * working the moment it repeats.
 */
const BAR_D = [[50, 54, 57, 64, 66], 26, 78]; // Dadd9 · F#5 counter

/** Choose the bar set for the current arrangement stage — plain, suspended, or
 * the 16-bar version ending on the borrowed D. */
function harmonicLoop(stage) {
  const eight = [...BARS_PLAIN, ...BARS_SUS];
  if (stage < 3) return eight;
  // 16 bars; the last suspended bar gives way to the borrowed major.
  return [...eight, ...BARS_PLAIN, BARS_SUS[0], BARS_SUS[1], BARS_SUS[2], BAR_D];
}

const chord = (ns) => stack(...ns.map((n) => note(n)));

/** The main pad voice: supersaw, heavy unison detune, filter opening with the
 * stage and closing at dusk. */
function pads(bars, duskAmt, stage) {
  return cat(...bars.map((b) => chord(b[0])))
    .s("supersaw")
    .unison(7)
    .detune(stage >= 2 ? 0.68 : 0.5) // light detuned unison after the second section
    .spread(0.8)
    .attack(1.4)
    .release(2.8)
    .lpf(1150 - duskAmt * 520)
    .room(0.7)
    .roomsize(0.85)
    .gain(0.5);
}

// octave-doubled pad an octave down — weight under the kit, root + fifth only
/** Root-and-fifth an octave down, added when the drums arrive so the low end
 * has weight under them. */
function lowPad(bars, duskAmt) {
  return cat(...bars.map((b) => chord([b[0][0] - 12, b[0][2] - 12])))
    .s("supersaw")
    .unison(3)
    .detune(0.3)
    .attack(2.2)
    .release(3.2)
    .lpf(420 - duskAmt * 140)
    .gain(0.3);
}

/** Triangle bass on the written root of each bar. */
function bass(bars) {
  return cat(...bars.map((b) => seq(note(b[1]), silence, note(b[1] + 12), silence)))
    .s("triangle")
    .attack(0.03)
    .release(0.6)
    .gain(0.42);
}

// slow counter-melody — one note per bar, high and thin
/** The counter-melody: one high thin sine per bar, entering with the snare. */
function counter(bars) {
  return cat(...bars.map((b) => note(b[2])))
    .s("sine")
    .attack(1.1)
    .release(2.2)
    .room(0.6)
    .roomsize(0.85)
    .pan(0.4)
    .gain(0.17);
}

// the construction arpeggio — only stacked in while the city is growing
/** The construction arpeggio — square, and audible ONLY while something is
 * being built. Bound to sim state like every other sound in the game. */
function arp(bars) {
  return cat(...bars.map((b) => seq(...[0, 2, 4, 2, 1, 3, 4, 3].map((k) => note(b[0][k] + 12)))))
    .s("square")
    .attack(0.01)
    .release(0.25)
    .lpf(2100)
    .delay(0.5)
    .pan(0.62)
    .gain(0.16);
}

// ------------------------------------------------------------------ the kit
// All synthesized: sbd is superdough's triangle-with-pitch-envelope bass
// drum, z_noise a zzfx noise burst. Everything runs through a little
// waveshaper (.shape) for tape grit, and stays quiet — this is a bed,
// not a dance track.

const R = silence;
const kick = (g) =>
  note(29).s("sbd").penv(24).pdecay(0.06).decay(0.3).shape(0.35).gain(g);
const tom = (n) =>
  note(n).s("sbd").penv(10).pdecay(0.1).decay(0.24).shape(0.3).gain(0.4);
const hat = (g) =>
  note(112).s("z_noise").clip(0.05).release(0.05).hpf(3000).gain(g);
const snare = (g) =>
  note(84).s("z_noise").clip(0.2).release(0.12).bpf(1700).shape(0.3).gain(g);
const ride = () =>
  note(110).s("z_noise").clip(0.6).release(0.4).hpf(3200).gain(0.1);

const hats8 = (g) => seq(...Array.from({ length: 8 }, () => hat(g)));
const hats4 = (g) => seq(...Array.from({ length: 4 }, () => hat(g)));
const kickQ = (g) => seq(kick(g), kick(g * 0.8), kick(g), kick(g * 0.8));
// kick opens up: 1, the and-of-2, 3
const kickOpen = (g) => seq(seq(kick(g), R), seq(R, kick(g * 0.85)), kick(g * 0.9), R);
const snare24 = (g) => seq(R, snare(g), R, snare(g));
const rideQ = () => seq(ride(), ride(), ride(), ride());
// floor toms walking down on sixteenths across beat 4
const tomFill = () => seq(R, R, R, seq(tom(45), tom(45), tom(41), tom(38)));

function kit(stage, duskAmt) {
  if (stage < 1) return null; // ~first 30s: no drums at all
  if (duskAmt) {
    // dusk: the filter closes, the kit drops to half-time
    const layers = [seq(kick(0.5), R, R, R), hats4(0.07)];
    if (stage >= 2) layers.push(seq(R, R, snare(0.2), R));
    return stack(...layers);
  }
  if (stage === 1) return stack(hats8(0.17), kickQ(0.3));
  if (stage === 2) return stack(hats8(0.19), kickOpen(0.42), snare24(0.26));
  // stage 3: ride joins; a fill arrives once every eight bars, not every bar
  const bar = stack(hats8(0.19), kickOpen(0.42), snare24(0.28), rideQ());
  const fill = stack(hats8(0.19), kickOpen(0.42), snare24(0.28), tomFill());
  return cat(bar, bar, bar, bar, bar, bar, bar, fill);
}

// ------------------------------------------------------------------ score

function arrangement(stage, duskAmt, constructing) {
  const bars = harmonicLoop(stage);
  const layers = [pads(bars, duskAmt, stage), bass(bars)];
  if (stage >= 1) layers.push(lowPad(bars, duskAmt));
  if (stage >= 2) layers.push(counter(bars));
  const drums = kit(stage, duskAmt);
  drums && layers.push(drums);
  constructing && layers.push(arp(bars));
  return stack(...layers);
}

class Score {
  constructor() {
    this.scheduler = null;
    this.starting = false;
    this.key = "";
    this.level = 0;
    this.t = 0; // seconds since the score began — drives the arrangement
  }
  async start() {
    if (this.scheduler || this.starting) return;
    this.starting = true;
    try {
      await initAudio();
      await registerSynthSounds();
      await registerZZFXSounds();
      const ctx = getAudioContext();
      this.out = getSuperdoughAudioController().output.destinationGain;
      this.out.gain.value = 0;
      this.scheduler = new Cyclist({
        onTrigger: (hap, deadline, duration, cps, t) =>
          webaudioOutput(hap, deadline, duration, cps, t),
        getTime: () => ctx.currentTime,
      });
      this.scheduler.setCps(0.28);
      await this.scheduler.setPattern(arrangement(0, 0, false), true);
      this.key = "0|0|false";
    } catch (err) {
      console.warn("[score] music failed to start", err);
      this.scheduler = null;
    }
    this.starting = false;
  }
  update(dt, st) {
    if (!this.scheduler) return;
    this.t += dt;
    // ease the master level toward its dusk-aware target
    const target = 0.34 + st.dusk * 0.14;
    this.level += (target - this.level) * Math.min(1, dt * 0.5);
    this.out.gain.value = this.level;
    // discrete mood: arrangement stage + dusk bucket + construction layer
    const stage = this.t < 30 ? 0 : this.t < 60 ? 1 : this.t < 90 ? 2 : 3;
    const duskAmt = st.dusk > 0.45 ? 1 : 0;
    const key = `${stage}|${duskAmt}|${!!st.constructing}`;
    if (key !== this.key) {
      this.key = key;
      this.scheduler.setCps(duskAmt ? 0.24 : 0.28);
      this.scheduler.setPattern(arrangement(stage, duskAmt, !!st.constructing));
    }
  }
}

const score = new Score();

export { score };
