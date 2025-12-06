<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 bg-surface border-t border-white/10 px-6 py-3 flex justify-between items-center z-50">
    <router-link to="/" class="flex flex-col items-center gap-1 transition-colors" :class="isActive('/') ? 'text-accent' : 'text-secondary hover:text-primary'">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
      <span class="text-[10px] font-medium">Home</span>
    </router-link>
    
    <router-link to="/planner" class="flex flex-col items-center gap-1 transition-colors" :class="isActive('/planner') ? 'text-accent' : 'text-secondary hover:text-primary'">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      <span class="text-[10px] font-medium">Planner</span>
    </router-link>

    <router-link to="/opportunities" class="flex flex-col items-center gap-1 transition-colors" :class="isActive('/opportunities') ? 'text-accent' : 'text-secondary hover:text-primary'">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
      <span class="text-[10px] font-medium">Opps</span>
    </router-link>

    <router-link to="/tutors" class="flex flex-col items-center gap-1 transition-colors" :class="isActive('/tutors') ? 'text-accent' : 'text-secondary hover:text-primary'">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      <span class="text-[10px] font-medium">Tutors</span>
    </router-link>
  </div>
</template>
