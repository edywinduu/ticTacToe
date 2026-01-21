import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './Game.jsx'
import Navbar from './navbar.jsx'
import Footer from './footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='app'>
      <Navbar />
      <main className='game-container'>
        <Game />
      </main>
      <Footer />
    </div>
  </StrictMode>,
)
