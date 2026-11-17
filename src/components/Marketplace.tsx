import { useMemo, useState } from "react"
import { Star } from "lucide-react"
import { editors } from "../data/editors"
import alyaCover from "../assets/cover-alya.jpg"
import rakaCover from "../assets/cover-raka.jpg"
import nadiaCover from "../assets/cover-nadia.jpg"

function Marketplace({ onShortlist }: { onShortlist: (name: string) => void }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [budget, setBudget] = useState("")
  const [turnaround, setTurnaround] = useState("")
  const [shortlist, setShortlist] = useState<string[]>([])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return (editors ?? []).filter((e) => {
      if (!e) return false
      const searchMatch = (e.search ?? "").toLowerCase().includes(q)
      const categoryMatch = !category || (e.category ?? "").toLowerCase().includes(category.toLowerCase())
      const budgetMatch = !budget || e.budget === budget
      const turnaroundMatch = !turnaround || e.turnaround === turnaround
      return searchMatch && categoryMatch && budgetMatch && turnaroundMatch
    })
  }, [search, category, budget, turnaround])

  const hasFilters = search || category || budget || turnaround
  const clearFilters = () => {
    setSearch("")
    setCategory("")
    setBudget("")
    setTurnaround("")
  }

  return (
    <section id="editors">
      <div className="container">
        <div className="section-head">
          <div className="section-title">
            <h2>Explore editors by style, not just by price.</h2>
            <p>Use filters to discover editors whose work matches the content you want to create.</p>
          </div>
        </div>

        <div className="market-toolbar">
          <input
            className="field"
            type="text"
            placeholder="Search editor or specialty..."
            aria-label="Search editors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="field"
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            <option value="beauty">Beauty</option>
            <option value="reels">Reels</option>
            <option value="cinematic">Cinematic</option>
            <option value="ads">TikTok Ads</option>
          </select>

          <select
            className="field"
            aria-label="Filter by budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Any budget</option>
            <option value="low">Under Rp500K</option>
            <option value="mid">Rp500K-Rp1M</option>
            <option value="high">Above Rp1M</option>
          </select>

          <select
            className="field"
            aria-label="Filter by turnaround"
            value={turnaround}
            onChange={(e) => setTurnaround(e.target.value)}
          >
            <option value="">Any turnaround</option>
            <option value="fast">1-2 days</option>
            <option value="standard">3-5 days</option>
            <option value="relaxed">1 week+</option>
          </select>

          {hasFilters && (
            <button className="btn btn-light" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state" role="status">
            <h3>No editors match these filters</h3>
            <p>Try clearing a filter or broadening your search.</p>
            <button className="btn btn-light" onClick={clearFilters}>Clear filters</button>
          </div>
        ) : (
        <div className="editor-grid">
          {filtered.map((e) => {
            const key = e.id.toString()
            const saved = shortlist.includes(key)
            const firstName = (e.name ?? "").split(" ")[0] || "Editor"
            const tags = Array.isArray(e.tags) ? e.tags : []
            return (
            <article className="editor-card" key={e.id} tabIndex={0}>
              <div
                className={`editor-cover ${e.id === 1 || e.id === 2 || e.id === 3 ? "" : e.cover}`}
                style={
                  e.id === 1
                    ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,.45) 100%), url(${alyaCover})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : e.id === 2
                    ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,.45) 100%), url(${rakaCover})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : e.id === 3
                    ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,.45) 100%), url(${nadiaCover})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : undefined
                }
              >
                <div>
                  <span className="chip" title={e.chip}>{e.chip}</span>
                  <p className="cover-title" title={e.studio}>{e.studio}</p>
                </div>
              </div>
              <div className="editor-meta">
                <h3 title={e.name}>{e.name}</h3>
                <div className="sub" title={e.role}>{e.role}</div>
                <div className="tags">
                  {tags.length === 0 ? (
                    <span className="tag">No tags</span>
                  ) : (
                    tags.map((t) => (
                      <span className="tag" key={t} title={t}>
                        {t}
                      </span>
                    ))
                  )}
                </div>
                <div className="card-footer">
                  <div className="price">
                    <span className="sub">From</span> <strong title={e.price}>{e.price}</strong>
                  </div>
                  <div className="rating" aria-label={`Rating ${e.rating} from ${e.reviews} reviews`}>
                    <Star size={13} style={{ verticalAlign: "-2px" }} aria-hidden="true" /> {e.rating} ({e.reviews})
                  </div>
                </div>
                <button
                  className={`btn ${saved ? "btn-light" : "btn-dark"}`}
                  style={{ width: "100%", marginTop: 14 }}
                  onClick={() => {
                    if (saved) {
                      setShortlist((prev) => prev.filter((x) => x !== key))
                      onShortlist(`${firstName} removed from shortlist`)
                    } else {
                      setShortlist((prev) => [...prev, key])
                      onShortlist(`${firstName} saved to shortlist`)
                    }
                  }}
                  aria-pressed={saved}
                >
                  {saved ? "Saved" : "Save to Shortlist"}
                </button>
              </div>
            </article>
            )
          })}
        </div>
        )}
      </div>
    </section>
  )
}

export default Marketplace
