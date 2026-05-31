import type { Colour } from "@/types/global.types"

export const classPrefix = 'input-select'

export type ClassValue = string | Record<string, boolean> | string[]
export type SelectValue = string | number | null

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: SelectValue
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  label?: string
  triggerClass?: ClassValue
  dropdownClass?: ClassValue
  optionClass?: ClassValue
    
  selectedColour?: Colour
  darkModeSelectedBackgroundColour?: Colour
  lightModeSelectedBackgroundColour?: Colour
}

export interface SelectEmits {
  (e: 'update:modelValue', value: SelectValue): void
  (e: 'change', value: SelectValue): void
  (e: 'open'): void
  (e: 'close'): void
}

export type KSelectOptionSlotProps = {
  option: SelectOption
  selected: boolean
  focused: boolean
}