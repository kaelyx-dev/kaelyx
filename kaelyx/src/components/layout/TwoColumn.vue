<template>
    <div 
    :class="    
        classPrefix,
        { [`${classPrefix}--right-on-top`]: !leftOnTop }
    ">
        <div :class="`${classPrefix}--left`">
            <slot name="left"></slot>
        </div>
        <div :class="`${classPrefix}--right`">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { type TwoColumnProps, classPrefix } from './TwoColumn.type';

const props = withDefaults(defineProps<TwoColumnProps>(), {})

const leftOnTop = computed(() => {
    if(props.leftTopOnMobile) return  props.leftTopOnMobile;
    else if(props.rightTopOnMobile) return !props.rightTopOnMobile;
    else return true;
});

const containerClasses = computed(() => [
    classPrefix,
    { [`${classPrefix}--right-on-top`]: !leftOnTop.value }
]);
</script>