import Image from "next/image";
import {QRCodeSVG} from "qrcode.react";
import {PIN} from "./game";

export default function HostLobby({url,players}:{url:string;players:number}){
 return <div className="reel join-reel clean-lobby">
  <div className="lobby-welcome"><span>WELCOME TO THE GAME</span><h2>Join Three of a Kind</h2><p>Scan the code or tap the button on your phone.</p></div>
  <div className="join-layout">
   <div className="join-details"><div className="qr"><QRCodeSVG value={url} size={160} includeMargin title="Scan to join the live game"/></div><a className="lobby-join-button" href={url} target="_blank" rel="noreferrer">JOIN ON THIS DEVICE ↗</a><div className="pinCard"><span>Course PIN</span><b>{PIN}</b></div></div>
   <div className="lobby-info"><Image className="lobby-campus" src="/landmarks/photos/mother-rosalie-hill-hall.jpg" alt="USD SOLES building" width={420} height={200}/><div className="lobby-count"><b>{players}</b><span>participants connected</span></div><p>Choose any name or nickname you like.</p><p className="lobby-wait">Waiting for the host to start…</p></div>
  </div>
 </div>
}
