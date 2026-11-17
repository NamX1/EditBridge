import { useState } from "react"
import { Menu, X, Sparkles } from "lucide-react"

function Navbar({ onLogin, onPost }: { onLogin: () => void; onPost: () => void }) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <nav>
      <div className="container nav-inner">
        <a href="#" className="logo">
          Edit<span>Bridge</span>
        </a>

        <div className="nav-links">
          <a href="#editors">Find Editors</a>
          <a href="#ai">AI Match</a>
          <a href="#client">For Brands</a>
          <a href="#dashboard">Dashboard</a>
        </div>

        <div className="nav-actions">
          <button className="btn btn-light" onClick={onLogin}>
            Log in
          </button>
          <button className="btn btn-dark" onClick={onPost}>
            Post a Project
          </button>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" role="dialog" aria-label="Mobile navigation">
          <a href="#editors" onClick={close}>Find Editors</a>
          <a href="#ai" onClick={close}>AI Match</a>
          <a href="#client" onClick={close}>For Brands</a>
          <a href="#dashboard" onClick={close}>Dashboard</a>
          <button className="btn btn-light" onClick={() => { close(); onLogin() }}>
            Log in
          </button>
          <button className="btn btn-dark" onClick={() => { close(); onPost() }}>
            Post a Project
          </button>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1>
            Find an editor who <em>gets your vision.</em>
          </h1>
          <p>
            EditBridge connects brands and content creators with professional video editors.
            Discover portfolios, compare packages, send project requests, and get matched with
            the right editor for your style, budget, and deadline.
          </p>

          <div className="hero-actions">
            <a href="#editors" className="btn btn-dark">
              Explore Editors
            </a>
            <a href="#ai" className="hero-link">
              Try AI Smart Match <Sparkles size={14} style={{ verticalAlign: "-1px" }} />
            </a>
          </div>

          <div className="hero-note">
            Built for creators, small businesses, beauty brands, and freelance editors.
          </div>
        </div>

        <div className="hero-card">
          <div className="video-preview">
            <div className="preview-top">
              <span className="chip">Featured Portfolio</span>
              <span className="chip">Beauty · Reels</span>
            </div>

            <div className="play">▶</div>

            <div className="preview-bottom">
              <p className="preview-title">
                Soft aesthetic.
                <br />
                Sharp storytelling.
              </p>
              <p>Skincare campaign edit · 28 sec · Social media format</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: "250+", label: "Creative editor profiles" },
    { value: "18", label: "Portfolio categories" },
    { value: "4.9/5", label: "Average client satisfaction" },
    { value: "3 min", label: "To create a project brief" },
  ]
  const statList = Array.isArray(stats) ? stats : []

  return (
    <div className="stats">
      <div className="container stats-grid">
        {statList.length === 0 ? (
          <div className="empty-state" role="status">
            <h3>No stats available</h3>
          </div>
        ) : (
          statList.map((s) => (
            <div className="stat" key={s.label}>
              <strong title={s.value}>{s.value}</strong>
              <span title={s.label}>{s.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export { Navbar, Hero, Stats }
