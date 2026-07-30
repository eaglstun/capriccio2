// The Chronicle — replay the action log without disturbing the live city
//
// Written from scratch for CHRONICLE.md. This was never in the bundle.
//
// The folio is what you chose to keep; the Chronicle is everything that
// happened. This module is the engine half: enter, scrub, exit. The scrub UI
// and engrave-from-the-past sit on top of it.

/**
 * A serialized infill state, as produced by `InfillSystem.serialize()`. Opaque
 * here — the Chronicle only ever hands it straight back to the restore hook.
 */
type InfillSnapshot = ReturnType<any>;

/**
 * Everything the Chronicle needs from the rest of the game, injected rather
 * than imported.
 *
 * `rebuild` is the reason for this shape. Rebuilding the world is a five-step
 * sequence with two sets of magic ground-pocket constants, and UNDO already
 * performs it (`rc` in 17-bootstrap). Duplicating it here would mean two
 * copies that must be kept in step forever; importing it from the bootstrap
 * would be circular. So the bootstrap passes its own rebuild in, and there
 * stays exactly one definition of what "rebuild the world from these actions"
 * means.
 */
export interface ChronicleDeps {
  /** Live game state — read for `playerActions`, never written. */
  state: any;
  /** The seeded starting ruins, which are NOT in the player log. */
  seedActions: () => any[];
  /** Clear and rebuild the world from `actions`. Infill is NOT restored. */
  rebuild: (actions: any[]) => void;
  /** Hand a snapshot back to `InfillSystem.restore` with its pocket matcher. */
  restoreInfill: (snapshot: InfillSnapshot) => void;
  /** `InfillSystem.serialize()`. */
  serializeInfill: () => InfillSnapshot;
  /** The citizen system — synced after every rebuild, hidden while replaying. */
  citizens: any;
  /**
   * Suppress autosave. Non-negotiable: see `enter`.
   */
  setSaveSuppressed: (on: boolean) => void;
}

export class Chronicle {
  /** True between `enter` and `exit`. */
  active = false;
  /**
   * How many player actions are currently applied. Ranges 0..length — an
   * index into the log, not an array index, so `length` means "the present".
   */
  index = 0;

  private deps: ChronicleDeps;
  /** Infill as it stood when we entered. The city's only copy while replaying. */
  private snapshot: InfillSnapshot = null;
  /** `gameState.dirty` as it stood when we entered, restored verbatim on exit. */
  private wasDirty = false;

  constructor(deps: ChronicleDeps) {
    this.deps = deps;
  }

  /** Number of player actions in the log — the "present" index. */
  get length(): number {
    return this.deps.state.playerActions.length;
  }

  /**
   * Enter the Chronicle. Idempotent.
   *
   * Two things are captured here and nowhere else:
   *
   * **The infill snapshot.** Vernacular buildings are procedural and are NOT
   * derivable from the action log — they are serialized separately in the save.
   * Replaying clears them, so the snapshot taken here is the only copy in
   * existence until `exit` puts it back. It is taken ONCE, not per scrub: every
   * extra serialize/restore round-trip is another chance for the pocket matcher
   * to reassign a building, and one round-trip is what UNDO already costs.
   *
   * **Autosave suppression.** This is the actual corruption vector, and it is
   * not the action log — `playerActions` is only ever read here. It is
   * `saveGame`, which persists `infill: InfillSystem.serialize()` from the LIVE
   * world. Autosave fires from the 8-second tick whenever `dirty` is set, and
   * again on tab-hide. Either one landing mid-scrub would write a half-replayed
   * city's infill over the real one, permanently. So saving is suppressed for
   * the whole visit and restored on the way out.
   */
  enter(): void {
    if (this.active) return;
    this.snapshot = this.deps.serializeInfill();
    this.wasDirty = this.deps.state.dirty;
    this.deps.setSaveSuppressed(true);
    this.active = true;
    this.index = this.length;
    this.showCitizens(false);
  }

  /**
   * Replay the first `k` player actions. Clamped, so callers may pass a raw
   * slider value.
   *
   * Replays the BONES only — architecture in the order it was built, with no
   * infill and no citizens. That is the honest thing to show: the action log is
   * the record of the player's hand, while the buildings and the people were
   * the city's response. It also cannot drift from the truth, because it is
   * replaying the only thing that was actually recorded.
   *
   * `playerActions` is sliced, never mutated. Nothing in the Chronicle may
   * append to it.
   */
  scrubTo(k: number): void {
    if (!this.active) return;
    const target = Math.max(0, Math.min(this.length, Math.round(k)));
    this.index = target;
    this.deps.rebuild([
      ...this.deps.seedActions(),
      ...this.deps.state.playerActions.slice(0, target),
    ]);
    // Re-home the agents even though they are hidden. rebuildAll replaces the
    // nav graph wholesale, and an agent left holding `homeNode` from the old
    // one would be indexing a graph that no longer has it.
    this.deps.citizens.sync();
  }

  /**
   * Return to the present and put the city back exactly as it was.
   *
   * Idempotent, and safe to call when never entered. The order matters:
   * rebuild the full architecture first so every pocket exists again, THEN
   * restore infill into it, THEN re-sync citizens — whose population is derived
   * from `infill.capacity` and would otherwise settle at the base 14.
   */
  exit(): void {
    if (!this.active) return;
    this.deps.rebuild([
      ...this.deps.seedActions(),
      ...this.deps.state.playerActions,
    ]);
    if (this.snapshot) this.deps.restoreInfill(this.snapshot);
    this.deps.citizens.sync();
    this.showCitizens(true);
    this.index = this.length;
    this.snapshot = null;
    // Restored, not cleared: entering the Chronicle is not a save-worthy event,
    // but it must not swallow an edit that was pending when the player opened
    // it either.
    this.deps.state.dirty = this.wasDirty;
    this.deps.setSaveSuppressed(false);
    this.active = false;
  }

  /**
   * Label for position `k`: the historical day where the action carries one,
   * an ordinal where it does not.
   *
   * Actions built before the day/hour stamping landed have no timestamp, and
   * the log is then an ordering rather than a timeline. Saying "day 4" over a
   * city that cannot know its own day would be a lie, and this is a game about
   * the difference between what happened and what survives.
   */
  captionAt(k: number): string {
    if (k <= 0) return "before the first stone";
    const action = this.deps.state.playerActions[k - 1];
    return action && typeof action.day === "number"
      ? `day ${action.day}`
      : `the ${ordinal(k)} thing you built`;
  }

  /** Hide or show the citizen instancing — the "bones, not life" of the spec. */
  private showCitizens(on: boolean): void {
    for (const mesh of this.deps.citizens.meshes) mesh.visible = on;
    if (!on) this.deps.citizens.marker.visible = !1;
  }
}

/** 1 -> "first", 23 -> "23rd". Small words spelled, the rest suffixed. */
function ordinal(n: number): string {
  const words = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
  ];
  if (n <= words.length) return words[n - 1];
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  const suffix = { 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th";
  return `${n}${suffix}`;
}
