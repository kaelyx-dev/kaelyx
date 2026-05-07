<template>
    <header>
        <span class="title">Kaelyx</span>
        <nav class="nav">
            <div class="nav__links">
                <Button v-for="(route, index) in getRoutes().filter(r => !r.meta?.hide)" 
                    :key="index" 
                    :label="(route.name as string)"
                    @click="() => { navigateTo(route.path) }" 
                    type="primary"
                />
                <Button @click="() => toggleTheme()" type="secondary">
                    <SvgIcon v-if="isLight()" name="sun"/>
                    <SvgIcon v-else name="moon"/>
                </Button>
            </div>
        </nav>
    </header>
</template>
<script setup lang="ts">
import { useTheme } from '@composable/useTheme';
import { useRouter } from 'vue-router';
import Button from '@component/base/buttons/Button.vue';
import SvgIcon from '@component/base/icons/SvgIcon.vue';
const { toggleTheme, isLight } = useTheme();
const { getRoutes, push: navigateTo } = useRouter();

</script>