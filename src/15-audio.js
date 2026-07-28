// Procedural soundscape (Web Audio) — no samples ship
//
// Extracted verbatim from public/assets/index-DCXbw2vV.js,
// lines 29757–29890.
// Identifiers are minifier-mangled; nothing here has been renamed.
// Regenerate with: python3 tools/split_bundle.py --write

class Soundscape {
  constructor() {
    K(this, "ctx", null);
    K(this, "master");
    K(this, "windGain");
    K(this, "waterGain");
    K(this, "birdTimer", 0);
    K(this, "chiselTimer", 0);
    K(this, "lastBellHour", -1);
    K(this, "t", 0);
  }
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
      (n.frequency.value = 480),
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
  blip(t, e, n, s = "sine", r = 0) {
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
  bell() {
    const t = this.ctx;
    for (const [e, n, s] of [
      [392, 0.1, 2.6],
      [587, 0.05, 1.9],
      [988, 0.022, 1.1],
    ]) {
      const r = t.createOscillator();
      r.frequency.value = e * (1 + (Math.random() - 0.5) * 0.004);
      const o = t.createGain();
      (o.gain.setValueAtTime(n, t.currentTime),
        o.gain.exponentialRampToValueAtTime(1e-4, t.currentTime + s),
        r.connect(o).connect(this.master),
        r.start(),
        r.stop(t.currentTime + s + 0.1));
    }
  }
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
      for (let a = 0; a < o; a++)
        setTimeout(
          () => this.blip(r + Math.random() * 300, 0.09, 0.016, "sine", -160),
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
