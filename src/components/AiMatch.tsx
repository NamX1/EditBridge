import { useState } from "react"
import { Sparkles } from "lucide-react"

function AiMatch({ onError }: { onError: (message: string) => void }) {
  const [aiCategory, setAiCategory] = useState("Beauty")
  const [aiStyle, setAiStyle] = useState("Soft Aesthetic")
  const [aiBudget, setAiBudget] = useState("Under Rp500K")
  const [aiDeadline, setAiDeadline] = useState("3 days")
  const [match, setMatch] = useState<string | null>(null)
  const [briefIdea, setBriefIdea] = useState("")
  const [brief, setBrief] = useState<string | null>(null)
  const [briefError, setBriefError] = useState<string | null>(null)

  const smartMatch = () => {
    let editor = "Alya Prameswari"
    let score = "94%"

    if (aiStyle === "Cinematic" || aiStyle === "Luxury Aesthetic") {
      editor = "Raka Mahendra"
      score = "92%"
    } else if (aiStyle === "Fast-paced TikTok") {
      editor = "Nadia Putri"
      score = "96%"
    }

    setMatch(
      `Best Match: ${editor} - ${score}|Matched for ${aiCategory}, ${aiStyle}, ${aiBudget}, and a ${aiDeadline} deadline.`,
    )
  }

  const generateBrief = () => {
    if (!briefIdea.trim()) {
      setBriefError("Type a project idea first")
      onError("Type a project idea first")
      return
    }
    setBriefError(null)
    setBrief(briefIdea.trim().slice(0, 500))
  }

  const matchParts = match ? match.split("|") : []
  const matchHead = matchParts[0] ?? ""
  const matchDetail = matchParts[1] ?? ""

  return (
    <section id="ai">
      <div className="container">
        <div className="ai-wrap">
          <div className="ai-grid">
            <div>
              <h2>Describe the project. We'll narrow the search.</h2>
              <p>
                This prototype demonstrates how EditBridge can recommend suitable editors based on
                content style, budget, deadline, and category.
              </p>
            </div>

            <div className="ai-panel">
              <div className="ai-form">
                <div className="ai-fields">
                  <div>
                    <label htmlFor="ai-category">Content category</label>
                    <select id="ai-category" className="field" value={aiCategory} onChange={(e) => setAiCategory(e.target.value)}>
                      <option>Beauty</option>
                      <option>Food</option>
                      <option>Fashion</option>
                      <option>Gaming</option>
                      <option>Corporate</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ai-style">Editing style</label>
                    <select id="ai-style" className="field" value={aiStyle} onChange={(e) => setAiStyle(e.target.value)}>
                      <option>Soft Aesthetic</option>
                      <option>Cinematic</option>
                      <option>Fast-paced TikTok</option>
                      <option>Luxury Aesthetic</option>
                      <option>Minimal Product</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ai-budget">Budget</label>
                    <select id="ai-budget" className="field" value={aiBudget} onChange={(e) => setAiBudget(e.target.value)}>
                      <option>Under Rp500K</option>
                      <option>Rp500K-Rp1M</option>
                      <option>Above Rp1M</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="ai-deadline">Deadline</label>
                    <select id="ai-deadline" className="field" value={aiDeadline} onChange={(e) => setAiDeadline(e.target.value)}>
                      <option>3 days</option>
                      <option>5 days</option>
                      <option>7 days</option>
                    </select>
                  </div>
                </div>

                <button className="btn btn-accent ai-match-btn" onClick={smartMatch}>
                  Find My Match <Sparkles size={14} aria-hidden="true" />
                </button>

                {match && (
                  <div className="result" role="status" aria-live="polite">
                    <strong>{matchHead}</strong>
                    {matchDetail && (
                      <>
                        <br />
                        <span className="result-detail">{matchDetail}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="ai-divider" aria-hidden="true" />

              <div className="ai-form">
                <label htmlFor="ai-brief">AI Brief Generator</label>
                <textarea
                  id="ai-brief"
                  className="field"
                  placeholder="Example: Need a soft aesthetic skincare reel for Instagram."
                  value={briefIdea}
                  onChange={(e) => {
                    setBriefIdea(e.target.value)
                    if (briefError) setBriefError(null)
                  }}
                  maxLength={500}
                  aria-invalid={!!briefError}
                  aria-describedby={briefError ? "ai-brief-err" : undefined}
                />
                {briefError && (
                  <span className="field-error ai-error" id="ai-brief-err" role="alert">{briefError}</span>
                )}
                <button
                  className="btn btn-accent"
                  style={{ marginTop: 12 }}
                  onClick={generateBrief}
                  aria-disabled={false}
                >
                  Generate Brief
                </button>
                {brief && (
                  <div className="result" role="status" aria-live="polite">
                    <strong>Generated Project Brief</strong>
                    <dl className="brief-rows">
                      <div><dt>Project title</dt><dd>Soft Aesthetic Social Media Reel</dd></div>
                      <div><dt>Suggested duration</dt><dd>20-30 seconds</dd></div>
                      <div><dt>Editing style</dt><dd>Clean, elegant, soft transitions, beauty-focused</dd></div>
                      <div><dt>Reference keywords</dt><dd>skincare, glow, soft lighting, premium, feminine</dd></div>
                      <div><dt>Estimated budget</dt><dd>Rp500K-Rp900K</dd></div>
                      <div><dt>Original idea</dt><dd>{brief}</dd></div>
                    </dl>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiMatch
