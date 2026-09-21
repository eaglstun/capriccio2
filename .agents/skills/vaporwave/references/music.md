# Music

The audio half of the aesthetic. Vaporwave was a **music genre first** — the
visual language was album art for it — so the sound is not a mood board
accessory, it is the original artifact.

## The one rule that matters

**Take something that was already finished, and damage it.**

Vaporwave is not composed so much as _re-presented_. The canonical method is:
find a commercial recording, slow it down, cut out a fragment that never
resolves, loop that fragment past the point of comfort, and bury it in reverb.
Every technique below is downstream of that one move.

The visual twin of this rule is "copy of a copy". Same idea, same reason: the
degradation is the content, not a filter over the content.

## The five techniques

### 1. Slow it — with the pitch

The signature sound is **varispeed**, not time-stretch. Tape and turntables drop
pitch and tempo _together_; modern DAW time-stretching keeps pitch fixed and
sounds nothing like the genre. Typical is **70–85% of original speed**, i.e. a
drop of roughly 3–6 semitones.

If a tool offers "preserve pitch", turn it off. That checkbox is the single
easiest way to sound wrong.

Finished tempo usually lands at **60–90 BPM**.

### 2. Chop to the part that doesn't resolve

Pick a 1–2 bar chunk and loop it. Which chunk is the entire compositional
decision. **Loop a fragment that is harmonically unfinished** — a chord that
wants to move and never gets to, a vocal phrase cut before its last syllable, a
subdominant left hanging. Looping a resolved cadence just sounds like a stuck
CD.

Suspended, add9, maj7 and no-3rd voicings all hover well and are why the source
material is usually 80s R&B, city pop and smooth jazz rather than rock.

### 3. Drown it

Large hall or plate reverb, **long decay (3–8s), high frequencies rolled off**
in the tail. Wet enough that the reverb outlasts the loop and the repeats smear
into each other. Mallsoft takes this to the extreme — the reverb becomes the
subject and the music becomes something heard from another floor of the
building.

### 4. Muffle it

Low-pass the whole thing. The reference point is **hearing music through a wall,
or over a mall PA two shops away**: no air, no top end, a soft 4–8 kHz ceiling.
Cheap-sounding on purpose.

Pair with light saturation. It should read as a fourth-generation tape dub, not
as a clean recording with an EQ move.

### 5. Make it unstable

Tape artifacts, and these are what separate convincing from karaoke-track:

| artifact          | what it is                          | how to fake it                               |
| ----------------- | ----------------------------------- | -------------------------------------------- |
| **wow**           | slow pitch drift                    | LFO on pitch, 0.5–2 Hz, ±10–30 cents         |
| **flutter**       | fast pitch jitter                   | LFO or noise on pitch, 6–15 Hz, very shallow |
| **hiss**          | tape noise floor                    | quiet pink noise, constant, under everything |
| **head bump**     | low-mid lift around 60–100 Hz       | a gentle bell boost                          |
| **dropout**       | oxide loss                          | brief random gain dips                       |
| **chorus/detune** | period-correct on almost everything | 2–3 voices, a few cents apart, slow LFO      |

Wow and flutter are the highest-value pair. A perfectly stable pitch is the tell
that something was made on a computer this decade.

## The period instrument list

When synthesizing rather than sampling, these are the sounds the genre is
quoting. All of them are 1983–1993 factory presets, and that is the point — the
genre loves the default patch.

- **Yamaha DX7** — `E.PIANO 1` (the FM Rhodes on every ballad of the decade),
  the FM bells, and the breathy FM sax lead. If you pick one sound, pick this.
- **Roland Juno-60 / 106** — the chorus pad. The Juno's chorus chip is most of
  what people mean by "warm 80s pad".
- **Korg M1** — the M1 piano, and the `Universe` pad. Ubiquitous 1988–1995.
- **Roland D-50** — `Fantasia`, `Digital Native Dance`. Glassy, bell-and-choir.
- **E-mu Emulator / Fairlight** — the sampled choir `ahh`, the orch hit.
- **TR-707 / 808 / LinnDrum** — thin, gated, unmistakably programmed drums.
- **Fretless bass and slap bass patches** — city pop and smooth jazz carriers.

Reach for **General MIDI / SoundFont-grade cheapness** deliberately. A pristine
modern soft-synth is the audio equivalent of flat design: correct, and wrong.

## Subgenres sound different — don't blend them

Matches the neighbors table in `SKILL.md`, from the audio side:

| genre                | tempo        | sounds like                                                          |
| -------------------- | ------------ | -------------------------------------------------------------------- |
| **vaporwave**        | 60–90        | slowed 80s pop, chopped, reverbed, muffled, ironic                   |
| **mallsoft**         | 50–80        | distant muzak in an empty atrium; reverb is the instrument           |
| **future funk**      | 110–130      | city pop / disco **sped up**, filtered, French-house chops, joyful   |
| **synthwave/outrun** | 80–118       | _original_ composition, sincere, arpeggiated bass, gated snare, dark |
| **hardvapour**       | 150–180      | aggressive, distorted, gabber-adjacent, deliberately hostile         |
| **slushwave**        | barely moves | vaporwave stretched to 10–30 min, near-static, huge reverb           |

The two common mix-ups: **future funk is faster than its source, not slower** —
it is the inverse operation on the same material. And **synthwave is composed,
not sampled** — asking for vaporwave and delivering an original neon-night
Outrun instrumental is the audio version of the black-background mistake.

## The listening canon

Start here, in this order — the first three are the genre's founding documents.

- **Chuck Person — _Eccojams Vol. 1_** (2010). Daniel Lopatin. The method,
  invented. Everything above is a description of this record.
- **James Ferraro — _Far Side Virtual_** (2011). Ringtones, Skype chimes, café
  ambience as composition. The corporate-consumer branch.
- **Macintosh Plus — _Floral Shoppe_** (2011). Ramona Xavier / Vektroid. The
  record that fixed the visual template too — see `canon.md`. Its best-known
  track is a slowed, chopped Diana Ross loop.
- **Blank Banshee — _Blank Banshee 0_** (2012). The trap-influenced branch;
  proof the genre could have drums that matter.
- **猫 シ Corp. / Disconscious — _Hologram Plaza_** (2014). Mallsoft's canonical
  record.
- **Saint Pepsi / Skylar Spence — _Hit Vibes_** (2013). Future funk, and the
  clearest demonstration of the speed-it-up inversion.
- **t e l e p a t h テレパシー能力者** — the slushwave / dreampunk end.

Upstream, worth hearing because it is what is being sampled: **Japanese city
pop** (Mariya Takeuchi, Anri, Toshiki Kadomatsu), 80s quiet storm and smooth
jazz, and the actual **Muzak Corporation** "stimulus progression" programming
that mallsoft imitates.

## If you are sampling, know what you are doing

The genre's native method is using someone else's commercial recording. That is
a real legal question, not a stylistic one, and it does not go away because the
result is transformative-sounding.

Safe by construction: **synthesize it**. Every technique on this page can be
applied to material you generated — the artifacts are the aesthetic, and they do
not care where the source came from. Slowed, chopped, drowned original synthesis
sounds like vaporwave; the listener cannot hear a clearance.

## Building it in code

For live-coded or procedurally generated vaporwave, the `strudel` skill covers
the pattern language and `references/sounds-and-effects.md` there has the effect
vocabulary. The mapping from this page to that one:

| technique here | Strudel-side                                               |
| -------------- | ---------------------------------------------------------- |
| slow it        | low `cps`; `slow`, `.rate` under 1 on any sampled source   |
| chop           | `chop`, `striate`, short `cat` loops                       |
| drown          | `room`, `size`, `orbit`                                    |
| muffle         | `lpf` low, `hcutoff`; a little `distort` or `crush`        |
| wow / flutter  | `perlin` or a slow `sine` onto `note` / detune, tiny range |
| detune         | stacked `note` a few cents apart; supersaw with `spread`   |

Vary rhythm and choice randomly; do not randomize pitch outside the mode. In a
genre this harmonically static, one wrong note is the only event in the bar.

## Failure modes

- **Pitch-preserved slowdown.** The most common single error. It sounds like a
  slow song, not a damaged one.
- **Clean.** No hiss, no wobble, no ceiling on the top end. Modern production
  values are the enemy; the record should sound like it was found, not made.
- **The loop resolves.** If the fragment completes its cadence, the hypnosis
  breaks every two bars and it just sounds repetitive.
- **Reverb as a knob, not a room.** A short bright plate on a dry mix reads as
  "80s ballad", not vaporwave. Commit — the tail should outlast the loop.
- **Too many ideas.** Same rule as the visual side: empty space is not wasted
  space. A four-minute track is allowed to be one loop and two events.
- **Sped up.** If it is faster than the source, you have written future funk.
  That may be fine — but say so, don't call it vaporwave.
