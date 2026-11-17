import loungeCover from "../assets/lounge.jpg"

function ClientCase({ onPost }: { onPost: () => void }) {
  const requests = [
    "Instagram Reels - skincare treatment",
    "TikTok promotional video",
    "Before & after transformation",
    "Customer testimonial edit",
    "Luxury product showcase",
  ]
  const requestList = Array.isArray(requests) ? requests : []

  return (
    <section id="client">
      <div className="container">
        <div className="section-head">
          <div className="section-title">
            <h2>Voila Beauty Lounge</h2>
            <p>
              A realistic business example showing how a beauty brand could use EditBridge for
              social media video projects.
            </p>
          </div>
          <button className="btn btn-dark" onClick={onPost}>
            Create Similar Request
          </button>
        </div>

        <div className="client-grid">
          <div className="client-card" tabIndex={0}>
            <div
              className="client-visual"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.5) 100%), url(${loungeCover})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div>
                <span className="chip">Beauty Business</span>
                <h3 style={{ marginTop: 12 }}>
                  Voila
                  <br />
                  Beauty Lounge
                </h3>
              </div>
            </div>
            <p style={{ color: "var(--muted)" }}>
              Looking for consistent short-form video content to promote skincare treatments,
              customer results, and beauty services across Instagram and TikTok.
            </p>
          </div>

          <div className="request-card" tabIndex={0}>
            <h3 style={{ fontSize: 28, letterSpacing: "-1px" }}>Example project requests</h3>
            <div className="request-list">
              {requestList.length === 0 ? (
                <div className="empty-state" role="status">
                  <h3>No requests yet</h3>
                  <p>Create a request to see it tracked here.</p>
                </div>
              ) : (
                requestList.map((r) => (
                  <div className="request-item" key={r}>
                    <span title={r}>{r}</span>
                    <span className="status" aria-label="Status open">OPEN</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  const steps = [
    {
      title: "Create your brief",
      text: "Describe your content, goals, visual style, budget, and deadline.",
    },
    {
      title: "Discover matches",
      text: "Use search, portfolio tags, filters, or the AI Smart Match prototype.",
    },
    {
      title: "Send a request",
      text: "Select an editor, review their package, and submit your project details.",
    },
    {
      title: "Review the result",
      text: "Track your project and leave a rating after the work is completed.",
    },
  ]
  const stepList = Array.isArray(steps) ? steps : []

  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div className="section-title">
            <h2>From idea to editor in four steps.</h2>
          </div>
        </div>

        <div className="steps">
          {stepList.length === 0 ? (
            <div className="empty-state" role="status">
              <h3>No steps available</h3>
            </div>
          ) : (
            stepList.map((s, i) => (
              <div className="step" key={s.title}>
                <div className="step-num" aria-hidden="true">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function Dashboard({ onNewProject: _onNewProject }: { onNewProject?: () => void }) {
  const metrics = [
    { label: "Active projects", value: "3" },
    { label: "Saved editors", value: "3" },
    { label: "Unread messages", value: "0" },
  ]

  const projects = [
    { name: "Skincare Reel Campaign", editor: "Alya Studio", status: "In progress", pct: "75%" },
    { name: "Customer Testimonial", editor: "Nadia Cut", status: "Review", pct: "90%" },
    { name: "Luxury Product Showcase", editor: "Raka Motion", status: "Brief sent", pct: "20%" },
  ]
  const projectList = Array.isArray(projects) ? projects : []
  const metricList = Array.isArray(metrics) ? metrics : []

  return (
    <section id="dashboard">
      <div className="container">
        <div className="section-head">
          <div className="section-title">
            <h2>Manage projects without losing track.</h2>
            <p>Preview of the client dashboard you get after signing in.</p>
          </div>
        </div>

        <div className="dashboard">
          <div className="dash-top">
            <span className="dash-label">EditBridge Dashboard</span>
            <span className="preview-badge">Preview</span>
            <button
              type="button"
              className="account-chip"
              disabled
              aria-disabled="true"
              title="Preview only - sign in to switch accounts"
            >
              Voila Beauty Lounge
            </button>
          </div>

          <div className="dash-body">
            <aside className="sidebar" aria-label="Dashboard sections (preview)">
              <button type="button" className="side-link active" disabled aria-disabled="true" title="Preview only">
                Overview
              </button>
              <button type="button" className="side-link" disabled aria-disabled="true" title="Preview only">
                Projects
              </button>
              <button type="button" className="side-link" disabled aria-disabled="true" title="Preview only">
                Saved Editors
              </button>
              <button type="button" className="side-link" disabled aria-disabled="true" title="Preview only">
                Messages
              </button>
              <button type="button" className="side-link" disabled aria-disabled="true" title="Preview only">
                Reviews
              </button>
              <button type="button" className="side-link" disabled aria-disabled="true" title="Preview only">
                Account
              </button>
            </aside>

            <div className="dash-content">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h3 style={{ fontSize: 28 }}>Hello, Voila.</h3>
                  <p className="sub">Here's what is happening with your projects.</p>
                </div>
                <a className="btn btn-light" href="#client">
                  See how it works
                </a>
              </div>

              <div className="dash-cards">
                {metricList.length === 0 ? (
                  <div className="empty-state" role="status">
                    <h3>No metrics yet</h3>
                    <p>Metrics will appear once projects are tracked.</p>
                  </div>
                ) : (
                  metricList.map((m) => (
                    <div className="metric" key={m.label}>
                      <span title={m.label}>{m.label}</span>
                      <strong title={m.value}>{m.value}</strong>
                    </div>
                  ))
                )}
              </div>

              <h4 style={{ margin: "8px 0" }}>Recent Projects</h4>
              {projectList.length === 0 ? (
                <div className="empty-state" role="status">
                  <h3>No projects yet</h3>
                  <p>Create your first request to see it tracked here.</p>
                </div>
              ) : (
                projectList.map((p) => {
                  const pctNum = Math.min(100, Math.max(0, parseInt(p.pct, 10) || 0))
                  const safePct = `${pctNum}%`
                  return (
                    <div className="project-row" key={p.name}>
                      <div className="project-info">
                        <strong title={p.name}>{p.name}</strong>
                        <span title={`${p.editor} - ${p.status}`}>{p.editor} - {p.status}</span>
                      </div>
                      <div className="project-progress" aria-label={`${safePct} complete`}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={pctNum}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${p.name} progress`}
                        >
                          <span style={{ width: safePct }} />
                        </div>
                        <span className="pct">{safePct}</span>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cta({ onPost }: { onPost: () => void }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-box">
          <h2>Your next great video starts with the right editor.</h2>
          <p style={{ color: "var(--muted)", maxWidth: 620, margin: "0 auto 24px" }}>
            Discover talent, compare portfolios, and turn content ideas into clear project requests.
          </p>
          <button className="btn btn-dark" onClick={onPost}>
            Post Your First Project
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="container footer-inner">
        <div>
          <strong style={{ color: "#111" }}>EditBridge</strong> - MYP Personal Project Prototype
        </div>
        <div>Scientific & Technical Innovation - 2026</div>
      </div>
    </footer>
  )
}

export { ClientCase, Steps, Dashboard, Cta, Footer }
