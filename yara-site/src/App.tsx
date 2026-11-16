import { useState } from 'react'
import Intro from './components/Intro'
import Particles from './components/Particles'
import HeartsCursor from './components/HeartsCursor'
import Music from './components/Music'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import NameReveal from './components/NameReveal'
import Gallery from './components/Gallery'
import BackgroundPhotos from './components/BackgroundPhotos'
import Stories from './components/Stories'
import Reasons from './components/Reasons'
import Counter from './components/Counter'
import Favorite from './components/Favorite'
import Letter from './components/Letter'
import Finale from './components/Finale'
import Birthday from './components/Birthday'
export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <>
      <BackgroundPhotos /><Particles /><HeartsCursor /><Music />
      {!ready && <Intro onDone={() => setReady(true)} />}
      <main className="relative z-10">
        <Hero ready={ready} /><Timeline /><NameReveal /><Gallery /><Stories /><Reasons /><Counter /><Favorite /><Letter /><Finale /><Birthday />
      </main>
    </>
  )
}
