'use client';

import { useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';
import { Calendar, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import Button from '../components/Button';

// Types
interface Task {
    id: string | number;
    title: string;
    description?: string;
    task_type: 'assignment' | 'test' | 'class';
    priority: 'low' | 'medium' | 'high';
    due_date?: string;
    is_done: boolean;
}

interface FormData {
    title: string;
    description: string;
    task_type: 'assignment' | 'test' | 'class';
    priority: 'low' | 'medium' | 'high';
    due_date: string;
}

type FilterType = 'all' | 'assignment' | 'test' | 'class';

const Planner = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<FilterType>('all');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        task_type: 'assignment',
        priority: 'medium',
        due_date: '',
    });

    // Fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Filter tasks when filter changes
    useEffect(() => {
        if (filter === 'all') {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter(task => task.task_type === filter));
        }
    }, [filter, tasks]);

    const fetchTasks = async (): Promise<void> => {
        try {
            setLoading(true);
            const data = await tasksAPI.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            if (editingTask) {
                await tasksAPI.updateTask(editingTask.id, formData);
            } else {
                await tasksAPI.createTask(formData);
            }
            fetchTasks();
            closeModal();
        } catch (error) {
            console.error('Failed to save task:', error);
            alert('Failed to save task. Please try again.');
        }
    };

    const handleToggleComplete = async (task: Task): Promise<void> => {
        try {
            await tasksAPI.updateTask(task.id, { is_done: !task.is_done });
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDeleteTask = async (id: string | number): Promise<void> => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await tasksAPI.deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const openEditModal = (task: Task): void => {
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description || '',
            task_type: task.task_type,
            priority: task.priority,
            due_date: task.due_date || '',
        });
        setShowModal(true);
    };

    const closeModal = (): void => {
        setShowModal(false);
        setEditingTask(null);
        setFormData({
            title: '',
            description: '',
            task_type: 'assignment',
            priority: 'medium',
            due_date: '',
        });
    };

    const getPriorityColor = (priority: string): string => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f97316';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const formatDate = (dateString?: string): string => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="planner-page">
            <style jsx>{`
                .planner-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f5f5f5 0%, #e8f4fd 100%);
                    padding: 2rem;
                }

                .planner-header {
                    max-width: 1200px;
                    margin: 0 auto 2.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .planner-header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                    color: #002e21;
                }

                .planner-header p {
                    font-size: 1rem;
                    color: rgba(0, 46, 33, 0.6);
                }

                .planner-filters {
                    max-width: 1200px;
                    margin: 0 auto 2.5rem;
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .filter-btn {
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 255, 255, 0.9);
                    border: 2px solid transparent;
                    border-radius: 1rem;
                    font-weight: 600;
                    font-family: 'Manrope', sans-serif;
                    cursor: pointer;
                    transition: all 0.3s;
                    color: #002e21;
                }

                .filter-btn:hover {
                    background: #ffffff;
                    border-color: #f9dc5c;
                }

                .filter-btn.active {
                    background: linear-gradient(135deg, #f9dc5c 0%, #f4a261 100%);
                    border-color: #f9dc5c;
                }

                .tasks-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .tasks-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 2rem;
                }

                .task-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 1.5rem;
                    padding: 2rem;
                    border: 2px solid rgba(0, 46, 33, 0.1);
                    transition: all 0.3s;
                    animation: fadeIn 0.3s;
                }

                .task-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    border-color: #f9dc5c;
                }

                .task-card.task-done {
                    opacity: 0.6;
                }

                .task-card.task-done .task-title {
                    text-decoration: line-through;
                }

                .task-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .task-checkbox {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #002e21;
                    border-radius: 0.375rem;
                    background: transparent;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.15s;
                    flex-shrink: 0;
                }

                .task-checkbox:hover {
                    background: #f9dc5c;
                    border-color: #f9dc5c;
                }

                .task-type-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .task-type-assignment {
                    background: rgba(249, 220, 92, 0.2);
                    color: #b8860b;
                }

                .task-type-test {
                    background: rgba(239, 68, 68, 0.2);
                    color: #b91c1c;
                }

                .task-type-class {
                    background: rgba(191, 216, 253, 0.2);
                    color: #1e40af;
                }

                .task-priority {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    margin-left: auto;
                }

                .task-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #002e21;
                    margin-bottom: 0.75rem;
                    line-height: 1.3;
                }

                .task-description {
                    font-size: 0.875rem;
                    color: rgba(0, 46, 33, 0.6);
                    margin-bottom: 1rem;
                    line-height: 1.5;
                }

                .task-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(0, 46, 33, 0.1);
                }

                .task-date {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: rgba(0, 46, 33, 0.6);
                }

                .task-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                .task-action-btn {
                    width: 32px;
                    height: 32px;
                    border: none;
                    background: rgba(0, 46, 33, 0.05);
                    border-radius: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.15s;
                    color: #002e21;
                }

                .task-action-btn:hover {
                    background: #3a86ff;
                    transform: scale(1.1);
                }

                .task-action-btn.delete:hover {
                    background: #ef4444;
                    color: #ffffff;
                }

                .empty-state,
                .loading-state {
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

                .modal-header h2 {
                    font-size: 1.75rem;
                    color: #002e21;
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

                .task-form {
                    padding: 2.5rem;
                }

                .form-group {
                    margin-bottom: 2rem;
                }

                .form-group label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                    color: #002e21;
                }

                .form-group input,
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    border: 2px solid rgba(0, 46, 33, 0.1);
                    border-radius: 1rem;
                    font-family: 'Manrope', sans-serif;
                    font-size: 1rem;
                    transition: all 0.3s;
                    background: #ffffff;
                }

                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    outline: none;
                    border-color: #f9dc5c;
                    box-shadow: 0 0 0 3px rgba(249, 220, 92, 0.1);
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .modal-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                    margin-top: 2.5rem;
                    padding-top: 2.5rem;
                    border-top: 1px solid rgba(0, 46, 33, 0.1);
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
                    .planner-header {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .tasks-grid {
                        grid-template-columns: 1fr;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            {/* Header */}
            <div className="planner-header">
                <div>
                    <h1>📚 Academic Planner</h1>
                    <p>Stay on top of your assignments, tests, and classes</p>
                </div>
                <Button
                    variant="primary"
                    icon={<Plus size={20} />}
                    onClick={() => setShowModal(true)}
                >
                    Add Task
                </Button>
            </div>

            {/* Filters */}
            <div className="planner-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Tasks
                </button>
                <button
                    className={`filter-btn ${filter === 'assignment' ? 'active' : ''}`}
                    onClick={() => setFilter('assignment')}
                >
                    Assignments
                </button>
                <button
                    className={`filter-btn ${filter === 'test' ? 'active' : ''}`}
                    onClick={() => setFilter('test')}
                >
                    Tests
                </button>
                <button
                    className={`filter-btn ${filter === 'class' ? 'active' : ''}`}
                    onClick={() => setFilter('class')}
                >
                    Classes
                </button>
            </div>

            {/* Task List */}
            <div className="tasks-container">
                {loading ? (
                    <div className="loading-state">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="empty-state">
                        <Calendar size={64} color="#3a86ff" />
                        <h3>No tasks yet</h3>
                        <p>Create your first task to get started!</p>
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className={`task-card ${task.is_done ? 'task-done' : ''}`}
                            >
                                <div className="task-header">
                                    <button
                                        className="task-checkbox"
                                        onClick={() => handleToggleComplete(task)}
                                    >
                                        {task.is_done ? <Check size={18} /> : null}
                                    </button>
                                    <span className={`task-type-badge task-type-${task.task_type}`}>
                                        {task.task_type}
                                    </span>
                                    <div
                                        className="task-priority"
                                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                                        title={`${task.priority} priority`}
                                    />
                                </div>

                                <h3 className="task-title">{task.title}</h3>
                                {task.description && (
                                    <p className="task-description">{task.description}</p>
                                )}

                                <div className="task-footer">
                                    <span className="task-date">
                                        <Calendar size={16} />
                                        {formatDate(task.due_date)}
                                    </span>
                                    <div className="task-actions">
                                        <button
                                            className="task-action-btn"
                                            onClick={() => openEditModal(task)}
                                            title="Edit task"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            className="task-action-btn delete"
                                            onClick={() => handleDeleteTask(task.id)}
                                            title="Delete task"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTask} className="task-form">
                            <div className="form-group">
                                <label>Task Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., Complete Math Assignment"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Add more details..."
                                    rows={4}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Task Type *</label>
                                    <select
                                        value={formData.task_type}
                                        onChange={(e) => setFormData({ ...formData, task_type: e.target.value as FormData['task_type'] })}
                                        required
                                    >
                                        <option value="assignment">Assignment</option>
                                        <option value="test">Test</option>
                                        <option value="class">Class</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Priority *</label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as FormData['priority'] })}
                                        required
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Due Date</label>
                                <input
                                    type="date"
                                    value={formData.due_date}
                                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                                />
                            </div>

                            <div className="modal-actions">
                                <Button type="button" variant="ghost" onClick={closeModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    {editingTask ? 'Update Task' : 'Create Task'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Planner;
