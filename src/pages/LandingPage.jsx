import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

const CampulseLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const teamMembers = {
    creator: {
      name: "Ally Adegoke",
      info: "Ally Adegoke is a university student with an interest in product thinking and digital solutions. He contributes a grounded, problem-solving perspective shaped by real experiences and continuous learning.",
      image: "creator.jpg"
    },
    developers: [
      {
        name: "King Christian",
        info: "A cybersecurity researcher",
        image: "dev1.jpg",
        socials: {}
      },
      {
        name: "Ahmed Ramadan Ayomide",
        info: "A 200 level unilorin Student, studying Computer engineering. A Web developer, Script writer and Social bots. Open to collabs and works.",
        image: "dev2.jpg",
        socials: {
          github: "https://github.com/Firekid-is-him",
          email: "quantumx.helpdesk@gmail.com"
        }
      },
      {
        name: "Yusuf Abdurrahman (sudais)",
        info: "200 level computer engineering student at the University of Ilorin. Aspiring app developer, web designer, UI UX Designer, #just chillin like a villian 😌 Open to collaborations and idea sharing spaces",
        image: "dev3.jpg",
        socials: {}
      },
      {
        name: "Babatunde Emmanuel",
        info: "200-Level Computer Engineering student at the University of Ilorin. Interested in exploring different areas of technology, including software, hardware, and cybersecurity. Open to collaborations on tech projects, learning-focused builds, and innovative ideas.",
        image: "dev4.jpg",
        socials: {
          github: "https://github.com/extraordinarybt",
          linkedin: "https://ng.linkedin.com/in/emmanuelbabatunde012"
        }
      },
      {
        name: "Abdulsalam Atoyebi",
        info: "Computer Engineering student. A frontend developer and an Aspiring Machine learning engineer",
        image: "dev5.jpg",
        socials: {}
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bfd8fd] to-[#bfd8fd] relative overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-on-load {
          animation: fadeInUp 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-delay-1 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .shimmer-button {
          background: linear-gradient(
            90deg,
            #002e21 0%,
            #004d35 50%,
            #002e21 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
          box-shadow: 0 8px 32px rgba(0, 46, 33, 0.3);
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 46, 33, 0.15);
        }

        .auth-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 20s ease-in-out infinite;
        }

        .auth-blob-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #bfd8fd, #a8d0fc);
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .auth-blob-2 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #f9dc5c, #fde992);
          bottom: -100px;
          right: -100px;
          animation-delay: 5s;
        }

        .auth-blob-3 {
          width: 300px;
          height: 300px;
          background: rgba(0, 46, 33, 0.08);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 10s;
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className="auth-blob auth-blob-1"></div>
      <div className="auth-blob auth-blob-2"></div>
      <div className="auth-blob auth-blob-3"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-[rgba(191,216,253,0.4)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#002e21] via-[#004d3a] to-[#f9dc5c] bg-clip-text text-transparent">
              Campulse
            </h1>
            <div className="flex gap-8 items-center">
              <a href="#home" className="text-[rgba(0,46,33,0.7)] hover:text-[#002e21] font-medium transition-colors">Home</a>
              <a href="#features" className="text-[rgba(0,46,33,0.7)] hover:text-[#002e21] font-medium transition-colors">Features</a>
              <a href="#team" className="text-[rgba(0,46,33,0.7)] hover:text-[#002e21] font-medium transition-colors">Meet the Team</a>
              <button 
                disabled 
                className="shimmer-button group relative inline-flex items-center gap-2 text-white font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home/Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20">
        <div className={`text-center max-w-5xl transition-all duration-1300 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h1 className="text-7xl md:text-8xl font-bold mb-12 text-[#002e21] leading-tight animate-on-load">
            Welcome to Campulse
          </h1>
          
          <div className="mb-16 animate-on-load animate-delay-1">
            <img 
              src="/images/logo.png" 
              alt="Campulse Logo" 
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-full max-w-5xl h-72 mx-auto bg-white/40 backdrop-blur-sm rounded-2xl items-center justify-center hidden border-2 border-dashed border-[rgba(191,216,253,0.4)]">
              <span className="text-gray-600 text-sm">logo.png</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-24 text-[#002e21]">
            What We Offer
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="feature-card bg-gradient-to-br from-white to-[#fefefe] backdrop-blur-lg p-10 rounded-3xl shadow-lg border-2 border-[rgba(249,220,92,0.2)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bfd8fd] via-[#f9dc5c] to-[#bfd8fd]"></div>
              <h3 className="text-3xl font-bold mb-6 text-[#002e21]">Academic Management</h3>
              <p className="text-xl text-[rgba(0,46,33,0.65)] leading-relaxed">
                Never miss a deadline. Track assignments, exams, and get smart reminders tailored to your schedule.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-white to-[#fefefe] backdrop-blur-lg p-10 rounded-3xl shadow-lg border-2 border-[rgba(249,220,92,0.2)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bfd8fd] via-[#f9dc5c] to-[#bfd8fd]"></div>
              <h3 className="text-3xl font-bold mb-6 text-[#002e21]">Find Opportunities</h3>
              <p className="text-xl text-[rgba(0,46,33,0.65)] leading-relaxed">
                Discover scholarships, internships, and side gigs matched to your interests and skills.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-white to-[#fefefe] backdrop-blur-lg p-10 rounded-3xl shadow-lg border-2 border-[rgba(249,220,92,0.2)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bfd8fd] via-[#f9dc5c] to-[#bfd8fd]"></div>
              <h3 className="text-3xl font-bold mb-6 text-[#002e21]">Campus Marketplace</h3>
              <p className="text-xl text-[rgba(0,46,33,0.65)] leading-relaxed">
                Buy and sell textbooks, electronics, and services safely within the student community.
              </p>
            </div>

            <div className="feature-card bg-gradient-to-br from-white to-[#fefefe] backdrop-blur-lg p-10 rounded-3xl shadow-lg border-2 border-[rgba(249,220,92,0.2)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bfd8fd] via-[#f9dc5c] to-[#bfd8fd]"></div>
              <h3 className="text-3xl font-bold mb-6 text-[#002e21]">Stay Connected</h3>
              <p className="text-xl text-[rgba(0,46,33,0.65)] leading-relaxed">
                Get updates on campus events, club activities, and announcements all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative min-h-screen py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Creator */}
          <div className="mb-32">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#002e21]">
              Meet the man who started it all
            </h2>
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#fcfcfc] backdrop-blur-lg p-12 rounded-3xl shadow-lg border-2 border-[rgba(191,216,253,0.4)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#bfd8fd] via-[#f9dc5c] to-[#bfd8fd]"></div>
              <div className="flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full bg-gray-100 mb-8 overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src="/images/creator.jpg" 
                    alt={teamMembers.creator.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center hidden bg-gray-200">
                    <span className="text-gray-600 text-sm">creator.jpg</span>
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-6 text-[#002e21]">{teamMembers.creator.name}</h3>
                <p className="text-xl text-[rgba(0,46,33,0.65)] leading-relaxed">{teamMembers.creator.info}</p>
              </div>
            </div>
          </div>

          {/* Developers */}
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-[#002e21]">
              Meet the Developers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {teamMembers.developers.map((dev, index) => (
                <div key={index} className="feature-card bg-gradient-to-br from-white to-[#fcfcfc] backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-[rgba(191,216,253,0.4)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#bfd8fd] to-[#f9dc5c]"></div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-40 h-40 rounded-full bg-gray-100 mb-6 overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={`/images/${dev.image}`}
                        alt={dev.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full flex items-center justify-center hidden bg-gray-200">
                        <span className="text-gray-600 text-xs">{dev.image}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-[#002e21]">{dev.name}</h3>
                    <p className="text-[rgba(0,46,33,0.65)] mb-6 leading-relaxed">{dev.info}</p>
                    
                    {(dev.socials.github || dev.socials.linkedin || dev.socials.email) && (
                      <div className="flex gap-4 mt-2">
                        {dev.socials.github && (
                          <a 
                            href={dev.socials.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#002e21] hover:text-[#f9dc5c] transition-colors"
                          >
                            <Github size={24} />
                          </a>
                        )}
                        {dev.socials.linkedin && (
                          <a 
                            href={dev.socials.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#002e21] hover:text-[#f9dc5c] transition-colors"
                          >
                            <Linkedin size={24} />
                          </a>
                        )}
                        {dev.socials.email && (
                          <a 
                            href={`mailto:${dev.socials.email}`}
                            className="text-[#002e21] hover:text-[#f9dc5c] transition-colors"
                          >
                            <Mail size={24} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#002e21] text-white py-16 px-6 border-t border-[rgba(249,220,92,0.2)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#bfd8fd] to-[#f9dc5c] bg-clip-text text-transparent">Campulse</h3>
              <p className="text-gray-400">Built by Unilorin Students</p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4 text-center">Connect With Us</h4>
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/campulsehub?igsh=MXJ5cDJodjU1dXg0YQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#f9dc5c] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={28} />
                </a>
                <a 
                  href="https://x.com/Campulse_24" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#f9dc5c] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://whatsapp.com/channel/0029VbB9rpLGk1FrLLnDVM16" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#f9dc5c] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={28} />
                </a>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              © 2025 Campulse. All rights reserved. Built By engineers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampulseLanding;
