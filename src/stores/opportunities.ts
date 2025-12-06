import { defineStore } from 'pinia';
import api from '@/services/api';
import { ref } from 'vue';

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  category: 'gig' | 'scholarship' | 'internship' | 'event' | 'other';
  link?: string;
  deadline?: string;
  is_bookmarked?: boolean;
  created_at: string;
}

export const useOpportunityStore = defineStore('opportunities', () => {
  const opportunities = ref<Opportunity[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchOpportunities(category?: string) {
    loading.value = true;
    try {
      const params = category ? { category } : {};
      const response = await api.get('/opportunities/', { params });
      opportunities.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch opportunities';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function toggleBookmark(id: number) {
    try {
      await api.post(`/opportunities/${id}/bookmark`);
      const opportunity = opportunities.value.find((o) => o.id === id);
      if (opportunity) {
        opportunity.is_bookmarked = !opportunity.is_bookmarked;
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  }

  return {
    opportunities,
    loading,
    error,
    fetchOpportunities,
    toggleBookmark,
  };
});
