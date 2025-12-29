'use client';

import React, { useState } from 'react';
import { ArrowRight, Bell, Mail } from 'lucide-react';

interface User {
  fullName?: string;
  full_name?: string;
  school?: string;
  department?: string;
  level?: string;
}

interface Notification {
  id: number;
  type: string;
  text: string;
  time: string;
  unread: boolean;
}

interface AgendaItem {
  id: number;
  type: 'class' | 'assignment' | 'event';
  title: string;
  time: string;
}

interface Activity {
  id: number;
  icon: string;
  text: string;
  time: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  path: string;
  color: string;
}

interface DashboardProps {
  user?: User;
  onNavigate?: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user = { fullName: 'Student', school: 'University of Ilorin', department: 'Computer Science', level: '200 Level' },
  onNavigate = (path) => console.log(`Navigate to: ${path}`)
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications: Notification[] = [
    { id: 1, type: 'assignment', text: 'CSC 301 Assignment due tomorrow', time: '2h ago', unread: true },
    { id: 2, type: 'opportunity', text: 'New scholarship: Tech Women Africa Grant', time: '5h ago', unread: true },
    { id: 3, type: 'announcement', text: 'Library hours extended this week', time: '1d ago', unread: false },
  ];

  const todayAgenda: AgendaItem[] = [
    { id: 1, type: 'class', title: 'CSC 301 - Data Structures', time: '10:00 AM' },
    { id: 2, type: 'assignment', title: 'PHY 202 Lab Report', time: '5:00 PM' },
    { id: 3, type: 'event', title: 'Study Group - Library', time: '7:00 PM' },
  ];

  const recentActivity: Activity[] = [
    { id: 1, icon: '🎓', text: 'New scholarship: Tech Women Africa Grant', time: '2h ago' },
    { id: 2, icon: '📱', text: 'New listing: iPhone 13 - ₦150,000', time: '4h ago' },
    { id: 3, icon: '📢', text: 'Campus announcement: Library hours extended', time: '6h ago' },
    { id: 4, icon: '🎯', text: 'Recommended: Web Dev internship matches your profile', time: '1d ago' },
  ];

  const features: Feature[] = [
    {
      icon: '📚',
      title: 'Academic Planner',
      description: 'Manage your classes, assignments, and exams',
      path: '/planner',
      color: '#f9dc5c'
    },
    {
      icon: '🎯',
      title: 'Opportunities Hub',
      description: 'Find gigs, scholarships, and deals',
      path: '/opportunities',
      color: '#bfd8fd'
    },
    {
      icon: '👨‍🏫',
      title: 'Tutor Discovery',
      description: 'Connect with tutors for academic support',
      path: '/tutors',
      color: '#10b981'
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getAgendaTypeStyle = (type: 'class' | 'assignment' | 'event') => {
    const styles = {
      class: { background: 'rgba(191, 216, 253, 0.3)', color: '#3b82f6' },
      assignment: { background: 'rgba(249, 220, 92, 0.3)', color: '#d97706' },
      event: { background: 'rgba(16, 185, 129, 0.2)', color: '#059669' }
    };
    return styles[type];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #bfd8fd 0%, #f5f5f5 50%, #e8f5f3 100%)',
      padding: '2rem',
      position: 'relative'
    }}>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-down {
          animation: slideDown 0.3s ease;
        }
      `}</style>

      {/* Top Bar */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 100
      }}>
        <button 
          onClick={() => onNavigate('/announcements')}
          style={{
            background: '#ffffff',
            border: '2px solid rgba(191, 216, 253, 0.4)',
            borderRadius: '0.75rem',
            padding: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#002e21'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(145deg, #f9dc5c, #fde992)';
            e.currentTarget.style.borderColor = '#f9dc5c';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 220, 92, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = 'rgba(191, 216, 253, 0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Mail size={24} />
        </button>
        
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: '#ffffff',
              border: '2px solid rgba(191, 216, 253, 0.4)',
              borderRadius: '0.75rem',
              padding: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#002e21',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(145deg, #f9dc5c, #fde992)';
              e.currentTarget.style.borderColor = '#f9dc5c';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 220, 92, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(191, 216, 253, 0.4)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '2px solid white'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div 
              className="slide-down"
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '380px',
                background: 'white',
                borderRadius: '1.5rem',
                boxShadow: '0 10px 40px rgba(0, 46, 33, 0.15)',
                border: '2px solid rgba(191, 216, 253, 0.4)',
                overflow: 'hidden'
              }}
            >
              <div style={{
                padding: '1.5rem',
                borderBottom: '1px solid rgba(191, 216, 253, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  color: '#002e21',
                  margin: 0
                }}>Notifications</h3>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#3b82f6';
                  e.currentTarget.style.textDecoration = 'none';
                }}
                >
                  Mark all as read
                </button>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.map(notif => (
                  <div 
                    key={notif.id}
                    style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid rgba(191, 216, 253, 0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'background 0.3s ease',
                      cursor: 'pointer',
                      background: notif.unread ? 'rgba(249, 220, 92, 0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(191, 216, 253, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = notif.unread ? 'rgba(249, 220, 92, 0.1)' : 'transparent';
                    }}
                  >
                    <div>
                      <p style={{
                        margin: '0 0 0.25rem 0',
                        color: '#002e21',
                        fontSize: '0.9375rem'
                      }}>{notif.text}</p>
                      <span style={{
                        fontSize: '0.8125rem',
                        color: 'rgba(0, 46, 33, 0.6)'
                      }}>{notif.time}</span>
                    </div>
                    {notif.unread && (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '4rem'
      }}>
        {/* Welcome Section */}
        <div style={{
          background: 'linear-gradient(to right, #ffffff, #fef9ed)',
          padding: '3rem',
          borderRadius: '1.5rem',
          marginBottom: '3rem',
          boxShadow: '0 4px 16px rgba(0, 46, 33, 0.1)',
          textAlign: 'center',
          border: '2px solid rgba(249, 220, 92, 0.3)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#002e21',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}>
            Welcome back, {user?.fullName || user?.full_name || 'Student'}! 👋
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#002e21',
            margin: '0.5rem 0',
            fontWeight: 600,
            background: 'linear-gradient(to right, #f9dc5c, #fde992)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            display: 'inline-block'
          }}>
            {user?.school}
          </p>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(0, 46, 33, 0.7)',
            margin: '0.5rem 0'
          }}>
            {user?.department} • {user?.level}
          </p>
        </div>

        {/* Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Today's Agenda */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 16px rgba(0, 46, 33, 0.08)',
            border: '2px solid rgba(191, 216, 253, 0.3)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              color: '#002e21',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid rgba(249, 220, 92, 0.3)'
            }}>
              📅 Today's Agenda
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {todayAgenda.length > 0 ? (
                todayAgenda.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'linear-gradient(145deg, #f9f9f9, #ffffff)',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #f9dc5c',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 46, 33, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      fontWeight: 700,
                      color: '#002e21',
                      fontSize: '0.875rem',
                      minWidth: '70px'
                    }}>
                      {item.time}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                        textTransform: 'uppercase',
                        ...getAgendaTypeStyle(item.type)
                      }}>
                        {item.type}
                      </span>
                      <p style={{
                        margin: 0,
                        color: 'rgba(0, 46, 33, 0.8)',
                        fontSize: '0.9375rem'
                      }}>
                        {item.title}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{
                  textAlign: 'center',
                  color: 'rgba(0, 46, 33, 0.5)',
                  fontStyle: 'italic',
                  padding: '1.5rem'
                }}>
                  Nothing scheduled for today! 🎉
                </p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 16px rgba(0, 46, 33, 0.08)',
            border: '2px solid rgba(191, 216, 253, 0.3)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              color: '#002e21',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid rgba(249, 220, 92, 0.3)'
            }}>
              🔔 Recent Activity
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {recentActivity.map(activity => (
                <div 
                  key={activity.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'linear-gradient(145deg, #f9f9f9, #ffffff)',
                    borderRadius: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(191, 216, 253, 0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(145deg, #f9f9f9, #ffffff)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    {activity.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      margin: '0 0 0.25rem 0',
                      color: '#002e21',
                      fontSize: '0.9375rem'
                    }}>
                      {activity.text}
                    </p>
                    <span style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(0, 46, 33, 0.5)'
                    }}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature) => (
            <div
              key={feature.path}
              onClick={() => onNavigate(feature.path)}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #fcfcfc)',
                padding: '3rem',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 16px rgba(0, 46, 33, 0.08)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(191, 216, 253, 0.4)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 46, 33, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(249, 220, 92, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 46, 33, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(191, 216, 253, 0.4)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(to right, #bfd8fd, #f9dc5c)'
              }} />
              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(0, 46, 33, 0.1))'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#002e21'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(0, 46, 33, 0.65)',
                marginBottom: '1.5rem'
              }}>
                {feature.description}
              </p>
              <button style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.75rem',
                border: 'none',
                borderRadius: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                color: '#002e21',
                fontFamily: 'inherit',
                boxShadow: `0 3px 10px ${feature.color}4d`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 20px ${feature.color}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 3px 10px ${feature.color}4d`;
              }}
              >
                Get Started <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
