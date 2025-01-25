import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-blue-600">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Us */}
        <div>
          <h3 className="font-semibold text-3xl text-blue-600 mb-4">MORENT</h3>
          <p className="text-sm text-blue-950">
            Our vision is to provide convenience and help increase your Rent Your Cars.
          </p>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-lg text-blue-600 mb-4">About</h3>
          <ul className="space-y-2 text-sm text-blue-950">
            <li><a href="#" className="hover:text-blue-400">Featured</a></li>
            <li><a href="#" className="hover:text-blue-400">Partnership</a></li>
            <li><a href="#" className="hover:text-blue-400">Business Relation</a></li>
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="font-semibold text-lg text-blue-600 mb-4">Community</h3>
          <ul className="space-y-2 text-sm text-blue-950">
            <li><a href="#" className="hover:text-blue-400">Events</a></li>
            <li><a href="#" className="hover:text-blue-400">Podcasts</a></li>
            <li><a href="#" className="hover:text-blue-400">Blogs</a></li>
            <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg text-blue-600 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-blue-950">
            <li><a href="#" className="hover:text-blue-400">Shop All Categories</a></li>
            <li><a href="#" className="hover:text-blue-400">Latest Deals</a></li>
            <li><a href="#" className="hover:text-blue-400">Sign In / Register</a></li>
            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-blue-200 mt-6">
        <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-blue-950 text-center md:text-left">
            &copy; 2024 Morent. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-950 hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="text-blue-950 hover:text-blue-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
