import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import AdditionalQuestions from './components/AdditionalQuestions'
import DialogBox from './components/DialogBox'


export default function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addQuestions" element={<AdditionalQuestions />} />
           <Route path="/dialogbox" element={<DialogBox />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
