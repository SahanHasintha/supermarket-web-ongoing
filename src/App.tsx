import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
// import Welcome from './components/Welcome' // Hidden for now
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
          <Routes>
            {/* Welcome page is hidden - uncomment the line below to enable it */}
            {/* <Route path="/welcome" element={<Welcome />} /> */}
            
            {/* Home is now the default page */}
            <Route path="/" element={
              <>
                <Home />
              </>
            } />
            <Route path="/home" element={
              <>
                <Home />
              </>
            } />
            <Route path="/about" element={
              <>
                <About />
              </>
            } />
            <Route path="/services" element={
              <>
                <Services />
              </>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route element={<ProtectedRoute />}>
            </Route>
          </Routes>
      </div>
    </Router>
  )
}

export default App

