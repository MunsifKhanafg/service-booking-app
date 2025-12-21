// src/components/ServiceCard.jsx
import { FiStar, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x250?text=No+Image";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const openDetails = () => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div
      onClick={openDetails}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden group"
    >
      {/* IMAGE */}
      <div className="h-52 w-full bg-gray-100 overflow-hidden">
        <img
          src={service.image || FALLBACK_IMAGE}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          onError={(e) => (e.target.src = FALLBACK_IMAGE)}
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {service.title}
        </h3>

        {/* CATEGORY */}
        <p className="text-sm font-medium text-gray-500 mb-2">
          {service.category}
        </p>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-3">
          <FiStar className="text-yellow-400 text-base" />
          <span className="text-sm font-semibold text-gray-700">
            {service.rating || "4.8"}
          </span>
          <span className="text-xs text-gray-400">
            ({service.reviews || "120"} reviews)
          </span>
        </div>

        {/* PRICE */}
        <div className="text-2xl font-extrabold text-indigo-600 mb-4">
          ${service.price}
        </div>

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 prevent card click
            addToCart(service);
          }}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <FiShoppingBag />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
