<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useTheme } from '@composable/useTheme';
import { useIcons } from '@composable/useIcons';
import Button from '@component/base/buttons/Button.vue';
import TwoColumn from './components/layout/TwoColumn.vue';
import SvgIcon from '@component/base/icons/SvgIcon.vue';
import Link from '@component/base/links/Link.vue';

const { initTheme, isLight, toggleTheme } = useTheme();
const { getRoutes, push: navigateTo } = useRouter();

const {createIconMapElement } = useIcons();

initTheme();

</script>

<template>
  <component :is="createIconMapElement()" />
  <header>
      <span class="title">Kaelyx</span>
    <nav class="nav">
        <div class="nav__links">
          <Button 
          v-for="(route, index) in getRoutes().filter(r => !r.meta?.hide)" 
          :key="index" 
          :label="(route.name as string)"
          @click="() => { navigateTo(route.path) }" 
          
          light-mode-background-colour="yellow"
          light-mode-text-colour="black"
          dark-mode-background-colour="purple"
          dark-mode-text-colour="white"
          />
          <Button @click="() => toggleTheme()" background-colour="orange" text-colour="white">
            <SvgIcon v-if="isLight()" name="sun"/>
            <SvgIcon v-else name="moon"/>
          </Button>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <TwoColumn>
        <template #left>
          <span>© {{ new Date().getFullYear() }} Kaelyx.</span>
        </template>
        <template #right>
          <Link type="primary" href="#">
            <SvgIcon name="github"/>
          </Link>
        </template>
      </TwoColumn>
    </footer>
</template>