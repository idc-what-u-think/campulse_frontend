import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref } from 'vue';

export interface Tutor {
  id: number;
  full_name: string;
  bio: string;
  courses: string[]; // List of course codes e.g. ["MTH 101", "PHY 101"]
  whatsapp_link: string;
  rating: number;
  verified: boolean;
}

export const useTutorStore = defineStore('tutors', () => {
  const tutors = ref<Tutor[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTutors(courseCode?: string) {
    loading.value = true;
    try {
      const params = courseCode ? { course_code: courseCode } : {};
      const response = await api.get('/tutors/', { params });
      tutors.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch tutors';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function getTutor(id: number) {
    try {
      const response = await api.get(`/tutors/${id}`);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch tutor details:', err);
      return null;
    }
  }

  return {
    tutors,
    loading,
    error,
    fetchTutors,
    getTutor,
  };
});
