// src/components/ServiceCard.jsx
import { FiStar, FiClock, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x250?text=No+Image";

const ServiceCard = ({ service }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {/* IMAGE (FIXED) */}
      <div className="h-48 w-full bg-gray-100">
        <img
          src={service.image || FALLBACK_IMAGE}
          alt={service.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">
          {service.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {service.category}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-2">
          <FiStar className="text-yellow-400" />
          <span className="text-sm font-semibold">
            {service.rating || "4.8"}
          </span>
        </div>

        {/* PRICE */}
        <div className="text-indigo-600 font-bold mb-3">
          ${service.price}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => addToCart(service)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <FiShoppingBag />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
