'use client';

import { useState, useEffect } from 'react';
import { tutorsAPI } from '../services/api';
import { Search, MessageCircle, X, Star } from 'lucide-react';

// Types
interface Tutor {
    id: string | number;
    name: string;
    courses?: string[];
    rating?: number;
    whatsapp: string;
    bio?: string;
    experience?: string;
}

const Tutors = () => {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async (courseCode: string | null = null): Promise<void> => {
        try {
            setLoading(true);
            const data = await tutorsAPI.getTutors(courseCode);
            setTutors(data);
        } catch (error) {
            console.error('Failed to fetch tutors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        fetchTutors(searchQuery || null);
    };

    const handleWhatsAppClick = (phoneNumber: string): void => {
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanNumber}`, '_blank');
    };

    return (
        <div className="tutors-page">
            <style jsx>{`
                .tutors-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f5f5f5 0%, #e8f4fd 100%);
                    padding: 2rem;
                }

                .tutors-header {
                    max-width: 1200px;
                    margin: 0 auto 2.5rem;
                }

                .tutors-header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                    color: #002e21;
                }

                .tutors-header p {
                    font-size: 1rem;
                    color: rgba(0, 46, 33, 0.6);
                }

                .tutors-search {
                    max-width: 1200px;
                    margin: 0 auto 2.5rem;
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .search-input-wrapper {
                    flex: 1;
                    min-width: 250px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.95);
                    border: 2px solid rgba(0, 46, 33, 0.1);
                    border-radius: 1rem;
                    padding: 0.875rem 1rem;
                    gap: 0.75rem;
                }

                .search-input-wrapper input {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-size: 1rem;
                    font-family: 'Manrope', sans-serif;
                    color: #002e21;
                }

                .search-btn,
                .clear-btn {
                    padding: 0.875rem 1.75rem;
                    border: none;
                    border-radius: 1rem;
                    font-weight: 600;
                    font-family: 'Manrope', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .search-btn {
                    background: linear-gradient(135deg, #f9dc5c 0%, #f4a261 100%);
                    color: #002e21;
                }

                .search-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .clear-btn {
                    background: rgba(0, 46, 33, 0.05);
                    color: #002e21;
                }

                .clear-btn:hover {
                    background: rgba(0, 46, 33, 0.1);
                }

                .tutors-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .tutors-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2rem;
                }

                .tutor-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 1.5rem;
                    padding: 2.5rem;
                    border: 2px solid rgba(0, 46, 33, 0.1);
                    cursor: pointer;
                    transition: all 0.3s;
                    text-align: center;
                    animation: fadeIn 0.3s;
                }

                .tutor-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    border-color: #f9dc5c;
                }

                .tutor-avatar {
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 1rem;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #3a86ff 0%, #8338ec 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .tutor-avatar.large {
                    width: 100px;
                    height: 100px;
                }

                .avatar-initial {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #002e21;
                }

                .tutor-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #002e21;
                    margin-bottom: 1rem;
                }

                .tutor-courses {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .course-tag {
                    padding: 0.375rem 0.75rem;
                    background: rgba(249, 220, 92, 0.2);
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #002e21;
                }

                .course-tag.more {
                    background: rgba(0, 46, 33, 0.05);
                }

                .tutor-rating {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                    color: #002e21;
                }

                .whatsapp-btn {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1.5rem;
                    background: #25d366;
                    color: white;
                    border: none;
                    border-radius: 1rem;
                    font-weight: 600;
                    font-family: 'Manrope', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .whatsapp-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
                }

                .tutor-modal {
                    max-width: 600px;
                }

                .tutor-modal-header {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    width: 100%;
                }

                .tutor-modal-header > div {
                    flex: 1;
                    text-align: left;
                }

                .tutor-modal-header h2 {
                    font-size: 1.75rem;
                    margin-bottom: 0.5rem;
                }

                .tutor-section {
                    margin-bottom: 2.5rem;
                }

                .tutor-section h3 {
                    font-size: 1.125rem;
                    margin-bottom: 1rem;
                    color: #002e21;
                }

                .tutor-section p {
                    line-height: 1.7;
                    color: rgba(0, 46, 33, 0.8);
                }

                .tutor-section .tutor-courses {
                    justify-content: flex-start;
                }

                .whatsapp-btn-large {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    padding: 1rem 1.5rem;
                    background: #25d366;
                    color: white;
                    border: none;
                    border-radius: 1rem;
                    font-weight: 600;
                    font-family: 'Manrope', sans-serif;
                    font-size: 1.125rem;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .whatsapp-btn-large:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
                }

                .loading-state,
                .empty-state {
                    text-align: center;
                    padding: 4rem;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 1.5rem;
                }

                .empty-state h3 {
                    margin: 1rem 0 0.5rem;
                    color: #002e21;
                }

                .empty-state p {
                    color: rgba(0, 46, 33, 0.6);
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                    animation: fadeIn 0.2s;
                }

                .modal-content {
                    background: #ffffff;
                    border-radius: 2rem;
                    width: 100%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    animation: slideInLeft 0.3s;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2.5rem;
                    border-bottom: 1px solid rgba(0, 46, 33, 0.1);
                }

                .modal-close {
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: rgba(0, 46, 33, 0.05);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.15s;
                }

                .modal-close:hover {
                    background: #ef4444;
                    color: #ffffff;
                }

                .modal-body {
                    padding: 2.5rem;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @media (max-width: 768px) {
                    .tutors-grid {
                        grid-template-columns: 1fr;
                    }

                    .tutor-modal-header {
                        flex-direction: column;
                        text-align: center;
                    }

                    .tutor-modal-header > div {
                        text-align: center;
                    }

                    .tutor-section .tutor-courses {
                        justify-content: center;
                    }
                }
            `}</style>

            <div className="tutors-header">
                <div>
                    <h1>👨‍🏫 Tutor Discovery</h1>
                    <p>Find expert tutors for academic support</p>
                </div>
            </div>

            {/* Search */}
            <form className="tutors-search" onSubmit={handleSearch}>
                <div className="search-input-wrapper">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search by course code (e.g., MTH 101, CSC 201)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button type="submit" className="search-btn">
                    Search
                </button>
                {searchQuery && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={() => {
                            setSearchQuery('');
                            fetchTutors(null);
                        }}
                    >
                        Clear
                    </button>
                )}
            </form>

            {/* Tutors Grid */}
            <div className="tutors-container">
                {loading ? (
                    <div className="loading-state">Loading tutors...</div>
                ) : tutors.length === 0 ? (
                    <div className="empty-state">
                        <Search size={64} color="#3a86ff" />
                        <h3>No tutors found</h3>
                        <p>Try searching for a different course code</p>
                    </div>
                ) : (
                    <div className="tutors-grid">
                        {tutors.map((tutor) => (
                            <div
                                key={tutor.id}
                                className="tutor-card"
                                onClick={() => setSelectedTutor(tutor)}
                            >
                                <div className="tutor-avatar">
                                    <span className="avatar-initial">
                                        {tutor.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>

                                <h3 className="tutor-name">{tutor.name}</h3>

                                {tutor.courses && tutor.courses.length > 0 && (
                                    <div className="tutor-courses">
                                        {tutor.courses.slice(0, 3).map((course, index) => (
                                            <span key={index} className="course-tag">
                                                {course}
                                            </span>
                                        ))}
                                        {tutor.courses.length > 3 && (
                                            <span className="course-tag more">
                                                +{tutor.courses.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {tutor.rating && (
                                    <div className="tutor-rating">
                                        <Star size={16} fill="#f9dc5c" color="#f9dc5c" />
                                        <span>{tutor.rating}/5</span>
                                    </div>
                                )}

                                <button
                                    className="whatsapp-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWhatsAppClick(tutor.whatsapp);
                                    }}
                                >
                                    <MessageCircle size={18} />
                                    Contact on WhatsApp
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedTutor && (
                <div className="modal-overlay" onClick={() => setSelectedTutor(null)}>
                    <div className="modal-content tutor-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="tutor-modal-header">
                                <div className="tutor-avatar large">
                                    <span className="avatar-initial">
                                        {selectedTutor.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h2>{selectedTutor.name}</h2>
                                    {selectedTutor.rating && (
                                        <div className="tutor-rating">
                                            <Star size={18} fill="#f9dc5c" color="#f9dc5c" />
                                            <span>{selectedTutor.rating}/5</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                className="modal-close"
                                onClick={() => setSelectedTutor(null)}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            {selectedTutor.bio && (
                                <div className="tutor-section">
                                    <h3>About</h3>
                                    <p>{selectedTutor.bio}</p>
                                </div>
                            )}

                            {selectedTutor.courses && selectedTutor.courses.length > 0 && (
                                <div className="tutor-section">
                                    <h3>Courses Taught</h3>
                                    <div className="tutor-courses">
                                        {selectedTutor.courses.map((course, index) => (
                                            <span key={index} className="course-tag">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedTutor.experience && (
                                <div className="tutor-section">
                                    <h3>Experience</h3>
                                    <p>{selectedTutor.experience}</p>
                                </div>
                            )}

                            <button
                                className="whatsapp-btn-large"
                                onClick={() => handleWhatsAppClick(selectedTutor.whatsapp)}
                            >
                                <MessageCircle size={20} />
                                Contact on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tutors;
