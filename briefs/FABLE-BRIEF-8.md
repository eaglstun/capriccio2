# Brief 8 — an in-game walkthrough

A first-run tutorial, played inside the game. Not a page, not a wall of text,
not a video. Deliberate camera work, real instructions naming real keys and real
buttons, and the player finishes it **having already built something and seen
the game answer.**

Goal: lowest possible barrier to entry. Someone who has never seen this should
be playing confidently in under two minutes.

---

## The arc — six beats

The order matters. Each beat earns the next.

**1. Look.** Slow establishing move over the ruins. One line: _drag to look
around, scroll to zoom._ Wait for the player to actually do both. Do not advance
on a timer.

**2. It is already inhabited.** Frame the timber shanties and the people
walking. Say what they are: forty-six of them, living in ruins somebody else
left. This is the premise, and it takes one sentence.

**3. Establish.** Highlight **ESTABLISH** on the tool bar. _Everything starts
from a pier._ The player clicks the tool, then clicks the ground. Camera frames
where they placed it.

**4. Connect.** Highlight **RISE** (or SPAN). _A pier alone is a post. Connect
it and it becomes a way through._ The player builds one. Now they have made a
structure.

**5. The answer — this is the beat that matters.** Their structure has emitted
pockets. Move the camera to one and hold. Someone moves in, or is about to. The
line is the game's whole thesis: **you did not place that. They chose it.**

Everything before this is setup. If the player understands nothing else, they
should leave understanding that they build _architecture_ and the citizens
decide what it becomes.

**6. Hand off, and get out of the way.** Marcus is already asking for a way up
to the high terrace — the game's own first request. Point at it, say that is the
first job, and end. Do not invent a tutorial objective; the game has one.

---

## The UX bar

This is where tutorials usually fail. Specifics:

**Teach by doing.** Every beat with an action advances **only when the player
performs it** — not on a timer, not on a "next" button. Beats with nothing to do
(2, 5) may advance on a short hold.

**Never trap anyone.** A quiet, always-visible _skip_ — not hidden, not a
confirm dialog. Someone who has played before must be able to leave in one
click. Returning players should never see it at all (see persistence).

**Name the actual input.** "Drag to orbit." "Scroll to zoom." "Click ESTABLISH."
Not "use the camera controls." If a key does it, print the key.

**Point at the real thing.** Highlight the actual tool button — a soft ring or
pulse on the element itself. **Do not dim the whole screen**; full-screen scrims
are the cheap solution and they make the game feel like a form. A target should
glow; the world should stay lit.

**One instruction at a time.** Short, imperative, positioned near what it refers
to. Never a paragraph. Never two asks in one step.

**The camera must never fight the player.** If they drag mid-move, yield
instantly and permanently for that beat — their input always wins. Ease with a
smooth curve over 1.2–2s, keep the horizon level, and never swing more than
about 90° in one move. Honour `prefers-reduced-motion`: cut instead of fly.

**Never block input.** The player can always build, orbit, and ignore you. The
tutorial observes and reacts; it does not lock the game down.

---

## Persistence — do not touch the save

**The save format is frozen.** Do not add a tutorial field to it.

Use a **separate localStorage key** — `capriccio-tutorial-v1` — holding whether
it has been completed or skipped. Show the walkthrough only when that key is
absent **and** the game is fresh (no `capriccio-save-v1`, zero player actions).
A returning player must never see it.

`?fresh` should clear the tutorial flag too, so the first-run experience can be
tested. That is the one place these two keys should interact.

---

## Tone

Match the game. It is quiet, confident and slightly formal — _"the citizens will
find their own uses for what you leave them"_. The tutorial should sound like
the same writer.

No exclamation marks. No "Great job!". No mascot. Do not congratulate the player
for clicking a button; they know they clicked it. Say what happened and what it
means.

---

## Frozen — unchanged

`pickPocket`, the five stat formulas, `applyAction`, the pocket model, the save
format, catalogue `key` values, structure envelopes. `legacy/` never edited.
Never run `split_bundle.py --write`; never delete `src/.hand-edited`. No shipped
binary assets or runtime fetches. Keep the triplanar hatching and the dither. No
hand-renaming.

The tutorial must add **no new game mechanics.** It teaches the existing ones.
Anything the player builds during it is a real action and persists normally.

## Verify — this one needs playing, not inspecting

`yarn build` green; fresh game still reports **24 structures, 48 pockets, 1331
navNodes, 46 pop, kinds 12/34/1/1**.

Then **play it start to finish in a browser at least twice**:

1. Fresh game — walk the whole thing, confirm every beat advances on the real
   action and the camera never fights you.
2. Reload — confirm it does not reappear.
3. Skip on a fresh game — confirm it exits cleanly and does not return.

**Do not claim it works if you have not played it.** A tutorial that advances on
a condition that never fires looks fine in code and is broken for everyone.

Serve on **8124 or your own port — 8123 is the ORIGINAL game.** Never `?fresh`
on 8123.

## Report back

What changed by file; how each beat advances; how the camera yields to input;
bundle size; draws/tris; `CAP.status()` confirmed; what you chose not to do;
screenshots of at least three beats including the moment in beat 5.
