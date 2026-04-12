<template>
    <button
        @click="(e) => emit('click', e)"
        :class="[
            classPrefix,
            Style.buildStyle(classPrefix, props.type),
            Style.backgroundColour(classPrefix, props.backgroundColour),
            Style.textColour(classPrefix, props.textColour),
            Style.darkBackgroundColour(classPrefix, props.darkModeBackgroundColour),
            Style.darkTextColour(classPrefix, props.darkModeTextColour),
            Style.lightBackgroundColour(classPrefix, props.lightModeBackgroundColour),
            Style.lightTextColour(classPrefix, props.lightModeTextColour),
        ]"
        :title="tooltip"
    >
    <slot>
        {{ label }}
    </slot>
    </button>
</template>
<script setup lang="ts">
import Style from '@/utils/Style';
import { classPrefix, type ButtonProps, type ButtonEmits } from './Button.type';

const props = withDefaults(defineProps<ButtonProps>(), {
    font: 'p1',
    colour: 'background',
    tooltip: undefined,
});

const emit = defineEmits<ButtonEmits>();

</script>
