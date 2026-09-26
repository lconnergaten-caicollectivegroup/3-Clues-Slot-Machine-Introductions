"use client";
import {useRef,useState} from "react";
import LandmarkReels from "../lib/LandmarkReels";
import PersonSilhouette from "../lib/PersonSilhouette";
import PotOfGold from "../lib/PotOfGold";
const people=["LaShea C.G.","Benjamin F.","Joshua L."];
const clues=[
{owner:0,text:"I once won a pig-calling contest at the State Fair.",icon:"🐷",story:"Backstory coming soon — LaShea will share how the pig-calling contest happened."},
{owner:2,text:"Mystery clue from Joshua.",icon:"✨",story:"Backstory coming soon from Joshua."},
{owner:1,text:"Mystery clue from Benjamin.",icon:"🎭",story:"Backstory coming soon from Benjamin."},
{owner:0,text:"I helped someone deliver a baby in a car.",icon:"👶🏾",story:"Backstory coming soon — LaShea will share the car-delivery story."},
{owner:1,text:"Second mystery clue from Benjamin.",icon:"🎲",story:"Second backstory coming soon from Benjamin."},
{owner:2,text:"Second mystery clue from Joshua.",icon:"💫",story:"Second backstory coming soon from Joshua."}
];
export default function Home(){
const[q,setQ]=useState(0);const[vote,setVote]=useState<number|null>(null);const[locked,setLocked]=useState(false);const[revealed,setRevealed]=useState(false);const[score,setScore]=useState(0);const[spinning,setSpinning]=useState(false);const spinTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
const c=clues[q];const seen=clues.slice(0,q+(revealed?1:0));const progress=people.map((_,i)=>seen.filter(x=>x.owner===i).length);
function spin(){if(spinning||!locked)return;setSpinning(true);if(spinTimer.current)clearTimeout(spinTimer.current);spinTimer.current=setTimeout(()=>{setSpinning(false);if(vote===c.owner)setScore(v=>v+1);setRevealed(true)},2200)}
function reveal(){if(vote===null)return;if(!locked){setLocked(true);return}spin()}
function next(){if(q<5){setQ(x=>x+1);setVote(null);setLocked(false);setRevealed(false);}}
return <main>
<header><div><span className="eyebrow"><span className="course">EdD Org Leadership · Collaborative Learning · LEAD-697-01</span><a className="assignment" href="https://sandiego.instructure.com/courses/32844/assignments/453024" target="_blank" rel="noreferrer">♠ Assignment: Triad Get-to-Know-You Introductions ♦</a><span className="date-badge">📅 Wednesday, September 30th</span></span><h1>🎰 THREE OF A KIND</h1><p>6 clues. 3 people. Test your luck 🍀</p></div><div className="header-right"><div className="team"><b>♣ TEAM MEMBERS ♥</b><span>LaShea Conner-Gaten</span><span>Benjamin Frandsen</span><span>Joshua Lewis</span></div><div className="score-row"><PotOfGold count={score}/><div className="score">SCORE <b>{score}/6</b></div></div></div></header>
<section className="mysteries">{people.map((p,i)=><div className={"person "+(progress[i]===3?"complete":"")} key={p}><PersonSilhouette index={i} shown={progress[i]}/><b>{p}</b><small>{progress[i]}/2 clues discovered</small></div>)}</section>
<section className="machine"><div className="question">QUESTION {q+1} OF 6</div><div className="reel"><div className="slot-content">{!spinning&&!revealed?<><LandmarkReels round={q}/><div className="clue-ticket" aria-live="polite"><span className="clue-ticket-label">CLUE {q+1}</span><div className="icon">{c.icon}</div><h2>{c.text}</h2></div></>:<><LandmarkReels spinning={spinning} revealOwner={revealed?c.owner:undefined} round={q}/>{spinning&&<p className="spin-callout">LEVER PULLED — REVEALING…</p>}</>}</div></div>{!revealed&&!spinning?<><p className="prompt">{locked?"🔒 ANSWER LOCKED · READY TO PULL THE LEVER":"WHO DAT?!"}</p><div className="choices">{people.map((p,i)=><button disabled={locked} className={vote===i?"selected":""} onClick={()=>setVote(i)} key={p}>{p}</button>)}</div><div className="actions"><button className="spin pull-lever" disabled={vote===null} onClick={locked?spin:reveal}>{locked?"PULL THE LEVER ⬇":"LOCK IN"}</button></div></>:revealed?<div className="reveal"><span>THE CLUE BELONGS TO…</span><h2>{people[c.owner]}!</h2><p>{vote===c.owner?"✓ Correct! +1 point":"Keep detecting!"}</p>{q<5?<button className="spin" onClick={next}>NEXT CLUE ↻</button>:<div className="final">FINAL SCORE: <b>{score}/6</b></div>}</div>:null}
</section><footer>Three people • Six clues • One winner · <a href="https://www.sandiego.edu/facilities/building-gallery.php" target="_blank" rel="noreferrer">USD campus photos</a></footer></main>}