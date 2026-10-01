"use client";
import {useEffect,useRef} from "react";
import {ROUND_SECONDS} from "./game";

/** "How to play" card. `mode` tailors the steps: solo play on one screen, or a live room with phones. */
export default function HowToPlay({mode="live",compact=false}:{mode?:"solo"|"live";compact?:boolean}){
 const steps=mode==="solo"?[
  ["🔍","Read the clue","Each clue is a true fact about one of us three."],
  ["🤔",`Guess who — ${ROUND_SECONDS} seconds`,"Pick LaShea, Benjamin, or Joshua before the timer runs out."],
  ["🎰","Lock in & pull the lever","One tap locks your answer, drops the lever, and spins the reels to reveal the owner."],
  ["🎤","Hear the backstory from our team","A teammate will share the real story behind each clue."],
  ["🏆","Top guesser wins a prize","Every right answer fills your pot of gold. The top guesser wins a prize!"]
 ]:[
  ["📱","Join on your phone","Scan the QR code, enter the course PIN, and choose any name or nickname you like."],
  ["🔍","Read the clue","Each clue is a true fact about LaShea, Benjamin, or Joshua."],
  ["⏱️",`Guess in ${ROUND_SECONDS} seconds`,"Tap who you think it is, then LOCK IN before time runs out."],
  ["🎰","Watch the lever pull","The host pulls the lever, the reels spin, and the owner is revealed."],
  ["🎤","Hear the backstory from our team","A teammate will share the real story behind each clue."],
  ["🏆","Top guesser wins a prize","The top guesser wins a prize! Ties go to the fastest correct answers."]
 ];
 const ref=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{if(ref.current&&window.matchMedia("(max-width: 650px)").matches)ref.current.open=false},[]);
 return <details ref={ref} className={`how-to-play ${compact?"is-compact":""}`} open={!compact}>
  <summary><span>♠</span> HOW TO PLAY <span>♦</span></summary>
  <ol>{steps.map(([icon,title,body],i)=><li key={title}><i aria-hidden="true">{icon}</i><div><b>{i+1}. {title}</b><p>{body}</p></div></li>)}</ol>
 </details>;
}
