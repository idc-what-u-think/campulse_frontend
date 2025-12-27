import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

const CampulseLanding = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

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
    <div className="min-h-screen bg-black">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
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

        [data-animate] {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-animate].visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.2);
        }

        .gradient-border {
          position: relative;
          background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
        }

        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(135deg, #22c55e, #f59e0b, #22c55e);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .gradient-border:hover::before {
          opacity: 1;
        }

        .shimmer-button {
          background: linear-gradient(
            90deg,
            #22c55e 0%,
            #f59e0b 25%,
            #22c55e 50%,
            #f59e0b 75%,
            #22c55e 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .tab-button {
          position: relative;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }

        .tab-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, #22c55e, #f59e0b);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .tab-button.active::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
              Campulse
            </h1>
            <div className="flex gap-6 items-center">
              <button 
                onClick={() => setActiveTab('home')}
                className={`tab-button text-sm font-medium text-gray-400 hover:text-white transition-colors ${activeTab === 'home' ? 'active text-white' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('team')}
                className={`tab-button text-sm font-medium text-gray-400 hover:text-white transition-colors ${activeTab === 'team' ? 'active text-white' : ''}`}
              >
                Meet the Team
              </button>
              <button 
                onClick={handleGetStarted}
                className="shimmer-button group inline-flex items-center gap-2 text-white font-semibold px-5 py-2 rounded-lg text-sm"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Tab Content */}
      {activeTab === 'home' && (
        <>
          {/* Hero Section */}
          <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative text-center max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-green-400 via-amber-400 to-green-400 bg-clip-text text-transparent">
                  Campulse
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed">
                UniIlorin's Student Campus Operating System
              </p>
              
              <div className="mb-16 max-w-xl mx-auto">
                <img 
                  src="/images/logo.png" 
                  alt="Campulse Logo" 
                  className="w-full rounded-2xl shadow-2xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-64 bg-white/5 backdrop-blur-sm rounded-2xl items-center justify-center hidden border border-white/10">
                  <span className="text-gray-600 text-sm">logo.png</span>
                </div>
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section className="relative py-24 border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6">
              <div 
                data-animate
                id="problem-section"
                className={visibleSections.has('problem-section') ? 'visible' : ''}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                  The{' '}
                  <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                    Challenge
                  </span>
                </h2>
                <div className="gradient-border bg-gray-900/60 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm">
                  <p className="text-lg text-gray-200 leading-relaxed mb-6">
                    University life at the University of Ilorin presents students with numerous challenges in managing academics, campus resources, and extracurricular activities. Students struggle to keep track of deadlines, exams, lectures, and events while simultaneously seeking verified information about scholarships, internships, side gigs, and campus services.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed mb-6">
                    The fragmentation of tools and platforms, including WhatsApp groups, Google Calendar, and personal notes, often leads to missed deadlines, reduced productivity, and increased stress. Moreover, accessing verified opportunities such as scholarships, competitions, and part-time jobs is time-consuming and prone to misinformation.
                  </p>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Marketplace activities such as buying and selling books, electronics, and services are informal and lack security or trust. The critical problem is the absence of a centralized, intelligent, and secure student platform that unifies academic management, community engagement, opportunities discovery, and campus services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section className="relative py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div 
                data-animate
                id="solution-section"
                className={visibleSections.has('solution-section') ? 'visible' : ''}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                  Our{' '}
                  <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                    Solution
                  </span>
                </h2>
                <div className="gradient-border bg-gray-900/60 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm mb-12">
                  <p className="text-lg text-gray-200 leading-relaxed">
                    Campulse is a campus operating system designed to solve these challenges by consolidating productivity tools, community platforms, opportunities marketplaces, and campus services into a single intelligent platform. The solution leverages cloud infrastructure and artificial intelligence to ensure scalability, security, and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative py-24 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6">
              <div 
                className="text-center mb-20"
                data-animate
                id="features-title"
                style={visibleSections.has('features-title') ? { opacity: 1, transform: 'translateY(0)' } : {}}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  What We{' '}
                  <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                    Offer
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Everything you need to succeed at UniIlorin, all in one place
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div 
                  data-animate
                  id="feature-1"
                  className="feature-card bg-gray-900/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  style={visibleSections.has('feature-1') ? { opacity: 1, transform: 'translateY(0)' } : {}}
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Academic Management
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Never miss a deadline. Track assignments, exams, and get smart reminders tailored to your schedule. AI-driven personalized study plans help reduce missed deadlines by up to 50%.
                  </p>
                </div>

                <div 
                  data-animate
                  id="feature-2"
                  className="feature-card bg-gray-900/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  style={visibleSections.has('feature-2') ? { opacity: 1, transform: 'translateY(0)' } : {}}
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Find Opportunities
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Discover scholarships, internships, and side gigs matched to your interests and skills. Get personalized recommendations for verified opportunities all in one place.
                  </p>
                </div>

                <div 
                  data-animate
                  id="feature-3"
                  className="feature-card bg-gray-900/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  style={visibleSections.has('feature-3') ? { opacity: 1, transform: 'translateY(0)' } : {}}
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Campus Marketplace
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Buy and sell textbooks, electronics, and services safely within the student community. Secure transactions with AI-powered fraud detection.
                  </p>
                </div>

                <div 
                  data-animate
                  id="feature-4"
                  className="feature-card bg-gray-900/80 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
                  style={visibleSections.has('feature-4') ? { opacity: 1, transform: 'translateY(0)' } : {}}
                >
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Stay Connected
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Get updates on campus events, club activities, and announcements all in one place. Centralized communication reduces misinformation and keeps you informed.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="relative py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div 
                data-animate
                id="benefits-section"
                className={visibleSections.has('benefits-section') ? 'visible' : ''}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
                  Why{' '}
                  <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                    Campulse?
                  </span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="gradient-border bg-gray-900/60 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3">For Students</h3>
                    <ul className="space-y-2 text-gray-200">
                      <li>• Centralized access to all campus resources</li>
                      <li>• AI-driven reminders reduce missed deadlines by 50%</li>
                      <li>• Personalized opportunity recommendations</li>
                      <li>• Secure marketplace for safe transactions</li>
                    </ul>
                  </div>
                  
                  <div className="gradient-border bg-gray-900/60 border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-3">For Administration</h3>
                    <ul className="space-y-2 text-gray-200">
                      <li>• Real-time analytics dashboards</li>
                      <li>• Centralized communication platform</li>
                      <li>• Insights into student engagement and trends</li>
                      <li>• Enhanced community satisfaction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-24 border-t border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative max-w-6xl mx-auto px-6">
              <div 
                className="text-center max-w-3xl mx-auto"
                data-animate
                id="cta-section"
                style={visibleSections.has('cta-section') ? { opacity: 1, transform: 'translateY(0)' } : {}}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your{' '}
                  <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                    Campus Life?
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-10">
                  Join the UniIlorin student community and take control of your academic journey.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="shimmer-button group inline-flex items-center gap-3 text-white font-semibold px-10 py-4 rounded-xl shadow-lg"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Team Tab Content */}
      {activeTab === 'team' && (
        <section className="relative min-h-screen py-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Creator */}
            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                Meet the man who{' '}
                <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                  started it all
                </span>
              </h2>
              <div className="max-w-2xl mx-auto gradient-border bg-gray-900/60 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-800 mb-6 overflow-hidden border-4 border-green-500/30 shadow-xl">
                    <img 
                      src="/images/creator.jpg" 
                      alt={teamMembers.creator.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center hidden bg-gray-700">
                      <span className="text-gray-400 text-xs">creator.jpg</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{teamMembers.creator.name}</h3>
                  <p className="text-base text-gray-200 leading-relaxed">{teamMembers.creator.info}</p>
                </div>
              </div>
            </div>

            {/* Developers */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                Meet the{' '}
                <span className="bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">
                  Developers
                </span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.developers.map((dev, index) => (
                  <div key={index} className="feature-card bg-gray-900/80 border border-amber-500/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 overflow-hidden border-4 border-amber-500/30 shadow-lg">
                        <img 
                          src={`/images/${dev.image}`}
                          alt={dev.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center hidden bg-gray-700">
                          <span className="text-gray-400 text-xs">{dev.image}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white">{dev.name}</h3>
                      <p className="text-sm text-gray-200 mb-4 leading-relaxed">{dev.info}</p>
                      
                      {(dev.socials.github || dev.socials.linkedin || dev.socials.email) && (
                        <div className="flex gap-3 mt-2">
                          {dev.socials.github && (
                            <a 
                              href={dev.socials.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-green-400 transition-colors"
                            >
                              <Github size={20} />
                            </a>
                          )}
                          {dev.socials.linkedin && (
                            <a 
                              href={dev.socials.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-green-400 transition-colors"
                            >
                              <Linkedin size={20} />
                            </a>
                          )}
                          {dev.socials.email && (
                            <a 
                              href={`mailto:${dev.socials.email}`}
                              className="text-gray-400 hover:text-green-400 transition-colors"
                            >
                              <Mail size={20} />
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
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center mb-2">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-amber-400 bg-clip-text text-transparent">Campulse</h3>
              <p className="text-gray-500 text-sm">Built by Unilorin Students</p>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-3 text-center text-white">Connect With Us</h4>
              <div className="flex gap-5">
                <a 
                  href="https://www.instagram.com/campulsehub?igsh=MXJ5cDJodjU1dXg0YQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://x.com/Campulse_24" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://whatsapp.com/channel/0029VbB9rpLGk1FrLLnDVM16" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
            
            <p className="text-gray-600 text-xs mt-4">
              © 2025 Campulse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampulseLanding;
