import React from "react";
import { FaHospital, FaTruck, FaBuilding, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/header";
const Homepage = () => {
  const navigate = useNavigate();
  const donationMethods = [
    {
      title: "Direct Hospital Donation",
      icon: <FaHospital className="text-4xl text-primary text-red-600 mb-4" />,
      description: "Visit your nearest hospital to donate blood directly."
    },
    {
      title: "Mobile Blood Donation Camps",
      icon: <FaTruck className="text-4xl text-primary text-red-600 mb-4" />,
      description: "Find mobile camps in your area for convenient donation."
    },
    {
      title: "Community Donation Centers",
      icon: <FaBuilding className="text-4xl text-primary text-red-600 mb-4" />,
      description: "Dedicated centers for safe and efficient blood donation."
    }
  ];

  const collaborators = [
    {
      name: "NCC",
      description: "National Civic Council",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952"
    },
    {
      name: "NSS",
      description: "National Service Scheme",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    {
      name: "YMCA",
      description: "Young Men's Christian Association",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <nav className="bg-red-600 shadow-sm py-3">
        <ul className="flex justify-between max-w-6xl mx-auto px-6 text-white font-semibold text-xl">
          <li
            className="cursor-pointer hover:text-primary hover:border-b-2 hover:border-primary transition-all"
            onClick={() => navigate("/news")}
          >
            New
          </li>
          <li
            className="cursor-pointer hover:text-primary hover:border-b-2 hover:border-primary transition-all"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-primary hover:border-b-2 hover:border-primary transition-all"
            onClick={() => navigate("/about-us")}
          >
            About Us
          </li>
          <li
            className="cursor-pointer hover:text-primary hover:border-b-2 hover:border-primary transition-all"
            onClick={() => navigate("/find-blood")}
          >
            Find Blood
          </li>
        </ul>
      </nav>


      <section className="bg-[#FAFAFB] w-full px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center ">
          <img
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4"
            alt="Blood Donation"
            className="rounded-lg shadow-lg w-[95%] object-cover"
          />
        </div>
        <div className="pl-4 md:pl-8 ">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Save Lives Through Blood Donation
          </h2>
          <p className="text-lg md:text-xl text-accent">
            Your single donation can save up to three lives. Join our mission to ensure
            every patient has access to safe, reliable blood supply when needed.
          </p>
        </div>
      </section>

      <section className=" py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Our Mission
          </h2>
          <div className="max-w-7xl mx-auto">
            <p className="text-2xl text-gray-600 leading-relaxed">
              We strive to create a <span className="text-primary font-semibold">sustainable</span> and <span className="text-primary font-semibold">efficient</span> blood donation ecosystem.
              Through community engagement and advanced healthcare partnerships, we ensure
              timely access to <span className="text-primary font-semibold">safe blood</span> for all in need.
              <br /><br />
              Together, we're building a <span className="text-primary font-semibold">healthier future</span>.
            </p>
          </div>
        </div>
      </section>


      <section className="bg-[#FAFAFB] py-16 px-6">
        <div className="container mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold text-primary mb-4">Our Collaborators</h2>
          <p className="text-lg text-accent max-w-2xl mx-auto">
            Trusted partners working together to build a healthier future.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.name}
              className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-200 p-6"
            >
              <img
                src={collaborator.image}
                alt={collaborator.name}
                className="w-full h-64 object-cover rounded-md mb-5"
              />
              <h3 className="text-2xl font-semibold text-primary mb-2">
                {collaborator.name}
              </h3>
              <p className="text-base text-accent leading-relaxed">
                {collaborator.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#FAFAFB] py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary text-center mb-10">
            How to Get Blood?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {donationMethods.map((method) => (
              <div
                key={method.title}
                className="flex flex-col justify-center text-center p-8 rounded-xl shadow-md border border-gray-200 bg-white transition-transform transform hover:-translate-y-2 hover:shadow-lg min-h-[320px]"
              >
                <div className="flex justify-center mb-5">
                  <div className="text-5xl text-primary">{method.icon}</div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-3">
                  {method.title}
                </h3>
                <p className="text-base text-accent leading-relaxed">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-red-700 py-12 px-6 mt-12 text-white">
        <div className="container mx-auto grid md:grid-cols-4 gap-10">

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@lifestream.org</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Social Media</h3>
            <div className="flex space-x-4 text-2xl">
              <FaFacebook className="hover:text-gray-300 cursor-pointer transition-colors" />
              <FaTwitter className="hover:text-gray-300 cursor-pointer transition-colors" />
              <FaInstagram className="hover:text-gray-300 cursor-pointer transition-colors" />
              <FaLinkedin className="hover:text-gray-300 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Donate Blood</li>
              <li className="hover:underline cursor-pointer">Find Blood</li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="flex items-center text-sm">
            <p>&copy; 2024 LifeStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
