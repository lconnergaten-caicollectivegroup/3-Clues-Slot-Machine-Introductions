import Image from "next/image";

// Photographs and building names are from USD's official building gallery.
export const landmarks=[
 {src:"/landmarks/photos/immaculata.jpg",label:"THE IMMACULATA"},
 {src:"/landmarks/photos/jenny-craig-pavilion.jpg",label:"JENNY CRAIG PAVILION"},
 {src:"/landmarks/photos/mother-rosalie-hill-hall.jpg",label:"MOTHER ROSALIE HILL HALL · SOLES"},
 {src:"/landmarks/photos/hahn-university-center.jpg",label:"HAHN UNIVERSITY CENTER"},
 {src:"/landmarks/photos/student-life-pavilion.jpg",label:"STUDENT LIFE PAVILION"},
 {src:"/landmarks/photos/founders-chapel.jpg",label:"FOUNDERS CHAPEL"},
 {src:"/landmarks/photos/torero-stadium.jpg",label:"TORERO STADIUM"},
 {src:"/landmarks/photos/copley-library.jpg",label:"COPLEY LIBRARY"},
 {src:"/landmarks/photos/sports-center.jpg",label:"SPORTS CENTER"},
 {src:"/landmarks/photos/kroc-institute.jpg",label:"KROC INSTITUTE"}
];

export default function LandmarkReels({spinning=false,revealOwner,round=0}:{spinning?:boolean;revealOwner?:number;round?:number}){
 return <div className={`slot-assembly ${spinning?"is-spinning":""} ${revealOwner!==undefined?"has-winner":""}`} aria-label={spinning?"USD campus reels spinning":"USD campus reels stopped"}>
  <div className="slot-topline"><span>✦</span> SOLES JACKPOT <span>✦</span></div>
  <div className="machine-lights" aria-hidden="true">✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦</div>
  <div className="landmark-reels">{[0,1,2].map(i=>{
   const index=(round*3+i*3)%landmarks.length;
   const stop=landmarks[index];
   const tiles=spinning?[...landmarks.slice(index),...landmarks.slice(0,index),...landmarks.slice(index),...landmarks.slice(0,index)]:[stop];
   return <div className="landmark-tile" key={i}>
    <div className="reel-window"><div className="reel-track" style={{animationDelay:`-${i*.17}s`}}>{tiles.map((tile,j)=><div className="reel-symbol" key={`${i}-${j}`}>
     {!spinning&&i===1&&revealOwner===0?<Image src="/people/lashea.png" alt="LaShea" fill sizes="(max-width: 650px) 29vw, 260px" className="portrait-symbol" priority/>:
      !spinning&&i===1&&revealOwner===1?<Image src="/people/benjamin-silhouette.jpeg" alt="Benjamin silhouette" fill sizes="(max-width: 650px) 29vw, 260px" className="benjamin-reel-symbol"/>:
      !spinning&&i===1&&revealOwner===2?<Image src="/people/joshua-silhouette.jpeg" alt="Joshua silhouette" fill sizes="(max-width: 650px) 29vw, 260px" className="joshua-reel-symbol"/>:
      !spinning&&i===1&&revealOwner!==undefined?<div className="mystery-symbol" aria-label="Revealed player">★</div>:
      <Image src={tile.src} alt={spinning?"":tile.label} fill sizes="(max-width: 650px) 29vw, 260px"/>}
    </div>)}</div></div>
    <span>{spinning?"✦ ✦ ✦":i===1&&revealOwner!==undefined?revealOwner===0?"LASHEA":revealOwner===1?"BENJAMIN":"JOSHUA":stop.label}</span>
   </div>})}</div>
  <div className="slot-payline" aria-hidden="true"><i/><span>◆ JACKPOT ◆</span><i/></div>
 </div>
}
