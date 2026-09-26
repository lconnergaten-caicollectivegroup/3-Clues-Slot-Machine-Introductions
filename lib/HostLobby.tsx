import Image from "next/image";
import {QRCodeSVG} from "qrcode.react";
import {PIN} from "./game";
import {landmarks} from "./LandmarkReels";

export default function HostLobby({url,players}:{url:string;players:number}){
 return <div className="reel join-reel"><div className="join-layout">
  <div className="join-details"><h2>SCAN TO JOIN</h2><div className="qr"><QRCodeSVG value={url} size={175} includeMargin/></div><p><a href={url}>{url}</a></p><div className="pinCard">Course PIN <b>{PIN}</b></div><p>{players} players connected · Use real names so we can announce the winner.</p></div>
  <div className="campus-showcase" aria-label="USD campus photo slideshow">
   {landmarks.map((landmark,i)=><div className="campus-slide" key={landmark.src} style={{animationDelay:`${i*4}s`}}><Image src={landmark.src} alt={landmark.label} fill sizes="(max-width: 650px) 85vw, 420px"/><span>{landmark.label}</span></div>)}
   <p>10 USD CAMPUS SPOTS • EVERY ONE APPEARS IN THE REELS</p>
  </div>
 </div></div>
}
