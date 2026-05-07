import type { ActionType, Colour, FontSize } from "@/types/global.types";

export const classPrefix = 'btn';

export interface ButtonProps {
    label?: string;
    type?: ActionType;
    font?: FontSize;
    tooltip?: string;
    
    backgroundColour?: Colour;
    textColour?: Colour;
    
    darkModeBackgroundColour?: Colour;
    lightModeBackgroundColour?: Colour;
    darkModeTextColour?: Colour;
    lightModeTextColour?: Colour;
}

export interface ButtonEmits {
    click: [event: PointerEvent];
}