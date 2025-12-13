import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiStar, FiUser, FiClock, FiTag, FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(import.meta.env.BASE_URL + 'services.json');
      const data = await response.json();
      const foundService = data.find(s => s.id === parseInt(id));
      setService(foundService);
      
      // Get related services from same category
      const related = data
        .filter(s => s.category === foundService?.category && s.id !== foundService?.id)
        .slice(0, 3);
      setRelatedServices(related);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading service:', error);
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    navigate(`/booking/${service.id}`);
  };

  const handleAddToCart = () => {
    addToCart(service, null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Service Not Found
          </h2>
          <Link to="/" className="text-primary-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition"
      >
        <FiArrowLeft />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {service.featured && (
            <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Featured Service
            </span>
          )}
          
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {service.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-lg">
              <FiStar className="text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-800 dark:text-white">{service.rating}</span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              ({service.reviews} reviews)
            </span>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 mb-4">
            <FiTag className="text-gray-500" />
            <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-lg text-sm font-medium">
              {service.category}
            </span>
          </div>

          {/* Provider */}
          <div className="flex items-center gap-2 mb-4">
            <FiUser className="text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">
              By <span className="font-semibold">{service.provider}</span>
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-6">
            <FiClock className="text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300">
              Delivery: <span className="font-semibold">{service.duration}</span>
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Price */}
          <div className="border-t dark:border-gray-700 pt-6">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                ${service.price}
              </span>
              <span className="text-gray-500 dark:text-gray-400">starting price</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleBookNow}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Book Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                <FiShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Related Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map(relatedService => (
              <Link
                key={relatedService.id}
                to={`/service/${relatedService.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={relatedService.image}
                  alt={relatedService.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {relatedService.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400 fill-current text-sm" />
                      <span className="text-sm font-semibold">{relatedService.rating}</span>
                    </div>
                    <span className="text-primary-600 dark:text-primary-400 font-bold">
                      ${relatedService.price}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
