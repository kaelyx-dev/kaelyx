export const classPrefix = 'input-pill'

export interface PillFilterOption {
    name: string;
    value: string;
}

export interface PillFilterProps {
    label?: string
    options: PillFilterOption[]
}