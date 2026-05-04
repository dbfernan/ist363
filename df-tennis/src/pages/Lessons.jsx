import { useState } from 'react'

export default function Lessons() {
  const [form, setForm] = useState({
    email: '', name: '', goal: '', level: '', favPlayer: '', message: '',
  })

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = () => {
    // Wire up your email/backend here. For now, just log.
    console.log('Form submitted:', form)
    alert('Message sent! (hook up your backend here)')
  }

  const RadioCard = ({ name, value, label, sub }) => (
    <label className={`flex-1 flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer hover:border-purple transition ${form[name] === value ? 'border-purple bg-lilac' : 'border-lilac'}`}>
      <input type="radio" name={name} value={value} checked={form[name] === value} onChange={set(name)} className="accent-purple shrink-0" />
      <span className="text-sm font-semibold text-plum">
        {label} {sub && <span className="text-plum/45 font-medium">{sub}</span>}
      </span>
    </label>
  )

  return (
    <main id="main" className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 page-enter">

      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-plum mb-2">Lesson Information</h1>
        <p className="text-plum/50 text-sm font-medium mb-8">Affordable coaching for all skill levels</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <div className="bg-white border-2 border-lilac rounded-2xl px-8 py-6 text-left max-w-xs w-full shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-purple/60 mb-2">One-on-One</p>
            <p className="text-3xl font-extrabold text-plum">$15<span className="text-base font-semibold text-plum/40"> / hr</span></p>
          </div>
          <div className="bg-white border-2 border-lilac rounded-2xl px-8 py-6 text-left max-w-xs w-full shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-purple/60 mb-2">Group Sessions</p>
            <p className="text-lg font-bold text-plum">Let's work something out!</p>
            <p className="text-sm text-plum/50 mt-1">Just send me a text</p>
          </div>
        </div>

        <p className="max-w-2xl mx-auto text-sm text-plum/60 font-medium leading-relaxed">
          As a new coach in the area, I want players to have an accessible option to reach the next level without having to break the bank. Prices are subject to change over time.
        </p>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-plum text-center mb-6">Get in Touch</h2>

        <div className="bg-white border border-lilac rounded-2xl p-8 flex flex-col gap-5 shadow-sm">

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-purple mb-1.5">Email Address</label>
            <input type="email" placeholder="name@example.com" value={form.email} onChange={set('email')}
              className="w-full border border-lilac rounded-xl px-4 py-3 text-plum text-sm placeholder-plum/30 transition" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-purple mb-1.5">Name</label>
            <input type="text" placeholder="Your Name" value={form.name} onChange={set('name')}
              className="w-full border border-lilac rounded-xl px-4 py-3 text-plum text-sm placeholder-plum/30 transition" />
          </div>

          <div>
            <p className="block text-xs font-bold uppercase tracking-widest text-purple mb-2">Goal</p>
            <div className="flex gap-3">
              <RadioCard name="goal" value="fun" label="Fun-Focused" />
              <RadioCard name="goal" value="competition" label="Competition-Focused" />
            </div>
          </div>

          <div>
            <p className="block text-xs font-bold uppercase tracking-widest text-purple mb-2">Level</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <RadioCard name="level" value="beginner"     label="Beginner"     sub="(0–1 yrs)" />
              <RadioCard name="level" value="intermediate" label="Intermediate" sub="(2–3 yrs)" />
              <RadioCard name="level" value="advanced"     label="Advanced"     sub="(4+ yrs)" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-purple mb-1.5">Favorite Tennis Player?</label>
            <input type="text" placeholder="e.g. Roger Federer" value={form.favPlayer} onChange={set('favPlayer')}
              className="w-full border border-lilac rounded-xl px-4 py-3 text-plum text-sm placeholder-plum/30 transition" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-purple mb-1.5">Message</label>
            <textarea rows={4} placeholder="Your message..." value={form.message} onChange={set('message')}
              className="w-full border border-lilac rounded-xl px-4 py-3 text-plum text-sm placeholder-plum/30 resize-none transition" />
          </div>

          <button onClick={handleSubmit}
            className="w-full bg-purple text-white font-bold py-3 rounded-xl hover:bg-plum-mid transition text-sm">
            Send Message
          </button>
        </div>
      </div>
    </main>
  )
}
