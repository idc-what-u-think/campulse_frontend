'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Tag, Bookmark, BookmarkCheck, X, ExternalLink } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: 'gig' | 'scholarship' | 'deal';
  deadline?: string;
  link?: string;
}

interface OpportunitiesProps {
  fetchOpportunities?: () => Promise<Opportunity[]>;
  bookmarkOpportunity?: (id: string) => Promise<void>;
}

const Opportunities: React.FC<OpportunitiesProps> = ({
  fetchOpportunities = async () => {
    // Mock data
    return [
      {
        id: '1',
        title: 'Frontend Developer Internship',
        description: 'Join our team as a frontend developer intern. Work on real projects and gain valuable experience.',
        category: 'gig',
        deadline: '2025-02-28',
        link: 'https://example.com'
      },
      {
        id: '2',
        title: 'Tech Women Africa Scholarship',
        description: 'Full scholarship for female students pursuing technology degrees. Covers tuition and living expenses.',
        category: 'scholarship',
        deadline: '2025-03-15',
        link: 'https://example.com'
      },
      {
        id: '3',
        title: '50% Off Programming Books',
        description: 'Exclusive deal on popular programming books. Limited time offer for students.',
        category: 'deal',
        deadline: '2025-02-10',
        link: 'https://example.com'
      }
    ];
  },
  bookmarkOpportunity = async (id: string) => {
    console.log('Bookmarked:', id);
  }
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'gig' | 'scholarship' | 'deal'>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadOpportunities();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredOpportunities(opportunities);
    } else {
      setFilteredOpportunities(
        opportunities.filter(opp => opp.category.toLowerCase() === filter)
      );
    }
  }, [filter, opportunities]);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      const data = await fetchOpportunities();
      setOpportunities(data);
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (oppId: string) => {
    try {
      await bookmarkOpportunity(oppId);
      setBookmarkedIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(oppId)) {
          newSet.delete(oppId);
        } else {
          newSet.add(oppId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Failed to bookmark opportunity:', error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'gig':
        return <Briefcase size={20} />;
      case 'scholarship':
        return <GraduationCap size={20} />;
      case 'deal':
        return <Tag size={20} />;
      default:
        return <Tag size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'gig':
        return '#f9dc5c';
      case 'scholarship':
        return '#bfd8fd';
      case 'deal':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filterButtonStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.75rem',
    background: isActive 
      ? 'linear-gradient(135deg, #f9dc5c 0%, #fde992 100%)'
      : 'rgba(255, 255, 255, 0.8)',
    color: '#002e21',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.875rem',
    boxShadow: isActive ? '0 4px 12px rgba(249, 220, 92, 0.3)' : 'none'
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f4fd 100%)',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '0.5rem',
          color: '#002e21'
        }}>
          🚀 Opportunities Hub
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(0, 46, 33, 0.6)'
        }}>
          Discover gigs, scholarships, and exclusive deals
        </p>
      </div>

      {/* Filters */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          style={filterButtonStyle(filter === 'all')}
          onClick={() => setFilter('all')}
          onMouseEnter={(e) => {
            if (filter !== 'all') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== 'all') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          All Opportunities
        </button>
        <button
          style={filterButtonStyle(filter === 'gig')}
          onClick={() => setFilter('gig')}
          onMouseEnter={(e) => {
            if (filter !== 'gig') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== 'gig') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <Briefcase size={18} />
          Gigs
        </button>
        <button
          style={filterButtonStyle(filter === 'scholarship')}
          onClick={() => setFilter('scholarship')}
          onMouseEnter={(e) => {
            if (filter !== 'scholarship') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== 'scholarship') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <GraduationCap size={18} />
          Scholarships
        </button>
        <button
          style={filterButtonStyle(filter === 'deal')}
          onClick={() => setFilter('deal')}
          onMouseEnter={(e) => {
            if (filter !== 'deal') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== 'deal') {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <Tag size={18} />
          Deals
        </button>
      </div>

      {/* Opportunities Container */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            fontSize: '1.25rem',
            color: 'rgba(0, 46, 33, 0.6)'
          }}>
            Loading opportunities...
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <Briefcase size={64} color="rgba(0, 46, 33, 0.3)" />
            <h3 style={{ color: '#002e21', fontSize: '1.5rem' }}>No opportunities found</h3>
            <p style={{ color: 'rgba(0, 46, 33, 0.6)' }}>Check back later for new opportunities!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                onClick={() => setSelectedOpportunity(opp)}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: '1.5rem',
                  border: '2px solid rgba(0, 46, 33, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 46, 33, 0.15)';
                  e.currentTarget.style.borderColor = '#f9dc5c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0, 46, 33, 0.1)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    color: '#002e21',
                    backgroundColor: getCategoryColor(opp.category)
                  }}>
                    {getCategoryIcon(opp.category)}
                    {opp.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(opp.id);
                    }}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: 'none',
                      background: 'rgba(0, 46, 33, 0.05)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      color: '#002e21'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9dc5c';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 46, 33, 0.05)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {bookmarkedIds.has(opp.id) ? (
                      <BookmarkCheck size={20} />
                    ) : (
                      <Bookmark size={20} />
                    )}
                  </button>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#002e21',
                  marginBottom: '0.75rem',
                  lineHeight: 1.3
                }}>
                  {opp.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'rgba(0, 46, 33, 0.6)',
                  marginBottom: '1rem',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {opp.description}
                </p>

                {opp.deadline && (
                  <div style={{
                    fontSize: '0.875rem',
                    padding: '0.5rem',
                    background: 'rgba(249, 220, 92, 0.1)',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    color: '#002e21'
                  }}>
                    📅 Deadline: {formatDate(opp.deadline)}
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(0, 46, 33, 0.1)'
                }}>
                  <span style={{
                    fontWeight: 600,
                    color: '#002e21',
                    fontSize: '0.875rem'
                  }}>
                    View Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOpportunity && (
        <div 
          onClick={() => setSelectedOpportunity(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            zIndex: 1000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '700px',
              width: '100%',
              background: 'white',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid rgba(0, 46, 33, 0.1)',
              position: 'relative'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'capitalize',
                color: '#002e21',
                backgroundColor: getCategoryColor(selectedOpportunity.category)
              }}>
                {getCategoryIcon(selectedOpportunity.category)}
                {selectedOpportunity.category}
              </span>
              <h2 style={{
                marginTop: '1rem',
                fontSize: '2rem',
                color: '#002e21',
                lineHeight: 1.3
              }}>
                {selectedOpportunity.title}
              </h2>
              <button
                onClick={() => setSelectedOpportunity(null)}
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  background: 'rgba(0, 46, 33, 0.05)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: '#002e21'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 46, 33, 0.05)';
                  e.currentTarget.style.color = '#002e21';
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(0, 46, 33, 0.8)',
                marginBottom: '2rem'
              }}>
                {selectedOpportunity.description}
              </p>

              {selectedOpportunity.deadline && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: 'rgba(0, 46, 33, 0.02)',
                  borderRadius: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <strong style={{ color: '#002e21' }}>Deadline:</strong>
                  <span>{formatDate(selectedOpportunity.deadline)}</span>
                </div>
              )}

              {selectedOpportunity.link && (
                <a
                  href={selectedOpportunity.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 1.75rem',
                    background: 'linear-gradient(135deg, #bfd8fd 0%, #a8d0fc 100%)',
                    color: '#002e21',
                    borderRadius: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(191, 216, 253, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <ExternalLink size={18} />
                  Visit Opportunity
                </a>
              )}

              <button
                onClick={() => handleBookmark(selectedOpportunity.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.875rem',
                  background: 'linear-gradient(135deg, #f9dc5c 0%, #fde992 100%)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: '#002e21',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(249, 220, 92, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {bookmarkedIds.has(selectedOpportunity.id) ? (
                  <>
                    <BookmarkCheck size={20} />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <Bookmark size={20} />
                    Bookmark
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opportunities;
