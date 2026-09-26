/** Slot-machine side lever. `pulled` plays the pull-down animation. */
export default function SlotLever({pulled}:{pulled:boolean}){
 return <div className={`lever ${pulled?"is-pulled":""}`} aria-hidden="true">
  <svg viewBox="0 0 64 230" preserveAspectRatio="xMidYMid meet">
   <defs>
    <linearGradient id="lvChrome" x1="0" x2="1">
     <stop offset="0" stopColor="#5d6474"/><stop offset=".22" stopColor="#dfe4ee"/><stop offset=".42" stopColor="#ffffff"/>
     <stop offset=".62" stopColor="#aab2c2"/><stop offset="1" stopColor="#4a5060"/>
    </linearGradient>
    <linearGradient id="lvGold" x1="0" x2="1" y1="0" y2="1">
     <stop offset="0" stopColor="#fff1b8"/><stop offset=".35" stopColor="#f3c44f"/><stop offset=".7" stopColor="#b7801f"/><stop offset="1" stopColor="#7a4d0f"/>
    </linearGradient>
    <linearGradient id="lvGoldEdge" x1="0" x2="0" y1="0" y2="1">
     <stop offset="0" stopColor="#ffe9a0"/><stop offset="1" stopColor="#6d420b"/>
    </linearGradient>
    <radialGradient id="lvBall" cx=".36" cy=".32" r=".75">
     <stop offset="0" stopColor="#ffd3e6"/><stop offset=".18" stopColor="#ff5aa5"/><stop offset=".55" stopColor="#d2105f"/><stop offset="1" stopColor="#5e0428"/>
    </radialGradient>
    <radialGradient id="lvHub" cx=".4" cy=".35" r=".7">
     <stop offset="0" stopColor="#ffffff"/><stop offset=".35" stopColor="#c9ced9"/><stop offset="1" stopColor="#3b4150"/>
    </radialGradient>
   </defs>
   {/* connector from the cabinet */}
   <path d="M8 170h16v20H8a6 6 0 0 1-6-6v-8a6 6 0 0 1 6-6z" fill="url(#lvGold)" stroke="#7a4d0f" strokeWidth="1"/>
   <g transform="translate(20 0)">
   {/* mounting housing */}
   <rect x="2" y="146" width="40" height="66" rx="10" fill="url(#lvGoldEdge)"/>
   <rect x="5" y="149" width="34" height="60" rx="8" fill="url(#lvGold)"/>
   <rect x="11" y="157" width="22" height="44" rx="6" fill="#241536"/>
   <rect x="13" y="159" width="18" height="40" rx="5" fill="#140a22"/>
   {[152,204].map(y=><g key={y}><circle cx="9.5" cy={y} r="2.3" fill="#7a4d0f"/><circle cx="34.5" cy={y} r="2.3" fill="#7a4d0f"/><circle cx="9" cy={y-.5} r="1" fill="#fff1b8"/><circle cx="34" cy={y-.5} r="1" fill="#fff1b8"/></g>)}
   {/* the arm: pivots at (22,180) */}
   <g className="lever-arm">
    <rect x="17.5" y="30" width="9" height="152" rx="4.5" fill="url(#lvChrome)"/>
    <rect x="19.5" y="34" width="2" height="144" rx="1" fill="#fff" opacity=".7"/>
    <rect x="15" y="120" width="14" height="7" rx="3" fill="url(#lvChrome)"/>
    <rect x="15" y="120" width="14" height="2" rx="1" fill="#fff" opacity=".6"/>
    <ellipse cx="22" cy="30" rx="10" ry="3.2" fill="#8a0b3f" opacity=".55"/>
    <circle cx="22" cy="22" r="18" fill="url(#lvBall)"/>
    <circle cx="22" cy="22" r="18" fill="none" stroke="#5e0428" strokeWidth="1.2" opacity=".6"/>
    <ellipse cx="15.5" cy="14.5" rx="6.5" ry="4.2" fill="#fff" opacity=".75" transform="rotate(-35 15.5 14.5)"/>
    <circle cx="29" cy="30" r="2" fill="#fff" opacity=".35"/>
   </g>
   {/* pivot hub over the arm */}
   <circle cx="22" cy="180" r="10.5" fill="#2a1d0a"/>
   <circle cx="22" cy="180" r="9" fill="url(#lvHub)"/>
   <circle cx="22" cy="180" r="3" fill="#3b4150"/>
   <circle cx="19" cy="177" r="2" fill="#fff" opacity=".8"/>
   </g>
  </svg>
 </div>;
}
