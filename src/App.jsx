import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Cart from './pages/Cart.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App