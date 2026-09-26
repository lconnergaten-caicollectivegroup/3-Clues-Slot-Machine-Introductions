"use client";

/** Pot of gold beside the score. Each time `count` goes up, coins drop into the pot. */
export default function PotOfGold({count}:{count:number}){
 const throwing=count>0;
 return <div className="pot-of-gold" aria-label={`${count} correct — ${count} coin${count===1?"":"s"} in the pot`}>
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
