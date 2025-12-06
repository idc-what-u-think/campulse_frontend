import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref } from 'vue';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  is_completed: boolean;
  user_id?: number;
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTasks() {
    loading.value = true;
    try {
      const response = await api.get('/tasks/');
      tasks.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch tasks';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function createTask(task: Task) {
    loading.value = true;
    try {
      const response = await api.post('/tasks/', task);
      tasks.value.push(response.data);
    } catch (err) {
      error.value = 'Failed to create task';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateTask(id: number, updates: Partial<Task>) {
    try {
      const response = await api.patch(`/tasks/${id}`, updates);
      const index = tasks.value.findIndex((t) => t.id === id);
      if (index !== -1) {
        tasks.value[index] = response.data;
      }
    } catch (err) {
      error.value = 'Failed to update task';
      console.error(err);
    }
  }

  async function deleteTask(id: number) {
    try {
      await api.delete(`/tasks/${id}`);
      tasks.value = tasks.value.filter((t) => t.id !== id);
    } catch (err) {
      error.value = 'Failed to delete task';
      console.error(err);
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
});
