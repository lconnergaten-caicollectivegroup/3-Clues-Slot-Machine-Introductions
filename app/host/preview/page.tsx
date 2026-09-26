"use client";
import {useState} from "react";
import LandmarkReels from "../../../lib/LandmarkReels";
import HostLobby from "../../../lib/HostLobby";
import PersonSilhouette from "../../../lib/PersonSilhouette";
import {PIN,people,clues,ROUND_SECONDS} from "../../../lib/game";

const stages=["lobby","voting","results","spinning","reveal","final"] as const;
type Stage=typeof stages[number];
export default function HostPreview(){
 const[stage,setStage]=useState<Stage>("lobby");const[q,setQ]=useState(0);
 const url=`https://three-of-a-kind-soles.vercel.app/play?pin=${encodeURIComponent(PIN)}`;
 const shown=people.map((_,i)=>clues.slice(0,q+(stage==="reveal"||stage==="final"?1:0)).filter(c=>c.owner===i).length);
 function advance(){if(stage==="final")return;const next=stages[stages.indexOf(stage)+1];setStage(next)}
 return <main className="host host-preview"><header><div className="header-meta"><span className="course">EdD Org Leadership · Collaborative Learning · LEAD-697-01</span><span className="date-badge">📅 Wednesday, September 30th</span></div><div className="header-brand"><span className="eyebrow"><a className="assignment" href="https://sandiego.instructure.com/courses/32844/assignments/453024" target="_blank" rel="noreferrer">Assignment · Triad Get-to-Know-You Introductions</a> • PIN {PIN}</span><h1 className="brand-title"><span className="title-suit" aria-hidden="true">♠</span><span className="title-text">THREE OF A KIND</span><span className="title-suit" aria-hidden="true">♦</span></h1><p className="tagline"><span>6 clues</span><i>✦</i><span>3 people</span><i>✦</i><span className="luck">Test your luck 🍀</span></p></div><div className="header-right"><div className="team"><b>Team Members</b><span>LaShea Conner-Gaten</span><span>Benjamin Frandsen</span><span>Joshua Lewis</span></div><div className="score">QUESTION <b>{q+1}/6</b></div></div></header>
 <div className="preview-banner"><b>HOST SCREEN PREVIEW</b><span>See the screen you’ll share. This preview does not create a room.</span><a href="/host">OPEN LIVE HOST →</a></div>
 <section className="mysteries">{people.map((p,i)=><div className="person" key={p}><PersonSilhouette index={i} shown={shown[i]}/><b>{p}</b><small>{shown[i]}/2 clues</small></div>)}</section>
 <section className="machine"><div className="question">{stage.toUpperCase()}</div>
 {stage==="lobby"&&<HostLobby url={url} players={0}/>}
 {stage==="voting"&&<><div className="reel slot-reel"><div><LandmarkReels round={q}/><span className="reel-icon">{clues[q].icon}</span><h2>{clues[q].text}</h2></div></div><p className="prompt">WHO DAT?! · 0 / 0 answers · {ROUND_SECONDS}s</p><div className="countdown"><span style={{width:"100%"}}/></div></>}
 {stage==="results"&&<div className="reel"><div className="results"><h2>ROOM TALLY</h2>{people.map(p=><div className="result" key={p}><div><b>{p}</b><b>0%</b></div><div className="result-track"><span style={{width:0}}/></div></div>)}</div></div>}
 {stage==="spinning"&&<div className="reel slot-reel"><div className="slot-content"><LandmarkReels spinning round={q}/><p className="spin-callout">LEVER PULLED — REVEALING…</p></div></div>}
 {stage==="reveal"&&<div className="reveal"><LandmarkReels revealOwner={clues[q].owner} round={q}/><span>THE CLUE BELONGS TO…</span><h2>{people[clues[q].owner]}!</h2><p>🎤 Pause for the story behind the clue.</p></div>}
 {stage==="final"&&<div className="reveal"><span>FINAL JACKPOT</span><h2>🏆 ONE WINNER</h2><p className="podium">🥇 Winner’s real name — score / 6</p><p>Most correct wins. Ties go to the fastest correct answers.</p></div>}
 <div className="actions preview-actions">{stage==="reveal"&&<button className="spin" onClick={()=>{setQ((q+1)%6);setStage("voting")}}>NEXT CLUE →</button>}{stage!=="reveal"&&stage!=="final"&&<button className="spin" onClick={advance}>{({lobby:"SHOW FIRST CLUE",voting:"LOCK VOTING",results:"PULL THE LEVER ⬇",spinning:"LAND ANSWER"} as Record<string,string>)[stage]}</button>}<button className="preview-reset" onClick={()=>{setStage("lobby");setQ(0)}}>RESTART PREVIEW</button></div>
 </section><footer>Three people • Six clues • One winner · <a href="https://www.sandiego.edu/facilities/building-gallery.php" target="_blank" rel="noreferrer">USD campus photos</a></footer></main>
}
