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
export function jackpot() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => { tone(f, t + i * 0.09, 0.22, "triangle", 0.22); tone(f * 2, t + i * 0.09, 0.18, "sine", 0.06); });
  tone(1047, t + 0.4, 0.6, "triangle", 0.2); tone(1319, t + 0.4, 0.6, "sine", 0.12); tone(1568, t + 0.4, 0.6, "sine", 0.1);
}

/** Soft "womp" for a miss. */
export function miss() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  tone(330, t, 0.25, "triangle", 0.18, 260); tone(262, t + 0.22, 0.4, "triangle", 0.16, 196);
}

/** One ratchet tick of a spinning reel (call repeatedly while reels spin). */
export function reelTick() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  tone(1400 + Math.random() * 300, t, 0.025, "square", 0.05); noise(t, 0.02, 0.08, 2600);
}

/** Original triumphant victory fanfare for the winner announcement (~4s). */
export function victory() {
  const c = ac(); if (!c) return; const t = c.currentTime;
  const notes: [number, number, number][] = [
    [392, 0, .18], [392, .2, .18], [392, .4, .18], [523, .6, .7],
    [466, 1.35, .18], [523, 1.55, .18], [587, 1.75, .5], [659, 2.3, .25], [784, 2.6, 1.3],
  ];
  notes.forEach(([f, d, len]) => { tone(f, t + d, len, "sawtooth", 0.09); tone(f, t + d, len, "triangle", 0.18); tone(f * 2, t + d, len * .8, "sine", 0.05); });
  // chord swell under the last note
  [392, 494, 587].forEach((f) => tone(f, t + 2.6, 1.4, "triangle", 0.1));
  // cymbal shimmer + coin sparkle
  noise(t + 2.6, 1.2, 0.18, 7000);
  for (let i = 0; i < 12; i++) tone(2600 + Math.random() * 1800, t + 2.7 + i * 0.09, 0.14, "sine", 0.07);
}
