<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from '@composable/useTheme';

const { initTheme, setTheme, currentTheme } = useTheme();
initTheme();

</script>

<template>
  <header>
    test
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <button @click="setTheme(currentTheme === 'light' ? 'dark' : 'light')">Toggle Theme</button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>