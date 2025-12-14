import { Link } from 'react-router-dom';
import { FiStar, FiUser, FiClock, FiArrowRight, FiTrendingUp } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/service/${service.id}`} className="group block">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 h-full border border-gray-100 dark:border-gray-700">
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 z-10 pointer-events-none"></div>
        
        {/* Image Container with Zoom Effect */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          {/* Featured Badge */}
          {service.featured && (
            <div className="absolute top-4 right-4 z-20">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                <FiTrendingUp className="text-sm" />
                Featured
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <span className="inline-block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              {service.category}
            </span>
          </div>

          {/* Price Tag - Animated on Hover */}
          <div className="absolute top-4 left-4 z-20 transform group-hover:scale-110 transition-transform duration-300">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
              <div className="text-xs font-medium">Starting at</div>
              <div className="text-2xl font-bold">${service.price}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-20">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 min-h-[3.5rem]">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {service.description}
          </p>

          {/* Provider */}
          <div className="flex items-center gap-2 mb-4 text-gray-700 dark:text-gray-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {service.provider.charAt(0)}
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Provider</div>
              <div className="text-sm font-semibold">{service.provider}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
            <FiClock className="text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium">{service.duration}</span>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-lg">
                <FiStar className="text-yellow-500 fill-current text-sm" />
                <span className="font-bold text-gray-900 dark:text-white text-sm">{service.rating}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({service.reviews} reviews)
              </span>
            </div>

            {/* View Details Button */}
            <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold text-sm group-hover:gap-2 transition-all duration-300">
              <span>View</span>
              <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Bottom Shine Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  );
};

export default ServiceCard;
