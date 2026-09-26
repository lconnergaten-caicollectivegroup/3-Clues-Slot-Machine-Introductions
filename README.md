# 🎰 3 Clues: Slot Machine Introductions

An interactive, live **Guess Who?** introduction game designed for a Zoom class.

Three classmates become the mystery subjects. Around 18–20 participants join from their phones, watch clues reveal one at a time, vote for who they think the mystery person is, see the room's percentages shift, and compete for a place on the final Top 3 leaderboard.

## The experience

The host shares the game screen on Zoom. Participants scan a QR code or open the player link on their phones. No participant account should be required.

Each mystery round has three progressive clues:

1. **Clue 1** appears after a slot-machine spin. Everyone votes. A correct first-clue prediction is worth **3 points**.
2. **Clue 2** spins into view. Participants who have not locked a correct answer can vote again. A correct prediction here is worth **2 points**.
3. **Clue 3** appears for the final vote. A correct prediction is worth **1 point**.
4. The machine hits **JACKPOT** and reveals the mystery classmate.
5. The revealed person briefly tells the story behind their clues.

After all three mystery people have been revealed, the game presents the **Top 3 players** by total score.

## LaShea's mystery clues

- 🐷 I once won a pig-calling contest at the State Fair.
- 👶🏾 I've delivered a baby.
- 🎓 Right now, I'm simultaneously sitting in a classroom, standing at the front of one, and building one that doesn't quite exist yet.

The other two classmates' clues will be added when provided.

## Host / Zoom view

The host experience should feel like a polished game show rather than a survey dashboard.

It needs:

- Game lobby with title, join URL, QR code, game PIN, and live participant count
- Three-person candidate display
- Large animated three-reel slot machine
- **SPIN** control to reveal clues sequentially
- Voting-open / voting-closed state
- Live vote count
- Animated percentage bars for each candidate
- No correct-answer reveal while voting is active
- JACKPOT mystery-person reveal
- Round score summary
- Final podium with 🥇 🥈 🥉
- Reset/restart controls

The host should be able to run the entire experience while screen-sharing one browser window in Zoom.

## Participant / phone view

Mobile-first and intentionally simple:

1. Open link or scan QR code.
2. Enter display name.
3. Join the live room.
4. See the current clue.
5. Tap one of the three classmates.
6. Submit vote.
7. See confirmation without learning whether the vote was correct.
8. Vote again when the next clue becomes available, unless their score for that round has already been locked.
9. See their points and final leaderboard placement.

No password, email, or app download.

## Live percentages

After each voting window, the host screen shows the room's distribution, for example:

| Candidate | Vote |
| --- | ---: |
| LaShea | 15% |
| Classmate 2 | 55% |
| Classmate 3 | 30% |

Percentages are calculated from votes submitted for the **current clue stage**, not from the total invited class.

The correct answer remains secret until the reveal.

## Scoring

| First correct prediction | Points |
| --- | ---: |
| After Clue 1 | 3 |
| After Clue 2 | 2 |
| After Clue 3 | 1 |
| Never correct | 0 |

A participant can earn points only once per mystery round. Their earliest correct prediction determines their score for that round.

Maximum score across three mystery rounds: **9 points**.

For ties on the final podium, use earliest cumulative correct-answer submission time as the first tiebreaker.

## Game structure

- **Players:** approximately 18–20 voters
- **Mystery people:** 3
- **Rounds:** 3
- **Clues per round:** 3
- **Voting stages:** 9 total
- **Target runtime:** approximately 7–10 minutes
- **Primary setting:** Zoom
- **Host device:** laptop/desktop
- **Participant devices:** phones or browsers

## Visual direction

Think **classroom game show meets a sophisticated Vegas slot machine** — energetic and playful without looking like a gambling product.

Key moments should have motion:

- reels spinning
- clue landing
- vote percentages changing
- voting countdown
- jackpot lights
- mystery-person reveal
- confetti
- final podium

Accessibility matters: readable type, high contrast, keyboard-accessible controls, reduced-motion support, and no important information conveyed by animation alone.

## Technical architecture

Planned stack:

- **Next.js + TypeScript** — web application
- **Supabase Postgres** — rooms, participants, rounds, clues, votes, and scores
- **Supabase Realtime** — live participant counts, voting, percentages, and host/player synchronization
- **Vercel** — deployment
- QR generation on the host screen for fast joining

The host is authoritative for game progression. Participant clients cannot advance rounds or reveal answers.

## Core data model

Expected entities:

- `games`
- `candidates`
- `rounds`
- `clues`
- `participants`
- `votes`
- `scores`

Each vote records the participant, round, clue stage, selected candidate, and submission timestamp. Server-side logic determines the earliest correct stage and awards the appropriate points.

## MVP acceptance criteria

The MVP is ready for class when:

- 20+ participants can join the same room simultaneously.
- The host can advance through all three rounds without refreshing.
- Every participant can vote once per clue stage.
- Votes update the host percentages in near real time.
- Percentages use only valid submitted votes for that stage.
- Correct answers stay hidden until the host triggers reveal.
- Scoring correctly awards 3/2/1 points based on earliest correct prediction.
- A participant cannot earn multiple scores in the same round.
- The final leaderboard correctly displays the Top 3.
- The interface works on current iPhone/Android browsers and a desktop Zoom screen share.
- Refreshing a participant page does not erase their identity or earned score during the game.

## Build sequence

**Phase 1 — Foundation:** Next.js app, responsive game shell, game state model, Supabase schema.

**Phase 2 — Player flow:** room join, display names, candidate voting, vote confirmation.

**Phase 3 — Host game:** lobby, QR code, slot animation, clue controls, voting state, percentages.

**Phase 4 — Scoring:** earliest-correct scoring, persistent scores, live leaderboard.

**Phase 5 — Polish:** jackpot reveal, podium, confetti, sound toggle, accessibility, Zoom/mobile testing.

## Privacy

This is a classroom introduction game. Store only what is necessary to run it. Display names are sufficient; participant emails and passwords are not required. Provide a host reset that clears the room's participant/voting data after the activity.

---

**Status:** README / product specification established. Next step: scaffold the application and database schema.

## September 2026 implementation status

The host lobby now displays a shareable participant URL and QR code. Voting shows a 35-second visual countdown, clue reels animate between spins, silhouette cards fill as clues appear, and vote percentages animate after voting locks. A participant's room/player IDs are kept in local storage so a refresh or minimized phone browser can recover the same vote state; the host room ID is kept in session storage. The build uses a pinned lockfile and Next.js 16.3.6.

**Host access:** LaShea signs in from `/host` using a one-time link sent to her CAI email. The live Supabase project has the host RLS policies and scoring function grant recorded in `supabase/migrations/`. Players join without an account. Add the final Vercel `/host` URL to Supabase Auth's redirect allow list, then verify the email-link callback and a complete game on two devices before distributing the QR code.

The second and third classmates' names and six clue texts remain placeholders. Replace them in `lib/game.ts` before the course session. The standalone `/` route is a local demonstration and is not synchronized with the live `/host` and `/play` routes.

## SOLES visual direction

The game uses an Aspire U inspired bright blue and gold treatment with a USD campus slot machine. Its original illustrated reels depict The Immaculata, Founders Chapel, and a palm-lined Alcalá Park walkway. These are illustrative references, not official USD marks or photographs. The host and player share the same landmark art; the three player silhouettes fill as answers are revealed.
