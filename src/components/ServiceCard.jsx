import { Link } from 'react-router-dom';
import { FiStar, FiUser, FiClock } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  return (
    <Link to={`/service/${service.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {service.featured && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="inline-block bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
              {service.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition">
            {service.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {service.description}
          </p>

          {/* Provider */}
          <div className="flex items-center gap-2 mb-3">
            <FiUser className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{service.provider}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-3">
            <FiClock className="text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{service.duration}</span>
          </div>

          {/* Rating & Price */}
          <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-800 dark:text-white">{service.rating}</span>
              <span className="text-sm text-gray-500">({service.reviews})</span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">Starting at</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                ${service.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
