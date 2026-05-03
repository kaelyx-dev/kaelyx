<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useTheme } from '@composable/useTheme';
import { useIcons } from '@composable/useIcons';
import Button from '@component/base/buttons/Button.vue';
import TwoColumn from './components/layout/TwoColumn.vue';
import SvgIcon from '@component/base/icons/Icon.vue';

const { initTheme, isLight, toggleTheme } = useTheme();
const { getRoutes, push: navigateTo } = useRouter();

const {createIconMapElement } = useIcons();

initTheme();

</script>

<template>
    <component :is="createIconMapElement()" />
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
          <Button @click="() => toggleTheme()" background-colour="orange" text-colour="white">
            <SvgIcon v-if="isLight()" name="sun"/>
            <SvgIcon v-else name="moon"/>
          </Button>
        </div>
      </nav>
    </header>
    <main>
      <SvgIcon name="github"/>
      <RouterView />
    </main>
    <footer>
      <TwoColumn>
        <template #left>
          <span>© 2024 Kaelyx. All rights reserved.</span>
        </template>
        <template #right>
          <span>Made with ❤️ by the Kaelyx Team.</span>
        </template>
      </TwoColumn>
    </footer>
</template>