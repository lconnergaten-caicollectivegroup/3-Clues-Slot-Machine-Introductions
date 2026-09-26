"use client";

/** Pot of gold beside the score. Each time `count` goes up, a torero tosses coins into the pot. */
export default function PotOfGold({count}:{count:number}){
 const throwing=count>0;
 return <div className="pot-of-gold" aria-label={`${count} correct — ${count} coin${count===1?"":"s"} in the pot`}>
  <svg key={`torero-${count}`} className={`torero ${throwing?"is-throwing":""}`} viewBox="0 0 60 90" aria-hidden="true">
   {/* montera hat */}
   <path d="M17 17c2-9 10-11 13-11s11 2 13 11c-4-2-8-3-13-3s-9 1-13 3z" fill="#141018"/>
   <circle cx="19" cy="15" r="4" fill="#141018"/><circle cx="41" cy="15" r="4" fill="#141018"/>
   {/* face */}
   <circle cx="30" cy="25" r="8" fill="#c98c62"/>
   <circle cx="27" cy="24" r="1" fill="#2b1d1d"/><circle cx="33" cy="24" r="1" fill="#2b1d1d"/>
   <path d="M26.5 28.5q3.5 2.5 7 0" stroke="#6b2d2d" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
   {/* suit of lights */}
   <path d="M20 34h20l3 24H17z" fill="#e8b93c"/>
   <path d="M24 36l6 8 6-8" stroke="#fff3c6" strokeWidth="1.5" fill="none"/>
   <circle cx="23" cy="44" r="1.2" fill="#fff3c6"/><circle cx="37" cy="44" r="1.2" fill="#fff3c6"/><circle cx="30" cy="52" r="1.2" fill="#fff3c6"/>
   {/* legs */}
   <path d="M20 58h8v26h-8zM32 58h8v26h-8z" fill="#f3e6c8"/>
   <path d="M18 84h11v4H18zM31 84h11v4H31z" fill="#141018"/>
   {/* cape arm (left) */}
   <path d="M20 38l-9 14" stroke="#e8b93c" strokeWidth="5" strokeLinecap="round"/>
   <path d="M4 50c4-3 10-3 14 0l-2 20c-5 3-10 3-14 0z" fill="#d7263d"/>
   {/* throwing arm (right) */}
   <g className="throw-arm"><path d="M40 38l9-10" stroke="#e8b93c" strokeWidth="5" strokeLinecap="round"/><circle cx="50" cy="27" r="3.2" fill="#c98c62"/></g>
  </svg>
  {throwing&&<div className="coin-arc" key={`coins-${count}`} aria-hidden="true">{[0,1,2].map(i=><i key={i} style={{animationDelay:`${i*.16}s`}}/>)}</div>}
  <div className={`pot ${throwing?"is-catching":""}`} key={`pot-${count}`}>
   <svg viewBox="0 0 64 56" aria-hidden="true">
    <ellipse cx="32" cy="16" rx="24" ry="7" fill="#ffd54a"/>
    <circle cx="22" cy="12" r="5" fill="#ffe27a" stroke="#c9901c"/><circle cx="33" cy="10" r="5" fill="#ffe27a" stroke="#c9901c"/><circle cx="43" cy="13" r="5" fill="#ffe27a" stroke="#c9901c"/>
    <path d="M8 18h48c2 14-4 30-24 32C12 48 6 32 8 18z" fill="#1c1a22"/>
    <rect x="6" y="15" width="52" height="6" rx="3" fill="#2d2a35"/>
    <path d="M12 26c6 3 34 3 40 0" stroke="#3a3645" strokeWidth="2" fill="none"/>
   </svg>
   <b>{count}</b>
  </div>
 </div>;
}
