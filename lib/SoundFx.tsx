"use client";
import {useEffect,useState} from "react";
import {isMuted,setMuted,victory} from "./sfx";

/** Floating mute/unmute button. */
export function SoundToggle(){
 const[m,setM]=useState(false);
 useEffect(()=>setM(isMuted()),[]);
 return <button className="sound-toggle" aria-label={m?"Turn sound on":"Turn sound off"} onClick={()=>{setMuted(!m);setM(!m)}}>{m?"🔇":"🔊"}<span>{m?"SOUND OFF":"SOUND ON"}</span></button>;
}

/** Plays the victory fanfare once when it appears (winner announcement). */
export function VictoryFanfare(){
 useEffect(()=>{const t=setTimeout(victory,300);return()=>clearTimeout(t)},[]);
 return null;
}
