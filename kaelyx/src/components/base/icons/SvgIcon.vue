<template>
    <svg :viewBox="'0 0 24 24'" :width="size" :height="size" :class="[
        classPrefix,
        Style.textColour(classPrefix, props.color),
        Style.darkTextColour(classPrefix, props.darkModeColour),
        Style.lightTextColour(classPrefix, props.lightModeColour),
    ]"
        :style="props.style"
    >
        <use v-if="icon" :href="`#${icon.name}`" />
    </svg>
</template>
<script setup lang="ts">
import { useIcons } from '@composable/useIcons';
import { type SvgIconProps, classPrefix } from './SvgIcon.type';
import Style from '@util/Style';

const { getIcon } = useIcons();

const props = withDefaults(defineProps<SvgIconProps>(), {
    size: 24,
});

const icon = getIcon(props.name);

</script>