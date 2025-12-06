<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { useOpportunityStore } from '@/stores/opportunities';

const opportunityStore = useOpportunityStore();
const activeCategory = ref('all');

const categories = [
  { id: 'all', label: 'All' },
  { id: 'gig', label: 'Gigs' },
  { id: 'scholarship', label: 'Scholarships' },
  { id: 'internship', label: 'Internships' },
  { id: 'event', label: 'Events' },
];

onMounted(() => {
  opportunityStore.fetchOpportunities();
});

const filteredOpportunities = computed(() => {
  if (activeCategory.value === 'all') {
    return opportunityStore.opportunities;
  }
  return opportunityStore.opportunities.filter(o => o.category === activeCategory.value);
});

const handleCategoryChange = (category: string) => {
  activeCategory.value = category;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'No deadline';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-NG', { month: 'short', day: 'numeric' }).format(date);
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'gig': return 'text-success bg-success/10 border-success/20';
    case 'scholarship': return 'text-accent bg-accent/10 border-accent/20';
    case 'internship': return 'text-warning bg-warning/10 border-warning/20';
    case 'event': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    default: return 'text-secondary bg-primary/5 border-primary/10';
  }
};
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <div class="p-6 pt-8">
      <h1 class="text-2xl font-bold text-white mb-6">Opportunities Hub</h1>

      <!-- Categories -->
      <div class="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="handleCategoryChange(category.id)"
          class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border"
          :class="activeCategory === category.id 
            ? 'bg-accent text-primary border-accent' 
            : 'bg-surface text-secondary border-primary/10 hover:border-primary/30'"
        >
          {{ category.label }}
        </button>
      </div>

      <!-- Opportunity List -->
      <div v-if="opportunityStore.loading" class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-gray-300">Finding opportunities...</p>
      </div>

      <div v-else-if="filteredOpportunities.length === 0" class="text-center py-12 bg-surface rounded-xl border border-primary/5">
        <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
        </div>
        <h3 class="text-primary font-medium mb-1">No opportunities found</h3>
        <p class="text-secondary text-sm">Check back later for new updates.</p>
      </div>

      <div v-else class="space-y-4">
        <div 
          v-for="opportunity in filteredOpportunities" 
          :key="opportunity.id"
          class="bg-surface p-5 rounded-xl border border-primary/5 hover:border-accent/30 transition-all group relative overflow-hidden"
        >
          <div class="absolute top-0 right-0 p-4">
            <button 
              @click="opportunityStore.toggleBookmark(opportunity.id)"
              class="text-secondary hover:text-accent transition-colors"
              :class="{ 'text-accent fill-accent': opportunity.is_bookmarked }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            </button>
          </div>

          <div class="mb-3">
            <span 
              class="px-2 py-1 rounded-md text-xs font-medium border"
              :class="getCategoryColor(opportunity.category)"
            >
              {{ opportunity.category.toUpperCase() }}
            </span>
          </div>

          <h3 class="text-lg font-bold text-primary mb-2 pr-8">{{ opportunity.title }}</h3>
          <p class="text-secondary text-sm mb-4 line-clamp-2">{{ opportunity.description }}</p>

          <div class="flex items-center justify-between mt-4 pt-4 border-t border-primary/5">
            <div class="text-xs text-secondary flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Deadline: {{ formatDate(opportunity.deadline) }}
            </div>
            
            <a 
              v-if="opportunity.link"
              :href="opportunity.link"
              target="_blank"
              class="text-sm font-medium text-accent hover:text-blue-400 flex items-center gap-1"
            >
              Apply Now
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <NavBar />
  </div>
</template>
