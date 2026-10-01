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
  <section className="lobby-instructions" aria-label="How to play">
   <h3>HOW TO PLAY</h3>
   <ol>
    <li><b>Join:</b> Scan the QR code or tap Join, enter PIN {PIN}, and choose any name or nickname.</li>
    <li><b>Guess:</b> For each of the six clues, choose LaShea, Benjamin, or Joshua within 15 seconds.</li>
    <li><b>Lock in:</b> Tap LOCK IN on your device to submit your answer.</li>
    <li><b>Watch:</b> Follow the Zoom screen for class percentages, the reveal, and each backstory. The host moves everyone to the next clue.</li>
   </ol>
   <p className="lobby-prize">🏆 Stay until the end! The top guesser wins a prize. One winner will be announced after all six clues.</p>
  </section>
 </div>
}
