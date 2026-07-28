// Vaporwave score — Strudel patterns over synthesized sources only.
//
// NEW for the vaporwave reskin; not part of the reconstructed bundle.
// Uses @strudel/core's Cyclist scheduler and @strudel/webaudio's
// synth output. No samples() calls, nothing fetched at runtime: the
// pads are the supersaw worklet (inlined as a data: URL), the reverb
// impulse is generated procedurally by superdough.
//
// Like the Soundscape, this is a readout of the simulation:
//   - dusk slows the tempo, closes the filter and swells the volume
//   - while anything is under construction, a quiet arpeggio ticks
//     along with the chisels

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
  getSuperdoughAudioController,
} from "superdough";

// @strudel/webaudio's webaudioOutput, inlined: importing it from the
// package would circle back through @strudel/core's index (repl and all)
const webaudioOutput = (hap, _deadline, hapDuration, cps, t) => {
  hap.ensureObjectValue();
  return superdough(hap.value, t, hapDuration, cps, hap.whole?.begin.valueOf());
};

// Am9 · Fmaj9 · Cmaj9 · G(add9), one chord to the bar, ~66bpm and down
const PROG = [
  [57, 60, 64, 67, 71],
  [53, 57, 60, 64, 67],
  [48, 52, 55, 59, 62],
  [43, 47, 50, 57, 62],
];
const BASS = [33, 29, 24, 31];

const chord = (ns) => stack(...ns.map((n) => note(n)));

function pads(duskAmt) {
  return cat(...PROG.map(chord))
    .s("supersaw")
    .unison(7)
    .detune(0.5)
    .spread(0.8)
    .attack(1.4)
    .release(2.8)
    .lpf(1150 - duskAmt * 520)
    .room(0.7)
    .roomsize(0.85)
    .gain(0.5);
}

function bass() {
  return cat(...BASS.map((n) => seq(note(n), silence, note(n + 12), silence)))
    .s("triangle")
    .attack(0.03)
    .release(0.6)
    .gain(0.42);
}

// the construction arpeggio — only stacked in while the city is growing
function arp() {
  return cat(...PROG.map((c) => seq(...[0, 2, 4, 2, 1, 3, 4, 3].map((k) => note(c[k] + 12)))))
    .s("square")
    .attack(0.01)
    .release(0.25)
    .lpf(2100)
    .delay(0.5)
    .pan(0.62)
    .gain(0.16);
}

class Score {
  constructor() {
    this.scheduler = null;
    this.starting = false;
    this.key = "";
    this.level = 0;
  }
  async start() {
    if (this.scheduler || this.starting) return;
    this.starting = true;
    try {
      await initAudio();
      await registerSynthSounds();
      const ctx = getAudioContext();
      this.out = getSuperdoughAudioController().output.destinationGain;
      this.out.gain.value = 0;
      this.scheduler = new Cyclist({
        onTrigger: (hap, deadline, duration, cps, t) =>
          webaudioOutput(hap, deadline, duration, cps, t),
        getTime: () => ctx.currentTime,
      });
      this.scheduler.setCps(0.28);
      await this.scheduler.setPattern(stack(pads(0), bass()), true);
      this.key = "0|false";
    } catch (err) {
      console.warn("[score] music failed to start", err);
      this.scheduler = null;
    }
    this.starting = false;
  }
  update(dt, st) {
    if (!this.scheduler) return;
    // ease the master level toward its dusk-aware target
    const target = 0.34 + st.dusk * 0.14;
    this.level += (target - this.level) * Math.min(1, dt * 0.5);
    this.out.gain.value = this.level;
    // discrete mood: dusk bucket + construction layer
    const duskAmt = st.dusk > 0.45 ? 1 : 0;
    const key = `${duskAmt}|${!!st.constructing}`;
    if (key !== this.key) {
      this.key = key;
      this.scheduler.setCps(duskAmt ? 0.24 : 0.28);
      const layers = [pads(duskAmt), bass()];
      st.constructing && layers.push(arp());
      this.scheduler.setPattern(stack(...layers));
    }
  }
}

const score = new Score();

export { score };
