import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/service-booking-app/services.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => {
        console.log('Loaded services:', data.length);
        setServices(data);
        setFilteredServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading services:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...services];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(s => s.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [searchQuery, selectedCategory, services]);

  const categories = ['All', ...new Set(services.map(s => s.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4 py-6">

        {/* HERO - Mobile Responsive */}
        <div className="rounded-3xl mb-12 p-4 sm:p-8 md:p-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
            Discover Professional Services
          </h1>

          <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-4 sm:mb-6">
            Connect with trusted experts for your daily and professional needs
          </p>

          {/* SEARCH - Mobile Responsive */}
          <div className="max-w-xl mx-auto">
            <div className="flex bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="flex items-center px-2 sm:px-4">
                <FiSearch className="text-indigo-600 text-base sm:text-lg md:text-xl" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-gray-800 outline-none"
              />
            </div>
          </div>

          {/* STATS - Mobile Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 max-w-xl mx-auto">
            <div className="bg-white/20 rounded-xl p-3 sm:p-4">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">100+</div>
              <div className="text-xs sm:text-sm">Expert Services</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 sm:p-4">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">5K+</div>
              <div className="text-xs sm:text-sm">Happy Clients</div>
            </div>
            <div className="bg-white/20 rounded-xl p-3 sm:p-4 col-span-2 sm:col-span-1">
              <div className="flex justify-center items-center gap-1 text-lg sm:text-xl md:text-2xl font-bold">
                4.9 <FiStar className="text-yellow-300 text-sm sm:text-base" />
              </div>
              <div className="text-xs sm:text-sm">Average Rating</div>
            </div>
          </div>
        </div>

        {/* CATEGORY FILTER - Mobile Responsive */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 shadow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
