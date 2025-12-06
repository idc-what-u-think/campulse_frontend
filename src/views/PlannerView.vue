<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import { useTaskStore, type Task } from '@/stores/tasks';

const taskStore = useTaskStore();
const showAddModal = ref(false);

const newTask = ref<Task>({
  title: '',
  description: '',
  due_date: '',
  priority: 'medium',
  is_completed: false,
});

onMounted(() => {
  taskStore.fetchTasks();
});

const sortedTasks = computed(() => {
  return [...taskStore.tasks].sort((a, b) => {
    // Sort by completion status (incomplete first)
    if (a.is_completed !== b.is_completed) {
      return a.is_completed ? 1 : -1;
    }
    // Then by due date
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
});

const handleAddTask = async () => {
  try {
    await taskStore.createTask(newTask.value);
    showAddModal.value = false;
    // Reset form
    newTask.value = {
      title: '',
      description: '',
      due_date: '',
      priority: 'medium',
      is_completed: false,
    };
  } catch {
    // Error handled in store
  }
};

const toggleComplete = (task: Task) => {
  if (task.id) {
    taskStore.updateTask(task.id, { is_completed: !task.is_completed });
  }
};

const deleteTask = (id: number) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id);
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-error bg-error/10 border-error/20';
    case 'medium': return 'text-warning bg-warning/10 border-warning/20';
    case 'low': return 'text-success bg-success/10 border-success/20';
    default: return 'text-secondary bg-white/5 border-white/10';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
};
</script>

<template>
  <div class="min-h-screen bg-background pb-24">
    <div class="p-6 pt-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-primary">Academic Planner</h1>
        <button 
          @click="showAddModal = true"
          class="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20 hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <!-- Task List -->
      <div v-if="taskStore.loading && taskStore.tasks.length === 0" class="text-center py-12">
        <div class="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
        <p class="text-secondary">Loading tasks...</p>
      </div>

      <div v-else-if="taskStore.tasks.length === 0" class="text-center py-12 bg-surface rounded-xl border border-white/5">
        <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
        </div>
        <h3 class="text-primary font-medium mb-1">No tasks yet</h3>
        <p class="text-secondary text-sm mb-4">Add assignments, exams, or study sessions.</p>
        <button 
          @click="showAddModal = true"
          class="text-accent text-sm font-medium hover:underline"
        >
          Create your first task
        </button>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="task in sortedTasks" 
          :key="task.id"
          class="bg-surface p-4 rounded-xl border border-white/5 flex items-start gap-4 group transition-all"
          :class="{ 'opacity-60': task.is_completed }"
        >
          <button 
            @click="toggleComplete(task)"
            class="mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors"
            :class="task.is_completed ? 'bg-accent border-accent text-white' : 'border-secondary hover:border-accent'"
          >
            <svg v-if="task.is_completed" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
          
          <div class="flex-1 min-w-0">
            <h3 
              class="text-primary font-medium truncate transition-all"
              :class="{ 'line-through text-secondary': task.is_completed }"
            >
              {{ task.title }}
            </h3>
            <p class="text-secondary text-xs mb-2 line-clamp-1">{{ task.description }}</p>
            
            <div class="flex items-center gap-2 text-xs">
              <span 
                class="px-2 py-0.5 rounded-full border"
                :class="priorityColor(task.priority)"
              >
                {{ task.priority }}
              </span>
              <span class="text-secondary flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {{ formatDate(task.due_date) }}
              </span>
            </div>
          </div>

          <button 
            @click="task.id && deleteTask(task.id)"
            class="text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Add Task Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="showAddModal = false"></div>
      <div class="relative w-full max-w-md bg-surface rounded-2xl p-6 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-200">
        <h2 class="text-xl font-bold text-primary mb-4">New Task</h2>
        
        <form @submit.prevent="handleAddTask" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-secondary mb-1">Title</label>
            <input 
              v-model="newTask.title"
              type="text" 
              required
              class="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              placeholder="e.g., MTH 101 Assignment"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-secondary mb-1">Description</label>
            <textarea 
              v-model="newTask.description"
              rows="3"
              class="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              placeholder="Details about the task..."
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-secondary mb-1">Due Date</label>
              <input 
                v-model="newTask.due_date"
                type="datetime-local" 
                required
                class="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-xs font-medium text-secondary mb-1">Priority</label>
              <select 
                v-model="newTask.priority"
                class="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button 
              type="button" 
              @click="showAddModal = false"
              class="flex-1 px-4 py-2 rounded-lg border border-white/10 text-secondary hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="flex-1 px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-accent/20"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>

    <NavBar />
  </div>
</template>
