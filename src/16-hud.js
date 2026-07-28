// HUD: stylesheet and the UI class
//
// Extracted from public/assets/index-DCXbw2vV.js, bundle lines
// 29891–30392. Statements are verbatim; identifiers are
// renamed via src/renames.json. Imports and exports are generated.
// Regenerate: python3 tools/split_bundle.py --write

// --- generated imports ---
import { Vector3 } from "three";
import { gameState } from "./07-citizens.js";
import { BUILD_CATALOGUE } from "./09-catalogue.js";
import { tv } from "./14-plates.js";
import { rv } from "./_hoisted.js";
import { defineField } from "./_runtime.js";
// --- end generated imports ---

const nv = `
#hud { position: fixed; inset: 0; pointer-events: none; z-index: 10;
  font-family: "Avenir Next", "Futura", "Century Gothic", "Helvetica Neue", Arial, sans-serif;
  color: #f4e9ff; user-select: none; }
#hud * { box-sizing: border-box; }
.panel { background: rgba(26,16,54,0.86); border: 1px solid #ff71ce;
  box-shadow: 0 1px 0 rgba(255,113,206,0.25), inset 0 0 0 3px rgba(26,16,54,0.9), inset 0 0 0 4px rgba(255,113,206,0.35);
  pointer-events: auto; }
#topbar { position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
  padding: 5px 22px 6px; text-align: center; }
#cityname { font-size: 19px; letter-spacing: 0.44em; font-weight: 600;
  text-shadow: 1px 0 rgba(1,205,254,0.8), -1px 0 rgba(255,113,206,0.8); }
#daytime { font-size: 11.5px; letter-spacing: 0.18em; font-style: italic; opacity: 0.85; margin-top: 1px;}
#resources { position: absolute; top: 10px; left: 10px; padding: 7px 14px; font-size: 13px;
  letter-spacing: 0.06em; line-height: 1.75; }
#resources .num { display: inline-block; min-width: 44px; text-align: right; font-variant-numeric: tabular-nums; }
#resources .lbl { opacity: 0.75; font-size: 11px; letter-spacing: 0.14em; }
#quals { position: absolute; top: 10px; right: 10px; padding: 7px 14px; font-size: 11px;
  letter-spacing: 0.12em; line-height: 1.9; text-align: right; }
.qbar { display: inline-block; width: 64px; height: 5px; border: 1px solid #6ff5ea; margin-left: 8px;
  vertical-align: middle; position: relative; }
.qbar i { position: absolute; inset: 0; right: auto; background: #6ff5ea; opacity: 0.75; }
#palette { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 0; }
.tool { padding: 9px 15px 7px; cursor: pointer; text-align: center; border-right: none !important; }
.tool:last-child { border-right: 1px solid #ff71ce !important; }
.tool svg { display: block; margin: 0 auto 3px; width: 30px; height: 26px; }
.tool .tl { font-size: 10.5px; letter-spacing: 0.2em; }
.tool.on { background: #ff71ce; color: #1a1036; }
.tool.on svg * { stroke: #1a1036 !important; fill: none; }
#variants { position: absolute; bottom: 86px; left: 50%; transform: translateX(-50%);
  display: none; }
#variants .var { padding: 7px 16px; cursor: pointer; display: inline-block; }
#variants .var .vl { font-size: 12.5px; letter-spacing: 0.1em; }
#variants .var .vh { font-size: 10.5px; font-style: italic; opacity: 0.7; margin-top: 1px; }
#variants .var.on { background: #ff71ce; color: #1a1036; }
#request { position: absolute; bottom: 12px; left: 12px; max-width: 340px; padding: 10px 16px;
  font-size: 12.5px; font-style: italic; line-height: 1.5; }
#request .who { font-style: normal; font-size: 10.5px; letter-spacing: 0.16em; opacity: 0.7; margin-top: 4px; }
#modes { position: absolute; bottom: 12px; right: 12px; display: flex; }
.mode { padding: 9px 13px 8px; cursor: pointer; font-size: 10.5px; letter-spacing: 0.18em; border-right: none !important; }
.mode:last-child { border-right: 1px solid #ff71ce !important; }
.mode.on { background: #ff71ce; color: #1a1036; }
#undo { position: absolute; top: 156px; left: 10px; padding: 6px 13px; font-size: 10.5px;
  letter-spacing: 0.18em; cursor: pointer; }
#toast { position: absolute; top: 74px; left: 50%; transform: translateX(-50%); padding: 9px 22px;
  font-size: 13px; font-style: italic; opacity: 0; transition: opacity 0.6s; max-width: 480px; text-align: center; }
#sectionctl { position: absolute; top: 120px; right: 10px; width: 190px; padding: 10px 14px; display: none;
  font-size: 11px; letter-spacing: 0.1em; }
#sectionctl input[type=range] { width: 100%; accent-color: #ff71ce; }
#sectionctl .btnrow { display: flex; gap: 6px; margin-top: 6px; }
#sectionctl button, #platectl button { background: none; border: 1px solid #6ff5ea; font-family: inherit;
  font-size: 10px; letter-spacing: 0.14em; padding: 4px 8px; cursor: pointer; color: #f4e9ff; flex: 1; }
#sectionctl button.on, #platectl button.on { background: #ff71ce; color: #1a1036; border-color: #ff71ce; }
#platectl { position: absolute; top: 120px; right: 10px; width: 210px; padding: 10px 14px; display: none;
  font-size: 11px; letter-spacing: 0.1em; }
#platectl input[type=range] { width: 100%; accent-color: #ff71ce; }
#platectl .btnrow { display: flex; gap: 6px; margin: 6px 0; }
#platectl .engrave { width: 100%; padding: 8px; font-size: 11px; margin-top: 4px; }
/* the folio: sixteen slots, never labelled as sixteen — the player
   discovers the count by filling it */
#folio-strip { display: grid; grid-template-columns: repeat(8, 1fr); gap: 3px; margin-top: 9px; }
#folio-strip i { display: block; aspect-ratio: 3/2; border: 1px solid rgba(111,245,234,0.3); font-style: normal; }
#folio-strip i.held { background: #f6e0ef; border-color: rgba(246,224,239,0.75); }
#folio-strip i.last { border-color: #ff71ce; box-shadow: 0 0 5px rgba(255,113,206,0.6); }
#wanderhint { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); padding: 7px 18px;
  font-size: 11px; letter-spacing: 0.15em; display: none; font-style: italic; }
#platemark { position: absolute; inset: 9px; border: 1px solid rgba(255,113,206,0.35); pointer-events: none; }
#platemark::after { content: ''; position: absolute; inset: 3px; border: 1px solid rgba(111,245,234,0.16); }
#labels { position: absolute; inset: 0; overflow: hidden; }
.dlabel { position: absolute; transform: translate(-50%, -50%); font-size: 13px; font-style: italic;
  letter-spacing: 0.22em; color: #b8fff9; text-shadow: 0 0 6px rgba(26,16,54,0.9), 0 0 2px rgba(26,16,54,1);
  white-space: nowrap; transition: opacity 1.2s; }
#frame { position: absolute; inset: 0; display: none; pointer-events: none; }
#frame .bar { position: absolute; background: rgba(14,7,34,0.9); }
#veil { position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column;
  background: linear-gradient(to bottom, #241448 0%, #542a6e 46%, #c05490 78%, #ff9b6a 100%);
  color: #f4e9ff;
  align-items: center; justify-content: center; transition: opacity 1.4s; pointer-events: auto; }
#veil h1 { font-size: 44px; letter-spacing: 0.5em; font-weight: 500; margin: 0 0 6px 0.5em;
  text-shadow: 2px 0 rgba(1,205,254,0.85), -2px 0 rgba(255,113,206,0.85); }
#veil .sub { font-style: italic; font-size: 15px; opacity: 0.8; letter-spacing: 0.06em; }
#veil .rule { width: 220px; border-bottom: 1px solid #ff71ce; margin: 22px 0; position: relative; }
#veil .hint { font-size: 12px; letter-spacing: 0.14em; opacity: 0.65; line-height: 2; text-align: center; }
#veil .begin { margin-top: 26px; border: 1px solid #6ff5ea; padding: 10px 38px; font-size: 13px;
  letter-spacing: 0.3em; cursor: pointer; background: none; font-family: inherit; color: #f4e9ff; }
#veil .begin:hover { background: #ff71ce; color: #1a1036; border-color: #ff71ce; }
#epigraph { position: fixed; inset: 0; z-index: 45; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 12px; pointer-events: auto; cursor: pointer;
  font-family: "Avenir Next", "Futura", "Century Gothic", "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(to bottom, #241448 0%, #542a6e 46%, #c05490 78%, #ff9b6a 100%);
  transition: opacity 1.1s; }
#epigraph div { font-size: 13px; letter-spacing: 0.32em; line-height: 2; text-align: center;
  color: #f4e9ff; max-width: 84vw; opacity: 0; animation: epi-in 1.5s ease 0.25s forwards; }
#epigraph div + div { animation-delay: 1.0s; }
@keyframes epi-in { to { opacity: 0.62; } }

@media (max-width: 1020px) {
  #quals { display: none; }
  .tool { padding: 7px 9px 5px; }
  .tool svg { width: 24px; height: 21px; }
  .tool .tl { font-size: 8.5px; letter-spacing: 0.12em; }
  .mode { padding: 8px 9px 7px; font-size: 9.5px; }
  #request { max-width: 240px; font-size: 11px; padding: 8px 12px; }
  #cityname { font-size: 15px; }
  #resources { font-size: 11.5px; padding: 5px 10px; line-height: 1.6; }
  #resources .num { min-width: 34px; }
  #undo { top: 162px; }
  #variants .var { padding: 6px 10px; }
  #variants .var .vh { display: none; }
}
@media (max-width: 640px) {
  #request { display: none !important; }
  #topbar { display: none; }
  .tool svg { width: 20px; height: 18px; }
  #platemark { inset: 5px; }
  /* stack: modes row sits above the full-width scrollable palette */
  #palette { left: 0; right: 0; transform: none; overflow-x: auto; justify-content: flex-start; }
  #modes { bottom: 64px; right: 50%; transform: translateX(50%); }
  #variants { bottom: 132px; width: 94vw; overflow-x: auto; white-space: nowrap; }
}
`,
  iv = {
    anchor: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M11 24 V6 h8 v18 M8 24 h14 M9 6 h12 M11 3 h8 v3 h-8 z"/></g></svg>`,
    span: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M2 8 h26 M2 5 h26 M4 8 v4 a4 4 0 0 0 8 0 v-4 M12 8 v4 a4 4 0 0 0 8 0 v-4 M20 8 v4 a4 4 0 0 0 8 0 v-4 M4 12 v12 M28 12 v12"/></g></svg>`,
    rise: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M2 24 h7 v-5 h7 v-5 h7 v-5 h5 M2 24 v-2 h5 v-5 h7 v-5 h7 v-5 h7"/></g></svg>`,
    vault: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M3 24 V12 a12 9 0 0 1 24 0 V24 M8 24 V14 a7 6 0 0 1 14 0 V24"/></g></svg>`,
    carve: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M3 3 h24 v21 h-24 z M11 24 V14 a4 4 0 0 1 8 0 V24"/>
    <path d="M6 6 l4 4 M24 6 l-4 4" stroke-dasharray="1.5 1.5"/></g></svg>`,
    emb: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M11 24 h8 M12 21 h6 M13 21 V13 M17 21 V13 M15 13 m-3 0 a3 4.5 0 1 1 6 0 a3 4.5 0 1 1 -6 0 M15 5 v-2"/></g></svg>`,
    designate: `<svg viewBox="0 0 30 26"><g stroke="#f4e9ff" stroke-width="1.4" fill="none">
    <path d="M5 21 c4 -3 7 1 10 -1 s6 -4 10 -2 M5 21 c0 2 2 3 4 3 s16 -1 16 -4" />
    <path d="M20 4 l4 4 -10 10 -5 1 1 -5 z"/></g></svg>`,
  };
class Hud {
  constructor(t) {
    defineField(this, "cb");
    defineField(this, "root");
    defineField(this, "toolBtns", new Map());
    defineField(this, "modeBtns", new Map());
    defineField(this, "varRow");
    defineField(this, "toastEl");
    defineField(this, "requestEl");
    defineField(this, "labelsEl");
    defineField(this, "sectionCtl");
    defineField(this, "plateCtl");
    defineField(this, "wanderHint");
    defineField(this, "frameEl");
    defineField(this, "veil");
    defineField(this, "resStone");
    defineField(this, "resTimber");
    defineField(this, "resFavor");
    defineField(this, "resPop");
    defineField(this, "dayEl");
    defineField(this, "qualBars", new Map());
    defineField(this, "toastTimer", 0);
    this.cb = t;
    const e = document.createElement("style");
    ((e.textContent = nv),
      document.head.appendChild(e),
      (this.root = document.createElement("div")),
      (this.root.id = "hud"),
      document.body.appendChild(this.root),
      this.build());
  }
  build() {
    const t = this.root;
    t.innerHTML = `
      <div id="platemark"></div>
      <div id="labels"></div>
      <div id="topbar" class="panel"><div id="cityname">CAPRICCIO</div><div id="daytime">day 001 · morning</div></div>
      <div id="resources" class="panel">
        <div><span class="num" id="r-stone">0</span> <span class="lbl">STONE</span></div>
        <div><span class="num" id="r-timber">0</span> <span class="lbl">TIMBER</span></div>
        <div><span class="num" id="r-favor">0</span> <span class="lbl">CLEARANCE</span></div>
        <div><span class="num" id="r-pop">0</span> <span class="lbl">SOULS</span></div>
        <div id="folio-line" title="No costs, no span limits — build freely."
          style="margin-top:3px; font-size:10px; letter-spacing:0.16em; opacity:0.6; cursor:pointer; font-style:italic">✦ play without resources</div>
        <div id="anew-line" title="Erase this city and begin again."
          style="margin-top:2px; font-size:10px; letter-spacing:0.16em; opacity:0.5; cursor:pointer; font-style:italic">⟳ begin anew</div>
      </div>
      <div id="undo" class="panel">UNDO</div>
      <div id="quals" class="panel"></div>
      <div id="toast" class="panel"></div>
      <div id="request" class="panel" style="display:none"></div>
      <div id="variants" class="panel"></div>
      <div id="palette"></div>
      <div id="modes"></div>
      <div id="sectionctl" class="panel">
        <div style="letter-spacing:0.2em; margin-bottom:4px">SECTION</div>
        <input type="range" id="sec-off" min="-150" max="150" value="0" step="1"/>
        <div class="btnrow">
          <button id="sec-x" class="on">E–W</button><button id="sec-z">N–S</button><button id="sec-flip">FLIP</button>
        </div>
      </div>
      <div id="platectl" class="panel">
        <div style="letter-spacing:0.2em; margin-bottom:4px">PLATE</div>
        <div class="btnrow"><button data-a="3:2" class="on">3:2</button><button data-a="4:5">4:5</button><button data-a="21:9">21:9</button></div>
        <div>LENS <input type="range" id="plate-fov" min="22" max="70" value="42"/></div>
        <div>HOUR <input type="range" id="plate-hour" min="5.6" max="20.4" value="16.2" step="0.1"/></div>
        <button class="engrave" id="plate-go">ENGRAVE THIS PLATE</button>
        <div id="folio-strip"></div>
      </div>
      <div id="wanderhint" class="panel">W A S D walk · SHIFT hurry · ESC return</div>
      <div id="frame"><div class="bar" id="fb-t"></div><div class="bar" id="fb-b"></div><div class="bar" id="fb-l"></div><div class="bar" id="fb-r"></div></div>
      <div id="veil">
        <h1>CAPRICCIO</h1>
        <div class="sub">a city of arches, grown inside its own monuments</div>
        <div class="rule"></div>
        <div class="hint">
          RAISE the great architecture — piers, spans, stairs, vaults.<br/>
          The citizens will find their own uses for what you leave them.<br/>
          Bring a way, and water, to the high terrace.<br/>
          What you engrave is what remains.
        </div>
        <button class="begin">BEGIN</button>
      </div>
    `;
    const e = t.querySelector("#palette"),
      n = [
        ["anchor", "ESTABLISH"],
        ["span", "SPAN"],
        ["rise", "RISE"],
        ["vault", "VAULT"],
        ["carve", "CARVE"],
        ["emb", "FURNISH"],
        ["designate", "INVITE"],
      ];
    for (const [m, _] of n) {
      const g = document.createElement("div");
      ((g.className = "tool panel"),
        (g.innerHTML = `${iv[m]}<div class="tl">${_}</div>`),
        (g.onclick = () => this.pickTool(m)),
        e.appendChild(g),
        this.toolBtns.set(m, g));
    }
    const s = t.querySelector("#modes");
    for (const [m, _] of [
      ["build", "BUILD"],
      ["section", "SECTION"],
      ["wander", "WANDER"],
      ["plate", "PLATE"],
    ]) {
      const g = document.createElement("div");
      ((g.className = "mode panel" + (m === "build" ? " on" : "")),
        (g.textContent = _),
        (g.onclick = () => this.pickMode(m)),
        s.appendChild(g),
        this.modeBtns.set(m, g));
    }
    ((this.varRow = t.querySelector("#variants")),
      (this.toastEl = t.querySelector("#toast")),
      (this.requestEl = t.querySelector("#request")),
      (this.labelsEl = t.querySelector("#labels")),
      (this.sectionCtl = t.querySelector("#sectionctl")),
      (this.plateCtl = t.querySelector("#platectl")),
      (this.wanderHint = t.querySelector("#wanderhint")),
      (this.frameEl = t.querySelector("#frame")),
      (this.veil = t.querySelector("#veil")),
      (this.resStone = t.querySelector("#r-stone")),
      (this.resTimber = t.querySelector("#r-timber")),
      (this.resFavor = t.querySelector("#r-favor")),
      (this.resPop = t.querySelector("#r-pop")),
      (this.dayEl = t.querySelector("#daytime")));
    const r = t.querySelector("#quals");
    for (const m of ["ACCESS", "SHELTER", "LIGHT", "BELONGING", "GRANDEUR"]) {
      const _ = document.createElement("div");
      ((_.innerHTML = `${m}<span class="qbar"><i style="width:30%"></i></span>`),
        r.appendChild(_),
        this.qualBars.set(m, _.querySelector("i")));
    }
    ((t.querySelector("#undo").onclick = () => this.cb.onUndo()),
      (t.querySelector("#folio-line").onclick = () => this.cb.onFolio()));
    const o = t.querySelector("#anew-line");
    let a = 0;
    o.onclick = () => {
      const m = Date.now();
      if (m - a < 5e3) {
        this.cb.onAnew();
        return;
      }
      ((a = m),
        (o.textContent = "⟳ click again to erase the city"),
        setTimeout(() => {
          ((o.textContent = "⟳ begin anew"), (a = 0));
        }, 5e3));
    };
    const c = t.querySelector("#sec-off");
    c.oninput = () => this.cb.onSection({ offset: Number(c.value) });
    const l = t.querySelector("#sec-x"),
      h = t.querySelector("#sec-z");
    ((l.onclick = () => {
      (l.classList.add("on"),
        h.classList.remove("on"),
        this.cb.onSection({ axis: "x" }));
    }),
      (h.onclick = () => {
        (h.classList.add("on"),
          l.classList.remove("on"),
          this.cb.onSection({ axis: "z" }));
      }));
    let u = 1;
    t.querySelector("#sec-flip").onclick = () => {
      ((u *= -1), this.cb.onSection({ flip: u }));
    };
    for (const m of this.plateCtl.querySelectorAll("button[data-a]"))
      m.onclick = () => {
        (this.plateCtl
          .querySelectorAll("button[data-a]")
          .forEach((_) => _.classList.remove("on")),
          m.classList.add("on"),
          this.cb.onPlate({ aspect: m.dataset.a }));
      };
    const d = t.querySelector("#plate-fov");
    d.oninput = () => this.cb.onPlate({ fov: Number(d.value) });
    const f = t.querySelector("#plate-hour");
    ((f.oninput = () => this.cb.onPlate({ hour: Number(f.value) })),
      (t.querySelector("#plate-go").onclick = () => this.cb.onEngrave()),
      (t.querySelector("#veil .begin").onclick = () => {
        ((this.veil.style.opacity = "0"),
          setTimeout(() => {
            this.veil.style.display = "none";
          }, 1500),
          this.cb.onBegin());
      }));
  }
  pickTool(t) {
    const e = [...this.toolBtns.entries()].find(([, n]) =>
      n.classList.contains("on"),
    )?.[0];
    for (const n of this.toolBtns.values()) n.classList.remove("on");
    if (e === t || t === null) {
      ((this.varRow.style.display = "none"), this.cb.onTool(null, ""));
      return;
    }
    (this.toolBtns.get(t).classList.add("on"),
      this.showVariants(t),
      this.cb.onTool(t, BUILD_CATALOGUE[t][0].key));
  }
  showVariants(t) {
    ((this.varRow.style.display = "block"),
      (this.varRow.innerHTML = ""),
      BUILD_CATALOGUE[t].forEach((e, n) => {
        const s = document.createElement("div");
        ((s.className = "var" + (n === 0 ? " on" : "")),
          (s.innerHTML = `<div class="vl">${e.label}</div><div class="vh">${e.hint}</div>`),
          (s.onclick = () => {
            (this.varRow
              .querySelectorAll(".var")
              .forEach((r) => r.classList.remove("on")),
              s.classList.add("on"),
              this.cb.onTool(t, e.key));
          }),
          this.varRow.appendChild(s));
      }));
  }
  pickMode(t) {
    for (const n of this.modeBtns.values()) n.classList.remove("on");
    (this.modeBtns.get(t).classList.add("on"),
      (this.sectionCtl.style.display = t === "section" ? "block" : "none"),
      (this.plateCtl.style.display = t === "plate" ? "block" : "none"),
      (this.frameEl.style.display = t === "plate" ? "block" : "none"));
    const e = t === "build" || t === "section";
    if (
      ((this.root.querySelector("#palette").style.display = e
        ? "flex"
        : "none"),
      !e)
    ) {
      this.varRow.style.display = "none";
      for (const n of this.toolBtns.values()) n.classList.remove("on");
    }
    this.cb.onMode(t);
  }
  toast(t, e = 4200) {
    ((this.toastEl.textContent = t),
      (this.toastEl.style.opacity = "1"),
      clearTimeout(this.toastTimer),
      (this.toastTimer = window.setTimeout(() => {
        this.toastEl.style.opacity = "0";
      }, e)));
  }
  setRequest(t) {
    if (!t) {
      this.requestEl.style.display = "none";
      return;
    }
    this.requestEl.style.display = "block";
    const e = t.match(/^(.*?)(—[^—]*)$/s);
    this.requestEl.innerHTML = e
      ? `${e[1].trim()}<div class="who">${e[2].trim()}</div>`
      : t;
  }
  setWanderHint(t) {
    this.wanderHint.style.display = t ? "block" : "none";
  }
  updateResources(t) {
    (gameState.folio
      ? ((this.resStone.textContent = "∞"), (this.resTimber.textContent = "∞"))
      : ((this.resStone.textContent = String(Math.floor(gameState.res.stone))),
        (this.resTimber.textContent = String(Math.floor(gameState.res.timber)))),
      (this.resFavor.textContent = String(Math.floor(gameState.res.favor))),
      (this.resPop.textContent = String(t)));
    const e = this.root.querySelector("#folio-line");
    e &&
      (e.textContent = gameState.folio
        ? "✦ resources are off — restore them"
        : "✦ play without resources");
  }
  updateClock(t, e) {
    const n = [
        "night",
        "dawn",
        "morning",
        "midday",
        "afternoon",
        "evening",
        "dusk",
      ],
      s =
        e < 6
          ? 0
          : e < 7.5
            ? 1
            : e < 11.5
              ? 2
              : e < 14
                ? 3
                : e < 17.5
                  ? 4
                  : e < 19.5
                    ? 5
                    : 6;
    this.dayEl.textContent = `day ${String(t).padStart(3, "0")} · ${n[s]}`;
  }
  updateQuals(t) {
    for (const [e, n] of Object.entries(t)) {
      const s = this.qualBars.get(e);
      s && (s.style.width = `${Math.round(n * 100)}%`);
    }
  }
  syncSection(t, e) {
    const n = this.root.querySelector("#sec-off");
    n && (n.value = String(e));
    const s = this.root.querySelector("#sec-x"),
      r = this.root.querySelector("#sec-z");
    s &&
      r &&
      (s.classList.toggle("on", t === "x"),
      r.classList.toggle("on", t === "z"));
  }
  // The folio holds what the save holds: the last sixteen plates. Filled
  // slots read as prints in a case; hover names each one. No caption, no
  // count — the strip is discovered by filling it.
  updateFolio(t) {
    const e = this.root.querySelector("#folio-strip");
    if (e) {
      e.innerHTML = "";
      for (let n = 0; n < 16; n++) {
        const s = document.createElement("i"),
          r = t[n];
        (r &&
          (s.classList.add("held"),
          (s.title = `Tav. ${tv(r.n)} — ${r.caption}`),
          n === t.length - 1 && s.classList.add("last")),
          e.appendChild(s));
      }
    }
  }
  showPlate(t, e /* , evicted */) {
    const n = document.createElement("div");
    n.style.cssText = `position:fixed;inset:0;z-index:60;background:rgba(14,7,34,0.82);
      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;pointer-events:auto`;
    const s = document.createElement("img");
    ((s.src = t),
      (s.style.cssText =
        "max-width:88vw;max-height:78vh;box-shadow:0 8px 40px rgba(0,0,0,0.5)"),
      n.appendChild(s));
    const r = document.createElement("div");
    r.style.cssText = "display:flex;gap:10px";
    const o = (a) => {
      const c = document.createElement("button");
      return (
        (c.textContent = a),
        (c.style.cssText = `background:#1a1036;border:1px solid #ff71ce;color:#f4e9ff;
        font-family:inherit;font-size:11px;letter-spacing:0.22em;padding:9px 22px;cursor:pointer`),
        r.appendChild(c),
        c
      );
    };
    ((o("SAVE PLATE").onclick = () => {
      const a = document.createElement("a");
      ((a.href = t), (a.download = e), a.click());
    }),
      (o("CLOSE").onclick = () => n.remove()),
      n.appendChild(r));
    // the seventeenth plate pushes the first out. Say which one, and
    // nothing else — the event is the explanation.
    if (arguments[2]) {
      const a = arguments[2],
        c = document.createElement("div");
      ((c.style.cssText =
        "font-size:11px;font-style:italic;letter-spacing:0.14em;opacity:0.72;color:#f4e9ff"),
        (c.textContent = `Tav. ${tv(a.n)} — ${a.caption} — leaves the record`),
        n.appendChild(c));
    }
    ((n.onclick = (a) => {
      a.target === n && n.remove();
    }),
      this.root.appendChild(n));
  }
  updateFrame(t, e, n) {
    const s = e / n;
    let r = 0,
      o = 0;
    (s > t ? (r = (e - n * t) / 2) : (o = (n - e / t) / 2),
      (this.root.querySelector("#fb-t").style.cssText =
        `top:0;left:0;right:0;height:${o}px`),
      (this.root.querySelector("#fb-b").style.cssText =
        `bottom:0;left:0;right:0;height:${o}px`),
      (this.root.querySelector("#fb-l").style.cssText =
        `top:0;bottom:0;left:0;width:${r}px`),
      (this.root.querySelector("#fb-r").style.cssText =
        `top:0;bottom:0;right:0;width:${r}px`));
  }
  updateLabels(t, e, n) {
    if (((this.labelsEl.innerHTML = ""), !n)) return;
    const s = new Vector3();
    for (const r of t) {
      if (
        (s.set(r.x, r.y, r.z).project(e),
        s.z > 1 || s.x < -0.95 || s.x > 0.95 || s.y < -0.95 || s.y > 0.95)
      )
        continue;
      const o = document.createElement("div");
      ((o.className = "dlabel"),
        (o.textContent = r.name),
        (o.style.left = `${(s.x * 0.5 + 0.5) * 100}%`),
        (o.style.top = `${(-s.y * 0.5 + 0.5) * 100}%`));
      const a = e.position.distanceTo(new Vector3(r.x, r.y, r.z));
      ((o.style.opacity = String(Math.max(0, Math.min(0.85, 1.6 - a / 220)))),
        this.labelsEl.appendChild(o));
    }
  }
}

// --- generated exports ---
export { Hud, iv, nv };
