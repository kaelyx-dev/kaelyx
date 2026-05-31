<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTheme } from '@composable/useTheme';
import { useIcons } from '@composable/useIcons';
import Footer from '@component/site/footer/Footer.vue';
import Header from '@component/site/header/Header.vue';

const { initTheme } = useTheme();

const {createIconMapElement } = useIcons();

initTheme();

</script>

<template>
  <component :is="createIconMapElement()" />
  <Header />
  <div class="site-content">
    <RouterView />
  </div>
  <Footer />
</template>