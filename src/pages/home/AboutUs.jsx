import React, { useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { BiSolidQuoteLeft } from "react-icons/bi";
import Layout from "../../components/ui/Layout";

const AboutUsPage = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    clients: 0,
    projects: 0,
    years: 0,
    awards: 0,
  });
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Director",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote: "Every donation saves three lives",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      quote: "Efficiency in service saves time and lives",
      social: { linkedin: "#", github: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Community Outreach Coordinator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote: "Building bridges between donors and recipients",
      social: { twitter: "#", github: "#" },
    },
  ];

  const partners = [
    {
      name: "Partner 1",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    },
    {
      name: "Partner 2",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    },
    {
      name: "Partner 3",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    },
    {
      name: "Partner 4",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedNumbers((prev) => ({
        clients: prev.clients < 500 ? prev.clients + 5 : 500,
        projects: prev.projects < 200 ? prev.projects + 2 : 200,
        years: prev.years < 15 ? prev.years + 1 : 15,
        awards: prev.awards < 50 ? prev.awards + 1 : 50,
      }));
    }, 50);
    return () => clearInterval(interval);
  }, []);  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center px-4 py-20 bg-gradient-to-r from-red-700 to-pink-600 text-white">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">About Our Blood Bank</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
            Saving lives through dedicated service and community support.
          </p>
        </div>
      </section>      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl shadow-xl text-white hover:scale-[1.03] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              To create a world where no life is lost due to blood shortage by building a robust and efficient blood donation network.
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl shadow-xl text-white hover:scale-[1.03] transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg">
              Connecting donors with those in need through innovative technology and compassionate service, ensuring safe and timely blood availability.
            </p>
          </div>
        </div>
      </section>      {/* Origin Story */}
      <section className="py-20 px-4 bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <BiSolidQuoteLeft className="text-6xl mx-auto mb-6 text-white" />
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white italic">
            "Founded by medical professionals who witnessed the critical need for efficient blood management, 
            we've grown into a trusted platform serving thousands of lives across the community."
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
                />
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm mb-4 text-primary">{member.role}</p>
                <p className="italic mb-4 text-gray-600">"{member.quote}"</p>
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <FaLinkedin className="text-2xl text-primary hover:text-purple-600 cursor-pointer" />
                  )}
                  {member.social.twitter && (
                    <FaTwitter className="text-2xl text-primary hover:text-purple-600 cursor-pointer" />
                  )}
                  {member.social.github && (
                    <FaGithub className="text-2xl text-primary hover:text-purple-600 cursor-pointer" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Metrics Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-red-500 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-4xl font-bold mb-2">{animatedNumbers.clients}+</h3>
            <p>Lives Saved</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-4xl font-bold mb-2">{animatedNumbers.projects}+</h3>
            <p>Blood Donations</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-4xl font-bold mb-2">{animatedNumbers.years}+</h3>
            <p>Years of Service</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <h3 className="text-4xl font-bold mb-2">{animatedNumbers.awards}</h3>
            <p>Hospital Partners</p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.05] transition-all"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-20 object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Gratitude Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-red-500 to-pink-600 text-white">
        <div className="max-w-3xl mx-auto bg-white/10 p-10 rounded-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6">Thank You</h2>
          <p className="text-xl leading-relaxed">
            We're grateful for the trust our clients place in us and the incredible journey we've shared together.
            Here's to many more years of innovation and success!
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUsPage;
