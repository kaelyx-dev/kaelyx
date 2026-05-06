import type { ActionType, FontSize, Colour } from "@/types/global.types";

export const classPrefix = 'link';

export interface LinkProps {
    href?: string;
    label?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    
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