<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

// --- Types & Interfaces ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface ValidationState {
  valid: boolean;
  message: string;
}

// --- State Management ---
const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  school: '',
  department: '',
  level: '',
});

const focusedField = ref<string | null>(null);

const uiState = reactive({
  loading: false,
  error: '',
  success: false,
});

// --- Validation Logic ---
const validators = reactive<Record<string, ValidationState>>({
  fullName: { valid: false, message: '' },
  email: { valid: false, message: '' },
  password: { valid: false, message: '' },
});

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

watch(() => form.email, (val) => {
  if (!val) {
    validators.email = { valid: false, message: '' };
  } else if (!validateEmail(val)) {
    validators.email = { valid: false, message: 'Invalid email format' };
  } else {
    validators.email = { valid: true, message: 'Looks good!' };
  }
});

watch(() => form.fullName, (val) => {
  if (val.length > 2) {
    validators.fullName = { valid: true, message: 'Nice name!' };
  } else {
    validators.fullName = { valid: false, message: '' };
  }
});

// --- Password Strength Logic ---
const passwordStrength = computed(() => {
  const pwd = form.password;
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score += 25;
  if (pwd.match(/[A-Z]/)) score += 25;
  if (pwd.match(/[0-9]/)) score += 25;
  if (pwd.match(/[^A-Za-z0-9]/)) score += 25;
  return score;
});

const strengthLabel = computed(() => {
  const score = passwordStrength.value;
  if (score === 0) return '';
  if (score <= 25) return 'Weak';
  if (score <= 50) return 'Fair';
  if (score <= 75) return 'Good';
  return 'Strong';
});

const strengthColor = computed(() => {
  const score = passwordStrength.value;
  if (score <= 25) return 'bg-error';
  if (score <= 50) return 'bg-warning';
  if (score <= 75) return 'bg-yellow-400';
  return 'bg-success';
});

// --- Canvas Particle Engine (Variation) ---
const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;
let particles: Particle[] = [];
const PARTICLE_COUNT = 80; // More particles for signup
const CONNECTION_DISTANCE = 120;

const initParticles = (width: number, height: number) => {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8, // Faster movement
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? '#f9dc5c' : '#ffffff', // Mix of colors
    });
  }
};

const drawParticles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color === '#f9dc5c' ? 'rgba(249, 220, 92, 0.4)' : 'rgba(255, 255, 255, 0.2)';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / CONNECTION_DISTANCE)})`;
        ctx.lineWidth = 0.5;
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
    canvasRef.value.width = window.innerWidth / 2;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value.width, canvasRef.value.height);
  }
};

// --- Form Submission ---
const handleSignup = async () => {
  uiState.loading = true;
  uiState.error = '';
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    await authStore.signup({
      full_name: form.fullName,
      email: form.email,
      password: form.password,
      school: form.school,
      department: form.department,
      level: parseInt(form.level) || 100,
    });
    
    // Auto login
    await authStore.login({ username: form.email, password: form.password });
    router.push('/');
  } catch (err: any) {
    uiState.error = 'Failed to create account. Please try again.';
  } finally {
    uiState.loading = false;
  }
};

// --- Lifecycle ---
onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = canvasRef.value.parentElement?.clientWidth || window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    initParticles(canvasRef.value.width, canvasRef.value.height);
    animateCanvas();
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="min-h-screen flex bg-background font-sans overflow-hidden">
    
    <!-- Left Panel: Visuals (Order 2 on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 relative bg-primary overflow-hidden flex-col justify-center p-12 z-0 order-2 lg:order-1">
      <canvas ref="canvasRef" class="absolute inset-0 z-0 opacity-40"></canvas>
      <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/10 to-transparent z-10 pointer-events-none"></div>

      <div class="relative z-20 max-w-lg mx-auto text-center">
        <div class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20 animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f9dc5c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        
        <h2 class="text-4xl font-bold text-white mb-6">Join the Elite</h2>
        <p class="text-gray-300 text-lg leading-relaxed mb-10">
          "Campulse has completely transformed how I manage my academic life. It's not just an app; it's a necessity."
        </p>

        <div class="flex justify-center gap-4">
          <div class="text-center">
            <h3 class="text-3xl font-bold text-accent">10k+</h3>
            <p class="text-sm text-gray-400">Students</p>
          </div>
          <div class="w-px bg-white/20 h-12"></div>
          <div class="text-center">
            <h3 class="text-3xl font-bold text-accent">50+</h3>
            <p class="text-sm text-gray-400">Universities</p>
          </div>
          <div class="w-px bg-white/20 h-12"></div>
          <div class="text-center">
            <h3 class="text-3xl font-bold text-accent">4.9</h3>
            <p class="text-sm text-gray-400">Rating</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Signup Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-background overflow-y-auto order-1 lg:order-2">
      <div class="w-full max-w-[500px] animate-fade-in py-10">
        
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p class="text-gray-400">Start your journey with Campulse today.</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-5">
          
          <!-- Full Name -->
          <div class="relative group">
            <input 
              v-model="form.fullName"
              type="text" 
              id="fullName"
              required
              class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
              placeholder="Full Name"
              @focus="focusedField = 'fullName'"
              @blur="focusedField = null"
            />
            <label for="fullName" class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none" :class="{ 'top-1.5 text-xs text-accent': form.fullName }">Full Name</label>
            <div class="absolute right-4 top-4 transition-opacity duration-300" :class="validators.fullName.valid ? 'opacity-100' : 'opacity-0'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <!-- Email -->
          <div class="relative group">
            <input 
              v-model="form.email"
              type="email" 
              id="email"
              required
              class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
              placeholder="Email Address"
              @focus="focusedField = 'email'"
              @blur="focusedField = null"
            />
            <label for="email" class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none" :class="{ 'top-1.5 text-xs text-accent': form.email }">Email Address</label>
            <div class="absolute right-4 top-4 transition-opacity duration-300" :class="validators.email.valid ? 'opacity-100' : 'opacity-0'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>

          <!-- Password -->
          <div class="relative group">
            <input 
              v-model="form.password"
              type="password" 
              id="password"
              required
              class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
              placeholder="Password"
              @focus="focusedField = 'password'"
              @blur="focusedField = null"
            />
            <label for="password" class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none" :class="{ 'top-1.5 text-xs text-accent': form.password }">Password</label>
          </div>

          <!-- Password Strength Meter -->
          <div class="space-y-1 transition-all duration-300" :class="form.password ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'">
            <div class="flex justify-between text-xs text-gray-400 mb-1">
              <span>Password Strength</span>
              <span :class="{'text-error': passwordStrength <= 25, 'text-warning': passwordStrength > 25 && passwordStrength <= 50, 'text-yellow-400': passwordStrength > 50 && passwordStrength <= 75, 'text-success': passwordStrength > 75}">{{ strengthLabel }}</span>
            </div>
            <div class="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div class="h-full transition-all duration-500 ease-out" :class="strengthColor" :style="{ width: `${passwordStrength}%` }"></div>
            </div>
            <div class="flex gap-2 mt-2">
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 transition-colors" :class="{ 'bg-success/20 text-success': form.password.length >= 8 }">8+ chars</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 transition-colors" :class="{ 'bg-success/20 text-success': /[A-Z]/.test(form.password) }">Uppercase</span>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 transition-colors" :class="{ 'bg-success/20 text-success': /[0-9]/.test(form.password) }">Number</span>
            </div>
          </div>

          <!-- School & Level Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div class="relative group">
              <input 
                v-model="form.school"
                type="text" 
                id="school"
                required
                class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
                placeholder="School"
              />
              <label for="school" class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none" :class="{ 'top-1.5 text-xs text-accent': form.school }">School</label>
            </div>
            
            <div class="relative group">
              <select 
                v-model="form.level"
                id="level"
                required
                class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300 appearance-none"
              >
                <option value="" disabled selected></option>
                <option value="100" class="bg-primary">100 Level</option>
                <option value="200" class="bg-primary">200 Level</option>
                <option value="300" class="bg-primary">300 Level</option>
                <option value="400" class="bg-primary">400 Level</option>
                <option value="500" class="bg-primary">500 Level</option>
              </select>
              <label for="level" class="absolute left-4 top-1.5 text-xs text-accent transition-all duration-300 pointer-events-none">Level</label>
              <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <!-- Department -->
          <div class="relative group">
            <input 
              v-model="form.department"
              type="text" 
              id="department"
              required
              class="peer w-full bg-white/5 border-2 border-white/10 rounded-xl px-4 pt-6 pb-2 text-white font-medium placeholder-transparent focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-300"
              placeholder="Department"
            />
            <label for="department" class="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-accent pointer-events-none" :class="{ 'top-1.5 text-xs text-accent': form.department }">Department</label>
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
            class="w-full h-14 bg-accent hover:bg-accent/90 text-primary font-extrabold text-lg rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transform hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4"
          >
            <template v-if="uiState.loading">
              <div class="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            </template>
            <template v-else>
              <span>Create Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </template>
          </button>
        </form>

        <p class="text-center text-gray-400 mt-8">
          Already have an account? 
          <router-link to="/login" class="text-accent font-bold hover:underline hover:text-accent/80 transition-colors">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
