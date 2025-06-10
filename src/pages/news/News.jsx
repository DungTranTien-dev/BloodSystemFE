import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { newsData } from "./newsData";

const NewsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 text-slate-800">
      <Header />

      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest News & Updates</h2>
            <p className="text-lg text-slate-500">Stay informed with the newest stories and announcements.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map((news) => (
              <div 
                key={news.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <img src={news.image} alt={news.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{news.title}</h3>
                  <p className="text-slate-500 text-sm mb-3 line-clamp-3">{news.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-slate-400">
                    <span>{news.date}</span>
                    <span>{news.readTime} min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-16 px-4">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">LifeStream</h3>
            <p className="text-sm">Connecting donors, saving lives. Your contribution matters.</p>
            <div className="flex space-x-4 mt-6 text-xl">
              <a href="#" className="hover:text-red-500 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><FaLinkedin /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="/about-us" className="hover:text-red-500 hover:underline">About Us</a></li>
              <li><a href="/donate" className="hover:text-red-500 hover:underline">Donate Blood</a></li>
              <li><a href="/find-blood" className="hover:text-red-500 hover:underline">Find Blood</a></li>
              <li><a href="/news" className="hover:text-red-500 hover:underline">News & Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@lifestream.org</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Health St, Medcity</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest news and campaigns.</p>
            <div className="flex overflow-hidden rounded-md shadow-sm border border-slate-300">
              <input type="email" placeholder="Your email" className="w-full px-4 py-2 text-slate-800 focus:outline-none" />
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 font-semibold">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} LifeStream. All rights reserved. Made with ❤️ for a better world.</p>
        </div>
      </footer>
    </div>
  );
};

export default NewsPage;
