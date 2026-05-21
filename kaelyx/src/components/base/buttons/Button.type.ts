import type { ActionType, FontSize, ThemedColourProps } from "@/types/global.types";

export const classPrefix = 'btn';

export interface ButtonProps extends ThemedColourProps {
    label?: string;
    type?: ActionType;
    font?: FontSize;
    tooltip?: string;
}

export interface ButtonEmits {
    click: [event: PointerEvent];
}