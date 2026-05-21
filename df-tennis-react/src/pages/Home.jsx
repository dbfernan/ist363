import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'

const experience = [
  { label: 'Varsity',       text: "Played on FM's Varsity Team from 7th–12th Grade" },
  { label: 'Singles',       text: '#1 Singles Player from 11th–12th Grade' },
  { label: 'USTA Juniors',  text: 'Won many Junior-level USTA Tournaments' },
  { label: 'Championships', text: 'Played in Regional & Sectional-level Championships' },
  { label: 'Certified',     text: "Completed USTA's Coaching Workshop in Parsippany, NJ" },
  { label: 'Community',     text: "Coached at Aceing Autism, Drumlins Camp & FM's Summer Camp '25" },
]

const ChevronRight = () => (
  <svg className="w-4 h-4 text-purple group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

export default function Home() {
  return (
    <main id="main" className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 page-enter">

      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-10 items-center mb-14">
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-plum mb-4">
            Local Coaching From a Seasoned Player
          </h1>
          <p className="text-base leading-relaxed text-plum/70 font-medium max-w-xl mx-auto sm:mx-0">
            Hello, I'm David! Tennis has been one of my biggest passions for many years, and by using my knowledge of the sport and high-level competitive experience, I want to play a part in the stories of future generations in CNY through coaching! As I'm now attending Syracuse University, my days of Junior-level USTA tournaments and Varsity are over — but I'm still playing and competing in various clubs and leagues. As a coach I aim to teach form, tactics, mentality, and more, all while having fun and developing passion for tennis in new players!
          </p>
        </div>
        <div className="flex-1 flex justify-center sm:justify-end">
          <Carousel />
        </div>
      </div>

      {/* Experience */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-extrabold text-plum mb-2">Playing & Coaching Experience</h2>
        <p className="text-sm text-plum/45 font-medium mb-8">A track record built on the court</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {experience.map(({ label, text }) => (
            <div key={label} className="bg-white border-2 border-lilac rounded-2xl px-6 py-5 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-purple/60 mb-2">{label}</p>
              <p className="text-sm font-bold text-plum leading-snug">{text}</p>
            </div>
          ))}
        </div>

        <Link to="/lessons" className="mt-2 block w-full bg-white border-2 border-purple rounded-2xl px-6 py-5 text-center shadow-sm hover:bg-lilac transition group">
          <p className="text-lg font-extrabold text-plum flex items-center justify-center gap-2">
            Lesson Information <ChevronRight />
          </p>
        </Link>

        <Link to="/api-fun" className="mt-3 block w-full bg-white border-2 border-lilac rounded-2xl px-6 py-5 text-center shadow-sm hover:bg-lilac hover:border-purple transition group">
          <p className="text-lg font-extrabold text-plum flex items-center justify-center gap-2">
            API Fun <ChevronRight />
          </p>
        </Link>
      </div>
    </main>
  )
}
