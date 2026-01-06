'use client';

import React, { useState } from 'react';
import { Home, Calendar, Briefcase, GraduationCap, LogOut, Menu, X } from 'lucide-react';

interface User {
  fullName?: string;
  full_name?: string;
  level?: string;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  user = { fullName: 'Student', level: '200 Level' },
  onLogout = () => console.log('Logout'),
  onNavigate = (path) => console.log('Navigate to:', path),
  currentPath = '/dashboard'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= 768);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/planner', label: 'Planner', icon: <Calendar size={20} /> },
    { path: '/opportunities', label: 'Opportunities', icon: <Briefcase size={20} /> },
    { path: '/tutors', label: 'Tutors', icon: <GraduationCap size={20} /> },
  ];

  const handleLogout = () => {
    onLogout();
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 46, 33, 0.1)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/dashboard');
          }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f9dc5c 0%, #fde992 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          CAMPULSE
        </a>

        {/* Desktop Navigation */}
        {isDesktop && (
          <div style={{
            display: 'flex',
            flex: 1,
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {navItems.map((item) => (
              <a
                key={item.path}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.path);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  color: currentPath === item.path ? '#002e21' : 'rgba(0, 46, 33, 0.7)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  background: currentPath === item.path 
                    ? 'linear-gradient(135deg, #f9dc5c 0%, #fde992 100%)'
                    : 'transparent',
                  boxShadow: currentPath === item.path ? '0 4px 12px rgba(249, 220, 92, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (currentPath !== item.path) {
                    e.currentTarget.style.background = 'rgba(249, 220, 92, 0.1)';
                    e.currentTarget.style.color = '#002e21';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPath !== item.path) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(0, 46, 33, 0.7)';
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Desktop User Section */}
        {isDesktop && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <span style={{
                fontWeight: 600,
                color: '#002e21',
                fontSize: '0.875rem'
              }}>
                {user?.fullName || user?.full_name || 'Student'}
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: 'rgba(0, 46, 33, 0.6)'
              }}>
                {user?.level}
              </span>
            </div>
            <button
              onClick={handleLogout}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ef4444';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <LogOut size={20} />
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {!isDesktop && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              border: 'none',
              background: 'rgba(0, 46, 33, 0.05)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              color: '#002e21',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 46, 33, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 46, 33, 0.05)';
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && !isDesktop && (
        <div style={{
          borderTop: '1px solid rgba(0, 46, 33, 0.1)',
          padding: '1rem',
          background: '#ffffff'
        }}>
          {navItems.map((item) => (
            <a
              key={item.path}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.path);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontWeight: 600,
                color: currentPath === item.path ? '#002e21' : 'rgba(0, 46, 33, 0.7)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                marginBottom: '0.5rem',
                background: currentPath === item.path 
                  ? 'linear-gradient(135deg, #f9dc5c 0%, #fde992 100%)'
                  : 'transparent'
              }}
              onMouseEnter={(e) => {
                if (currentPath !== item.path) {
                  e.currentTarget.style.background = 'rgba(249, 220, 92, 0.1)';
                  e.currentTarget.style.color = '#002e21';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPath !== item.path) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(0, 46, 33, 0.7)';
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              padding: '1rem',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              borderRadius: '0.75rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              fontSize: '1rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.color = '#ef4444';
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
