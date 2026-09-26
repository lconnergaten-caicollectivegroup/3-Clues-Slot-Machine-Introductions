export const PIN = "SOLES#3";
export const people = ["LaShea", "Teammate 2", "Teammate 3"];
export const clues = [
  {owner:0,text:"I once won a pig-calling contest at the State Fair.",icon:"🐷"},
  {owner:2,text:"Mystery clue from Teammate 3.",icon:"✨"},
  {owner:1,text:"Mystery clue from Teammate 2.",icon:"🎭"},
  {owner:0,text:"I've delivered a baby.",icon:"👶🏾"},
  {owner:1,text:"Second mystery clue from Teammate 2.",icon:"🎲"},
  {owner:2,text:"Second mystery clue from Teammate 3.",icon:"💫"},
  {owner:0,text:"Right now, I'm simultaneously sitting in a classroom, standing at the front of one, and building one that doesn't quite exist yet.",icon:"🎓"},
  {owner:2,text:"Third mystery clue from Teammate 3.",icon:"🌟"},
  {owner:1,text:"Third mystery clue from Teammate 2.",icon:"🎯"}
];
export const ROUND_SECONDS = 35;
export function progress(question:number, phase:string) {return people.map((_,i)=>clues.slice(0,Math.max(0,question)+(["reveal","final"].includes(phase)?1:0)).filter(c=>c.owner===i).length)}
