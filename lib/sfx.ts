"use client";
/**
 * Tiny synthesized sound effects (Web Audio, no files): lever clunk, spinning reels,
 * reel stops, coin clinks and a jackpot fanfare. Muting is remembered per browser.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;
try { muted = typeof localStorage !== "undefined" && localStorage.getItem("tok-muted") === "1"; } catch {}

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 0.55;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

// Browsers only allow sound after a tap/click: unlock on the first one.
if (typeof window !== "undefined") {
  const unlock = () => { ac(); window.removeEventListener("pointerdown", unlock); window.removeEventListener("keydown", unlock); };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
}

export function isMuted() { return muted; }
export function setMuted(m: boolean) {
  muted = m;
  try { localStorage.setItem("tok-muted", m ? "1" : "0"); } catch {}
  if (master && ctx) master.gain.setTargetAtTime(m ? 0 : 0.55, ctx.currentTime, 0.02);
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", vol = 0.3, slideTo?: number) {
  const c = ac(); if (!c || !master || muted) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, start);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(vol, start + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g); g.connect(master); o.start(start); o.stop(start + dur + 0.02);
}

function noise(start: number, dur: number, vol = 0.25, freq = 800) {
  const c = ac(); if (!c || !master || muted) return;
  const buf = c.createBuffer(1, Math.max(1, Math.floor(c.sampleRate * dur)), c.sampleRate);
  const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
  const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
  src.buffer = buf; f.type = "bandpass"; f.frequency.value = freq; f.Q.value = 1.2; g.gain.value = vol;
  src.connect(f); f.connect(g); g.connect(master); src.start(start);
}

/** Mechanical clunk + ratchet as the lever is pulled. */
export function leverPull() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  for (let i = 0; i < 5; i++) noise(t + i * 0.045, 0.04, 0.35, 1800 - i * 150);
  tone(110, t + 0.22, 0.18, "triangle", 0.5, 55);
  noise(t + 0.22, 0.12, 0.5, 300);
}

/** Rapid reel ticks for `ms` milliseconds, slowing toward the end. */
export function reelSpin(ms: number) {
  const c = ac(); if (!c) return; const t0 = c.currentTime + 0.3; let t = 0, gap = 0.045;
  while (t < ms / 1000 - 0.3) { tone(1400 + Math.random() * 300, t0 + t, 0.025, "square", 0.05); noise(t0 + t, 0.02, 0.08, 2600); t += gap; if (t > ms / 1000 * 0.65) gap *= 1.08; }
}

/** Three reels thunking to a stop, then a bright ding. */
export function reelStop() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  [0, 0.14, 0.28].forEach((d) => { noise(t + d, 0.07, 0.4, 500); tone(180, t + d, 0.09, "triangle", 0.25, 120); });
  tone(1320, t + 0.42, 0.5, "sine", 0.22); tone(1980, t + 0.42, 0.45, "sine", 0.12);
}

/** Cascading coin clinks, like a payout tray. */
export function coinShower(count = 16, spreadMs = 1400) {
  const c = ac(); if (!c) return; const t0 = c.currentTime;
  for (let i = 0; i < count; i++) {
    const t = t0 + (i / count) * (spreadMs / 1000) + Math.random() * 0.04, f = 2400 + Math.random() * 1600;
    tone(f, t, 0.12, "sine", 0.12); tone(f * 1.5, t + 0.005, 0.09, "sine", 0.06); noise(t, 0.03, 0.08, 5000);
  }
}

/** Short jackpot fanfare for a right answer. */

/** Soft "womp" for a miss. */
export function miss() { /* no sound on a miss */ }

/** One ratchet tick of a spinning reel (call repeatedly while reels spin). */
export function reelTick() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  tone(1400 + Math.random() * 300, t, 0.025, "square", 0.05); noise(t, 0.02, 0.08, 2600);
}

/** Original triumphant victory fanfare for the winner announcement (~4s). */

/* ================= Music engine: brass, bass, bells, drums + reverb ================= */
let verb: ConvolverNode | null = null, verbIn: GainNode | null = null;
function bus(): { dry: AudioNode; wet: AudioNode } | null {
  const c = ac(); if (!c || !master) return null;
  if (!verb) {
    verb = c.createConvolver();
    const len = Math.floor(c.sampleRate * 2.2), imp = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = imp.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
    verb.buffer = imp; verbIn = c.createGain(); verbIn.gain.value = 0.28; verbIn.connect(verb); verb.connect(master);
  }
  return { dry: master, wet: verbIn! };
}
function out(node: AudioNode) { const b = bus(); if (!b) return; node.connect(b.dry); node.connect(b.wet); }

/** Punchy brass section note: 3 detuned saws through a swelling low-pass filter. */
function brass(freq: number, t: number, dur: number, vol = 0.09) {
  const c = ac(); if (!c || muted) return;
  const f = c.createBiquadFilter(), g = c.createGain();
  f.type = "lowpass"; f.Q.value = 2;
  f.frequency.setValueAtTime(500, t); f.frequency.exponentialRampToValueAtTime(3800, t + 0.06); f.frequency.exponentialRampToValueAtTime(1600, t + Math.max(0.12, dur));
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.03);
  g.gain.setValueAtTime(vol * 0.8, t + Math.max(0.05, dur - 0.06)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.18);
  f.connect(g); out(g);
  [-7, 0, 7].forEach((cents) => { const o = c.createOscillator(); o.type = "sawtooth"; o.frequency.value = freq; o.detune.value = cents; o.connect(f); o.start(t); o.stop(t + dur + 0.25); });
}
function chord(freqs: number[], t: number, dur: number, vol = 0.05) { freqs.forEach((f) => brass(f, t, dur, vol)); }
function bass(freq: number, t: number, dur: number) {
  const c = ac(); if (!c || muted) return;
  const o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
  o.type = "sawtooth"; o.frequency.value = freq; f.type = "lowpass"; f.frequency.value = 420;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.22, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(f); f.connect(g); g.connect(master!); o.start(t); o.stop(t + dur + 0.05);
}
function bell(freq: number, t: number, vol = 0.08) {
  const c = ac(); if (!c || muted) return;
  [[1, 1], [2.76, 0.4], [5.4, 0.15]].forEach(([m, v]) => {
    const o = c.createOscillator(), g = c.createGain(); o.type = "sine"; o.frequency.value = freq * m;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol * v, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1 / m);
    o.connect(g); out(g); o.start(t); o.stop(t + 1.2);
  });
}
function kick(t: number) {
  const c = ac(); if (!c || muted || !master) return;
  const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.14);
  g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22); o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.25);
}
function snare(t: number, vol = 0.28) { noise(t, 0.16, vol, 1900); tone(190, t, 0.08, "triangle", vol * 0.5); }
function hat(t: number) { noise(t, 0.035, 0.07, 9000); }
function crash(t: number) { noise(t, 1.6, 0.16, 6500); noise(t, 0.9, 0.1, 3500); }

const N = (n: string) => { const m: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }; const note = n.slice(0, -1), oct = +n.slice(-1); const semi = m[note[0]] + (note[1] === "#" ? 1 : note[1] === "b" ? -1 : 0); return 440 * Math.pow(2, (semi + (oct - 4) * 12 - 9) / 12); };

/** Short original "win" sting for a right answer (~1.3s). */
export function jackpot() {
  const c = ac(); if (!c) return; const t = c.currentTime + 0.02, b = 0.11;
  ["G4", "C5", "E5"].forEach((n, i) => brass(N(n), t + i * b, 0.1, 0.07));
  chord([N("C5"), N("E5"), N("G5"), N("C6")], t + 3 * b, 0.55, 0.045);
  bass(N("C2"), t + 3 * b, 0.5); kick(t + 3 * b); snare(t + 3 * b, 0.2);
  [N("C7"), N("G6"), N("E7")].forEach((f, i) => bell(f, t + 3 * b + 0.12 + i * 0.09, 0.05));
}

/** Original big-band victory fanfare for the winner (~6.5s, 132 bpm, C major). */
export function victory() {
  const c = ac(); if (!c) return; const t0 = c.currentTime + 0.05, q = 60 / 132, e = q / 2, s16 = q / 4;
  // drum pickup
  [0, 1, 2, 3].forEach((i) => snare(t0 + i * s16, 0.12 + i * 0.05));
  const T = t0 + q; // downbeat of bar 1
  // melody (lead brass) — [note, start in beats, length in beats]
  const mel: [string, number, number][] = [
    ["E5", 0, 0.5], ["G5", 0.5, 0.5], ["C6", 1, 1.5], ["B5", 2.5, 0.5], ["A5", 3, 0.5], ["G5", 3.5, 0.5],
    ["F5", 4, 0.5], ["A5", 4.5, 0.5], ["D6", 5, 1.5], ["C6", 6.5, 0.5], ["B5", 7, 0.5], ["D6", 7.5, 0.5],
    ["E6", 8, 0.75], ["D6", 8.75, 0.25], ["C6", 9, 0.5], ["G5", 9.5, 0.5], ["A5", 10, 0.5], ["B5", 10.5, 0.5],
    ["C6", 11, 3],
  ];
  mel.forEach(([n, st, len]) => { brass(N(n), T + st * q, len * q * 0.95, 0.08); brass(N(n) / 2, T + st * q, len * q * 0.95, 0.035); });
  // harmony stabs + bass per half bar
  const prog: [string[], string, number][] = [
    [["C4", "E4", "G4"], "C2", 0], [["C4", "E4", "G4"], "C2", 2], [["F4", "A4", "C5"], "F2", 4], [["D4", "F4", "A4"], "D2", 6],
    [["C4", "E4", "G4"], "C2", 8], [["F4", "G4", "B4"], "G2", 10], [["C4", "E4", "G4", "C5"], "C2", 11],
  ];
  prog.forEach(([ch, bn, st], i) => { const len = i === prog.length - 1 ? 3 : 2; chord(ch.map(N), T + st * q, len * q * 0.9, 0.028); bass(N(bn), T + st * q, q * 0.9); bass(N(bn), T + (st + 1) * q, q * 0.9); });
  // drums: kick on 1 & 3, snare on 2 & 4, hats on 8ths, fill into the last chord
  for (let b = 0; b < 11; b++) { const tb = T + b * q; if (b % 2 === 0) kick(tb); else snare(tb, 0.22); hat(tb); hat(tb + e); }
  for (let i = 0; i < 8; i++) snare(T + 10 * q + i * (q / 8), 0.1 + i * 0.03);
  kick(T + 11 * q); crash(T + 11 * q);
  // sparkle bells on the final chord + coin payout
  for (let i = 0; i < 10; i++) bell(N(["C7", "E7", "G7"][i % 3]), T + 11 * q + 0.1 + i * 0.12, 0.035);
  setTimeout(() => coinShower(40, 2600), Math.round((T + 11 * q - c.currentTime) * 1000));
}
