
const Footer = () => {
    // get categories
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-4 text-sm text-gray-400">
              We provide solutions to help businesses succeed, offering the best
              services with integrity and dedication.
            </p>
          </div>
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="mt-4 text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 rounded-r-md hover:bg-blue-700 text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          &copy; 2024 Double Decent. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
