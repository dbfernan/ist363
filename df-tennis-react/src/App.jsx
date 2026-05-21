import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import ApiFun from './pages/ApiFun'

export default function App() {
  return (
    <div className="bg-off-white text-plum min-h-screen flex flex-col">
      <a href="#main" className="skip-link">Skip to Content</a>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/api-fun" element={<ApiFun />} />
      </Routes>
      <Footer />
    </div>
  )
}