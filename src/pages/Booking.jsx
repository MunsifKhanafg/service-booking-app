import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiFileText, FiArrowLeft } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(import.meta.env.BASE_URL + 'services.json');
      const data = await response.json();
      const foundService = data.find(s => s.id === parseInt(id));
      setService(foundService);
      setLoading(false);
    } catch (error) {
      console.error('Error loading service:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.time) {
      toast.error('Please select date and time');
      return;
    }

    const bookingDetails = {
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    };

    addToCart(service, bookingDetails);
    navigate('/cart');
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
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
          <button onClick={() => navigate('/')} className="text-primary-600 hover:underline">
            Back to Home
          </button>
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

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Book Your Service
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Service Summary
            </h2>
            
            <div className="mb-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {service.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {service.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Provider:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{service.provider}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{service.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{service.duration}</span>
              </div>
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Price:</span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${service.price}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Booking Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                  <FiCalendar />
                  <span className="font-medium">Select Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  required
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Time */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                  <FiClock />
                  <span className="font-medium">Select Time</span>
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Choose a time slot</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                  <FiFileText />
                  <span className="font-medium">Additional Notes (Optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special requirements or notes..."
                  className="w-full px-4 py-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition transform hover:scale-105"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
