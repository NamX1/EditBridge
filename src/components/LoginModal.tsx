import { useEffect, useRef } from "react"
import { X, Lock } from "lucide-react"

function LoginModal({ onClose }: { onClose: () => void }) {
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = "hidden"
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

  return (
    <div
      className="modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className="modal-box login-modal-box">
        <button className="close login-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        <div className="login-modal-body">
          <div className="login-modal-icon" aria-hidden="true">
            <Lock size={22} />
          </div>
          <h3 id="login-modal-title">Login</h3>
          <p className="login-modal-message">Login is not developed yet.</p>
          <p className="login-modal-hint">
            This is a frontend demo. Authentication will be added in a future release.
          </p>
          <button className="btn btn-dark full" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal