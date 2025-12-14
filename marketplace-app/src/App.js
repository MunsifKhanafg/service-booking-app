import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Heart, Star, TrendingUp, Package, Clock, Award } from 'lucide-react';
import './App.css';

// Enhanced Services Data with better images
const servicesData = [
  {
    id: 1,
    title: "Web Development",
    description: "Professional web development services",
    price: "$500",
    rating: 4.8,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234F46E5;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%237C3AED;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad1)'/%3E%3Ccircle cx='100' cy='100' r='50' fill='white' opacity='0.2'/%3E%3Crect x='80' y='150' width='240' height='120' rx='10' fill='white' opacity='0.3'/%3E%3Ctext x='200' y='260' font-family='Arial' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EWeb Dev%3C/text%3E%3C/svg%3E",
    category: "Development"
  },
  {
    id: 2,
    title: "Graphic Design",
    description: "Creative graphic design solutions",
    price: "$300",
    rating: 4.9,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23EC4899;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23F97316;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad2)'/%3E%3Ccircle cx='200' cy='120' r='60' fill='white' opacity='0.3'/%3E%3Cpolygon points='200,180 140,240 260,240' fill='white' opacity='0.3'/%3E%3Ctext x='200' y='270' font-family='Arial' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EDesign%3C/text%3E%3C/svg%3E",
    category: "Design"
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Boost your online presence",
    price: "$400",
    rating: 4.7,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310B981;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%2306B6D4;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad3)'/%3E%3Cpolyline points='50,200 100,150 150,170 200,100 250,130 300,80 350,110' stroke='white' stroke-width='6' fill='none' opacity='0.4'/%3E%3Ctext x='200' y='260' font-family='Arial' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EMarketing%3C/text%3E%3C/svg%3E",
    category: "Marketing"
  },
  {
    id: 4,
    title: "Content Writing",
    description: "Engaging content for your brand",
    price: "$200",
    rating: 4.6,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23F59E0B;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23EF4444;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad4)'/%3E%3Crect x='100' y='80' width='200' height='140' rx='8' fill='white' opacity='0.3'/%3E%3Cline x1='120' y1='110' x2='280' y2='110' stroke='white' stroke-width='4' opacity='0.5'/%3E%3Cline x1='120' y1='140' x2='280' y2='140' stroke='white' stroke-width='4' opacity='0.5'/%3E%3Cline x1='120' y1='170' x2='240' y2='170' stroke='white' stroke-width='4' opacity='0.5'/%3E%3Ctext x='200' y='260' font-family='Arial' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EWriting%3C/text%3E%3C/svg%3E",
    category: "Writing"
  },
  {
    id: 5,
    title: "Video Editing",
    description: "Professional video editing services",
    price: "$450",
    rating: 4.8,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%238B5CF6;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23EC4899;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad5)'/%3E%3Crect x='80' y='80' width='240' height='140' rx='10' fill='white' opacity='0.3'/%3E%3Cpolygon points='170,130 170,170 210,150' fill='white' opacity='0.6'/%3E%3Ctext x='200' y='260' font-family='Arial' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EVideo%3C/text%3E%3C/svg%3E",
    category: "Video"
  },
  {
    id: 6,
    title: "SEO Optimization",
    description: "Improve your search rankings",
    price: "$350",
    rating: 4.7,
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230EA5E9;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%232563EB;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23grad6)'/%3E%3Ccircle cx='200' cy='130' r='70' fill='white' opacity='0.2'/%3E%3Ctext x='200' y='145' font-family='Arial' font-size='48' fill='white' text-anchor='middle' font-weight='bold'%3ESEO%3C/text%3E%3Ctext x='200' y='260' font-family='Arial' font-size='24' fill='white' text-anchor='middle' font-weight='bold'%3EOptimize%3C/text%3E%3C/svg%3E",
    category: "Marketing"
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    setAnimateHero(true);
  }, []);

  const categories = ['All', 'Development', 'Design', 'Marketing', 'Writing', 'Video'];

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  const toggleFavorite = (serviceId) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">MarketPlace</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <ShoppingCart className="text-gray-700 hover:text-blue-600 transition" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col p-4 space-y-2">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition py-2">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition py-2">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition py-2">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition py-2">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section with Animations */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className={`text-center transition-all duration-1000 ${animateHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-5xl font-bold mb-6 animate-fade-in">
              Find Amazing Services
            </h2>
            <p className="text-xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Connect with talented professionals worldwide
            </p>
            
            {/* Animated Search Bar */}
            <div className={`max-w-2xl mx-auto transition-all duration-1000 delay-300 ${animateHero ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white rounded-full shadow-2xl p-2 flex items-center">
                  <Search className="text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search for services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 text-gray-800 outline-none rounded-full"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className={`grid md:grid-cols-3 gap-6 mt-16 transition-all duration-1000 delay-500 ${animateHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition duration-300">
              <TrendingUp className="mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Top Rated</h3>
              <p>Premium quality services</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition duration-300">
              <Clock className="mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p>Quick turnaround times</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 transform hover:scale-105 transition duration-300">
              <Award className="mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Verified Pros</h3>
              <p>Trusted professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                />
                <button
                  onClick={() => toggleFavorite(service.id)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition shadow-lg"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                  />
                </button>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {service.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={18} />
                    <span className="font-medium text-gray-700">{service.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{service.price}</span>
                </div>

                <button
                  onClick={() => addToCart(service)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-xl text-gray-600">No services found matching your criteria</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MarketPlace</h3>
              <p className="text-gray-400">Your trusted platform for premium services</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest offers</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none"
              />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MarketPlace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
