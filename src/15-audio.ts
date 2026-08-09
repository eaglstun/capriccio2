// Procedural soundscape (Web Audio) — no samples ship
//
// Extracted from legacy/assets/index-DCXbw2vV.js, bundle lines
// 29757–29890. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
// --- end generated imports ---

class Soundscape {
  /** Null until the first user gesture — browsers refuse to start one before. */
  ctx: AudioContext | null = null;
  master: GainNode;
  windGain: GainNode;
  waterGain: GainNode;
  birdTimer = 0;
  chiselTimer = 0;
  lastBellHour = -1;
  /** Seconds of accumulated ambience time. */
  t = 0;
  // built lazily on the first bell and cached. `declare` so TypeScript knows
  // the field without emitting a definition — the property must keep coming
  // into existence on first assignment, as it does today.
  declare bellShaper?: WaveShaperNode;
  /**
   * Build the ambient graph. Deferred until the first user gesture, because
   * browsers will not let an AudioContext start before one.
   *
   * Two continuous beds, both from synthesized pink noise:
   *   WIND  -> bandpass at 480Hz, Q 0.6. An LFO at 0.07Hz (one cycle every
   *            ~14 seconds) sweeps the centre frequency +/-130Hz. The wind
   *            changes COLOUR as it gusts rather than just volume, which is
   *            what real wind does; amplitude tremolo would sound like a fan.
   *   WATER -> highpass 1400 + lowpass 5200, the band a fountain occupies with
   *            the body removed. Gain starts at 0 and is driven by distance.
   */
  start() {
    if (this.ctx) return;
    const t = new AudioContext();
    ((this.ctx = t),
      (this.master = t.createGain()),
      (this.master.gain.value = 0.32),
      this.master.connect(t.destination));
    const e = this.noiseSource(8),
      n = t.createBiquadFilter();
    ((n.type = "bandpass"),
      (n.frequency.value = 390),
      (n.Q.value = 0.6),
      (this.windGain = t.createGain()),
      (this.windGain.gain.value = 0.05),
      e.connect(n).connect(this.windGain).connect(this.master));
    const s = t.createOscillator();
    s.frequency.value = 0.07;
    const r = t.createGain();
    ((r.gain.value = 130), s.connect(r).connect(n.frequency), s.start());
    const o = this.noiseSource(4),
      a = t.createBiquadFilter();
    ((a.type = "highpass"), (a.frequency.value = 1400));
    const c = t.createBiquadFilter();
    ((c.type = "lowpass"),
      (c.frequency.value = 5200),
      (this.waterGain = t.createGain()),
      (this.waterGain.gain.value = 0),
      o.connect(a).connect(c).connect(this.waterGain).connect(this.master));
  }
  /**
   * A looping buffer of PINK noise, `t` seconds long.
   *
   * Three one-pole filters at different time constants, summed with a little
   * raw white — the standard filter-bank approximation. Pink noise has equal
   * energy per octave, which is what wind, water and rain actually sound like.
   * White noise sounds like a broken television.
   */
  noiseSource(t) {
    const e = this.ctx,
      n = e.createBuffer(1, e.sampleRate * t, e.sampleRate),
      s = n.getChannelData(0);
    let r = 0,
      o = 0,
      a = 0;
    for (let l = 0; l < s.length; l++) {
      const h = Math.random() * 2 - 1;
      ((r = 0.997 * r + 0.029 * h),
        (o = 0.985 * o + 0.032 * h),
        (a = 0.95 * a + 0.048 * h),
        (s[l] = (r + o + a + h * 0.05) * 0.28));
    }
    const c = e.createBufferSource();
    return ((c.buffer = n), (c.loop = !0), c.start(), c);
  }
  /**
   * A short tone: frequency `t`, duration `e`, gain `n`, waveform `s`, and
   * `r` as a frequency slide over the note.
   *
   * The bird calls use a -160Hz slide, which is what makes them read as birds
   * rather than beeps. They are square waves now, not sine — same schedule,
   * same count, same slide. They are drones.
   */
  blip(t, e, n, s: OscillatorType = "sine", r = 0) {
    const o = this.ctx,
      a = o.createOscillator();
    ((a.type = s),
      (a.frequency.value = t),
      r && a.frequency.linearRampToValueAtTime(t + r, o.currentTime + e));
    const c = o.createGain();
    (c.gain.setValueAtTime(0, o.currentTime),
      c.gain.linearRampToValueAtTime(n, o.currentTime + 0.02),
      c.gain.exponentialRampToValueAtTime(1e-4, o.currentTime + e),
      a.connect(c).connect(this.master),
      a.start(),
      a.stop(o.currentTime + e + 0.05));
  }
  /**
   * The hour bell: three partials at 392 / 587 / 988 Hz (a G major triad).
   *
   * The detail that matters is that HIGHER PARTIALS ARE QUIETER AND DECAY
   * FASTER — 0.10/2.6s, 0.05/1.9s, 0.022/1.1s. That is how struck metal
   * behaves. Give every partial the same envelope and you get an organ.
   *
   * Each strike detunes randomly by a fraction of a percent, so no two rings
   * are identical.
   */
  bell() {
    // the hour is still marked the same way; the bell has just been through a lot
    const t = this.ctx;
    if (!this.bellShaper) {
      const l = t.createWaveShaper(),
        h = new Float32Array(64);
      for (let u = 0; u < 64; u++) {
        const d = (u / 63) * 2 - 1;
        h[u] = Math.tanh(d * 1.9) * 0.72;
      }
      ((l.curve = h), l.connect(this.master), (this.bellShaper = l));
    }
    const e = this.bellShaper;
    for (const [s, r, o] of [
      [392, 0.1, 4.4],
      [587, 0.05, 3.1],
      [988, 0.022, 1.9],
    ]) {
      const a = t.createOscillator();
      a.frequency.value = s * (1 + (Math.random() - 0.5) * 0.028);
      const c = t.createGain();
      (c.gain.setValueAtTime(r, t.currentTime),
        c.gain.exponentialRampToValueAtTime(1e-4, t.currentTime + o),
        a.connect(c).connect(e),
        a.start(),
        a.stop(t.currentTime + o + 0.1));
    }
  }
  /**
   * One tool strike: a 30ms exponentially-decaying noise burst through a
   * narrow bandpass, re-randomised between 2400 and 4200 Hz per hit so
   * repeated strikes vary like a real tool on real stone.
   *
   * Only fires while something is under construction — and infill is capped at
   * two buildings at once, so the sound stays sparse rather than becoming a
   * rattle.
   */
  chisel() {
    const t = this.ctx,
      e = t.createBuffer(1, t.sampleRate * 0.03, t.sampleRate),
      n = e.getChannelData(0);
    for (let a = 0; a < n.length; a++)
      n[a] = (Math.random() * 2 - 1) * Math.exp(-a / (n.length * 0.18));
    const s = t.createBufferSource();
    s.buffer = e;
    const r = t.createBiquadFilter();
    ((r.type = "bandpass"),
      (r.frequency.value = 2400 + Math.random() * 1800),
      (r.Q.value = 6));
    const o = t.createGain();
    ((o.gain.value = 0.1),
      s.connect(r).connect(o).connect(this.master),
      s.start());
  }
  /**
   * Per-frame ambience. `t` is delta seconds, `e` carries the sim state the
   * audio reacts to.
   *
   * EVERY ELEMENT IS BOUND TO SIMULATION STATE, not to a timeline:
   *   wind gain rises with dusk
   *   water gain = (1 - dist/55)^2 — SQUARED, so it comes up sharply as you
   *     approach rather than bleeding in from far away
   *   birds only while dusk < 0.55, every 3.5-11.5s, 80% of the time
   *   chisels only while building
   *   the bell when the integer hour changes
   *
   * The result is that the soundscape is a readout of the game. You could play
   * with your eyes shut and know roughly the hour, whether you are near water,
   * and whether anything is being built.
   */
  update(t, e) {
    if (!this.ctx) return;
    ((this.t += t), (this.windGain.gain.value = 0.04 + e.dusk * 0.035));
    const n = Math.max(0, 1 - e.waterDist / 55);
    if (
      ((this.waterGain.gain.value = n * n * 0.16),
      (this.birdTimer -= t),
      this.birdTimer <= 0 &&
        ((this.birdTimer = 3.5 + Math.random() * 8),
        e.dusk < 0.55 && Math.random() < 0.8))
    ) {
      const r = 2300 + Math.random() * 1600,
        o = 2 + Math.floor(Math.random() * 3);
      // the birds became drones: same schedule, same slide, later waveform
      for (let a = 0; a < o; a++)
        setTimeout(
          () => this.blip(r + Math.random() * 300, 0.09, 0.016, "square", -160),
          a * 130 + Math.random() * 60,
        );
    }
    ((this.chiselTimer -= t),
      e.constructing &&
        this.chiselTimer <= 0 &&
        ((this.chiselTimer = 0.55 + Math.random() * 0.5), this.chisel()));
    const s = Math.floor(e.hour);
    s !== this.lastBellHour &&
      [8, 12, 18].includes(s) &&
      ((this.lastBellHour = s), this.bell());
  }
}

// --- generated exports ---
export { Soundscape };
