import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

type FormState = {
  title: string
  category: string
  format: string
  budget: string
  deadline: string
  description: string
}

const empty: FormState = {
  title: "",
  category: "Beauty",
  format: "Instagram Reel",
  budget: "",
  deadline: "3 days",
  description: "",
}

function PostProjectModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [form, setForm] = useState<FormState>(empty)
  const [touched, setTouched] = useState(false)
  const firstField = useRef<HTMLInputElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
    firstField.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
      previousFocus.current?.focus?.()
    }
  }, [onClose])

  const validate = (f: FormState) => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!f.title.trim()) e.title = "Project title is required"
    if (!f.budget.trim()) e.budget = "Budget is required"
    if (!f.description.trim() || f.description.trim().length < 10)
      e.description = "Describe the project (at least 10 characters)"
    return e
  }

  const currentErrors = validate(form)
  const isValid = Object.keys(currentErrors).length === 0

  const handleSubmit = () => {
    setTouched(true)
    if (!isValid) return
    onSubmit()
  }

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
    onBlur: () => setTouched(true),
  })

  const showErr = (key: keyof FormState) => (touched ? currentErrors[key] : undefined)

  return (
    <div
      className="modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-project-title"
    >
      <div className="modal-box">
        <div className="modal-head">
          <div>
            <h3 id="post-project-title" style={{ fontSize: 28 }}>Post a Project</h3>
            <p className="sub">Tell editors what you need. Required fields are marked.</p>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="form-grid">
          <div className="full field-group">
            <label htmlFor="pp-title">Project title</label>
            <input
              id="pp-title"
              ref={firstField}
              className="field full"
              type="text"
              placeholder="e.g. Skincare Reel for Instagram"
              maxLength={120}
              {...field("title")}
              aria-invalid={!!showErr("title")}
              aria-describedby={showErr("title") ? "pp-title-err" : undefined}
            />
            {showErr("title") && <span className="field-error" role="alert" id="pp-title-err">{showErr("title")}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="pp-category">Category</label>
            <select id="pp-category" className="field" {...field("category")} aria-label="Category">
              <option>Beauty</option>
              <option>Fashion</option>
              <option>Food</option>
              <option>Corporate</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="pp-format">Format</label>
            <select id="pp-format" className="field" {...field("format")} aria-label="Format">
              <option>Instagram Reel</option>
              <option>TikTok Video</option>
              <option>Product Showcase</option>
              <option>Testimonial</option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="pp-budget">Budget</label>
            <select id="pp-budget" className="field" {...field("budget")} aria-label="Budget" aria-invalid={!!showErr("budget")}>
              <option value="">Select budget</option>
              <option value="low">Under Rp500K</option>
              <option value="mid">Rp500K–Rp1M</option>
              <option value="high">Above Rp1M</option>
            </select>
            {showErr("budget") && <span className="field-error" role="alert">{showErr("budget")}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="pp-deadline">Deadline</label>
            <select id="pp-deadline" className="field" {...field("deadline")} aria-label="Deadline">
              <option>1–2 days</option>
              <option>3 days</option>
              <option>5 days</option>
              <option>1 week+</option>
            </select>
          </div>

          <div className="full field-group">
            <label htmlFor="pp-desc">Project details</label>
            <textarea
              id="pp-desc"
              className="field full"
              placeholder="Describe your project, preferred style, references, and deliverables..."
              maxLength={1000}
              {...field("description")}
              aria-invalid={!!showErr("description")}
              aria-describedby={showErr("description") ? "pp-desc-err" : undefined}
            />
            {showErr("description") && <span className="field-error" role="alert" id="pp-desc-err">{showErr("description")}</span>}
          </div>

          <p className="full form-note">
            Your request is shared with matching editors. Expect first replies within 24 hours.
          </p>

          <button
            className="btn btn-dark full"
            onClick={handleSubmit}
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            Submit Project Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostProjectModal