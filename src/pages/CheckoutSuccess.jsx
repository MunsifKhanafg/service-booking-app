import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Confetti effect could be added here
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 animate-bounce">
          <FiCheckCircle className="text-8xl text-green-500 mx-auto" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Booking Successful!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Your services have been booked successfully. You will receive a confirmation email shortly.
        </p>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            What's Next?
          </h2>
          <div className="text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Confirmation Email
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check your email for booking confirmation and service provider details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Provider Contact
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The service provider will contact you within 24 hours to confirm details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary-600 dark:text-primary-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Service Delivery
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your service will be delivered as per the scheduled date and time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Browse More Services
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@servicehub.com" className="text-primary-600 hover:underline">
              support@servicehub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
