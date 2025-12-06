import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export interface User {
  full_name: string;
  email: string;
  school: string;
  department: string;
  level: number;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: Record<string, string>) {
    try {
      const response = await api.post('/auth/login', credentials);
      token.value = response.data.access_token;
      if (token.value) {
        localStorage.setItem('token', token.value);
      }
      await fetchUser();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function signup(userData: Record<string, unknown>) {
    try {
      await api.post('/auth/signup', userData);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  async function fetchUser() {
    if (!token.value) return;
    try {
      const response = await api.get('/auth/me');
      user.value = response.data;
    } catch (error) {
      console.error('Fetch user failed:', error);
      logout();
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    router.push('/login');
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    fetchUser,
    logout,
  };
});
