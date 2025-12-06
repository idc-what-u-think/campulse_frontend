<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { useTutorStore } from '@/stores/tutors';

const tutorStore = useTutorStore();
const searchQuery = ref('');

onMounted(() => {
  tutorStore.fetchTutors();
});

const handleSearch = () => {
  tutorStore.fetchTutors(searchQuery.value);
};

// Debounce search could be added here for better UX
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <div class="p-6 pt-8">
      <h1 class="text-2xl font-bold text-primary mb-6">Find a Tutor</h1>

      <!-- Search Bar -->
      <div class="relative mb-6">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="Search by course code (e.g. MTH 101)"
          class="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 pl-11 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
        <div class="absolute left-4 top-3.5 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <button 
          v-if="searchQuery"
          @click="handleSearch"
          class="absolute right-3 top-2.5 bg-accent/10 text-accent px-3 py-1 rounded-lg text-xs font-medium hover:bg-accent hover:text-white transition-colors"
        >
          Search
        </button>
      </div>

      <!-- Tutor List -->
      <div v-if="tutorStore.loading" class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-secondary">Searching for tutors...</p>
      </div>

      <div v-else-if="tutorStore.tutors.length === 0" class="text-center py-12 bg-surface rounded-xl border border-white/5">
        <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        </div>
        <h3 class="text-primary font-medium mb-1">No tutors found</h3>
        <p class="text-secondary text-sm">Try searching for a different course.</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="tutor in tutorStore.tutors" 
          :key="tutor.id"
          class="bg-surface p-5 rounded-xl border border-white/5 hover:border-accent/30 transition-all group"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg">
              {{ tutor.full_name.charAt(0) }}
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-primary truncate flex items-center gap-1">
                  {{ tutor.full_name }}
                  <svg v-if="tutor.verified" class="text-accent fill-accent" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </h3>
                <div class="flex items-center gap-1 text-warning text-sm font-medium">
                  <span>{{ tutor.rating }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
              </div>
              
              <p class="text-secondary text-sm mb-3 line-clamp-2">{{ tutor.bio }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="course in tutor.courses" 
                  :key="course"
                  class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-secondary"
                >
                  {{ course }}
                </span>
              </div>

              <a 
                :href="tutor.whatsapp_link"
                target="_blank"
                class="block w-full text-center bg-success hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NavBar />
  </div>
</template>
