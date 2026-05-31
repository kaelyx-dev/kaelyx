<template>
    <div :class="`${classPrefix}__wrapper`">
        <span v-if="props.label" :class="`${classPrefix}__label`">{{ props.label }}</span>
        <div :class="`${classPrefix}__pills`">
            <button v-for="(pill, index) in props.options" :key="index" :class="[
                `${classPrefix}__pill`,
                selectedPills?.includes(pill.value) ? `${classPrefix}__pill--selected` : '',
                ]" @click="togglePill(pill.value)">
                {{ pill.name }}
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type PillFilterProps, classPrefix } from './pill-filter.type'

const props = withDefaults(defineProps<PillFilterProps>(), {})
const selectedPills = defineModel<string[]>()


const togglePill = (value: string) => {
    const pills = selectedPills.value ?? []

    if (pills.includes(value)) {
        pills.splice(pills.indexOf(value), 1)
    } else {
        pills.push(value)
    }

    selectedPills.value = pills
}
</script>