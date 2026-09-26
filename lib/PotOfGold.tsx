"use client";
import {useEffect,useRef,useState} from "react";
import {coinShower,jackpot} from "./sfx";

/**
 * Pot of gold beside the score. When `count` goes up (a right answer), a stream of
 * coins arcs from the middle slot reel up into the pot with a sparkle trail and burst.
 * If the header pot is scrolled out of view, a floating pot pins to the top corner so
 * the coins always land somewhere visible.
 */
export default function PotOfGold({count}:{count:number}){
 const potRef=useRef<HTMLDivElement>(null),floatRef=useRef<HTMLDivElement>(null),prev=useRef(count);
 const[offscreen,setOffscreen]=useState(false),[flash,setFlash]=useState(0);

 useEffect(()=>{const el=potRef.current;if(!el)return;const io=new IntersectionObserver(([e])=>setOffscreen(!e.isIntersecting),{threshold:.6});io.observe(el);return()=>io.disconnect()},[]);

 useEffect(()=>{
  if(count<=prev.current){prev.current=count;return}
  prev.current=count;
  const target=(offscreen?floatRef.current:potRef.current)||potRef.current;
  const src=document.querySelector(".landmark-tile:nth-child(2) .reel-window")||document.querySelector(".slot-assembly");
  if(!target||!src)return;
  const done=()=>setFlash(f=>f+1);
  jackpot();setTimeout(()=>coinShower(18,1500),250);
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){done();return}
  const a=src.getBoundingClientRect(),b=target.getBoundingClientRect();
  const sx=a.left+a.width/2,sy=a.top+a.height/2,tx=b.left+b.width/2,ty=b.top+b.height*.35,dx=tx-sx,dy=ty-sy;
  const layer=document.createElement("div");layer.className="coin-layer";document.body.appendChild(layer);
  const N=16;let last=0;
  for(let i=0;i<N;i++){
   const coin=document.createElement("div");coin.className="flying-coin";coin.style.left=`${sx}px`;coin.style.top=`${sy}px`;layer.appendChild(coin);
   const lift=140+Math.random()*120,spread=(Math.random()-.5)*220,dur=1050+Math.random()*450,delay=i*65;last=Math.max(last,dur+delay);
   coin.animate([
    {transform:"translate(-50%,-50%) scale(.3) rotateY(0deg)",opacity:0},
    {transform:`translate(calc(-50% + ${spread*.35}px),calc(-50% - ${lift*.6}px)) scale(1.5) rotateY(360deg)`,opacity:1,offset:.25},
    {transform:`translate(calc(-50% + ${dx*.55+spread}px),calc(-50% + ${dy*.55-lift}px)) scale(1.25) rotateY(900deg)`,opacity:1,offset:.6},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.55) rotateY(1440deg)`,opacity:.9}
   ],{duration:dur,delay,easing:"cubic-bezier(.33,.1,.35,1)",fill:"forwards"});
   // sparkle trail
   for(let t=1;t<=3;t++){const s=document.createElement("span");s.className="coin-sparkle";s.textContent="✦";s.style.left=`${sx}px`;s.style.top=`${sy}px`;layer.appendChild(s);
    s.animate([{transform:"translate(-50%,-50%) scale(0)",opacity:0},{transform:`translate(calc(-50% + ${dx*.55*t/3+spread*.8}px),calc(-50% + ${dy*.55*t/3-lift*.9}px)) scale(1.3)`,opacity:1,offset:.5},{transform:`translate(calc(-50% + ${dx*.55*t/3+spread}px),calc(-50% + ${dy*.55*t/3-lift}px)) scale(0)`,opacity:0}],{duration:700,delay:delay+t*120,easing:"ease-out",fill:"forwards"})}
  }
  // burst of sparkles when the coins land
  const burstAt=last-250;
  for(let i=0;i<18;i++){const s=document.createElement("span");s.className="coin-sparkle burst";s.textContent=i%3?"✦":"✨";s.style.left=`${tx}px`;s.style.top=`${ty}px`;layer.appendChild(s);
   const ang=(i/18)*Math.PI*2,r=60+Math.random()*50;
   s.animate([{transform:"translate(-50%,-50%) scale(.2)",opacity:0},{transform:"translate(-50%,-50%) scale(1.4)",opacity:1,offset:.15},{transform:`translate(calc(-50% + ${Math.cos(ang)*r}px),calc(-50% + ${Math.sin(ang)*r}px)) scale(0)`,opacity:0}],{duration:900,delay:burstAt,easing:"cubic-bezier(.2,.8,.3,1)",fill:"forwards"})}
  const t1=setTimeout(done,burstAt),t2=setTimeout(()=>layer.remove(),burstAt+1100);
  return()=>{clearTimeout(t1);clearTimeout(t2);layer.remove()};
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[count]);

 const pot=(ref:React.Ref<HTMLDivElement>,extra="")=><div ref={ref} className={`pot ${extra} ${flash?"is-catching":""}`} key={`pot-${extra}-${flash}`}>
  <svg viewBox="0 0 120 112" aria-hidden="true">
   <defs>
    <radialGradient id="pgCoin" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff6c4"/><stop offset=".45" stopColor="#ffd23f"/><stop offset="1" stopColor="#c68a12"/></radialGradient>
    <radialGradient id="pgIron" cx=".32" cy=".3" r=".85"><stop offset="0" stopColor="#5b5668"/><stop offset=".35" stopColor="#2c2934"/><stop offset=".8" stopColor="#141219"/><stop offset="1" stopColor="#07060a"/></radialGradient>
    <linearGradient id="pgRim" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6d6878"/><stop offset=".5" stopColor="#2a2731"/><stop offset="1" stopColor="#111016"/></linearGradient>
    <linearGradient id="pgBand" x1="0" x2="1"><stop offset="0" stopColor="#8a5a10"/><stop offset=".3" stopColor="#ffe07a"/><stop offset=".55" stopColor="#f2b72e"/><stop offset="1" stopColor="#7a4d0f"/></linearGradient>
    <radialGradient id="pgGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#ffe27a" stopOpacity=".9"/><stop offset="1" stopColor="#ffe27a" stopOpacity="0"/></radialGradient>
   </defs>
   <ellipse cx="60" cy="30" rx="46" ry="22" fill="url(#pgGlow)"/>
   <g transform="translate(0 14)">
    <ellipse cx="60" cy="31" rx="34" ry="8" fill="#b67a10"/>
    <g key="0"><ellipse cx="38" cy="32.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="38" cy="30" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="38" cy="30" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="35.4" cy="28.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="1"><ellipse cx="50" cy="28.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="50" cy="26" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="50" cy="26" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="47.4" cy="24.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="2"><ellipse cx="62" cy="26.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="62" cy="24" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="62" cy="24" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="59.4" cy="22.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="3"><ellipse cx="74" cy="29.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="74" cy="27" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="74" cy="27" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="71.4" cy="25.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="4"><ellipse cx="86" cy="33.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="86" cy="31" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="86" cy="31" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="83.4" cy="29.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="5"><ellipse cx="44" cy="23.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="44" cy="21" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="44" cy="21" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="41.4" cy="19.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="6"><ellipse cx="57" cy="19.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="57" cy="17" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="57" cy="17" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="54.4" cy="15.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="7"><ellipse cx="70" cy="20.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="70" cy="18" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="70" cy="18" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="67.4" cy="16.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="8"><ellipse cx="81" cy="24.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="81" cy="22" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="81" cy="22" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="78.4" cy="20.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="9"><ellipse cx="51" cy="13.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="51" cy="11" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="51" cy="11" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="48.4" cy="9.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="10"><ellipse cx="64" cy="11.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="64" cy="9" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="64" cy="9" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="61.4" cy="7.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="11"><ellipse cx="76" cy="15.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="76" cy="13" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="76" cy="13" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="73.4" cy="11.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g><g key="12"><ellipse cx="60" cy="4.2" rx="8" ry="4.2" fill="#9a620c"/><ellipse cx="60" cy="2" rx="8" ry="4.2" fill="url(#pgCoin)"/><ellipse cx="60" cy="2" rx="5.2" ry="2.6" fill="none" stroke="#c98a14" strokeWidth=".9"/><ellipse cx="57.4" cy="0.7" rx="2.2" ry="1" fill="#fffbe0" opacity=".85"/></g>
   </g>
   <path d="M21 50c-7 0-9 9-3 12" stroke="#1d1b22" strokeWidth="5" fill="none" strokeLinecap="round"/>
   <path d="M99 50c7 0 9 9 3 12" stroke="#1d1b22" strokeWidth="5" fill="none" strokeLinecap="round"/>
   <path d="M20 48h80c4 26-8 48-40 50C28 96 16 74 20 48z" fill="url(#pgIron)"/>
   <path d="M27 56c-2 14 3 27 13 34" stroke="#8d88a0" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".45"/>
   <path d="M22 64h76" stroke="url(#pgBand)" strokeWidth="6"/>
   <path d="M22 61.2h76" stroke="#fff3c0" strokeWidth=".8" opacity=".7"/>
   <g transform="translate(60 78)"><circle cx="-4" cy="-3" r="4.3" fill="#2fbf5f"/><circle cx="4" cy="-3" r="4.3" fill="#2fbf5f"/><circle cx="0" cy="-8.5" r="4.3" fill="#2fbf5f"/><circle cx="0" cy="1.5" r="4.3" fill="#2fbf5f"/><path d="M0 3q2 6 5 8" stroke="#1f8f44" strokeWidth="2" fill="none" strokeLinecap="round"/><circle cx="-5.5" cy="-4.5" r="1.3" fill="#b9f5c9" opacity=".8"/></g>
   <ellipse cx="60" cy="48" rx="42" ry="7.5" fill="url(#pgRim)"/>
   <ellipse cx="60" cy="47" rx="39" ry="5.4" fill="none" stroke="#9892a8" strokeWidth="1" opacity=".6"/>
   <path d="M36 97l-5 11h9l3-9zM84 97l5 11h-9l-3-9z" fill="#141219"/>
   <path d="M58 99h4l1 10h-6z" fill="#141219"/>
   <g fill="#fff" className="pot-glints"><path d="M34 22l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z"/><path d="M92 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/><path d="M78 4l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8z"/></g>
  </svg>
  <b className="pot-count">{count}<small>/6</small></b>
 </div>;

 return <div className="pot-of-gold" aria-label={`${count} correct — ${count} coin${count===1?"":"s"} in the pot`}>
  {pot(potRef)}
  {offscreen&&<div className="pot-float" aria-hidden="true">{pot(floatRef,"is-float")}<small>POT O’ GOLD</small></div>}
 </div>;
}
