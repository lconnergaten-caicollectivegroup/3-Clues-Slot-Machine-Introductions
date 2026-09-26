export const PIN = "SOLES#3";
export const people = ["LaShea C.G.", "Benjamin F.", "Joshua L."];
export const clues = [
{owner:0,text:"I once won a pig-calling contest at the State Fair.",icon:"🐷",story:"Backstory coming soon — LaShea will share how the pig-calling contest happened."},
{owner:2,text:"Mystery clue from Joshua.",icon:"✨",story:"Backstory coming soon from Joshua."},
{owner:1,text:"My first-ever LinkedIn post had over 1 million views.",icon:"📈",story:"Backstory coming soon from Benjamin."},
{owner:0,text:"I helped deliver a baby in a car.",icon:"👶🏾",story:"Backstory coming soon — LaShea will share the car-delivery story."},
{owner:1,text:"Second mystery clue from Benjamin.",icon:"🎲",story:"Second backstory coming soon from Benjamin."},
{owner:2,text:"Second mystery clue from Joshua.",icon:"💫",story:"Second backstory coming soon from Joshua."}
];
export const ROUND_SECONDS = 15;
export function progress(question:number, phase:string) {return people.map((_,i)=>clues.slice(0,Math.max(0,question)+(["reveal","final"].includes(phase)?1:0)).filter(c=>c.owner===i).length)}

/** Who reads each person's clues aloud: LaShea reads Benjamin's, Benjamin reads Joshua's, Joshua reads LaShea's. */
export const readerFor = (owner:number) => ["Joshua","LaShea","Benjamin"][owner];
