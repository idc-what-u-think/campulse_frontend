<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const school = ref('');
const department = ref('');
const level = ref('');
const error = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleSignup = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.signup({
      full_name: name.value,
      email: email.value,
      password: password.value,
      school: school.value,
      department: department.value,
      level: parseInt(level.value),
    });
    // Auto login or redirect to login
    await authStore.login({ username: email.value, password: password.value });
    router.push('/');
  } catch {
    error.value = 'Failed to create account. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4 py-12">
    <div class="w-full max-w-md bg-surface p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg">
      <h1 class="text-3xl font-bold text-primary mb-2 text-center">Join Campulse</h1>
      <p class="text-secondary text-center mb-8">Your smart academic companion awaits</p>

      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-secondary mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            required
            class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-secondary mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="student@university.edu.ng"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-secondary mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="col-span-2">
            <label for="school" class="block text-sm font-medium text-secondary mb-1">University/School</label>
            <input
              v-model="school"
              type="text"
              id="school"
              required
              class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="UNILAG"
            />
          </div>
          
          <div>
            <label for="department" class="block text-sm font-medium text-secondary mb-1">Department</label>
            <input
              v-model="department"
              type="text"
              id="department"
              required
              class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="Computer Science"
            />
          </div>

          <div>
            <label for="level" class="block text-sm font-medium text-secondary mb-1">Level</label>
            <select
              v-model="level"
              id="level"
              required
              class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all appearance-none"
            >
              <option value="" disabled>Select</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="text-error text-sm text-center bg-error/10 py-2 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20 mt-6"
        >
          <span v-if="loading">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-secondary">
        Already have an account?
        <router-link to="/login" class="text-accent hover:text-blue-400 font-medium transition-colors">
          Sign In
        </router-link>
      </div>
    </div>
  </div>
</template>
