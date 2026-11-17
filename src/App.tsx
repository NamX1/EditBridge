import { useRef, useState } from "react"
import { Navbar, Hero, Stats } from "./components/Top"
import Marketplace from "./components/Marketplace"
import AiMatch from "./components/AiMatch"
import { ClientCase, Steps, Dashboard, Cta, Footer } from "./components/Sections"
import PostProjectModal from "./components/PostProjectModal"
import LoginModal from "./components/LoginModal"

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number>(0)

  const showToast = (message: string) => {
    setToast(message)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 4000)
  }

  const openModal = () => setModalOpen(true)

  return (
    <>
      <Navbar onLogin={() => setLoginOpen(true)} onPost={openModal} />
      <main>
        <Hero />
        <Stats />
        <Marketplace onShortlist={showToast} />
        <AiMatch onError={showToast} />
        <ClientCase onPost={openModal} />
        <Steps />
        <Dashboard onNewProject={openModal} />
        <Cta onPost={openModal} />
      </main>
      <Footer />

      {modalOpen && (
        <PostProjectModal
          onClose={() => setModalOpen(false)}
          onSubmit={() => {
            setModalOpen(false)
            showToast("Project request sent")
          }}
        />
      )}

      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}

      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </>
  )
}

export default App
