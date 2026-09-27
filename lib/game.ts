export const PIN = "SOLES#3";
export const people = ["LaShea C.G.", "Benjamin F.", "Joshua L."];
export const clues = [
{owner:0,text:"I once won a pig-calling contest at the State Fair.",icon:"🐷",story:"Joshua will share how LaShea won a pig-calling contest at the State Fair."},
{owner:2,text:"I used to avidly collect Yu-Gi-Oh! and Pokémon cards.",icon:"🃏",story:"Benjamin will share the story behind Joshua’s Yu-Gi-Oh! and Pokémon card collection."},
{owner:1,text:"My first-ever LinkedIn post had over 1 million views.",icon:"📈",story:"LaShea will share the story behind Benjamin’s first-ever LinkedIn post hitting over 1 million views."},
{owner:0,text:"I helped deliver a baby in a car.",icon:"👶🏾",story:"Joshua will share how LaShea helped deliver a baby in a car."},
{owner:1,text:"I’ve earned 9 associate degrees.",icon:"🎓",story:"LaShea will share how Benjamin earned 9 associate degrees."},
{owner:2,text:"As a kid, I played for Team USA on an under-12 basketball team at a tournament in Australia.",icon:"🏀",story:"Benjamin will share how Joshua played for Team USA in Australia before he turned 12."}
];
export const ROUND_SECONDS = 15;
export function progress(question:number, phase:string) {return people.map((_,i)=>clues.slice(0,Math.max(0,question)+(["reveal","final"].includes(phase)?1:0)).filter(c=>c.owner===i).length)}

/** Who tells each person's backstory: LaShea tells Benjamin's, Benjamin tells Joshua's, Joshua tells LaShea's. */
export const readerFor = (owner:number) => ["Joshua","LaShea","Benjamin"][owner];
