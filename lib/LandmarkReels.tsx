import Image from "next/image";
const icons=[
 {src:"/landmarks/immaculata.svg",label:"THE IMMACULATA"},
 {src:"/landmarks/founders.svg",label:"FOUNDERS CHAPEL"},
 {src:"/landmarks/alcala.svg",label:"ALCALÁ PARK"}
];
export default function LandmarkReels({spinning=false}:{spinning?:boolean}){
 return <div className={`slot-assembly ${spinning?"is-spinning":""}`} aria-label={spinning?"Three USD landmark reels spinning":"Three USD landmark reels stopped"}>
 <div className="slot-topline"><span>✦</span> ALCALÁ REELS <span>✦</span></div>
 <div className="landmark-reels">{icons.map((icon,i)=><div className="landmark-tile" key={icon.label}>
  <div className="reel-window"><div className="reel-track" style={{animationDelay:`-${i*.19}s`}}>{(spinning?[...icons,...icons,...icons]:[icon]).map((tile,j)=><div className="reel-symbol" key={`${tile.label}-${j}`}><Image src={tile.src} alt={spinning?"":tile.label} fill sizes="(max-width: 650px) 26vw, 230px"/></div>)}</div></div>
  <span>{spinning?"◆ ◆ ◆":icon.label}</span>
 </div>)}</div><div className="slot-payline" aria-hidden="true"><i/><span>●</span><i/></div>
 </div>
}
