import {people} from "./game";

/** "The room guessed…" — share of votes for each person, shown before the lever pull. */
export default function RoomTally({counts}:{counts:number[]}){
 const total=counts.reduce((a,b)=>a+b,0),top=Math.max(...counts);
 return <div className="room-tally">
  <h2>🎲 THE ROOM GUESSED…</h2>
  <p className="tally-sub">{total===0?"Waiting for votes for this clue…":`${total} ${total===1?"vote":"votes"} submitted for this clue`}</p>
  {people.map((p,i)=>{const pct=total?Math.round(counts[i]/total*100):0,lead=total>0&&counts[i]===top;
   return <div className={`tally-row ${lead?"is-lead":""}`} key={p}>
    <div className="tally-label"><b>{p}</b>{lead&&<em>👑 ROOM FAVORITE</em>}<span>{pct}%</span></div>
    <div className="tally-track"><span style={{width:`${pct}%`}}/><small>{counts[i]} {counts[i]===1?"vote":"votes"}</small></div>
   </div>})}
 </div>;
}
