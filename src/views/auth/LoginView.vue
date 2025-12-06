<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login({ username: email.value, password: password.value });
    router.push('/');
  } catch {
    error.value = 'Invalid email or password';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div class="w-full max-w-md bg-surface p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg">
      <h1 class="text-3xl font-bold text-primary mb-2 text-center">Welcome Back</h1>
      <p class="text-secondary text-center mb-8">Sign in to continue to Campulse</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-secondary mb-2">Email Address</label>
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
          <label for="password" class="block text-sm font-medium text-secondary mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-error text-sm text-center bg-error/10 py-2 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-accent hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-secondary">
        Don't have an account?
        <router-link to="/signup" class="text-accent hover:text-blue-400 font-medium transition-colors">
          Create one
        </router-link>
      </div>
    </div>
  </div>
</template>
