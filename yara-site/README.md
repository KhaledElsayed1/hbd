# For Yara ❤️

## Run
npm install && npm run dev      (build: npm run build)

## Customize — everything is in `src/data/config.ts`
Names, start date (live counter), messages, timeline, reasons, letter, gallery captions/dates/categories.

## Where to put photos → `public/images/`
Use the exact filenames from config (or change the filename in config):
- yara-hero.jpg — big hero photo (landscape or portrait works)
- yara-favorite.jpg — "My Favorite Person" arch portrait (3:4 ideal)
- yara-letter.jpg — small round photo on the letter
- timeline-first-meeting.jpg, timeline-first-conversation.jpg, timeline-memories.jpg, timeline-special.jpg, timeline-journey.jpg, timeline-future.jpg (4:3 ideal)
- memory-01.jpg … memory-08.jpg — gallery; entries with `featured: true` also appear in "Every Picture Has a Story"
Add/remove a gallery photo = add/remove one line in `photos`. Missing photos show an elegant placeholder. Photos are never altered; keep them under ~500KB for speed.

## Music
Optional: put `music.mp3` in `public/audio/`. If absent, a soft synthesized pad plays. Audio only starts when she taps the music button.

## Auto-load ALL your photos & videos (recommended)
npm run prepare-media -- "C:\Users\USER\Downloads\صور"
Converts HEIC→JPG, resizes + makes thumbnails, removes duplicates, re-encodes videos for the web, and fills the gallery/videos automatically. Screenshots (PNG) and screen recordings are skipped; add --png or --all to include them. Re-run any time.
Photos AND videos are mixed together in one random gallery (whole picture shown, never cropped). The floating background photos use the same set.
Hero/favorite/letter/timeline use your first auto photos unless you put named files (e.g. yara-hero.jpg) in public/images/.

## Music
A romantic generative piano plays when she opens the envelope (button bottom-right to pause). To use your own song put it at public/audio/music.mp3.
