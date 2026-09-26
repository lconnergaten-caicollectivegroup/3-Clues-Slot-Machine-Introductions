export const PIN = "SOLES#3";
export const people = ["LaShea C.G.", "Benjamin F.", "Joshua L."];
export const clues = [
{owner:0,text:"I once won a pig-calling contest at the State Fair.",icon:"🐷",story:"Joshua shares how LaShea won a pig-calling contest at the State Fair."},
{owner:2,text:"Mystery clue from Joshua.",icon:"✨",story:"Benjamin shares the story behind Joshua’s clue."},
{owner:1,text:"My first-ever LinkedIn post had over 1 million views.",icon:"📈",story:"LaShea shares the story behind Benjamin’s first-ever LinkedIn post hitting over 1 million views."},
{owner:0,text:"I helped deliver a baby in a car.",icon:"👶🏾",story:"Joshua shares how LaShea helped deliver a baby in a car."},
{owner:1,text:"Second mystery clue from Benjamin.",icon:"🎲",story:"LaShea shares the story behind Benjamin’s clue."},
{owner:2,text:"Second mystery clue from Joshua.",icon:"💫",story:"Benjamin shares the story behind Joshua’s clue."}
];
export const ROUND_SECONDS = 15;
export function progress(question:number, phase:string) {return people.map((_,i)=>clues.slice(0,Math.max(0,question)+(["reveal","final"].includes(phase)?1:0)).filter(c=>c.owner===i).length)}

/** Who tells each person's backstory: LaShea tells Benjamin's, Benjamin tells Joshua's, Joshua tells LaShea's. */
export const readerFor = (owner:number) => ["Joshua","LaShea","Benjamin"][owner];
