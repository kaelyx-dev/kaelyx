import type { Colour } from "@/types/global.types"

export const classPrefix = 'icon'

export interface SvgIconProps {
    name: string,
    size?: number | string,
    color?: Colour,
    lightModeColour?: Colour,
    darkModeColour?: Colour
}