<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// --- Types & Interfaces ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string; // Initials or URL
  content: string;
  rating: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// --- State Management ---
const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

const uiState = reactive({
  loading: false,
  error: '',
  emailFocused: false,
  passwordFocused: false,
  currentTestimonialIndex: 0,
});

// --- Constants & Data ---
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Adebayo Oluwaseun',
    role: 'Computer Science, UNILAG',
    avatar: 'AO',
    content: 'Campulse literally saved my semester. The academic planner is a game changer for keeping track of assignments!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Chioma Nwachukwu',
    role: 'Economics, UI',
    avatar: 'CN',
    content: 'I found my current internship through the Opportunities Hub. It is the best platform for Nigerian students.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Yusuf Ibrahim',
    role: 'Engineering, ABU',
    avatar: 'YI',
    content: 'The tutor finder helped me ace my MTH 101 exams. Highly recommended for anyone struggling with courses.',
    rating: 5,
  },
];

// --- Canvas Particle Engine ---
const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;
let particles: Particle[] = [];
const PARTICLE_COUNT = 60;
const CONNECTION_DISTANCE = 150;

const initParticles = (width: number, height: number) => {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    });
  }
};

const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
  
  // Update and draw particles
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(249, 220, 92, 0.3)'; // Accent color with low opacity
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / CONNECTION_DISTANCE)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
};

const animateCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  drawParticles(ctx, canvas.width, canvas.height);
  animationFrameId = requestAnimationFrame(animateCanvas);
};

const handleResize = () => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth / 2; // Only takes up half screen on desktop
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value.width, canvasRef.value.height);
  }
};

// --- Carousel Logic ---
let carouselInterval: number;

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    uiState.currentTestimonialIndex = (uiState.currentTestimonialIndex + 1) % TESTIMONIALS.length;
  }, 5000) as unknown as number;
};

const setTestimonial = (index: number) => {
  uiState.currentTestimonialIndex = index;
  clearInterval(carouselInterval);
  startCarousel(); // Restart timer
};

// --- Form Logic ---
const isFormValid = computed(() => {
  return form.email.length > 0 && form.password.length > 0;
});

const handleLogin = async () => {
  if (!isFormValid.value) return;
  
  uiState.loading = true;
  uiState.error = '';
  
  // Simulate network delay for effect
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    await authStore.login({ username: form.email, password: form.password });
    router.push('/');
  } catch (err: any) {
    uiState.error = 'Invalid credentials. Please check your email and password.';
  } finally {
    uiState.loading = false;
  }
};

// --- Lifecycle Hooks ---
onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = canvasRef.value.parentElement?.clientWidth || window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value.width, canvasRef.value.height);
    animateCanvas();
  }
  window.addEventListener('resize', handleResize);
  startCarousel();
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
  clearInterval(carouselInterval);
});
</script>

<template>
  <div class="min-h-screen flex bg-background font-sans overflow-hidden">
    
    <!-- Left Panel: Immersive Experience -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden flex-col justify-between p-12 z-0">
      <!-- Canvas Background -->
      <canvas ref="canvasRef" class="absolute inset-0 z-0 opacity-40"></canvas>
      
      <!-- Gradient Overlay for Depth -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary z-10 pointer-events-none"></div>

      <!-- Top Brand -->
      <div class="relative z-20 flex items-center gap-3 animate-fade-in">
        <div class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#002e21" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div>
        <span class="text-2xl font-extrabold text-white tracking-tight">Campulse</span>
      </div>

      <!-- Middle Content -->
      <div class="relative z-20 max-w-lg mt-20">
        <h1 class="text-5xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight animate-slide-up">
          Your Academic <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Superpower</span>
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8 animate-slide-up" style="animation-delay: 100ms;">
          Join the fastest-growing community of Nigerian students. Organize your life, find tutors, and unlock opportunities—all in one place.
        </p>
      </div>

      <!-- Bottom Testimonial Carousel -->
      <div class="relative z-20 mt-auto animate-slide-up" style="animation-delay: 200ms;">
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group hover:bg-white/10 transition-colors duration-500">
          <!-- Quote Icon -->
          <div class="absolute top-6 right-8 text-white/10 text-6xl font-serif leading-none">"</div>
          
          <div class="relative min-h-[140px]">
            <transition name="fade" mode="out-in">
              <div :key="uiState.currentTestimonialIndex" class="space-y-4">
                <div class="flex items-center gap-1 mb-2">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f9dc5c" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <p class="text-lg text-white font-medium leading-relaxed">
                  {{ TESTIMONIALS[uiState.currentTestimonialIndex].content }}
                </p>
                <div class="flex items-center gap-4 pt-2">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-warning flex items-center justify-center text-primary font-bold text-sm">
                    {{ TESTIMONIALS[uiState.currentTestimonialIndex].avatar }}
                  </div>
                  <div>
                    <h4 class="font-bold text-white text-sm">{{ TESTIMONIALS[uiState.currentTestimonialIndex].name }}</h4>
                    <p class="text-xs text-gray-400">{{ TESTIMONIALS[uiState.currentTestimonialIndex].role }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Carousel Indicators -->
          <div class="flex gap-2 mt-6">
            <button 
              v-for="(t, index) in TESTIMONIALS" 
              :key="t.id"
              @click="setTestimonial(index)"
              class="h-1 rounded-full transition-all duration-300"
              :class="index === uiState.currentTestimonialIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Login Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-background overflow-y-auto">
      <div class="w-full max-w-[440px] animate-fade-in">
        
        <!-- Mobile Header (Visible only on small screens) -->
        <div class="lg:hidden text-center mb-10">
          <div class="w-14 h-14 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#002e21" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h1 class="text-3xl font-extrabold text-white">Campulse</h1>
        </div>

        <div class="mb-10">
          <h2 class="text-3xl font-bold text-white mb-3">Welcome Back</h2>
          <p class="text-gray-400">Enter your credentials to access your account.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Floating Label Input: Email -->
          <div class="relative group">
            <input 
              v-model="form.email"
              type="email" 
              id="email"
              required
              class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
              placeholder="Email Address"
              @focus="uiState.emailFocused = true"
              @blur="uiState.emailFocused = false"
            />
            <label 
              for="email"
              class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
              :class="{ 'top-1.5 text-xs text-accent': form.email }"
            >
              Email Address
            </label>
            <!-- Validation Icon -->
            <div class="absolute right-4 top-4 transition-opacity duration-300" :class="form.email && form.email.includes('@') ? 'opacity-100' : 'opacity-0'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <!-- Floating Label Input: Password -->
          <div class="relative group">
            <input 
              v-model="form.password"
              type="password" 
              id="password"
              required
              class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
              placeholder="Password"
              @focus="uiState.passwordFocused = true"
              @blur="uiState.passwordFocused = false"
            />
            <label 
              for="password"
              class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
              :class="{ 'top-1.5 text-xs text-accent': form.password }"
            >
              Password
            </label>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-3 cursor-pointer group select-none">
              <div 
                class="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300"
                :class="form.rememberMe ? 'bg-accent border-accent' : 'border-gray-500 group-hover:border-accent'"
              >
                <svg v-if="form.rememberMe" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#002e21" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <input type="checkbox" v-model="form.rememberMe" class="hidden" />
              <span class="text-sm text-gray-400 group-hover:text-white transition-colors">Remember me</span>
            </label>
            
            <a href="#" class="text-sm font-bold text-accent hover:text-accent/80 transition-colors">Forgot Password?</a>
          </div>

          <!-- Error Alert -->
          <transition name="fade">
            <div v-if="uiState.error" class="bg-error/10 border border-error/20 rounded-xl p-4 flex items-start gap-3">
              <svg class="shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p class="text-sm text-error font-medium">{{ uiState.error }}</p>
            </div>
          </transition>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="uiState.loading"
            class="w-full h-14 bg-accent hover:bg-accent/90 text-primary font-extrabold text-lg rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            <template v-if="uiState.loading">
              <div class="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            </template>
            <template v-else>
              <span>Sign In</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </template>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-10">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-white/10"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-background text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        <!-- Social Grid -->
        <div class="grid grid-cols-2 gap-4">
          <button class="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <svg class="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span class="text-white font-bold text-sm">Google</span>
          </button>
          <button class="flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
            <svg class="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            <span class="text-white font-bold text-sm">Facebook</span>
          </button>
        </div>

        <p class="text-center text-gray-400 mt-10">
          Don't have an account? 
          <router-link to="/signup" class="text-accent font-bold hover:underline hover:text-accent/80 transition-colors">Create one now</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
