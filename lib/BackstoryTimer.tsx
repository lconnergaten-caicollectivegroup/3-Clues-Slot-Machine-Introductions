"use client";
import {useEffect,useState} from "react";

export const BACKSTORY_SECONDS=30;

/** 30-second countdown for the teammate telling the backstory. Remount (key) per clue to restart. */
export default function BackstoryTimer(){
 const[left,setLeft]=useState(BACKSTORY_SECONDS);
 useEffect(()=>{const end=Date.now()+BACKSTORY_SECONDS*1000;const t=setInterval(()=>{const l=Math.max(0,Math.ceil((end-Date.now())/1000));setLeft(l);if(l<=0)clearInterval(t)},200);return()=>clearInterval(t)},[]);
 return <div className={`story-timer ${left<=10?"is-urgent":""} ${left<=0?"is-done":""}`} aria-live="polite">
  <b>{left>0?`⏱ ${left}s`:"⏰ TIME!"}</b>
  <div className="story-track"><span style={{width:`${left*100/BACKSTORY_SECONDS}%`}}/></div>
 </div>;
}
