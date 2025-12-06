<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

// Mock data for dashboard stats
const upcomingTasks = 3;
const newOpportunities = 5;
</script>

<template>
  <div class="min-h-screen bg-background pb-20">
    <!-- Header -->
    <div class="p-6 pt-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-primary">Hello, {{ user?.full_name?.split(' ')[0] || 'Student' }} 👋</h1>
          <p class="text-secondary text-sm">Let's make today productive.</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-accent font-bold">
          {{ user?.full_name?.charAt(0) || 'S' }}
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="bg-surface p-4 rounded-xl border border-white/5 shadow-lg">
          <div class="text-3xl font-bold text-accent mb-1">{{ upcomingTasks }}</div>
          <div class="text-xs text-secondary">Upcoming Tasks</div>
        </div>
        <div class="bg-surface p-4 rounded-xl border border-white/5 shadow-lg">
          <div class="text-3xl font-bold text-success mb-1">{{ newOpportunities }}</div>
          <div class="text-xs text-secondary">New Opportunities</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <h2 class="text-lg font-semibold text-primary mb-4">Quick Access</h2>
      <div class="space-y-4">
        <router-link to="/planner" class="block bg-surface p-4 rounded-xl border border-white/5 hover:border-accent/50 transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
            </div>
            <div>
              <h3 class="text-primary font-medium">Academic Planner</h3>
              <p class="text-xs text-secondary">Manage assignments & exams</p>
            </div>
            <div class="ml-auto text-secondary group-hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </router-link>

        <router-link to="/opportunities" class="block bg-surface p-4 rounded-xl border border-white/5 hover:border-accent/50 transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
            </div>
            <div>
              <h3 class="text-primary font-medium">Opportunities Hub</h3>
              <p class="text-xs text-secondary">Find gigs & scholarships</p>
            </div>
            <div class="ml-auto text-secondary group-hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </router-link>

        <router-link to="/tutors" class="block bg-surface p-4 rounded-xl border border-white/5 hover:border-accent/50 transition-all group">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-warning group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div>
              <h3 class="text-primary font-medium">Find a Tutor</h3>
              <p class="text-xs text-secondary">Get academic help</p>
            </div>
            <div class="ml-auto text-secondary group-hover:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <NavBar />
  </div>
</template>
