import Image from "next/image";
const icons=[
 {src:"/landmarks/immaculata.svg",label:"THE IMMACULATA"},
 {src:"/landmarks/founders.svg",label:"FOUNDERS CHAPEL"},
 {src:"/landmarks/alcala.svg",label:"ALCALÁ PARK"}
];
export default function LandmarkReels({spinning=false}:{spinning?:boolean}){
 return <div className={`landmark-reels ${spinning?"is-spinning":""}`} aria-label="Illustrated USD landmark slot reels">{icons.map((icon,i)=><div className="landmark-tile" key={icon.label} style={{animationDelay:`${i*80}ms`}}><div className="landmark-art"><Image src={icon.src} alt={icon.label} fill sizes="(max-width: 650px) 26vw, 230px"/></div><span>{icon.label}</span></div>)}</div>
}
