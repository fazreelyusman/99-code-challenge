import { FrostedBackground } from './components/FrostedBackground'
import Header from './components/Header'
import SwapForm from './components/SwapForm'

export default function App() {
  return (
    <div className="relative min-h-screen font-headline">
      <Header />
      <FrostedBackground />
      <main className="relative z-10">
        <SwapForm />
      </main>
    </div>
  )
}
