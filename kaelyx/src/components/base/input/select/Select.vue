<script lang="ts" setup>
import {
    ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useId,
} from 'vue'

import { type SelectProps, type SelectEmits, type SelectOption, classPrefix } from './select.type'
import SvgIcon from '../../icons/SvgIcon.vue';
import Style from '@/utils/Style.ts';

const props = withDefaults(defineProps<SelectProps>(), {
    modelValue: null,
    placeholder: 'Select an option',
    disabled: false,
    required: false,
    name: undefined,
    id: undefined,
    label: undefined,
    triggerClass: undefined,
    dropdownClass: undefined,
    optionClass: undefined,
    selectedColour: 'purple'
})

const emit = defineEmits<SelectEmits>()

const uid = useId()
const triggerId = computed(() => props.id ?? `input-select-trigger-${uid}`)
const listboxId = computed(() => `input-select-listbox-${uid}`)
const labelId = computed(() => `input-select-label-${uid}`)
const nativeSelectId = computed(() => `input-select-native-${uid}`)

const isOpen = ref(false)
const focusedIndex = ref<number>(-1)
const triggerRef = ref<HTMLButtonElement | null>(null)
const listboxRef = ref<HTMLUListElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() =>
    props.options.find((o) => o.value === props.modelValue) ?? null,
)

const displayLabel = computed(() =>
    selectedOption.value ? selectedOption.value.label : props.placeholder,
)

const hasValue = computed(() => props.modelValue !== null && props.modelValue !== undefined)

const enabledOptions = computed(() => props.options.filter((o) => !o.disabled))

const open = async () => {
    if (props.disabled || isOpen.value) return
    isOpen.value = true

    // Seed focused index from current selection
    const idx = props.options.findIndex((o) => o.value === props.modelValue)
    focusedIndex.value = Math.max(idx, 0)

    emit('open')
    await nextTick()
    scrollFocusedOptionIntoView()
}

const close = (returnFocus = true) => {
    if (!isOpen.value) return
    isOpen.value = false
    focusedIndex.value = -1
    emit('close')
    if (returnFocus) {
        nextTick(() => triggerRef.value?.focus())
    }
}

const toggle = () => (isOpen.value ? close() : open())

// ─── Selection ────────────────────────────────────────────────────────────────

const select = (option: SelectOption) => {
    if (option.disabled) return
    emit('update:modelValue', option.value)
    emit('change', option.value)
    close()
}

const selectNative = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value
    const matched = props.options.find((o) => String(o.value) === val)
    if (matched) {
        emit('update:modelValue', matched.value)
        emit('change', matched.value)
    }
}

// ─── Keyboard Navigation ──────────────────────────────────────────────────────

const moveFocus = (delta: 1 | -1) => {
    const total = props.options.length
    if (total === 0) return

    let next = focusedIndex.value + delta
    // Skip disabled options
    let guard = 0
    while (guard < total) {
        if (next < 0) next = total - 1
        if (next >= total) next = 0
        if (!props.options[next]?.disabled) break
        next += delta
        guard++
    }
    focusedIndex.value = next
    scrollFocusedOptionIntoView()
}

const onTriggerKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
        case 'ArrowUp':
            e.preventDefault()
            open()
            break
    }
}

const onListKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault()
            moveFocus(1)
            break
        case 'ArrowUp':
            e.preventDefault()
            moveFocus(-1)
            break
        case 'Enter':
        case ' ':
            e.preventDefault()
            if (focusedIndex.value >= 0) {
                const opt = props.options[focusedIndex.value]
                if (opt) select(opt)
            }
            break
        case 'Escape':
        case 'Tab':
            e.preventDefault()
            close()
            break
        case 'Home':
            e.preventDefault()
            focusedIndex.value = props.options.findIndex((o) => !o.disabled)
            scrollFocusedOptionIntoView()
            break
        case 'End': {
            e.preventDefault()
            const lastEnabled = [...props.options].reverse().findIndex((o) => !o.disabled)
            if (lastEnabled !== -1) {
                focusedIndex.value = props.options.length - 1 - lastEnabled
                scrollFocusedOptionIntoView()
            }
            break
        }
        default:
            // Type-ahead: jump to first option starting with typed char
            if (e.key.length === 1) {
                const ch = e.key.toLowerCase()
                const start = focusedIndex.value + 1
                const search = [...props.options.slice(start), ...props.options.slice(0, start)]
                const match = search.find((o) => !o.disabled && o.label.toLowerCase().startsWith(ch))
                if (match) {
                    focusedIndex.value = props.options.indexOf(match)
                    scrollFocusedOptionIntoView()
                }
            }
    }
}

const scrollFocusedOptionIntoView = () => {
    nextTick(() => {
        const el = listboxRef.value?.children[focusedIndex.value] as HTMLElement | undefined
        el?.scrollIntoView({ block: 'nearest' })
    })
}

const onDocClick = (e: MouseEvent) => {
    if (!containerRef.value?.contains(e.target as Node)) {
        close(false)
    }
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))

watch(isOpen, async (val) => {
    if (val) {
        await nextTick()
        listboxRef.value?.focus()
    }
})

const activeDescendant = computed(() => {
    if (!isOpen.value || focusedIndex.value < 0) return undefined
    return `${listboxId.value}-option-${focusedIndex.value}`
})
</script>

<template>
    <div ref="containerRef"
        :class="[classPrefix, { 'input-select--open': isOpen, 'input-select--disabled': disabled, 'input-select--has-value': hasValue }]">
        <span v-if="label" :id="labelId" :class="`${classPrefix}__label`">
            {{ label }}
            <span v-if="required" aria-hidden="true" :class="`${classPrefix}__required`">*</span>
        </span>

        <!-- Hidden native select (for form submission + mobile fallback) -->
        <select :id="nativeSelectId" :class="`${classPrefix}__native`" :name="name" :required="required"
            :disabled="disabled" :value="modelValue ?? ''" :aria-hidden="true" tabindex="-1" @change="selectNative">
            <option value="" disabled>{{ placeholder }}</option>
            <option v-for="opt in options" :key="opt.value" :value="opt.value" :disabled="opt.disabled">
                {{ opt.label }}
            </option>
        </select>

        <button :id="triggerId" ref="triggerRef" type="button" :class="[`${classPrefix}__trigger`, triggerClass]"
            :disabled="disabled" :aria-haspopup="'listbox'" :aria-expanded="isOpen" :aria-controls="listboxId"
            :aria-labelledby="label ? `${labelId} ${triggerId}` : undefined" :aria-required="required" @click="toggle"
            @keydown="onTriggerKeydown">
            <slot name="trigger" :option="selectedOption" :label="displayLabel" :is-open="isOpen">
                <span
                    :class="[{ [`${classPrefix}__trigger-text--placeholder`]: !hasValue }, `${classPrefix}__trigger-text`]">
                    {{ displayLabel }}
                </span>
                <span :class="`${classPrefix}__trigger-icon`" aria-hidden="true">
                    <slot name="icon">
                        <SvgIcon name="chevron" />
                    </slot>
                </span>
            </slot>
        </button>

        <div :class="[`${classPrefix}__dropdown`, dropdownClass]" v-show="isOpen">
            <ul :id="listboxId" ref="listboxRef" :aria-labelledby="label ? labelId : triggerId"
                :aria-activedescendant="activeDescendant" :class="`${classPrefix}__list`" @keydown="onListKeydown">
                <li v-for="(opt, idx) in options" :id="`${listboxId}-option-${idx}`" :key="opt.value"
                    :aria-selected="opt.value === modelValue" :aria-disabled="opt.disabled" :class="[
                        `${classPrefix}__option`,
                        optionClass,
                        {
                            [Style.backgroundColour(`${classPrefix}__option--selected`, props.selectedColour)]: opt.value === modelValue,
                            [Style.darkBackgroundColour(`${classPrefix}__option--selected`, props.darkModeSelectedBackgroundColour)]: opt.value === modelValue && props.darkModeSelectedBackgroundColour,
                            [Style.lightBackgroundColour(`${classPrefix}__option--selected`, props.lightModeSelectedBackgroundColour)]: opt.value === modelValue && props.lightModeSelectedBackgroundColour,
                            [`${classPrefix}__option--focused`]: idx === focusedIndex,
                            [`${classPrefix}__option--disabled`]: opt.disabled,
                        }
                    ]" @mousedown.prevent="select(opt)" @mousemove="!opt.disabled && (focusedIndex = idx)">
                    <!-- Slot: option content -->
                    <slot name="option" :option="opt" :selected="opt.value === modelValue"
                        :focused="idx === focusedIndex">
                        <span :class="`${classPrefix}__option-label`">{{ opt.label }}</span>
                        <span v-if="opt.value === modelValue" :class="`${classPrefix}__option-check`"
                            aria-hidden="true">
                        </span>
                    </slot>
                </li>

                <!-- Empty state slot -->
                <li v-if="options.length === 0" :class="`${classPrefix}__empty`">
                    <slot name="empty">
                        <span>No options available</span>
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>