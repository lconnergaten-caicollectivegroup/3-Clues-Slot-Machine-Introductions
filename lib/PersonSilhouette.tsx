import Image from "next/image";

export default function PersonSilhouette({index,shown}:{index:number;shown:number}){
 const src=["/people/lashea-silhouette.png","/people/benjamin-silhouette.jpeg","/people/joshua-silhouette.jpeg"][index];const name=["LaShea","Benjamin","Joshua"][index];
 if(src)return <div className={`silhouette portrait-silhouette portrait-${index}`} aria-label={`${shown} of 2 clues revealed`}>
  <Image src={src} alt={`${name}'s silhouette`} fill sizes="(max-width: 650px) 52px, 84px"/>
  <div className="portrait-progress" style={{height:`${shown*100/2}%`}}/>
 </div>;
 return <div className="silhouette" aria-label={`${shown} of 2 clues revealed`}>
  <div className="silhouette-fill" style={{height:`${shown*100/2}%`}}/>
  <div className="silhouette-outline"/>
 </div>
}
