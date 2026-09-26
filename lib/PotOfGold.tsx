"use client";
import {useEffect,useRef,useState} from "react";

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
  <svg viewBox="0 0 64 56" aria-hidden="true">
   <ellipse cx="32" cy="16" rx="24" ry="7" fill="#ffd54a"/>
   <circle cx="22" cy="12" r="5" fill="#ffe27a" stroke="#c9901c"/><circle cx="33" cy="9" r="5" fill="#ffe27a" stroke="#c9901c"/><circle cx="43" cy="13" r="5" fill="#ffe27a" stroke="#c9901c"/><circle cx="28" cy="6" r="4" fill="#fff0a8" stroke="#c9901c"/>
   <path d="M8 18h48c2 14-4 30-24 32C12 48 6 32 8 18z" fill="#1c1a22"/>
   <rect x="6" y="15" width="52" height="6" rx="3" fill="#2d2a35"/>
   <path d="M12 26c6 3 34 3 40 0" stroke="#3a3645" strokeWidth="2" fill="none"/>
  </svg>
  <b>{count}</b>
 </div>;

 return <div className="pot-of-gold" aria-label={`${count} correct — ${count} coin${count===1?"":"s"} in the pot`}>
  {pot(potRef)}
  {offscreen&&<div className="pot-float" aria-hidden="true">{pot(floatRef,"is-float")}<small>POT O’ GOLD</small></div>}
 </div>;
}
