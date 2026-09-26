"use client";
import {useRef,useState} from "react";
import LandmarkReels from "../lib/LandmarkReels";
const people=["LaShea","Teammate 2","Teammate 3"];
const clues=[
{owner:0,text:"I once won a pig-calling contest at the State Fair.",icon:"🐷"},
{owner:2,text:"Mystery clue from Teammate 3.",icon:"✨"},
{owner:1,text:"Mystery clue from Teammate 2.",icon:"🎭"},
{owner:0,text:"I've delivered a baby.",icon:"👶🏾"},
{owner:1,text:"Second mystery clue from Teammate 2.",icon:"🎲"},
{owner:2,text:"Second mystery clue from Teammate 3.",icon:"💫"},
{owner:0,text:"Right now, I'm simultaneously sitting in a classroom, standing at the front of one, and building one that doesn't quite exist yet.",icon:"🎓"},
{owner:2,text:"Third mystery clue from Teammate 3.",icon:"🌟"},
{owner:1,text:"Third mystery clue from Teammate 2.",icon:"🎯"}];
export default function Home(){
const[q,setQ]=useState(0);const[vote,setVote]=useState<number|null>(null);const[locked,setLocked]=useState(false);const[revealed,setRevealed]=useState(false);const[score,setScore]=useState(0);const[spinning,setSpinning]=useState(false);const[clueReady,setClueReady]=useState(false);const spinTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
const c=clues[q];const seen=clues.slice(0,q+(revealed?1:0));const progress=people.map((_,i)=>seen.filter(x=>x.owner===i).length);
function spin(){if(spinning)return;setSpinning(true);setClueReady(false);if(spinTimer.current)clearTimeout(spinTimer.current);spinTimer.current=setTimeout(()=>{setSpinning(false);setClueReady(true)},1800)}
function reveal(){if(vote===null)return;if(!locked){setLocked(true);return}if(vote===c.owner)setScore(s=>s+1);setRevealed(true)}
function next(){if(q<8){setQ(x=>x+1);setVote(null);setLocked(false);setRevealed(false);setClueReady(false)}}
return <main>
<header><div><span className="eyebrow">SOLES • ALCALÁ PARK • USD</span><h1>🎰 THREE OF A KIND</h1><p>9 clues. 3 people. How well can you read the room?</p></div><div className="score">SCORE <b>{score}/9</b></div></header>
<section className="mysteries">{people.map((p,i)=><div className={"person "+(progress[i]===3?"complete":"")} key={p}><div className="silhouette">👤<span style={{height:(progress[i]/3*100)+"%"}}/></div><b>{p}</b><small>{progress[i]}/3 clues discovered</small></div>)}</section>
<section className="machine"><div className="question">QUESTION {q+1} OF 9</div><div className="reel"><div className="slot-content"><LandmarkReels spinning={spinning}/>{clueReady&&<div className="clue-ticket" aria-live="polite"><span className="clue-ticket-label">CLUE {q+1}</span><div className="icon">{c.icon}</div><h2>{c.text}</h2></div>}{!clueReady&&<p className="spin-callout" aria-live="polite">{spinning?"REELS SPINNING…":"PULL THE LEVER TO REVEAL YOUR CLUE"}</p>}</div></div>
{!clueReady&&!revealed?<div className="actions"><button className="spin pull-lever" disabled={spinning} onClick={spin}>{spinning?"SPINNING…":"SPIN THE REELS ↻"}</button></div>:!revealed?<><p className="prompt">{locked?"🔒 ANSWER LOCKED":"WHO DAT?!"}</p><div className="choices">{people.map((p,i)=><button disabled={locked} className={vote===i?"selected":""} onClick={()=>setVote(i)} key={p}>{p}</button>)}</div><div className="actions"><button className="spin" onClick={reveal}>{locked?"REVEAL ANSWER ✨":"LOCK IN"}</button></div></>
:<div className="reveal"><span>THE CLUE BELONGS TO…</span><h2>{people[c.owner]}!</h2><p>{vote===c.owner?"✓ Correct! +1 point":"Keep detecting!"}</p>{q<8?<button className="spin" onClick={next}>NEXT CLUE ↻</button>:<div className="final">FINAL SCORE: <b>{score}/9</b></div>}</div>}
</section><footer>Three people • Nine clues • Nine minutes</footer></main>}