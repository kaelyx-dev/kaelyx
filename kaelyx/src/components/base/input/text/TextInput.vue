<script lang="ts" setup>
import { ref, computed, useId } from 'vue'
import { type InputProps, type InputEmits, type InputValue, classPrefix } from './text-input.type'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
})

const emit = defineEmits<InputEmits>()

const uid = useId()
const inputId = computed(() => props.id ?? `input-text-field-${uid}`)
const labelId = computed(() => `input-text-label-${uid}`)
const hintId  = computed(() => `input-text-hint-${uid}`)
const errorId = computed(() => `input-text-error-${uid}`)

const isFocused = ref(false)
const inputRef  = ref<HTMLInputElement | null>(null)

const hasValue = computed(
  () => props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '',
)

const hasError = computed(() => !!props.error)

const characterCount = computed(() => {
  if (!props.maxlength) return 0
  return String(props.modelValue ?? '').length
})

const isNearLimit = computed(() => {
  if (!props.maxlength) return false
  return characterCount.value >= props.maxlength * 0.8
})

const isAtLimit = computed(() => {
  if (!props.maxlength) return false
  return characterCount.value >= props.maxlength
})

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.hint)  ids.push(hintId.value)
  if (props.error) ids.push(errorId.value)
  return ids.length ? ids.join(' ') : undefined
})

const onInput = (e: Event) => {
  const raw = (e.target as HTMLInputElement).value
  const val: InputValue = props.type === 'number' && raw !== '' ? Number(raw) : raw
  emit('update:modelValue', val)
  emit('input', val)
}

const onChange = (e: Event) => {
  const raw = (e.target as HTMLInputElement).value
  const val: InputValue = props.type === 'number' && raw !== '' ? Number(raw) : raw
  emit('change', val)
}

const onFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
}

const onBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}

defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })
</script>

<template>
  <div
    :class="[
      classPrefix,
      wrapperClass,
      {
        [classPrefix + '--focused']:    isFocused,
        [classPrefix + '--disabled']:   disabled,
        [classPrefix + '--readonly']:   readonly,
        [classPrefix + '--has-value']:  hasValue,
        [classPrefix + '--has-error']:  hasError,
        [classPrefix + '--has-prefix']: $slots.prefix,
        [classPrefix + '--has-suffix']: $slots.suffix,
      },
    ]"
  >
    <!-- Label -->
    <label
      v-if="label"
      :id="labelId"
      :for="inputId"
      :class="`${classPrefix}__label`"
    >
      {{ label }}
      <span v-if="required" aria-hidden="true" :class="`${classPrefix}__required`">*</span>
    </label>

    <!-- Input wrapper -->
    <div :class="`${classPrefix}__wrapper`">

      <!-- Prefix slot -->
      <span v-if="$slots.prefix" :class="`${classPrefix}__prefix`" aria-hidden="true">
        <slot name="prefix" :focused="isFocused" :has-value="hasValue" :has-error="hasError" />
      </span>

      <!-- Native input -->
      <input
        :id="inputId"
        ref="inputRef"
        :class="[`${classPrefix}__field`, inputClass]"
        :type="type"
        :name="name"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :minlength="minlength"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :aria-labelledby="label ? labelId : undefined"
        :aria-describedby="describedBy"
        :aria-invalid="hasError ? 'true' : undefined"
        :aria-required="required ? 'true' : undefined"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />

      <!-- Suffix slot -->
      <span v-if="$slots.suffix" :class="`${classPrefix}__suffix`" aria-hidden="true">
        <slot name="suffix" :focused="isFocused" :has-value="hasValue" :has-error="hasError" />
      </span>

    </div>

    <!-- Hint + character count row -->
    <div v-if="(hint && !hasError) || (showCount && maxlength)" :class="`${classPrefix}__meta`">
      <span
        v-if="hint && !hasError"
        :id="hintId"
        :class="`${classPrefix}__hint`"
      >
        {{ hint }}
      </span>
      <span
        v-if="showCount && maxlength"
        :class="[
          `${classPrefix}__count`,
          {
            [`${classPrefix}__count--near`]:  isNearLimit,
            [`${classPrefix}__count--limit`]: isAtLimit,
          },
        ]"
        aria-live="polite"
        :aria-label="`${characterCount} of ${maxlength} characters used`"
      >
        {{ characterCount }}/{{ maxlength }}
      </span>
    </div>

    <!-- Error message -->
    <span
      v-if="hasError"
      :id="errorId"
      :class="`${classPrefix}__error`"
      role="alert"
      aria-live="assertive"
    >
      <svg :class="`${classPrefix}__error-icon`" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>
        <path d="M8 5v3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        <circle cx="8" cy="11" r="0.75" fill="currentColor"/>
      </svg>
      {{ error }}
    </span>

  </div>
</template>