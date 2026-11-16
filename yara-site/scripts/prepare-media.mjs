// Usage: npm run prepare-media -- "C:\path\to\folder"  [--png] [--all]
// Converts HEIC->JPG, resizes (originals untouched), makes thumbnails, removes duplicates,
// re-encodes videos to web MP4 (needs ffmpeg-static), and writes src/data/media.json
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { spawnSync } from 'node:child_process'
import sharp from 'sharp'
import convert from 'heic-convert'
let ffmpeg = null
try { ffmpeg = (await import('ffmpeg-static')).default } catch {}
const src = process.argv[2]
const withPng = process.argv.includes('--png'), all = process.argv.includes('--all')
if (!src || !fs.existsSync(src)) { console.log('Usage: npm run prepare-media -- "C:\\path\\to\\your\\folder"'); process.exit(1) }
const root = path.resolve(import.meta.dirname, '..'), pub = path.join(root, 'public')
const G = path.join(pub, 'images/gallery'), T = path.join(pub, 'images/thumbs'), V = path.join(pub, 'videos')
for (const d of [G, T, V]) { fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true }) }
const M = ['January','February','March','April','May','June','July','August','September','October','November','December']
const info = n => { const m = n.match(/^(\d{4})_(\d{2})_(\d{2})/); return m ? { key: `${m[1]}-${m[2]}-${m[3]}`, date: `${M[+m[2] - 1]} ${m[1]}`, year: m[1] } : { key: '9999', date: '', year: '' } }
const sha = b => crypto.createHash('sha1').update(b).digest('hex')
const files = fs.readdirSync(src).filter(f => fs.statSync(path.join(src, f)).isFile()).sort((a, b) => (info(a).key + a).localeCompare(info(b).key + b))
const seen = new Set(), photos = [], videos = []
let dups = 0
for (const f of files) {
  const p = path.join(src, f), i = info(f)
  if (/\.(jpe?g|heic|heif|png)$/i.test(f)) {
    if (/\.png$/i.test(f) && !withPng) continue // usually screenshots
    const buf = fs.readFileSync(p), h = sha(buf)
    if (seen.has(h)) { dups++; continue } seen.add(h)
    try {
      const b = /\.hei[cf]$/i.test(f) ? Buffer.from(await convert({ buffer: buf, format: 'JPEG', quality: 0.92 })) : buf
      const id = String(photos.length + 1).padStart(3, '0')
      await sharp(b).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(G, `p${id}.jpg`))
      await sharp(b).rotate().resize({ width: 640, withoutEnlargement: true }).jpeg({ quality: 75 }).toFile(path.join(T, `t${id}.jpg`))
      photos.push({ file: `gallery/p${id}.jpg`, thumb: `thumbs/t${id}.jpg`, date: i.date, year: i.year })
      process.stdout.write(`\rphotos: ${photos.length}`)
    } catch (e) { console.log(`\nskipped ${f}: ${e.message}`) }
  } else if (/\.(mp4|mov|m4v)$/i.test(f)) {
    if (!all && /^(ScreenRecording|Screen Recording)/i.test(f)) continue
    const h = sha(fs.readFileSync(p).subarray(0, 4_000_000)) + fs.statSync(p).size
    if (seen.has(h)) { dups++; continue } seen.add(h)
    const id = String(videos.length + 1).padStart(3, '0')
    if (ffmpeg) {
      const out = path.join(V, `v${id}.mp4`)
      const r = spawnSync(ffmpeg, ['-y', '-i', p, '-vf', "scale='min(720,iw)':-2", '-c:v', 'libx264', '-crf', '27', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out], { stdio: 'ignore' })
      if (r.status !== 0) { console.log(`\nskipped video ${f}`); continue }
      spawnSync(ffmpeg, ['-y', '-ss', '0.5', '-i', out, '-frames:v', '1', '-vf', 'scale=540:-2', path.join(V, `v${id}.jpg`)], { stdio: 'ignore' })
      videos.push({ file: `v${id}.mp4`, poster: `v${id}.jpg`, date: i.date })
    } else { const e = path.extname(f).toLowerCase(); fs.copyFileSync(p, path.join(V, `v${id}${e}`)); videos.push({ file: `v${id}${e}`, poster: '', date: i.date }) }
    process.stdout.write(`\rvideos: ${videos.length}  `)
  }
}
fs.writeFileSync(path.join(root, 'src/data/media.json'), JSON.stringify({ photos, videos }, null, 1))
console.log(`\nDone ✔ ${photos.length} photos, ${videos.length} videos, ${dups} duplicates skipped.${ffmpeg ? '' : ' (ffmpeg missing: videos copied as-is)'}`)
