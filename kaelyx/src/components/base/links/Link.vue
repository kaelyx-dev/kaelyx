<template>
    <a :href="href" :target="target" 
        :class="[
            classPrefix,
            Style.buildStyle(classPrefix, props.type),
            Style.backgroundColour(classPrefix, props.backgroundColour),
            Style.textColour(classPrefix, props.textColour),
            Style.darkBackgroundColour(classPrefix, props.darkModeBackgroundColour),
            Style.darkTextColour(classPrefix, props.darkModeTextColour),
            Style.lightBackgroundColour(classPrefix, props.lightModeBackgroundColour),
            Style.lightTextColour(classPrefix, props.lightModeTextColour),
        ]">
        <span v-if="label">{{ label }}</span>
        <slot/>
    </a>
</template>
<script setup lang="ts">
import Style from '@/utils/Style';
import { classPrefix, type LinkProps } from './link.types';
const props = withDefaults(defineProps<LinkProps>(), {
    target: '_self',
});

</script>