import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Instagram, MessageCircle, ArrowRight } from 'lucide-react';

const CampulseLanding: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'team'>('home');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer-btn {
          background: linear-gradient(90deg, #22c55e 0%, #f59e0b 25%, #22c55e 50%, #f59e0b 75%, #22c55e 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #4ade80, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Campulse
            </h1>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <button 
                onClick={() => setActiveTab('home')}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: activeTab === 'home' ? '#fff' : '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  transition: 'color 0.3s'
                }}
              >
                Home
                {activeTab === 'home' && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(to right, #22c55e, #f59e0b)'
                  }} />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('team')}
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: activeTab === 'team' ? '#fff' : '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '0.5rem 1rem',
                  transition: 'color 0.3s'
                }}
              >
                Meet the Team
                {activeTab === 'team' && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(to right, #22c55e, #f59e0b)'
                  }} />
                )}
              </button>
              <button 
                onClick={handleGetStarted}
                className="shimmer-btn"
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>Get Started</span>
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Tab Content */}
      {activeTab === 'home' && (
        <>
          {/* Hero Section */}
          <section style={{ position: 'relative', maxWidth: '72rem', margin: '0 auto', padding: '6rem 1.5rem 5rem', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '25%', width: '24rem', height: '24rem', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '9999px', filter: 'blur(96px)' }} />
            <div style={{ position: 'absolute', top: '5rem', right: '25%', width: '24rem', height: '24rem', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '9999px', filter: 'blur(96px)' }} />
            
            <div style={{ position: 'relative', textAlign: 'center', maxWidth: '56rem', margin: '0 auto' }}>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Welcome to{' '}
                <span style={{
                  background: 'linear-gradient(to right, #4ade80, #fbbf24, #4ade80)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Campulse
                </span>
              </h1>
              <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: '#9ca3af', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                UniIlorin&apos;s Student Campus Operating System
              </p>
              
              <div style={{ marginBottom: '4rem', maxWidth: '36rem', margin: '0 auto 4rem' }}>
                <img 
                  src="/images/logo.png" 
                  alt="Campulse Logo" 
                  style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                />
              </div>
            </div>
          </section>

          {/* Problem Statement */}
          <section style={{ position: 'relative', padding: '6rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
              <div 
                data-animate
                id="problem-section"
                style={{
                  opacity: visibleSections.has('problem-section') ? 1 : 0,
                  transform: visibleSections.has('problem-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', fontWeight: 'bold', color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>
                  The{' '}
                  <span style={{
                    background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Challenge
                  </span>
                </h2>
                <div style={{
                  borderRadius: '1rem',
                  padding: '2rem',
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p style={{ fontSize: '1.125rem', color: '#e5e7eb', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                    University life at the University of Ilorin presents students with numerous challenges in managing academics, campus resources, and extracurricular activities. Students struggle to keep track of deadlines, exams, lectures, and events while simultaneously seeking verified information about scholarships, internships, side gigs, and campus services.
                  </p>
                  <p style={{ fontSize: '1.125rem', color: '#e5e7eb', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                    The fragmentation of tools and platforms, including WhatsApp groups, Google Calendar, and personal notes, often leads to missed deadlines, reduced productivity, and increased stress. Moreover, accessing verified opportunities such as scholarships, competitions, and part-time jobs is time-consuming and prone to misinformation.
                  </p>
                  <p style={{ fontSize: '1.125rem', color: '#e5e7eb', lineHeight: '1.75' }}>
                    Marketplace activities such as buying and selling books, electronics, and services are informal and lack security or trust. The critical problem is the absence of a centralized, intelligent, and secure student platform that unifies academic management, community engagement, opportunities discovery, and campus services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Solution Section */}
          <section style={{ position: 'relative', padding: '6rem 0' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
              <div 
                data-animate
                id="solution-section"
                style={{
                  opacity: visibleSections.has('solution-section') ? 1 : 0,
                  transform: visibleSections.has('solution-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', fontWeight: 'bold', color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>
                  Our{' '}
                  <span style={{
                    background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Solution
                  </span>
                </h2>
                <div style={{
                  borderRadius: '1rem',
                  padding: '2rem',
                  marginBottom: '3rem',
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p style={{ fontSize: '1.125rem', color: '#e5e7eb', lineHeight: '1.75' }}>
                    Campulse is a campus operating system designed to solve these challenges by consolidating productivity tools, community platforms, opportunities marketplaces, and campus services into a single intelligent platform. The solution leverages cloud infrastructure and artificial intelligence to ensure scalability, security, and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section style={{ position: 'relative', padding: '6rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
              <div 
                data-animate
                id="features-title"
                style={{
                  textAlign: 'center',
                  marginBottom: '5rem',
                  opacity: visibleSections.has('features-title') ? 1 : 0,
                  transform: visibleSections.has('features-title') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s, transform 0.8s'
                }}
              >
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>
                  What We{' '}
                  <span style={{
                    background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Offer
                  </span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#9ca3af', maxWidth: '42rem', margin: '0 auto' }}>
                  Everything you need to succeed at UniIlorin, all in one place
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {[
                  {
                    id: 'feature-1',
                    title: 'Academic Management',
                    desc: 'Never miss a deadline. Track assignments, exams, and get smart reminders tailored to your schedule. AI-driven personalized study plans help reduce missed deadlines by up to 50%.'
                  },
                  {
                    id: 'feature-2',
                    title: 'Find Opportunities',
                    desc: 'Discover scholarships, internships, and side gigs matched to your interests and skills. Get personalized recommendations for verified opportunities all in one place.'
                  },
                  {
                    id: 'feature-3',
                    title: 'Campus Marketplace',
                    desc: 'Buy and sell textbooks, electronics, and services safely within the student community. Secure transactions with AI-powered fraud detection.'
                  },
                  {
                    id: 'feature-4',
                    title: 'Stay Connected',
                    desc: 'Get updates on campus events, club activities, and announcements all in one place. Centralized communication reduces misinformation and keeps you informed.'
                  }
                ].map((feature) => (
                  <div 
                    key={feature.id}
                    data-animate
                    id={feature.id}
                    style={{
                      borderRadius: '1rem',
                      padding: '2rem',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: 'rgba(17, 24, 39, 0.8)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      opacity: visibleSections.has(feature.id) ? 1 : 0,
                      transform: visibleSections.has(feature.id) ? 'translateY(0)' : 'translateY(40px)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = visibleSections.has(feature.id) ? 'translateY(0)' : 'translateY(40px)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                    }}
                  >
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#fff', marginBottom: '1rem' }}>
                      {feature.title}
                    </h3>
                    <p style={{ color: '#d1d5db', lineHeight: '1.75' }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section style={{ position: 'relative', padding: '6rem 0' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
              <div 
                data-animate
                id="benefits-section"
                style={{
                  opacity: visibleSections.has('benefits-section') ? 1 : 0,
                  transform: visibleSections.has('benefits-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s, transform 0.8s'
                }}
              >
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', fontWeight: 'bold', color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>
                  Why{' '}
                  <span style={{
                    background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Campulse?
                  </span>
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    background: 'rgba(17, 24, 39, 0.6)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.75rem' }}>For Students</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ color: '#e5e7eb', marginBottom: '0.5rem' }}>• Centralized access to all campus resources</li>
                      <li style={{ color: '#e5e7eb', marginBottom: '0.5rem' }}>• AI-driven reminders reduce missed deadlines by 50%</li>
                      <li style={{ color: '#e5e7eb', marginBottom: '0.5rem' }}>• Personalized opportunity recommendations</li>
                      <li style={{ color: '#e5e7eb' }}>• Secure marketplace for safe transactions</li>
                    </ul>
                  </div>
                  
                  <div style={{
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    background: 'rgba(17, 24, 39, 0.6)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.75rem' }}>For Administration</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      <li style={{ color: '#e5e7eb', marginBottom: '0.5rem' }}>• Real-time analytics dashboards</li>
                      <li style={{ color: '#e5e7eb', marginBottom: '0.5rem' }}>• Centralized communication platform</li>
                      <li style={{ color: '#e5e7eb', marginBottom: '0.5rem' }}>• Insights into student engagement and trends</li>
                      <li style={{ color: '#e5e7eb' }}>• Enhanced community satisfaction</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{ position: 'relative', padding: '6rem 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '24rem', height: '24rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '9999px', filter: 'blur(96px)' }} />
            
            <div style={{ position: 'relative', maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
              <div 
                data-animate
                id="cta-section"
                style={{
                  textAlign: 'center',
                  maxWidth: '48rem',
                  margin: '0 auto',
                  opacity: visibleSections.has('cta-section') ? 1 : 0,
                  transform: visibleSections.has('cta-section') ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s, transform 0.8s'
                }}
              >
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', fontWeight: 'bold', color: '#fff', marginBottom: '1.5rem' }}>
                  Ready to Transform Your{' '}
                  <span style={{
                    background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Campus Life?
                  </span>
                </h2>
                <p style={{ fontSize: '1.25rem', color: '#9ca3af', marginBottom: '2.5rem' }}>
                  Join the UniIlorin student community and take control of your academic journey.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="shimmer-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '1rem 2.5rem',
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  <span>Get Started Now</span>
                  <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Team Tab Content */}
      {activeTab === 'team' && (
        <section style={{ position: 'relative', minHeight: '100vh', padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            {/* Creator */}
            <div style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#fff' }}>
                Meet the man who{' '}
                <span style={{
                  background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  started it all
                </span>
              </h2>
              <div style={{
                maxWidth: '42rem',
                margin: '0 auto',
                borderRadius: '1rem',
                padding: '2rem',
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: '8rem',
                    height: '8rem',
                    borderRadius: '9999px',
                    background: '#1f2937',
                    marginBottom: '1.5rem',
                    overflow: 'hidden',
                    border: '4px solid rgba(34, 197, 94, 0.3)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}>
                    <img 
                      src="/images/creator.jpg" 
                      alt={teamMembers.creator.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>{teamMembers.creator.name}</h3>
                  <p style={{ fontSize: '1rem', color: '#e5e7eb', lineHeight: '1.75' }}>{teamMembers.creator.info}</p>
                </div>
              </div>
            </div>

            {/* Developers */}
            <div>
              <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#fff' }}>
                Meet the{' '}
                <span style={{
                  background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Developers
                </span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {teamMembers.developers.map((dev, index) => (
                  <div 
                    key={index}
                    style={{
                      borderRadius: '1rem',
                      padding: '1.5rem',
                      background: 'rgba(17, 24, 39, 0.8)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(245, 158, 11, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.2)';
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{
                        width: '6rem',
                        height: '6rem',
                        borderRadius: '9999px',
                        background: '#1f2937',
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        border: '4px solid rgba(245, 158, 11, 0.3)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}>
                        <img 
                          src={`/images/${dev.image}`}
                          alt={dev.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>{dev.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#e5e7eb', marginBottom: '1rem', lineHeight: '1.75' }}>{dev.info}</p>
                      
                      {(dev.socials.github || dev.socials.linkedin || dev.socials.email) && (
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                          {dev.socials.github && (
                            <a 
                              href={dev.socials.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#9ca3af', transition: 'color 0.3s' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                            >
                              <Github size={20} />
                            </a>
                          )}
                          {dev.socials.linkedin && (
                            <a 
                              href={dev.socials.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#9ca3af', transition: 'color 0.3s' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                            >
                              <Linkedin size={20} />
                            </a>
                          )}
                          {dev.socials.email && (
                            <a 
                              href={`mailto:${dev.socials.email}`}
                              style={{ color: '#9ca3af', transition: 'color 0.3s' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
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
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: '#000' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                background: 'linear-gradient(to right, #4ade80, #fbbf24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Campulse
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Built by Unilorin Students</p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', textAlign: 'center', color: '#fff' }}>Connect With Us</h4>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <a 
                  href="https://www.instagram.com/campulsehub?igsh=MXJ5cDJodjU1dXg0YQ==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#9ca3af', transition: 'color 0.3s' }}
                  aria-label="Instagram"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://x.com/Campulse_24" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#9ca3af', transition: 'color 0.3s' }}
                  aria-label="X (Twitter)"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://whatsapp.com/channel/0029VbB9rpLGk1FrLLnDVM16" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#9ca3af', transition: 'color 0.3s' }}
                  aria-label="WhatsApp"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#4ade80'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
            
            <p style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '1rem' }}>
              © 2025 Campulse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampulseLanding;
