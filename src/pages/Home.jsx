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
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(import.meta.env.BASE_URL + 'services.json');
      const data = await response.json();
      setServices(data);
      setFilteredServices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    filterServices();
  }, [searchQuery, selectedCategory, services]);

  const filterServices = () => {
    let filtered = [...services];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  };

  const categories = ['All', ...new Set(services.map(service => service.category))];
  const featuredServices = services.filter(service => service.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-600"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-ping rounded-full h-12 w-12 bg-indigo-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* AMAZING HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl mb-16 shadow-2xl" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'}}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-20 left-20 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
            
            {/* Animated Stars */}
            <div className="absolute top-10 left-1/4 animate-pulse">
              <FiStar className="text-yellow-300 text-2xl" />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-pulse" style={{animationDelay: '0.5s'}}>
              <FiZap className="text-yellow-300 text-3xl" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-pulse" style={{animationDelay: '1s'}}>
              <FiTrendingUp className="text-yellow-300 text-2xl" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-16">
            {/* Top Badge */}
            <div className="flex items-center justify-center mb-6 animate-fadeIn">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 border border-white/30 shadow-lg transform hover:scale-105 transition-all duration-300">
                <FiTrendingUp className="text-yellow-300 text-xl animate-bounce" />
                <span className="text-white font-bold text-sm tracking-wider">TOP RATED PLATFORM</span>
                <FiZap className="text-yellow-300 text-xl animate-bounce" style={{animationDelay: '0.2s'}} />
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 text-center leading-tight animate-slideIn">
              Discover Amazing
              <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-pink-200 to-white bg-clip-text text-transparent animate-scaleIn">
                Professional Services
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-10 text-center max-w-4xl mx-auto font-light animate-fadeIn leading-relaxed">
              Connect with 50+ world-class professionals ready to transform your ideas into reality ✨
            </p>

            {/* Amazing Search Bar */}
            <div className="max-w-4xl mx-auto animate-scaleIn">
              <div className="relative group">
                {/* Glowing Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                
                {/* Search Container */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center p-3">
                    <div className="flex-shrink-0 pl-4">
                      <FiSearch className="text-indigo-600 dark:text-indigo-400 text-3xl animate-pulse" />
                    </div>
                    <input
                      type="text"
                      placeholder="🔍 Search for services, skills, or providers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-5 text-lg text-gray-800 dark:text-white focus:outline-none bg-transparent placeholder-gray-400 font-medium"
                    />
                    <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-10 py-5 rounded-xl mr-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2">
                      <span>Search</span>
                      <FiZap className="animate-bounce" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto animate-fadeIn">
              <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl font-black text-white mb-2">50+</div>
                  <div className="text-white/90 text-sm font-semibold">Expert Services</div>
                </div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl font-black text-white mb-2">5K+</div>
                  <div className="text-white/90 text-sm font-semibold">Happy Clients</div>
                </div>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-5xl font-black text-white mb-2 flex items-center justify-center gap-1">
                    4.9<FiStar className="text-yellow-300 fill-current text-3xl" />
                  </div>
                  <div className="text-white/90 text-sm font-semibold">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* CATEGORY FILTER */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg">
              <FiFilter className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                Browse by Category
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Find the perfect service for your needs
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-lg'
                }`}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ALL SERVICES GRID */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">
              {selectedCategory === 'All' ? 'All Services' : selectedCategory}
              <span className="ml-4 text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ({filteredServices.length})
              </span>
            </h2>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-24 animate-fadeIn">
              <div className="text-8xl mb-6">🔍</div>
              <p className="text-gray-600 dark:text-gray-400 text-2xl font-semibold mb-6">
                No services found matching your criteria
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="animate-fadeIn"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
