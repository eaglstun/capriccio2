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
// The stages only ever ADD, so past 1:30 they leave a loop with nothing
// further to happen to it. Crossing them is a SONG FORM — verse, chorus and
// bridge, counted in bars off the scheduler's own cycle clock, running for
// as long as the track plays. See FORM and sectionAt() below.
//
// Harmony stays in A minor throughout: i–VI–III–VII (Am9 Fmaj9 Cmaj9
// Gadd9), with the second 4-bar pass suspended (sus2/sus4 — the 3rd
// removed so the chords hover), and, only in the last stage, that
// single Dadd9 where the diatonic chord would be Dm.
//
// That loop is now TRACK 1 of three. All three stay rooted on A, so a
// track change is a mode change, not a key change:
//   track 1 — A minor, calm            · the original bed, ~67bpm
//   track 2 — A Dorian, TECHNO         · Am9 D6/9 Am9 Gadd9, 124bpm,
//             four-on-the-floor, clap on 2 and 4, open hats on every
//             off-beat, an acid bassline sweeping on perlin. Its kit
//             builds through three stages: pulse, drop, roll.
//   track 3 — the strange one, night   · bar 1 always Am9, bars 2–4
//             chosen per cycle (Fmaj7#11 / Bm7b5 / Dm6 / Abmaj7),
//             60bpm half-time, heavy detune, tape sag
//
// They are separated on FOUR axes at once, because one axis is not enough:
// three tracks that differ only in harmony, under three near-identical
// supersaw pads at the same level with the same long tails, sound like one
// track. So:
//
//   tempo     67 / 124 / 60 bpm — better than 2:1 across the extremes
//   register  pads at A3–B4 / A3–B4 / an octave lower, A2–B3
//   texture   pad-led wash / four-on-the-floor with the pad pulled back
//             to glue / half-time, dark hats full of holes
//   voice     track 2's pad is drier, darker and shorter than track 1's,
//             and its bass is an acid line rather than a root; track 3's
//             pad is lower, slower and filtered further down
//
// Only track 1 is the original bed. It is the reference the other two are
// pushed away FROM, and it is deliberately left alone.
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
function pads(bars, duskAmt, stage, lift = 0) {
  return (
    cat(...bars.map((b) => chord(b[0])))
      .s("supersaw")
      .unison(7)
      .detune(stage >= 2 ? 0.68 : 0.5) // light detuned unison after the second section
      .spread(0.8)
      .attack(1.4)
      .release(2.8)
      // `lift` opens the filter for a chorus or a bridge. Brightness is the
      // cheapest way to signal "this is the big part" without touching gain,
      // which would only make the mix louder rather than more open.
      .lpf(1150 - duskAmt * 520 + lift)
      .room(0.7)
      .roomsize(0.85)
      .gain(0.5)
  );
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
// backbeat on 2 and 4, accented hats on sixteenths, a kick that pushes off
// the and-of-4 into the next bar, and the BASS carrying it — a syncopated
// riff (root / 5th / b7 / octave), not roots. Ghosts, open hats, a ride and
// off-beat stabs arrive with the stages.
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

/** Track 2's pad. Deliberately NOT track 1's pad: darker, quieter, drier and
 * shorter, because in this track the pad is glue and the rhythm section is
 * the subject. Track 1's supersaw at gain 0.5 with a 2.8s tail and room 0.7
 * is a wash that buries whatever is underneath it — which is exactly what it
 * is for there, and exactly wrong here. */
function padsDorian(bars, duskAmt, lift = 0) {
  return (
    cat(...bars.map((b) => chord(b[0])))
      .s("supersaw")
      .unison(5)
      .detune(0.35)
      .spread(0.6)
      // in a breakdown the pad stops being glue and becomes the only thing
      // there, so it swells rather than pulses: a longer attack, a longer
      // tail, a much more open filter and half again the level
      .attack(lift ? 1.8 : 0.6)
      .release(lift ? 3.2 : 1.1)
      .lpf(900 - duskAmt * 300 + lift)
      .room(lift ? 0.7 : 0.35)
      .roomsize(lift ? 0.85 : 0.6)
      .gain(lift ? 0.4 : 0.26)
  );
}

/** Track 2's bass: the riff, sawtooth, well forward in the mix. Short and
 * bright — with the pad pulled back this is the loudest sustained thing in
 * the track, and it should read as a part you could hum. */
function bassRiff(bars) {
  return (
    cat(...bars.map((b) => seq(...b[1].map((n) => (n ? note(n) : silence)))))
      .s("sawtooth")
      .attack(0.01)
      .release(0.14)
      // an acid line: a resonant low-pass wandering on perlin over four
      // cycles, so the same eight notes are a different colour every pass
      // through the loop. The resonance is what makes the sweep audible as
      // a MOVEMENT rather than as the track getting brighter.
      .lpf(perlin.range(620, 2400).slow(4))
      .lpq(9)
      .shape(0.34)
      .gain(0.58)
  );
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
      // short and dry compared to track 1's counter (1.1 / 2.2 / room 0.6):
      // an answer thrown into a gap, not a line hanging over the bar
      .attack(0.12)
      .release(0.7)
      .room(0.25)
      .roomsize(0.6)
      .pan(0.38)
      .gain(0.14),
  );
}

// Sixteenth hats, ACCENTED: full on each beat, two thirds on the eighths,
// under half on the sixteenths in between. A flat sixteenth line is a buzz;
// the accents are what make it read as a pulse you could walk to. The
// degrade is lighter than it was (0.16) so the accents mostly survive —
// dropping the beat is what made this sound tentative.
const hats16 = (g) =>
  degradeBy(
    0.16,
    seq(
      ...Array.from({ length: 16 }, (_, i) =>
        hat(i % 4 === 0 ? g * 1.45 : i % 2 === 0 ? g : g * 0.6),
      ),
    ),
  );
const shaker = (g) =>
  euclid(
    5,
    8,
    note(105).s("z_noise").clip(0.045).release(0.045).hpf(5200).gain(g),
  );

// ---------------------------------------------------- track 2's techno kit
// The grammar here is four-on-the-floor: a kick on every quarter, open hats
// filling every space between them, and a clap — not a snare — on 2 and 4.
// That combination is the most recognisable rhythmic signature in popular
// music, which is precisely why it is being used: this track's whole job is
// to be unmistakably NOT the other two.

/** A longer, dirtier hat — the open one. Its tail is what pulls the ear
 * across the barline. */
const ohat = (g) =>
  note(108).s("z_noise").clip(0.17).release(0.17).hpf(2600).gain(g);

/** Open hats on EVERY off-beat eighth — the tss between the kicks. With a
 * four-on-the-floor underneath, this is the other half of the signature:
 * the kick marks the beat, the open hat marks everything the beat is not. */
const ohatsOff = (g) =>
  seq(...Array.from({ length: 4 }, () => seq(R, ohat(g))));

/** Four on the floor, with the and-of-4 kept as a pickup into the next bar.
 * A kick on every quarter is the least subtle rhythm there is and it does
 * not care: it is the thing that makes a room move. (This replaced a
 * syncopated kick that hit 1, the and-of-2 and 3 — better craft, weaker
 * signal. Sometimes the obvious pattern is the right one.) */
const kick4 = (g) =>
  seq(
    kick(g),
    kick(g * 0.94),
    kick(g * 0.97),
    seq(kick(g * 0.94), kick(g * 0.78)),
  );

/** A clap, built the way a drum machine builds one: three short noise
 * bursts a few milliseconds apart through a mid bandpass, so the attack
 * smears instead of cracking. Where the snare snaps, this splashes. */
const clap = (g) =>
  stack(
    note(88).s("z_noise").clip(0.06).release(0.1).bpf(1250).gain(g),
    note(88)
      .s("z_noise")
      .clip(0.05)
      .release(0.08)
      .bpf(1450)
      .gain(g * 0.7)
      .early(0.006),
    note(88)
      .s("z_noise")
      .clip(0.05)
      .release(0.08)
      .bpf(1080)
      .gain(g * 0.55)
      .early(0.012),
  );
const claps24 = (g) => seq(R, clap(g), R, clap(g));

/** Eighth hats with the beat accented — the lighter line, before the
 * sixteenths take over in the last stage. */
const hats8acc = (g) =>
  seq(...Array.from({ length: 8 }, (_, i) => hat(i % 2 === 0 ? g : g * 0.62)));

/** Ghost snares: sixteenths at a twentieth of the backbeat's level, three
 * quarters of them thrown away at random, and never on 2 or 4 — a ghost
 * that lands on the backbeat is not a ghost, it is a flam. */
const ghosts = (g) =>
  degradeBy(
    0.74,
    seq(...Array.from({ length: 16 }, (_, i) => (i % 8 === 4 ? R : snare(g)))),
  );

/** Off-beat chord stabs — 3rd, 5th and 9th an octave up, no root, short and
 * filtered. Placed on every eighth-note AND, so the pads sustain through
 * the bar while these mark the spaces between the kicks. */
function stabsDorian(bars, g) {
  return cat(
    ...bars.map((b) => {
      const c = chord([b[0][1] + 12, b[0][2] + 12, b[0][4] + 12]);
      return seq(...Array.from({ length: 4 }, () => seq(R, c)));
    }),
  )
    .s("sawtooth")
    .attack(0.005)
    .release(0.12)
    .lpf(2600)
    .shape(0.15)
    .pan(0.55)
    .gain(g);
}

/** Track 2's kit, and the only one built on a four-on-the-floor.
 *
 *   stage 1 — kick on every quarter, eighth hats, shaker. NO backbeat at
 *             all: just the pulse, which is how a techno track opens.
 *   stage 2 — the clap lands on 2 and 4, open hats fill every off-beat
 *             eighth, ghost snares underneath. This is the drop.
 *   stage 3 — hats double to rolling sixteenths and a tom fill arrives
 *             every eighth bar.
 *
 * Dusk still halves it, as it does track 1's: the point of dusk is that
 * everything pulls back, and a four-on-the-floor at dusk would be a fight
 * with the rest of the game rather than a part of it. */
function kitDorian(stage, duskAmt) {
  if (stage < 1) return null;
  if (duskAmt)
    return stack(
      seq(kick(0.5), R, R, R),
      hats8(0.09),
      seq(R, R, snare(0.22), R),
    );
  // louder than track 1's kit by roughly a third across the board. Track 1's
  // drums are a bed under a wash; these are the part you are listening to.
  const base = [kick4(0.58), shaker(0.11)];
  if (stage === 1) return stack(...base, hats8acc(0.15));
  base.push(claps24(0.34), ohatsOff(0.13), ghosts(0.06));
  if (stage === 2) return stack(...base, hats8acc(0.15));
  // eight bars of kit against a four-bar chord loop, so the fill lands on
  // alternating halves of the harmony
  const bar = stack(...base, hats16(0.15)),
    fill = stack(...base, hats16(0.15), tomFill());
  return cat(bar, bar, bar, bar, bar, bar, bar, fill);
}

function arrangementDorian(stage, duskAmt, constructing, sec) {
  // THE BREAKDOWN. Everything with a low end in it drops out — no kick, no
  // clap, no bass, no stabs — and what is left is the pad swelling with its
  // filter wide open over a thin hat line. This is the oldest structural
  // trick in dance music and it works for a reason: sixteen bars without a
  // kick is what makes the kick coming back an event. Dusk keeps its own
  // half-time kit instead; a breakdown inside an already quiet arrangement
  // would be a breakdown from nothing to nothing.
  if (sec === "bridge" && !duskAmt) {
    const layers = [
      padsDorian(BARS_DORIAN, duskAmt, 1400),
      counterDorian(),
      stack(hats16(0.09), degradeBy(0.3, shaker(0.09))),
    ];
    constructing && layers.push(arp(BARS_DORIAN.map((b) => [b[0], 0, 0])));
    return stack(...layers);
  }
  // The verse is capped below the rolling sixteenths and the fill; the
  // chorus always gets them, whatever the build has reached. That gap —
  // eighth hats against sixteenths, no fill against a fill every eighth
  // bar — is the difference you hear when the section changes.
  const st = sec === "chorus" ? 3 : Math.min(stage, 2);
  const layers = [
    padsDorian(BARS_DORIAN, duskAmt, sec === "chorus" ? 350 : 0),
    bassRiff(BARS_DORIAN),
    counterDorian(),
  ];
  const drums = kitDorian(st, duskAmt);
  drums && layers.push(drums);
  // weight under the kit, the moment there is a kit — root and fifth an
  // octave down, exactly as track 1 does when its drums arrive
  drums && layers.push(lowPad(BARS_DORIAN, duskAmt));
  // The stabs carry the harmony's RHYTHM, which is why they are here from
  // the first stage rather than saved for the third: with the pad pulled
  // back to glue, something has to state the chords in time, and off-beat
  // eighths state them in a way a sustained pad never can. Dusk still takes
  // them away — they are pure forward motion, and dusk is the pullback.
  !duskAmt &&
    st >= 1 &&
    layers.push(stabsDorian(BARS_DORIAN, sec === "chorus" ? 0.26 : 0.2));
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
  // an octave below where tracks 1 and 2 voice the same chords. That gap is
  // the point: with the counter still up at C5–C6, the middle of the
  // register — where both other tracks live — is left empty, and an empty
  // middle is what makes a mix sound like night rather than like evening.
  return chord(notes.map((n) => n - 12))
    .s("supersaw")
    .unison(7)
    .detune(1.05)
    .spread(0.9)
    .attack(2.6)
    .release(5.2)
    .lpf(perlin.range(230, 520).slow(4))
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

/** The chorus lift: the top three notes of whatever chord is up, an octave
 * above the pad, on a plain triangle. The pad lives an octave below the
 * other tracks, so the only way this track can open out is upward. */
function liftStrange(notes) {
  return chord([notes[2] + 12, notes[3] + 12, notes[4] + 12])
    .s("triangle")
    .attack(1.2)
    .release(2.8)
    .room(0.7)
    .roomsize(0.9)
    .pan(0.42)
    .gain(0.12);
}

const bundleStrange = (c, lift = false) =>
  lift
    ? stack(padStrange(c[0]), bassStrange(c[1], c[2]), liftStrange(c[0]))
    : stack(padStrange(c[0]), bassStrange(c[1], c[2]));

/** Track 3's counter: a rare high sine off the A minor pentatonic — heavily
 * degraded, so it surfaces maybe once a bar, in key, unrepeating. */
const STRANGE_POOL_HI = [72, 76, 79, 84]; // C5 E5 G5 C6
function counterStrange() {
  return degradeBy(
    // 0.42, not the 0.55 it was: at this tempo the higher figure left the
    // top of the register silent for most of a minute at a time
    0.42,
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

/** A darker hat than the other two tracks use: opened up from 3000Hz to
 * 1900, so what is left is body rather than sizzle. It keeps time without
 * ever sounding bright about it. */
const darkHat = (g) =>
  note(112).s("z_noise").clip(0.06).release(0.06).hpf(1900).gain(g);

/** Eighth hats, alternate ones softer, a quarter of them thrown away at
 * random — present enough to hold the bar together, absent often enough that
 * you never get a steady tick. At 60bpm a cycle is four seconds long, so a
 * heavier degrade than this leaves whole seconds with nothing in them, which
 * is what made this track feel empty rather than spacious. */
const hatsNight = (g) =>
  degradeBy(
    0.26,
    seq(...Array.from({ length: 8 }, (_, i) => darkHat(i % 2 ? g * 0.7 : g))),
  );

/** Half-time kit. What lands on 3 is a floor tom rather than a snare — no
 * snap, no backbeat, a low thud a long way after the downbeat — and the hats
 * above it are dark and full of holes. */
function kitStrange(sec) {
  // the bridge keeps the hats and loses the floor — no kick, no tom. The
  // track is sparse enough already that taking the hats out too would leave
  // a hole rather than a bridge.
  if (sec === "bridge")
    return stack(hatsNight(0.08), degradeBy(0.35, shaker(0.06)));
  const low =
    sec === "chorus"
      ? // a second tom answers on the and-of-4, and the hats close up
        seq(kick(0.62), R, tom(41), seq(R, tom(38)))
      : seq(kick(0.55), R, tom(41), R);
  return stack(
    low,
    hatsNight(sec === "chorus" ? 0.12 : 0.095),
    degradeBy(0.22, shaker(0.07)),
  );
}

function arrangementStrange(constructing, sec) {
  // bar 1 anchored, bars 2–4 re-chosen every pass. The .early(13k) is
  // load-bearing: inside cat, all three pool slots would otherwise sample
  // the random stream at the SAME inner cycle and pick the same chord all
  // pass — a whole-cycle shift gives each slot its own stream while leaving
  // the chord phase intact.
  // NB the explicit lambda: `.map(bundleStrange)` would hand Array.map's
  // INDEX to the second parameter, so pool chords 1–3 would all silently
  // get the chorus lift and the anchor would not.
  const lift = sec === "chorus";
  const pool = (k) =>
    chooseCycles(...STRANGE_POOL.map((c) => bundleStrange(c, lift))).early(
      13 * k,
    );
  const layers = [
    cat(bundleStrange(STRANGE_ANCHOR, lift), pool(1), pool(2), pool(3)),
    counterStrange(),
    kitStrange(sec),
  ];
  constructing && layers.push(arp([[STRANGE_ANCHOR[0], 0, 0]]));
  return stack(...layers);
}

// ------------------------------------------------------------------ score

function arrangement(stage, duskAmt, constructing, sec) {
  // THE BRIDGE: the drums stop dead and the harmony moves to the suspended
  // voicings, so for eight bars nothing resolves and nothing keeps time. It
  // is the only place in track 1 where the kit is absent after it has once
  // arrived, which is what makes the chorus after it land.
  if (sec === "bridge") {
    const layers = [
      pads(BARS_SUS, duskAmt, stage, 260),
      bass(BARS_SUS),
      counter(BARS_SUS),
    ];
    constructing && layers.push(arp(BARS_SUS));
    return stack(...layers);
  }
  const bars = harmonicLoop(stage);
  // The chorus takes the FULL kit — ride on quarters, a tom fill every
  // eighth bar — and the verse is held one below it, so the two stay
  // different from each other even at stage 3 where the build has run out
  // of things to add. (Lifting the chorus by one stage instead produced a
  // chorus identical to the verse in exactly the steady state the form
  // exists to relieve.)
  //
  // The harmonic loop still comes from the TRUE stage, never the section:
  // the borrowed D major is a once-and-late chord, and a chorus that
  // brought it round three times a form would spend it.
  const kitStage = sec === "chorus" ? 3 : Math.min(stage, 2);
  const layers = [
    pads(bars, duskAmt, stage, sec === "chorus" ? 300 : 0),
    bass(bars),
  ];
  if (stage >= 1) layers.push(lowPad(bars, duskAmt));
  if (stage >= 2 || sec === "chorus") layers.push(counter(bars));
  const drums = kit(kitStage, duskAmt);
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
  // The spread used to be 67 / 80 / 72 — close enough that under three
  // slow-attack pads you could not hear which was which. 67 / 124 / 60 is
  // better than 2:1 between the extremes: track 2 is now at proper techno
  // tempo, and track 3 runs at half of it, which is also why the two never
  // sound like the same piece at different speeds.
  if (track === 2) return duskAmt ? 0.4 : 124 / 60 / 4; // ≈0.517
  if (track === 3) return 60 / 60 / 4; // 0.25
  return duskAmt ? 0.24 : 0.28;
}

// --------------------------------------------------------------- song form
// The stages (0:30 / 1:00 / 1:30) are a one-way build: they only ever ADD,
// which means that past 1:30 the piece was a single loop with nothing left
// to happen to it. Sections are the other axis — a verse/chorus/bridge form
// that keeps arriving somewhere for as long as the track plays.
//
//   verse   the arrangement as the build left it
//   chorus  one stage further on than the build has reached: fuller kit,
//           counter-melody, filter open
//   bridge  the subtraction. Track 1 loses its drums and hangs on
//           suspended chords, track 2 breaks down to pad and hats with no
//           low end at all, track 3 loses its floor and keeps its hats.
//
// V V C V C B C C — the bridge lands three quarters of the way through,
// which is where a bridge belongs.
const FORM = [
  "verse",
  "verse",
  "chorus",
  "verse",
  "chorus",
  "bridge",
  "chorus",
  "chorus",
];

// Bars per section, per track. Track 2 gets sixteen because that is the
// unit techno is built in and because its bars are half the length of the
// others'; every value is a multiple of that track's harmonic loop, so a
// section boundary always falls on a chord-loop boundary.
const SECTION_BARS = { 1: 8, 2: 16, 3: 8 };

/**
 * Which section is playing, from the scheduler's ABSOLUTE cycle position.
 *
 * Cycle count is the right clock for this and wall-clock seconds would be
 * the wrong one: the patterns index their chords by absolute cycle too, so
 * counting in cycles is what keeps a section change landing on a bar line
 * instead of a third of the way through one. `cycle` comes from Cyclist's
 * lastEnd, which runs slightly AHEAD of what is audible — which is the
 * direction you want the error in, since the pattern must be swapped before
 * the boundary is played, not after.
 *
 * Sections hold off until stage 2. The first minute is the opening build
 * and it has its own shape; dropping a chorus into the middle of it would
 * be two structures arguing.
 */
function sectionAt(track, cycle, stage) {
  if (stage < 2) return "verse";
  const n = SECTION_BARS[track] ?? 8;
  return FORM[Math.floor(cycle / n) % FORM.length];
}

/** Build the full pattern for a track at the given arrangement state. */
function arrangementFor(track, stage, duskAmt, constructing, sec = "verse") {
  if (track === 2) return arrangementDorian(stage, duskAmt, constructing, sec);
  if (track === 3) return arrangementStrange(constructing, sec);
  return arrangement(stage, duskAmt, constructing, sec);
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
  /** Which section of the form is playing: verse, chorus or bridge. Read by
   * the /listen.html page; the game does not use it. */
  section = "verse";
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
      await this.scheduler.setPattern(arrangement(0, 0, false, "verse"), true);
      this.key = "1|0|0|false|verse";
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
    // discrete mood: track + stage + dusk bucket + construction + section
    const stage = this.t < 30 ? 0 : this.t < 60 ? 1 : this.t < 90 ? 2 : 3;
    const duskAmt = st.dusk > 0.45 ? 1 : 0;
    // the scheduler's own cycle counter — musical position, not wall clock
    this.section = sectionAt(this.track, this.scheduler.lastEnd ?? 0, stage);
    const key = `${this.track}|${stage}|${duskAmt}|${!!st.constructing}|${this.section}`;
    if (key !== this.key) {
      this.key = key;
      // a pattern that throws at build time must not take the frame loop
      // down — fall back to what is already playing
      try {
        this.scheduler.setCps(cpsFor(this.track, duskAmt));
        this.scheduler.setPattern(
          arrangementFor(
            this.track,
            stage,
            duskAmt,
            !!st.constructing,
            this.section,
          ),
        );
      } catch (err) {
        console.warn("[score] pattern swap failed", err);
      }
    }
  }
}

const score = new Score();

export { score };
