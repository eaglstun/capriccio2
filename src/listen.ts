// /listen.html — the score and the soundscape, with no city under them.
//
// NEW; not part of the reconstructed bundle, and not imported by the game.
// This is a second Vite entry (listen.html) that pulls in exactly two
// of the game's modules — the Strudel score (18-music) and the Web Audio
// soundscape (15-audio) — and drives them with a simulation state assembled
// by hand from sliders instead of by the world.
//
// Both audio systems take the same state object the game passes them each
// frame from 17-bootstrap:
//
//   { dusk, waterDist, constructing, hour, pop }
//
// so nothing here has to know how either one works. The score reads `hour`
// and `pop` to pick its track, `dusk` for tempo and level, `constructing`
// for the chisel arpeggio; the soundscape reads `dusk` for the wind,
// `waterDist` for the fountain, `hour` for the bells.
//
// No three.js, no world, no save. The heaviest thing on this page is
// superdough's audio graph.

import { score } from "./18-music";
import { Soundscape } from "./15-audio";
import { getAudioContext } from "superdough";

// ------------------------------------------------------------- sim mirrors

// The clock, exactly as the game runs it (17-bootstrap): a day is ~11.7 real
// minutes, the dark hours run at 2.5x, and the day turns over at the
// 29.6 -> 5.6 wrap rather than at midnight.
const DAY_SPEED = 15 / 570, // hours per real second
  NIGHT_START = 20.5,
  NIGHT_HOURS = 9.1,
  NIGHT_RATE = 2.5,
  DAY_END = 29.6;

const clamp = (i: number, t: number, e: number) => Math.max(t, Math.min(e, i));
/** smoothstep — the same helper 01-materials calls Nn. */
const smooth = (i: number, t: number, e: number) => {
  const n = clamp((e - i) / (t - i), 0, 1);
  return n * n * (3 - 2 * n);
};

/**
 * Dusk from the hour. This is the sun calculation out of 17-bootstrap's
 * os(), with only the part the audio consumes kept: the low-sun factor `o`
 * split by `hv` into evening rather than morning. In the game this value
 * reaches the score by way of the post material's uDusk uniform; here it is
 * computed straight from the clock, which is the same number.
 */
function duskAt(hour: number) {
  const t = clamp((hour - 5.5) / 15, 0, 1),
    u = clamp((hour - NIGHT_START) / NIGHT_HOURS, 0, 1),
    lowSun = smooth(0.45, 0.95, 1 - Math.sin(Math.PI * t)),
    hv = u > 0 ? 1 - smooth(0.72, 0.98, u) : smooth(0.42, 0.58, t);
  return lowSun * hv;
}

// ------------------------------------------------------------------- state

const sim = {
  hour: 9.1, // the game's starting hour
  pop: 8,
  waterDist: 40,
  constructing: false,
  dusk: 0,
};

const opt = { clock: true, ambience: true };

const soundscape = new Soundscape();
let started = false, // audio graphs built (needs a user gesture)
  playing = false,
  ambienceLive = false, // soundscape.start() has run
  analyser: AnalyserNode | null = null,
  // the buffer type is pinned to ArrayBuffer (not ArrayBufferLike) so it
  // satisfies getByteFrequencyData, which refuses a SharedArrayBuffer view
  bins: Uint8Array<ArrayBuffer> | null = null,
  last = 0;

// --------------------------------------------------------------------- DOM

const $ = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

const power = $<HTMLButtonElement>("power"),
  scope = $<HTMLCanvasElement>("scope"),
  trackNum = $("trackNum"),
  trackName = $("trackName"),
  trackDesc = $("trackDesc"),
  rClock = $("rClock"),
  rStage = $("rStage"),
  rSection = $("rSection"),
  rBpm = $("rBpm"),
  rDusk = $("rDusk"),
  cHour = $<HTMLInputElement>("cHour"),
  cPop = $<HTMLInputElement>("cPop"),
  cWater = $<HTMLInputElement>("cWater"),
  oHour = $<HTMLOutputElement>("oHour"),
  oPop = $<HTMLOutputElement>("oPop"),
  oWater = $<HTMLOutputElement>("oWater"),
  tClock = $<HTMLButtonElement>("tClock"),
  tBuild = $<HTMLButtonElement>("tBuild"),
  tAmb = $<HTMLButtonElement>("tAmb");

const TRACKS: Record<number, [string, string]> = {
  1: ["calm", "A minor · four chords · ~67bpm"],
  2: ["techno", "A Dorian · four-on-the-floor · 124bpm"],
  3: ["night", "half-time · dark and sparse · 60bpm"],
};
// The arrangement stages 18-music cuts at 30s / 60s / 90s.
const STAGES = ["I · bed", "II · hats", "III · snare", "IV · ride"];

/** Hours past midnight, formatted — the clock runs past 24 to the 29.6 wrap. */
function hhmm(hour: number) {
  const h = ((Math.floor(hour) % 24) + 24) % 24,
    m = Math.floor((hour % 1) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function setToggle(el: HTMLElement, on: boolean) {
  el.dataset.on = on ? "1" : "0";
}

// ------------------------------------------------------------------ inputs

function syncFromInputs() {
  ((sim.hour = +cHour.value),
    (sim.pop = +cPop.value),
    (sim.waterDist = +cWater.value),
    (oHour.value = hhmm(sim.hour)),
    (oPop.value = String(sim.pop)),
    (oWater.value = `${sim.waterDist}m`));
}

cHour.addEventListener("input", () => {
  // dragging the clock is a deliberate override — stop the clock so the
  // drag is not immediately undone by the day advancing
  (setToggle(tClock, (opt.clock = false)), syncFromInputs());
});
cPop.addEventListener("input", syncFromInputs);
cWater.addEventListener("input", syncFromInputs);

tClock.addEventListener("click", () =>
  setToggle(tClock, (opt.clock = !opt.clock)),
);
tBuild.addEventListener("click", () =>
  setToggle(tBuild, (sim.constructing = !sim.constructing)),
);
tAmb.addEventListener("click", () => {
  setToggle(tAmb, (opt.ambience = !opt.ambience));
  if (opt.ambience && started) startAmbience();
  // the soundscape has no stop(); muting its master is how it goes quiet,
  // and the gain is restored on the next update() when it comes back
  if (!opt.ambience && soundscape.master) soundscape.master.gain.value = 0;
});

/** Build the ambient graph on first use. Its own AudioContext, as in the game. */
function startAmbience() {
  (soundscape.start(),
    (ambienceLive = true),
    soundscape.master && (soundscape.master.gain.value = 0.32));
}

// ------------------------------------------------------------------- power

power.addEventListener("click", async () => {
  if (!started) {
    ((power.disabled = true), (power.textContent = "Warming up…"));
    await score.start();
    if (!score.scheduler) {
      ((power.textContent = "Audio unavailable"), (power.disabled = false));
      return;
    }
    // tap the score's output for the spectrum. An analyser with nothing
    // connected downstream still reads the signal passing through the node
    // it is fed by, so this adds a listener, not a second path to the
    // speakers.
    try {
      const ctx = getAudioContext();
      ((analyser = ctx.createAnalyser()),
        (analyser.fftSize = 512),
        (analyser.smoothingTimeConstant = 0.78),
        (bins = new Uint8Array(analyser.frequencyBinCount)),
        score.out.connect(analyser));
    } catch (err) {
      console.warn("[listen] no spectrum", err);
    }
    if (opt.ambience) startAmbience();
    ((started = true), (playing = true), (power.disabled = false));
    ((last = performance.now()), requestAnimationFrame(frame));
  } else {
    playing = !playing;
    // Cyclist stops and restarts cleanly; the soundscape just goes quiet
    (playing ? score.scheduler.start() : score.scheduler.pause(),
      soundscape.master &&
        (soundscape.master.gain.value = playing && opt.ambience ? 0.32 : 0));
  }
  ((power.textContent = playing ? "Pause" : "Resume"),
    setToggle(power, playing));
});

// -------------------------------------------------------------------- loop

function frame(now: number) {
  requestAnimationFrame(frame);
  // clamp the same way the game does — a backgrounded tab must not hand the
  // simulation a ten-second step
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;

  if (playing) {
    if (opt.clock) {
      sim.hour += dt * DAY_SPEED * (sim.hour > NIGHT_START ? NIGHT_RATE : 1);
      sim.hour >= DAY_END && (sim.hour -= 24);
      cHour.value = String(sim.hour);
      ((oHour.value = hhmm(sim.hour)), (sim.dusk = duskAt(sim.hour)));
    }
    sim.dusk = duskAt(sim.hour);
    (score.update(dt, sim),
      opt.ambience && ambienceLive && soundscape.update(dt, sim));
  }

  draw();
  readout();
}

/** Track / stage / tempo / dusk, straight off the live objects. */
function readout() {
  const t = score.track,
    [name, desc] = TRACKS[t] ?? TRACKS[1],
    fading = score.xfadeTo && score.xfadeTo !== t;
  ((trackNum.textContent = `TRACK ${t}`),
    (trackName.textContent = name),
    (trackDesc.textContent = fading
      ? `handing over to ${TRACKS[score.xfadeTo]?.[0] ?? "?"}…`
      : desc));
  const stage = score.t < 30 ? 0 : score.t < 60 ? 1 : score.t < 90 ? 2 : 3;
  ((rClock.textContent = hhmm(sim.hour)),
    (rStage.textContent = started ? STAGES[stage] : "—"),
    // the form only starts running once the opening build reaches stage 2
    (rSection.textContent = !started
      ? "—"
      : stage < 2
        ? "intro"
        : score.section),
    (rBpm.textContent = score.scheduler
      ? `${Math.round(score.scheduler.cps * 4 * 60)}`
      : "—"),
    (rDusk.textContent = `${Math.round(sim.dusk * 100)}%`));
}

// ----------------------------------------------------------------- spectrum

const g = scope.getContext("2d")!;

/**
 * A bar spectrum in the page's own palette. Only the low ~40% of the bins
 * are drawn: everything this score makes lives below ~8kHz, and plotting the
 * empty top half just makes the display look dead.
 */
function draw() {
  const w = scope.width,
    h = scope.height;
  g.clearRect(0, 0, w, h);
  const N = 48,
    gap = 3,
    bw = (w - gap * (N - 1)) / N;
  analyser && bins && analyser.getByteFrequencyData(bins);
  const used = bins ? Math.floor(bins.length * 0.42) : 0,
    per = Math.max(1, Math.floor(used / N));
  for (let i = 0; i < N; i++) {
    let v = 0;
    if (bins) {
      for (let k = 0; k < per; k++) v = Math.max(v, bins[i * per + k] ?? 0);
      v /= 255;
    }
    // a floor so the bars read as an instrument at rest rather than as a
    // broken canvas before anything is playing
    const bh = Math.max(2, v * v * (h - 4)),
      x = i * (bw + gap),
      y = h - bh,
      grad = g.createLinearGradient(0, y, 0, h);
    (grad.addColorStop(0, "#6ff5ea"),
      grad.addColorStop(0.55, "#ff71ce"),
      grad.addColorStop(1, "rgba(255,155,106,0.55)"),
      (g.fillStyle = grad),
      g.fillRect(x, y, bw, bh));
  }
}

// ------------------------------------------------------------------- boot

(syncFromInputs(),
  (sim.dusk = duskAt(sim.hour)),
  setToggle(tClock, opt.clock),
  setToggle(tBuild, sim.constructing),
  setToggle(tAmb, opt.ambience),
  readout(),
  draw());
