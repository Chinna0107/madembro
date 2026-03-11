import Header from './components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import TShirts from './pages/TShirts'
import Sweatshirts from './pages/Sweatshirts'
import Hoodies from './pages/Hoodies'
import CustomEmbroidery from './pages/CustomEmbroidery'
import OurStory from './pages/OurStory'
import Contact from './pages/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:name' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />
          <Route path='/tshirts' element={<TShirts />} />
          <Route path='/sweatshirts' element={<Sweatshirts />} />
          <Route path='/hoodies' element={<Hoodies />} />
          <Route path='/custom-embroidery' element={<CustomEmbroidery />} />
          <Route path='/our-story' element={<OurStory />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  )
}
export default App
