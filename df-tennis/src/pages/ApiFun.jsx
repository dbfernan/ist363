import { useState, useCallback } from 'react'
import usOpen from '../data/usOpen'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const years = Object.keys(usOpen).map(Number)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildQueue() {
  return shuffle(years).slice(0, 10).map(year => ({
    year,
    gender: Math.random() < 0.5 ? 'mens' : 'womens',
  }))
}

function getWrongYears(correctYear) {
  return shuffle(years.filter(y => y !== correctYear)).slice(0, 3)
}

// ─── Birthday Lookup ──────────────────────────────────────────────────────────
function BirthdayLookup() {
  const [date, setDate] = useState('')
  const [state, setState] = useState('idle') // idle | loading | result | error
  const [result, setResult] = useState(null)
  const [error, setError]   = useState('')

  const lookup = () => {
    if (!date) { setState('error'); setError('Please pick your birthday first!'); return }
    const year = parseInt(date.split('-')[0])
    setState('loading')
    setTimeout(() => {
      if (year < 1968) {
        setState('error')
        setError(`The US Open Open Era began in 1968. We don't have records before that — but happy (belated) birthday! 🎂`)
      } else if (year > 2025) {
        setState('error')
        setError(`We don't have results for ${year} yet. Check back after the tournament wraps up!`)
      } else {
        const d = new Date(date + 'T12:00:00')
        const formatted = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        setState('result')
        setResult({ year, data: usOpen[year], formatted })
      }
    }, 650)
  }

  return (
    <div className="w-full max-w-xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-plum mb-3">
          Who Won the US Open<br />on Your Birthday?
        </h1>
        <p className="text-plum/50 text-sm font-medium max-w-xl mx-auto leading-relaxed">
          Enter your birthday and find out who took home the trophy at the US Open the year you were born.
        </p>
      </div>

      <div className="bg-white border-2 border-lilac rounded-2xl px-8 py-8 shadow-sm mb-8">
        <label className="block text-xs font-bold uppercase tracking-widest text-purple mb-2">Your Birthday</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && lookup()}
          className="w-full border-2 border-lilac rounded-xl px-4 py-3 text-plum text-sm transition mb-5"
        />
        <button
          onClick={lookup}
          className="w-full bg-purple text-white font-bold py-3 rounded-xl hover:bg-plum-mid active:scale-95 transition text-sm"
        >
          Find Out →
        </button>
      </div>

      {state === 'loading' && (
        <div className="flex flex-col items-center gap-4 py-10 text-plum/40">
          <div className="relative w-10 h-10">
            <div className="pulse-ring absolute inset-0 rounded-full border-2 border-purple" />
            <div className="absolute inset-0 rounded-full border-2 border-purple/30" />
          </div>
          <p className="text-sm font-semibold">Checking the records…</p>
        </div>
      )}

      {state === 'error' && (
        <div className="slide-up bg-white border-2 border-lilac rounded-2xl px-6 py-8 text-center shadow-sm">
          <p className="text-3xl mb-3">🎾</p>
          <p className="font-extrabold text-plum mb-2">Couldn't find that one</p>
          <p className="text-sm text-plum/50 leading-relaxed">{error}</p>
        </div>
      )}

      {state === 'result' && result && (
        <div className="slide-up bg-white border-2 border-lilac rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-plum px-6 py-6 text-center">
            <p className="text-lilac/50 text-xs font-bold uppercase tracking-widest mb-1.5">{result.formatted}</p>
            <p className="text-white text-2xl font-extrabold">{result.year} US Open</p>
            <p className="text-lilac/40 text-xs mt-1 font-medium">Flushing Meadows · New York</p>
          </div>
          <div className="divide-y divide-lilac">
            {['mens', 'womens'].map(g => (
              <div key={g} className="px-6 py-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-lilac flex items-center justify-center shrink-0 text-xl">🏆</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-purple/60 mb-0.5">
                    {g === 'mens' ? "Men's Singles" : "Women's Singles"}
                  </p>
                  <p className="text-base font-extrabold text-plum">{result.data[g]}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-lilac/25 text-center">
            <p className="text-xs text-plum/35 font-medium">Data covers the Open Era (1968–present)</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
function Quiz() {
  const [phase, setPhase] = useState('start') // start | playing | end
  const [queue, setQueue]   = useState([])
  const [round, setRound]   = useState(0)
  const [score, setScore]   = useState(0)
  const [streak, setStreak] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [chosen, setChosen]     = useState(null)
  const [options, setOptions]   = useState([])
  const [feedback, setFeedback] = useState(null) // null | 'correct' | 'wrong'
  const [endTitle, setEndTitle] = useState('')
  const [endSub, setEndSub]     = useState('')

  const currentQ = queue[round - 1]

  const buildRound = useCallback((q) => {
    const wrong = getWrongYears(q.year)
    return shuffle([q.year, ...wrong])
  }, [])

  const startQuiz = () => {
    const q = buildQueue()
    setQueue(q)
    setRound(1)
    setScore(0)
    setStreak(0)
    setAnswered(false)
    setChosen(null)
    setFeedback(null)
    setOptions(buildRound(q[0]))
    setPhase('playing')
  }

  const handleAnswer = (y) => {
    if (answered) return
    setAnswered(true)
    setChosen(y)
    const correct = y === currentQ.year

    let newScore  = score  + (correct ? 1 : 0)
    let newStreak = correct ? streak + 1 : 0
    setScore(newScore)
    setStreak(newStreak)
    setFeedback(correct ? 'correct' : 'wrong')

    setTimeout(() => {
      if (round >= 10) {
        const pct = newScore / 10
        let title, sub
        if (pct === 1)    { title = 'Perfect Score!'; sub = 'You got all 10 right!' }
        else if (pct >= 0.8) { title = 'Excellent!';  sub = 'Try again for a higher score!' }
        else if (pct >= 0.6) { title = 'Great!';      sub = 'Try again for a higher score!' }
        else if (pct >= 0.4) { title = 'Good!';       sub = 'Try again for a higher score!' }
        else                 { title = 'It happens';  sub = 'Try again for a higher score!' }
        setEndTitle(title)
        setEndSub(sub)
        setPhase('end')
      } else {
        const nextRound = round + 1
        setRound(nextRound)
        setOptions(buildRound(queue[nextRound - 1]))
        setAnswered(false)
        setChosen(null)
        setFeedback(null)
      }
    }, 1400)
  }

  const btnClass = (y) => {
    if (!answered) return 'border-lilac text-plum hover:border-purple hover:bg-lilac'
    if (y === currentQ.year) return 'border-green-400 bg-green-50 text-green-700'
    if (y === chosen)        return 'border-red-300 bg-red-50 text-red-500'
    return 'border-lilac text-plum/40'
  }

  return (
    <div className="w-full max-w-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-plum mb-2">Guess the Year Game</h2>
        <p className="text-plum/50 text-sm font-medium leading-relaxed">
          The name of a US Open champion is shown, pick the year they won. How many can you get right in 10 rounds?
        </p>
      </div>

      {/* Scorebar */}
      {phase === 'playing' && (
        <div className="mb-5 bg-white border-2 border-lilac rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
          {[['Round', `${round} / 10`], ['Score', score], ['Streak', `🔥 ${streak}`]].map(([l, v]) => (
            <div key={l} className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-purple/50 mb-0.5">{l}</p>
              <p className="text-xl font-extrabold text-plum">{v}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white border-2 border-lilac rounded-2xl overflow-hidden shadow-sm">

        {/* Start */}
        {phase === 'start' && (
          <div className="px-8 py-10 text-center">
            <p className="text-5xl mb-5">🎾</p>
            <p className="text-plum font-bold mb-6 text-sm leading-relaxed">
              Test your US Open knowledge across the Open Era (1968–2025).
            </p>
            <button onClick={startQuiz}
              className="bg-purple text-white font-bold px-8 py-3 rounded-xl hover:bg-plum-mid active:scale-95 transition text-sm">
              Start Game →
            </button>
          </div>
        )}

        {/* Playing */}
        {phase === 'playing' && currentQ && (
          <div>
            <div className="bg-plum px-6 py-5 text-center">
              <p className="text-lilac/50 text-xs font-bold uppercase tracking-widest mb-1.5">
                {currentQ.gender === 'mens' ? "Men's Singles Champion" : "Women's Singles Champion"}
              </p>
              <p className="text-white text-xl font-extrabold leading-tight">{usOpen[currentQ.year][currentQ.gender]}</p>
              <p className="text-lilac/40 text-xs mt-1 font-medium">won the US Open in…?</p>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5">
              {options.map(y => (
                <button
                  key={y}
                  onClick={() => handleAnswer(y)}
                  disabled={answered}
                  className={`w-full border-2 rounded-xl py-3 text-sm font-extrabold transition active:scale-95 ${btnClass(y)}`}
                >
                  {y}
                </button>
              ))}
            </div>
            {feedback && (
              <div className="px-6 pb-5 text-center">
                {feedback === 'correct'
                  ? <p className="text-green-600 font-bold text-sm">✓ Correct! {currentQ.year} was the winner.</p>
                  : <p className="text-red-500 font-bold text-sm">✗ The answer was {currentQ.year}.</p>
                }
              </div>
            )}
          </div>
        )}

        {/* End */}
        {phase === 'end' && (
          <div className="px-8 py-10 text-center">
            <p className="text-5xl mb-4">🏆</p>
            <p className="text-xl font-extrabold text-plum mb-1">{endTitle}</p>
            <p className="text-sm text-plum/50 mb-2">{endSub}</p>
            <p className="text-2xl font-extrabold text-purple mb-6">{score} / 10</p>
            <button onClick={startQuiz}
              className="bg-purple text-white font-bold px-8 py-3 rounded-xl hover:bg-plum-mid active:scale-95 transition text-sm">
              Play Again →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ApiFun() {
  return (
    <main id="main" className="flex-1 max-w-5xl mx-auto w-full px-6 py-14 flex flex-col items-center page-enter">
      <BirthdayLookup />
      <div className="w-full max-w-xl my-10 h-px bg-lilac" />
      <Quiz />
    </main>
  )
}
