import Image from "next/image";

export default function PersonSilhouette({index,shown}:{index:number;shown:number}){
 if(index<2)return <div className={`silhouette portrait-silhouette portrait-${index}`} aria-label={`${shown} of 3 clues revealed`}>
  <Image src={index===0?"/people/lashea-silhouette.png":"/people/benjamin-silhouette.jpeg"} alt={index===0?"LaShea's silhouette":"Benjamin's silhouette"} fill sizes="(max-width: 650px) 52px, 84px"/>
  <div className="portrait-progress" style={{height:`${shown*100/3}%`}}/>
 </div>;
 return <div className="silhouette" aria-label={`${shown} of 3 clues revealed`}>
  <div className="silhouette-fill" style={{height:`${shown*100/3}%`}}/>
  <div className="silhouette-outline"/>
 </div>
}
