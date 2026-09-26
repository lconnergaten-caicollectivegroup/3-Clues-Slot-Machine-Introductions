import Image from "next/image";
const icons=[
 {src:"/landmarks/immaculata.svg",label:"THE IMMACULATA"},
 {src:"/landmarks/founders.svg",label:"FOUNDERS CHAPEL"},
 {src:"/landmarks/alcala.svg",label:"ALCALÁ PARK"}
];
export default function LandmarkReels({spinning=false,revealOwner}:{spinning?:boolean;revealOwner?:number}){
 return <div className={`slot-assembly ${spinning?"is-spinning":""}`} aria-label={spinning?"Three USD landmark reels spinning":"Three USD landmark reels stopped"}>
 <div className="slot-topline"><span>✦</span> ALCALÁ REELS <span>✦</span></div>
 <div className="landmark-reels">{icons.map((icon,i)=><div className="landmark-tile" key={icon.label}>
  <div className="reel-window"><div className="reel-track" style={{animationDelay:`-${i*.19}s`}}>{(spinning?[...icons,...icons,...icons]:[icon]).map((tile,j)=><div className="reel-symbol" key={`${tile.label}-${j}`}>{!spinning&&i===1&&revealOwner===0?<Image src="/people/lashea.png" alt="LaShea" fill sizes="(max-width: 650px) 26vw, 230px" className="portrait-symbol" priority/>:<Image src={tile.src} alt={spinning?"":tile.label} fill sizes="(max-width: 650px) 26vw, 230px"/>}</div>)}</div></div>
  <span>{spinning?"◆ ◆ ◆":i===1&&revealOwner!==undefined?revealOwner===0?"LASHEA":"MYSTERY GUEST":icon.label}</span>
 </div>)}</div><div className="slot-payline" aria-hidden="true"><i/><span>●</span><i/></div>
 </div>
}
