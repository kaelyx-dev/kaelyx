<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useTheme } from '@composable/useTheme';
import Button from '@component/base/buttons/Button.vue';

const { initTheme, setTheme, currentTheme } = useTheme();
const { getRoutes, push: navigateTo } = useRouter();

initTheme();

</script>

<template>
  <header>
    <nav class="nav">
        <div class="nav__title">
          <span>Kaelyx</span>
        </div>
        <div class="nav__links">
          <Button 
          v-for="(route, index) in getRoutes()" 
          :key="index" 
          :label="(route.name as string)"
          @click="() => { navigateTo(route.path) }" 
          
          light-mode-background-colour="yellow"
          light-mode-text-colour="black"
          
          dark-mode-background-colour="purple"
          dark-mode-text-colour="white"
          />
          <Button @click="() => setTheme(currentTheme === 'light' ? 'dark' : 'light')" background-colour="orange" text-colour="white">
            <span v-if="currentTheme === 'light'" class="material-symbols-outlined">wb_sunny</span>
            <span v-else class="material-symbols-outlined">bedtime</span>
          </Button>
        </div>
      </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    
  </footer>
</template>