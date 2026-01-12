import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// MOCK DATA FOR SIMULATION
const MOCK_TASKS = [
    {
        id: 1,
        title: 'Complete Math Assignment',
        description: 'Solve problems 1-10 in Chapter 5',
        task_type: 'assignment',
        priority: 'high',
        due_date: new Date(Date.now() + 86400000).toISOString(),
        is_done: false
    },
    {
        id: 2,
        title: 'Physics Midterm',
        description: 'Topics: Mechanics and Thermodynamics',
        task_type: 'test',
        priority: 'high',
        due_date: new Date(Date.now() + 172800000).toISOString(),
        is_done: false
    },
    {
        id: 3,
        title: 'CSC 301 Class',
        description: 'Data Structures and Algorithms',
        task_type: 'class',
        priority: 'medium',
        due_date: new Date(Date.now() + 3600000).toISOString(),
        is_done: true
    }
];

const MOCK_OPPORTUNITIES = [
    {
        id: 1,
        title: 'Frontend Developer Intern',
        description: 'Remote internship opportunity for React developers. Build modern web applications.',
        category: 'gig',
        deadline: '2025-12-31',
        link: 'https://example.com'
    },
    {
        id: 2,
        title: 'MTN Foundation Scholarship',
        description: 'Annual scholarship for high-performing science and technology students.',
        category: 'scholarship',
        deadline: '2025-11-30',
        link: 'https://example.com'
    },
    {
        id: 3,
        title: '50% Off Laptop Repair',
        description: 'Get half price on screen replacements at TechHub Yaba.',
        category: 'deal',
        deadline: '2025-10-15',
        link: 'https://example.com'
    }
];

const MOCK_TUTORS = [
    {
        id: 1,
        name: 'David Okon',
        courses: ['MTH 101', 'PHY 101'],
        rating: 4.8,
        whatsapp: '2348012345678',
        bio: 'Experienced math tutor with 3 years of teaching experience. I simplify complex concepts.',
        experience: '3 years tutoring undergraduates'
    },
    {
        id: 2,
        name: 'Sarah Adebayo',
        courses: ['CSC 201', 'CSC 202'],
        rating: 4.9,
        whatsapp: '2348087654321',
        bio: 'Computer Science major. I can help you understand algorithms and data structures.',
        experience: 'Dean\'s list student, 2 years tutoring'
    },
    {
        id: 3,
        name: 'Emmanuel Chinedu',
        courses: ['CHM 101'],
        rating: 4.5,
        whatsapp: '2348055555555',
        bio: 'Chemistry enthusiast. Let\'s ace that exam together!',
        experience: '1 year tutoring'
    }
];

// SIMULATION HELPER
const simulateDelay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 800);
    });
};

// ========================================
// TASKS ENDPOINTS (Academic Planner)
// ========================================

export const tasksAPI = {
    getAllTasks: async () => simulateDelay(MOCK_TASKS),
    createTask: async (taskData) => {
        const newTask = { id: Date.now(), ...taskData, is_done: false };
        MOCK_TASKS.push(newTask);
        return simulateDelay(newTask);
    },
    updateTask: async (id, taskData) => {
        const index = MOCK_TASKS.findIndex(t => t.id === id);
        if (index !== -1) {
            MOCK_TASKS[index] = { ...MOCK_TASKS[index], ...taskData };
            return simulateDelay(MOCK_TASKS[index]);
        }
        return simulateDelay(null);
    },
    deleteTask: async (id) => {
        const index = MOCK_TASKS.findIndex(t => t.id === id);
        if (index !== -1) {
            MOCK_TASKS.splice(index, 1);
        }
        return simulateDelay({ success: true });
    },
};

// ========================================
// OPPORTUNITIES ENDPOINTS
// ========================================

export const opportunitiesAPI = {
    getOpportunities: async (category = null) => {
        if (category) {
            return simulateDelay(MOCK_OPPORTUNITIES.filter(o => o.category === category));
        }
        return simulateDelay(MOCK_OPPORTUNITIES);
    },
    getOpportunityById: async (id) => {
        const opp = MOCK_OPPORTUNITIES.find(o => o.id === id);
        return simulateDelay(opp);
    },
    bookmarkOpportunity: async (id) => simulateDelay({ success: true }),
};

// ========================================
// TUTORS ENDPOINTS
// ========================================

export const tutorsAPI = {
    getTutors: async (courseCode = null) => {
        if (courseCode) {
            const lowerCode = courseCode.toLowerCase();
            return simulateDelay(MOCK_TUTORS.filter(t =>
                t.courses.some(c => c.toLowerCase().includes(lowerCode))
            ));
        }
        return simulateDelay(MOCK_TUTORS);
    },
    getTutorById: async (id) => {
        const tutor = MOCK_TUTORS.find(t => t.id === id);
        return simulateDelay(tutor);
    },
};

export const authAPI = {
    // These are handled by AuthContext directly in simulation mode
    signup: async () => { },
    login: async () => { },
    getCurrentUser: async () => { },
};

const api = {
  tasks: tasksAPI,
  opportunities: opportunitiesAPI,
  tutors: tutorsAPI,
  auth: authAPI
};

export default api;
