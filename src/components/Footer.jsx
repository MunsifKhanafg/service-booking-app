import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">ServiceHub</h3>
            <p className="text-gray-400">
              Your one-stop platform for professional services. Find and book top-rated freelancers for your projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</a></li>
              <li><a href="/cart" className="text-gray-400 hover:text-white transition">Cart</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">Graphic Design</li>
              <li className="text-gray-400">Digital Marketing</li>
              <li className="text-gray-400">Writing & Translation</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FiGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FiTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FiLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FiMail />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ServiceHub. All rights reserved. Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
