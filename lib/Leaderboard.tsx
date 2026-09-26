type P={id:string;display_name:string;score?:number|null;total_correct_ms?:number|null};

/** Sort players the same way the winner is chosen: most correct, then fastest correct answers. */
export function rankPlayers<T extends P>(players:T[]):T[]{
 return [...players].sort((a,b)=>(b.score||0)-(a.score||0)||(a.total_correct_ms||0)-(b.total_correct_ms||0)||a.display_name.localeCompare(b.display_name)||a.id.localeCompare(b.id));
}

/** Top-3 podium for the final screen. */
export default function Leaderboard({players,meId}:{players:P[];meId?:string}){
 const top=rankPlayers(players).slice(0,3);
 if(!top.length)return null;
 const medals=["🥇","🥈","🥉"];
 return <div className="leaderboard">
  <h3>TOP 3 GUESSERS</h3>
  <ol>{top.map((p,i)=><li key={p.id} className={`place-${i+1} ${p.id===meId?"is-me":""}`}>
   <span className="medal">{medals[i]}</span><b>{p.display_name}{p.id===meId?" (you)":""}</b><span className="pts">{p.score||0}/6</span>
  </li>)}</ol>
 </div>;
}
