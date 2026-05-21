import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',        label: 'Home' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/api-fun', label: 'API Fun' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-plum sticky top-0 z-50 shadow-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-white font-extrabold text-lg tracking-tight hover:text-lilac transition flex items-center gap-2">
          <img src="/media/favicon.ico" className="w-5 h-5" alt="" />
          DF Tennis Coaching
        </NavLink>

        {/* Hamburger */}
        <button
          className="sm:hidden text-white/70 hover:text-white focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setOpen(o => !o)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop links */}
        <ul className="hidden sm:flex gap-2 text-sm font-semibold">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'bg-purple text-white px-4 py-1.5 rounded-full'
                    : 'text-white/70 hover:text-white px-4 py-1.5 rounded-full hover:bg-plum-mid transition'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-plum border-t border-plum-mid px-6 pb-5">
          <ul className="flex flex-col gap-3 pt-4 text-sm font-semibold">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-white' : 'text-white/60 hover:text-white transition'
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
