import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiPackage, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const saved = localStorage.getItem('bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  };

  const deleteBooking = (bookingId) => {
    const updated = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const clearAllBookings = () => {
    if (window.confirm('Are you sure you want to clear all bookings?')) {
      setBookings([]);
      localStorage.removeItem('bookings');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <FiPackage className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            No Bookings Yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't made any bookings yet. Start exploring our services!
          </p>
          <button
            onClick={() => navigate('/')}
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Bookings
        </h1>
        <button
          onClick={clearAllBookings}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition"
        >
          <FiTrash2 />
          <span>Clear All</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{bookings.length}</p>
            </div>
            <FiPackage className="text-4xl text-primary-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                ${bookings.reduce((total, booking) => total + booking.service.price, 0).toFixed(2)}
              </p>
            </div>
            <FiCalendar className="text-4xl text-green-600" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Bookings</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {bookings.filter(b => b.status === 'Confirmed').length}
              </p>
            </div>
            <FiClock className="text-4xl text-blue-600" />
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image */}
              <img
                src={booking.service.image}
                alt={booking.service.title}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />

              {/* Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {booking.service.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Provider: {booking.service.provider}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {booking.service.description}
                </p>

                {booking.bookingDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-primary-600" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Scheduled Date</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {new Date(booking.bookingDetails.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FiClock className="text-primary-600" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Time Slot</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          {booking.bookingDetails.time}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {booking.bookingDetails?.notes && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Notes:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {booking.bookingDetails.notes}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Booked on</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(booking.bookedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      ${booking.service.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
