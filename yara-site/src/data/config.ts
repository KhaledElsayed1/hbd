/**
 * ❤️ THE ONLY FILE YOU NEED TO EDIT ❤️
 * Photos/videos: run `npm run prepare-media -- "C:\your\folder"` (see README), or place files in /public/images/.
 */
export type Photo = { file: string; caption: string; date: string; category: string; message: string; featured?: boolean }

export const config = {
  name: 'Yara',
  yourName: 'Khaled ElSayed',              // signs the letter
  startDate: '2018-05-04T00:00:00',   // 📅 8 years together → set your REAL date (drives the live counter)
  intro: {
    envelopeHint: 'Something is waiting for you, my love',
    message: 'My love, before you read another word: I made this only for you. Eight years of us, in every page.',
    button: 'Open Our Story',
  },
  heroPhoto: 'yara-hero.jpg', favoritePhoto: 'yara-favorite.jpg', letterPhoto: 'yara-letter.jpg', // optional; auto photos are used if missing
  hero: { title: 'To The Most Beautiful Part of My Life', subtitle: 'Eight years, and I fall for you again every day' },

  timeline: [
    { title: 'The Day I Met You', date: 'Where it all began', text: 'I did not know it yet, but my whole life had quietly turned toward you.', photo: 'timeline-1.jpg' },
    { title: 'Our First Conversation', date: 'The first hello', text: 'Hours felt like minutes. I remember thinking: I could listen to her forever.', photo: 'timeline-2.jpg' },
    { title: 'The Early Days', date: 'Nervous smiles', text: 'Endless calls, shy laughs, and a heart that already knew what it wanted.', photo: 'timeline-3.jpg' },
    { title: 'Through Every Season', date: 'Eight years', text: 'We laughed, we grew, we held on, and somehow I fell deeper every single year.', photo: 'timeline-4.jpg' },
    { title: 'The Moments I Keep', date: 'My treasures', text: 'Some moments I replay like a favorite film. Your smile is always the closing shot.', photo: 'timeline-5.jpg' },
    { title: 'Forever Starts Now', date: 'Our future', text: 'A home full of light, a thousand adventures, and you beside me every morning for the rest of my life.', photo: 'timeline-6.jpg' },
  ],

  // Used only until you add real photos
  photos: [
    { file: 'memory-01.jpg', caption: 'The day I knew', date: 'Spring', category: 'Us', message: 'You laughed and the whole world went quiet. I knew.' },
    { file: 'memory-02.jpg', caption: 'Golden hour, golden you', date: 'Summer', category: 'Us', message: 'You glow in every light, but this one was made for you.' },
    { file: 'memory-03.jpg', caption: 'Lost with you', date: 'Autumn', category: 'Us', message: 'I never mind being lost, as long as it is with you.' },
  ] as Photo[],

  // Romantic captions shown on auto-loaded photos & videos (cycled). Edit freely.
  autoMessages: [
    { caption: 'My whole heart', message: 'Every moment with you becomes my favorite one.' },
    { caption: 'My love', message: 'Look at that smile. It still takes my breath away after all these years.' },
    { caption: 'My home', message: 'Wherever we are, with you it feels like home.' },
    { caption: 'My forever', message: 'Eight years and I would choose you again, a thousand times over.' },
    { caption: 'My everything', message: 'You are my calm, my joy, and the best thing that ever happened to me.' },
    { caption: 'Always us', message: 'In every photo, in every season, my heart is yours.' },
  ],

  yaraMeaning: 'Yara: a little butterfly, a gentle beauty. That is exactly what you are to me.',

  reasons: [
    { front: 'Your laugh', back: 'It is my favorite sound in the world. I would do anything to hear it again.' },
    { front: 'Your heart', back: 'You love so deeply, and you make everyone around you feel safe.' },
    { front: 'Your strength', back: 'You inspire me every day to be braver and better.' },
    { front: 'Your eyes', back: 'I could get lost in them. I do, often.' },
    { front: 'Eight years', back: 'You stayed, you believed in us, and you made forever feel easy.' },
    { front: 'You are home', back: 'Wherever you are is where I want to be.' },
  ],

  favorite: { title: 'My Favorite Person', text: ['Out of everyone in the world, my heart picked you, and it would pick you again in every lifetime.', 'You are my calm, my joy, my best friend, my future wife, and my greatest adventure.'] },

  letter: {
    title: 'A Letter To Ro7 2lpi', cta: 'Tap to open your letter',
    paragraphs: [
      'My love, my fiancée, my everything,',
      'For eight years I have tried to find the words for what you mean to me, and every time they fall short. So here is the simplest truth I know: you are the best thing that has ever happened to me.',
      'You turned ordinary days into stories I never want to end. You taught me what it means to be loved, and how beautiful it is to love someone back.',
      'Thank you for every smile, every hug, every patient moment, and for standing by me in the good days and the hard ones.',
      'I promise to choose you every single day for the rest of my life. I cannot wait to call you my wife.',
    ],
    signoff: 'Forever yours,',
  },

  finale: { title: 'My love, will you keep choosing me?', text: 'Because I will keep choosing you: today, tomorrow, and always.', button: 'Tap to send me your heart' },
}
