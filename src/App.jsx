import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import Booking from './pages/Booking';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router basename="/service-booking-app">
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-16 pb-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout-success" element={<CheckoutSuccess />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
