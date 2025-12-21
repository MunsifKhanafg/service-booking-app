import { useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiCalendar, FiClock } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Save bookings to localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBookings = cartItems.map((item) => ({
      ...item,
      bookedAt: new Date().toISOString(),
      status: "Confirmed",
    }));
    localStorage.setItem("bookings", JSON.stringify([...bookings, ...newBookings]));

    clearCart();
    navigate("/checkout-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <FiShoppingBag className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added any services yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex gap-4"
            >
              {/* Image */}
              <img
                src={item.image || item.service?.image}
                alt={item.title || item.service?.title}
                className="w-32 h-32 object-cover rounded-lg"
              />

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.title || item.service?.title}
                  </h3>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  By {item.provider || item.service?.provider}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3 line-clamp-2">
                  {item.description || item.service?.description}
                </p>

                {item.bookingDetails && (
                  <div className="flex gap-4 text-sm mb-2">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <FiCalendar className="text-primary-600" />
                      <span>
                        {new Date(item.bookingDetails.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <FiClock className="text-primary-600" />
                      <span>{item.bookingDetails.time}</span>
                    </div>
                  </div>
                )}

                {item.bookingDetails?.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 italic mb-2">
                    Note: {item.bookingDetails.notes}
                  </p>
                )}

                <div className="flex justify-between items-center mt-3 pt-3 border-t dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Duration: {item.duration || item.service?.duration}
                  </span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    ${item.price || item.service?.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Service Fee</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105 mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
