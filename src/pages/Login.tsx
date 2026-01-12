'use client';

import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginProps {
  onLogin?: (email: string, password: string) => Promise<void>;
  onNavigate?: (path: string) => void;
}

const Login: React.FC<LoginProps> = ({ 
  onLogin = async (email, password) => {
    console.log('Login:', email, password);
    await new Promise(resolve => setTimeout(resolve, 1000));
  },
  onNavigate = (path) => console.log('Navigate to:', path)
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= 768);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setGeneralError('');
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      await onLogin(formData.email, formData.password);
      onNavigate('/dashboard');
    } catch (error: any) {
      setGeneralError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #bfd8fd 0%, #f5f5f5 50%, #e8f5f3 100%)'
    }}>
      <style jsx>{`
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
        .blob-1 {
          animation: float 20s ease-in-out infinite;
        }
        .blob-2 {
          animation: float 20s ease-in-out infinite;
          animation-delay: 5s;
        }
        .blob-3 {
          animation: float 20s ease-in-out infinite;
          animation-delay: 10s;
        }
      `}</style>

      {/* Background Blobs */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0
      }}>
        <div 
          className="blob-1"
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #bfd8fd, #a8d0fc)',
            top: '-100px',
            left: '-100px',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.4
          }} 
        />
        <div 
          className="blob-2"
          style={{
            position: 'absolute',
            width: '350px',
            height: '350px',
            background: 'linear-gradient(135deg, #f9dc5c, #fde992)',
            bottom: '-100px',
            right: '-100px',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.4
          }} 
        />
        <div 
          className="blob-3"
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'rgba(0, 46, 33, 0.08)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.4
          }} 
        />
      </div>

      {/* Main Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Login Card */}
        <div style={{
          background: 'linear-gradient(145deg, #ffffff, #fefefe)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: isDesktop ? '3rem' : '2rem',
          boxShadow: '0 8px 32px rgba(0, 46, 33, 0.12)',
          border: '2px solid rgba(249, 220, 92, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(to right, #bfd8fd, #f9dc5c, #bfd8fd)'
          }} />

          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: isDesktop ? '2rem' : '1.5rem'
          }}>
            <h1 style={{
              fontSize: isDesktop ? '2.5rem' : '1.75rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #002e21 0%, #004d3a 50%, #f9dc5c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: isDesktop ? '1rem' : '0.5rem',
              letterSpacing: '0.05em',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}>
              CAMPULSE
            </h1>
            <h2 style={{
              fontSize: isDesktop ? '2rem' : '1.5rem',
              color: '#002e21',
              marginBottom: isDesktop ? '0.5rem' : '0.25rem'
            }}>
              Welcome Back!
            </h2>
            <p style={{
              fontSize: isDesktop ? '1rem' : '0.875rem',
              color: 'rgba(0, 46, 33, 0.65)'
            }}>
              Sign in to continue your productivity journey
            </p>
          </div>

          {/* Form Fields */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {generalError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.12))',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                color: '#dc2626',
                fontSize: isDesktop ? '0.875rem' : '0.8rem'
              }}>
                <AlertCircle size={20} />
                <span>{generalError}</span>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#002e21'
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(0, 46, 33, 0.4)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                  style={{
                    width: '100%',
                    padding: isDesktop ? '0.875rem 1rem 0.875rem 3rem' : '0.75rem 0.875rem 0.75rem 2.75rem',
                    border: `2px solid ${errors.email ? '#ef4444' : 'rgba(0, 46, 33, 0.15)'}`,
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
                    fontSize: isDesktop ? '1rem' : '0.875rem',
                    color: '#002e21',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#f9dc5c';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249, 220, 92, 0.15)';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    if (!errors.email) {
                      e.currentTarget.style.borderColor = 'rgba(0, 46, 33, 0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'linear-gradient(to bottom, #ffffff, #fafafa)';
                    }
                  }}
                />
              </div>
              {errors.email && (
                <p style={{
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#ef4444'
                }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#002e21'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(0, 46, 33, 0.4)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  required
                  style={{
                    width: '100%',
                    padding: isDesktop ? '0.875rem 1rem 0.875rem 3rem' : '0.75rem 0.875rem 0.75rem 2.75rem',
                    border: `2px solid ${errors.password ? '#ef4444' : 'rgba(0, 46, 33, 0.15)'}`,
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
                    fontSize: isDesktop ? '1rem' : '0.875rem',
                    color: '#002e21',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#f9dc5c';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249, 220, 92, 0.15)';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                  onBlur={(e) => {
                    if (!errors.password) {
                      e.currentTarget.style.borderColor = 'rgba(0, 46, 33, 0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'linear-gradient(to bottom, #ffffff, #fafafa)';
                    }
                  }}
                />
              </div>
              {errors.password && (
                <p style={{
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#ef4444'
                }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Options */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0.5rem 0',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: isDesktop ? '0.875rem' : '0.8rem',
                color: 'rgba(0, 46, 33, 0.7)'
              }}>
                <input 
                  type="checkbox" 
                  style={{
                    width: isDesktop ? '18px' : '16px',
                    height: isDesktop ? '18px' : '16px',
                    cursor: 'pointer',
                    accentColor: '#f9dc5c'
                  }}
                />
                <span>Remember me</span>
              </label>
              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: isDesktop ? '0.875rem' : '0.8rem',
                  color: '#002e21',
                  fontWeight: 600,
                  textDecoration: 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9dc5c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#002e21';
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '0.75rem',
                background: loading 
                  ? 'linear-gradient(135deg, rgba(249, 220, 92, 0.5), rgba(253, 233, 146, 0.5))'
                  : 'linear-gradient(135deg, #f9dc5c 0%, #fde992 100%)',
                color: '#002e21',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(249, 220, 92, 0.4)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 220, 92, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(249, 220, 92, 0.4)';
                }
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          {/* Footer */}
          <div style={{
            marginTop: isDesktop ? '1.5rem' : '1rem',
            textAlign: 'center',
            color: 'rgba(0, 46, 33, 0.7)',
            fontSize: isDesktop ? '1rem' : '0.875rem'
          }}>
            <p style={{ margin: 0 }}>
              Don&apos;t have an account?
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/signup');
                }}
                style={{
                  fontWeight: 700,
                  color: '#002e21',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9dc5c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#002e21';
                }}
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>

        {/* Feature Cards - Hidden on mobile */}
        {isDesktop && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {[
              { icon: '📚', title: 'Smart Planner', desc: 'Never miss a deadline again' },
              { icon: '🎯', title: 'Opportunities', desc: 'Find gigs & scholarships' },
              { icon: '👨‍🏫', title: 'Find Tutors', desc: 'Get academic support' }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'linear-gradient(145deg, #ffffff, #fcfcfc)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(191, 216, 253, 0.4)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 46, 33, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(249, 220, 92, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(191, 216, 253, 0.4)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(to right, #bfd8fd, #f9dc5c)'
                }} />
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 46, 33, 0.1))'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  marginBottom: '0.5rem',
                  color: '#002e21'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(0, 46, 33, 0.65)',
                  margin: 0
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
