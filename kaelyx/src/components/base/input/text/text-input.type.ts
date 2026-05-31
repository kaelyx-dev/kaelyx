export const classPrefix = 'input-text'

export type ClassValue = string | Record<string, boolean> | string[]
export type InputType = 'text' | 'email' | 'search' | 'tel' | 'url' | 'number'
export type InputValue = string | number | null

export interface InputProps {
  modelValue?: InputValue
  type?: InputType
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  name?: string
  id?: string
  label?: string
  hint?: string
  error?: string
  maxlength?: number
  minlength?: number
  min?: number | string
  max?: number | string
  step?: number | string
  autocomplete?: string
  autofocus?: boolean
  /** Show a character counter when maxlength is set. */
  showCount?: boolean
  /** Class overrides applied to the inner <input> element. */
  inputClass?: ClassValue
  /** Class overrides applied to the wrapper div. */
  wrapperClass?: ClassValue
}

export interface InputEmits {
  (e: 'update:modelValue', value: InputValue): void
  (e: 'change', value: InputValue): void
  (e: 'input', value: InputValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}

export type InputSlotProps = {
  focused: boolean
  hasValue: boolean
  hasError: boolean
}