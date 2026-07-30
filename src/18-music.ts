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
//
// That loop is now TRACK 1 of three. All three stay rooted on A, so a
// track change is a mode change, not a key change:
//   track 1 — A minor, calm            · the original bed, ~67bpm
//   track 2 — A Dorian, driving        · Am9 D6/9 Am9 Gadd9, ~80bpm,
//             backbeat, sixteenth hats, the bass carrying a riff
//   track 3 — the strange one, night   · bar 1 always Am9, bars 2–4
//             chosen per cycle (Fmaj7#11 / Bm7b5 / Dm6 / Abmaj7),
//             ~72bpm half-time, heavy detune, tape sag
// Selection is bound to the sim — city size and the night hours — and
// changes fade through silence over ~3s. See the Score class.

// Subpath imports keep the bundle honest: pulling the packages' index
// modules would drag in @strudel/core's repl (and with it the unrelated
// kabelsalat live-coding runtime) plus @strudel/draw's canvas visuals.
import { Cyclist } from "@strudel/core/cyclist.mjs";
import { stack, cat, seq, silence } from "@strudel/core/pattern.mjs";
import { note } from "@strudel/core/controls.mjs";
// generative material — all of it randomises RHYTHM and CHOICE, never pitch
// outside the scale: a random note in key sounds intentional, a random
// rhythm sounds broken. chooseCycles picks track 3's harmony per cycle,
// degradeBy breathes the hats, irand walks a counter-melody inside the mode,
// perlin is the tape sag. euclid puts a shaker on (5,8) so it never lands
// square. The functional forms are used so the imports cannot be tree-shaken
// away from their Pattern.prototype registrations.
import {
  chooseCycles,
  perlin,
  irand,
  degradeBy,
} from "@strudel/core/signal.mjs";
import { euclid } from "@strudel/core/euclid.mjs";
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
  return [
    ...eight,
    ...BARS_PLAIN,
    BARS_SUS[0],
    BARS_SUS[1],
    BARS_SUS[2],
    BAR_D,
  ];
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
  return cat(
    ...bars.map((b) => seq(note(b[1]), silence, note(b[1] + 12), silence)),
  )
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
  return cat(
    ...bars.map((b) =>
      seq(...[0, 2, 4, 2, 1, 3, 4, 3].map((k) => note(b[0][k] + 12))),
    ),
  )
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
const kickOpen = (g) =>
  seq(seq(kick(g), R), seq(R, kick(g * 0.85)), kick(g * 0.9), R);
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

// ------------------------------------------------------------ track 2: Dorian
// A Dorian — natural minor with the raised 6th. That F# turns the IV chord
// major, and Am -> D is the signature sound of the mode. Driving: ~80bpm,
// backbeat on 2 and 4, hats on sixteenths, and the BASS carries it — a
// syncopated riff (root / 5th / b7 / octave), not roots.
//
// Track 1's one borrowed Dadd9 (BAR_D) is a different thing entirely: there
// it is a single unearned major chord in a minor key, used once and late.
// Here the D major is the home sound of the mode, present from bar 2 and
// earned by the F# in everything around it. Different track, different mode
// — the two never share a scheduler, so neither undermines the other.

// [chord voicing, bass riff (8 eighth-note slots, 0 = rest)] per bar.
// Loop: Am9 | D6/9 | Am9 | Gadd9. Every riff note is in A Dorian.
const BARS_DORIAN = [
  [
    [57, 60, 64, 67, 71],
    [33, 0, 0, 45, 43, 0, 40, 0],
  ], // Am9   · A . . A' G . E .
  [
    [50, 54, 57, 59, 64],
    [38, 0, 0, 50, 48, 0, 45, 48],
  ], // D6/9  · D . . D' C . A C
  [
    [57, 60, 64, 67, 71],
    [33, 0, 45, 0, 43, 33, 0, 40],
  ], // Am9   · A . A' . G A . E
  [
    [43, 47, 50, 57, 62],
    [31, 0, 0, 43, 42, 0, 38, 42],
  ], // Gadd9 · G . . G' F# . D F#
];

/** Track 2's bass: the riff, sawtooth, well forward in the mix. */
function bassRiff(bars) {
  return cat(
    ...bars.map((b) => seq(...b[1].map((n) => (n ? note(n) : silence)))),
  )
    .s("sawtooth")
    .attack(0.01)
    .release(0.32)
    .lpf(760)
    .shape(0.2)
    .gain(0.5);
}

/** Track 2's counter-melody: irand over an A Dorian pool, two notes a bar,
 * a third of them dropped — always in key, never twice the same. */
const DORIAN_POOL = [69, 71, 74, 76, 78, 81]; // A4 B4 D5 E5 F#5 A5
function counterDorian() {
  return degradeBy(
    0.3,
    note(
      irand(DORIAN_POOL.length)
        .segment(2)
        .fmap((i) => DORIAN_POOL[i]),
    )
      .s("sine")
      .attack(0.4)
      .release(1.4)
      .room(0.5)
      .roomsize(0.8)
      .pan(0.38)
      .gain(0.15),
  );
}

const hats16 = (g) =>
  degradeBy(0.22, seq(...Array.from({ length: 16 }, () => hat(g))));
const shaker = (g) =>
  euclid(
    5,
    8,
    note(105).s("z_noise").clip(0.045).release(0.045).hpf(5200).gain(g),
  );

/** Track 2's kit: real backbeat, sixteenth hats that breathe, a (5,8)
 * shaker that never lands square. Dusk halves it like track 1's. */
function kitDorian(stage, duskAmt) {
  if (stage < 1) return null;
  if (duskAmt)
    return stack(
      seq(kick(0.5), R, R, R),
      hats8(0.09),
      seq(R, R, snare(0.22), R),
    );
  return stack(hats16(0.13), kickOpen(0.45), snare24(0.3), shaker(0.09));
}

function arrangementDorian(stage, duskAmt, constructing) {
  const layers = [
    pads(
      BARS_DORIAN.map((b) => [b[0]]),
      duskAmt,
      2,
    ),
    bassRiff(BARS_DORIAN),
    counterDorian(),
  ];
  const drums = kitDorian(stage, duskAmt);
  drums && layers.push(drums);
  constructing && layers.push(arp(BARS_DORIAN.map((b) => [b[0], 0, 0])));
  return stack(...layers);
}

// ----------------------------------------------------------- track 3: strange
// The night track. Bar 1 is always Am9 — the anchor — and bars 2–4 are
// CHOSEN PER CYCLE from a pool that all voice-lead from A minor: Fmaj7#11
// (lydian colour on VI), Bm7b5 (the ii-half-diminished), Dm6 (iv6,
// Dorian-tinged), and Abmaj7 — chromatic, genuinely foreign. ~72bpm with a
// half-time kit, heavy detune, perlin filter drift and a slow vibrato for
// the tape sag. The harmony is generative at its core; the pitch material
// never leaves the chosen chords.

/** Track 3's pad voice: heavier detune than anything in track 1, filter
 * drifting on perlin noise, slow vibrato — the tape is sagging. */
function padStrange(notes) {
  return chord(notes)
    .s("supersaw")
    .unison(7)
    .detune(1.05)
    .spread(0.9)
    .attack(1.9)
    .release(3.6)
    .lpf(perlin.range(430, 830).slow(3))
    .vib(0.38)
    .vibmod(0.16)
    .room(0.8)
    .roomsize(0.9)
    .gain(0.48);
}

/** Track 3's bass: half-time — root on 1, a chord-tone answer on 3. */
function bassStrange(root, answer) {
  return seq(note(root), R, note(answer), R)
    .s("triangle")
    .attack(0.05)
    .release(1.1)
    .gain(0.44);
}

// [pad voicing, bass root, bass answer] — the answer note is chosen per
// chord so it is always a chord tone (F natural over Bm7b5, Eb over Ab).
const STRANGE_ANCHOR = [[57, 60, 64, 67, 71], 33, 40]; // Am9
const STRANGE_POOL = [
  [[53, 57, 60, 64, 71], 29, 36], // Fmaj7#11 · the #11 (B) on top
  [[53, 57, 59, 62, 65], 35, 41], // Bm7b5    · F natural, the b5
  [[50, 57, 59, 62, 65], 38, 45], // Dm6      · iv with the Dorian 6th
  [[56, 60, 63, 67, 70], 32, 39], // Abmaj7   · foreign, and meant to be
];

const bundleStrange = (c) => stack(padStrange(c[0]), bassStrange(c[1], c[2]));

/** Track 3's counter: a rare high sine off the A minor pentatonic — heavily
 * degraded, so it surfaces maybe once a bar, in key, unrepeating. */
const STRANGE_POOL_HI = [72, 76, 79, 84]; // C5 E5 G5 C6
function counterStrange() {
  return degradeBy(
    0.55,
    note(
      irand(STRANGE_POOL_HI.length)
        .segment(2)
        .fmap((i) => STRANGE_POOL_HI[i]),
    )
      .s("sine")
      .attack(0.9)
      .release(2.4)
      .room(0.7)
      .roomsize(0.9)
      .pan(0.6)
      .gain(0.12),
  );
}

/** Half-time kit: kick on 1, snare on 3, eighth hats mostly missing. */
function kitStrange() {
  return stack(
    seq(kick(0.5), R, snare(0.3), R),
    degradeBy(0.35, hats8(0.11)),
    shaker(0.07),
  );
}

function arrangementStrange(constructing) {
  // bar 1 anchored, bars 2–4 re-chosen every pass. The .early(13k) is
  // load-bearing: inside cat, all three pool slots would otherwise sample
  // the random stream at the SAME inner cycle and pick the same chord all
  // pass — a whole-cycle shift gives each slot its own stream while leaving
  // the chord phase intact.
  const pool = (k) =>
    chooseCycles(...STRANGE_POOL.map(bundleStrange)).early(13 * k);
  const layers = [
    cat(bundleStrange(STRANGE_ANCHOR), pool(1), pool(2), pool(3)),
    counterStrange(),
    kitStrange(),
  ];
  constructing && layers.push(arp([[STRANGE_ANCHOR[0], 0, 0]]));
  return stack(...layers);
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

// ------------------------------------------------- which track plays when
// Bound to the simulation the way the wind, the water and the bell already
// are (docs/AUDIO.md): track 1 for a small city, track 2 (Dorian, driving)
// once the city has actually grown — a fresh city seeds six houses and
// wakes with population 46, so 58 means three houses the CITY built on top
// of that — and track 3 (strange) through the night hours. The clock runs
// 5.6–29.6, so hour > 20.5 IS the night; it hands back to a day track at
// the dawn wrap.
const TRACK_NIGHT_HOUR = 20.5,
  TRACK_GROWN_POP = 58,
  XFADE_SECS = 3;

/** Pick cps (tempo) per track: 67bpm / 80bpm / 72bpm at four beats a cycle,
 * track 1 keeping its dusk slowdown. */
function cpsFor(track, duskAmt) {
  if (track === 2) return duskAmt ? 0.31 : 80 / 60 / 4; // ≈0.333
  if (track === 3) return 72 / 60 / 4; // 0.3
  return duskAmt ? 0.24 : 0.28;
}

/** Build the full pattern for a track at the given arrangement state. */
function arrangementFor(track, stage, duskAmt, constructing) {
  if (track === 2) return arrangementDorian(stage, duskAmt, constructing);
  if (track === 3) return arrangementStrange(constructing);
  return arrangement(stage, duskAmt, constructing);
}

class Score {
  /** Strudel's Cyclist, or null before start() and after stop(). */
  scheduler: any = null;
  /** True while start() is awaiting the audio graph — guards double-starts. */
  starting = false;
  /** Arrangement fingerprint; a change here rebuilds the pattern. */
  key = "";
  /** Output gain, 0..1. */
  level = 0;
  /** Superdough's destination gain node, once the controller exists. */
  out: any;
  t = 0; // seconds since the score began — drives the arrangement
  track = 1; // which of the three tracks is playing
  fade = 1; // 1 = full; eased to 0 and back across a track change
  xfadeTo = 0; // the track a fade is heading for, 0 = none
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
      this.key = "1|0|0|false";
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
    // which track the simulation wants right now
    const want =
      st.hour > TRACK_NIGHT_HOUR ? 3 : (st.pop ?? 0) >= TRACK_GROWN_POP ? 2 : 1;
    // track changes cross over silence: ease down over ~3s, swap the
    // pattern at the bottom, ease back up. Never cut. A new want mid-fade
    // waits its turn — the fade in progress always completes.
    if (want !== this.track && !this.xfadeTo) this.xfadeTo = want;
    if (this.xfadeTo) {
      if (this.track !== this.xfadeTo) {
        this.fade = Math.max(0, this.fade - dt / XFADE_SECS);
        this.fade === 0 && ((this.track = this.xfadeTo), (this.key = ""));
      } else {
        this.fade = Math.min(1, this.fade + dt / XFADE_SECS);
        this.fade >= 1 && (this.xfadeTo = 0);
      }
    }
    this.out.gain.value = this.level * this.fade;
    // discrete mood: track + arrangement stage + dusk bucket + construction
    const stage = this.t < 30 ? 0 : this.t < 60 ? 1 : this.t < 90 ? 2 : 3;
    const duskAmt = st.dusk > 0.45 ? 1 : 0;
    const key = `${this.track}|${stage}|${duskAmt}|${!!st.constructing}`;
    if (key !== this.key) {
      this.key = key;
      // a pattern that throws at build time must not take the frame loop
      // down — fall back to what is already playing
      try {
        this.scheduler.setCps(cpsFor(this.track, duskAmt));
        this.scheduler.setPattern(
          arrangementFor(this.track, stage, duskAmt, !!st.constructing),
        );
      } catch (err) {
        console.warn("[score] pattern swap failed", err);
      }
    }
  }
}

const score = new Score();

export { score };
