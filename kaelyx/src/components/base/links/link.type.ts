import type { ActionType, FontSize, Colour, ThemedColourProps } from "@/types/global.types";

export const classPrefix = 'link';

export interface LinkProps extends ThemedColourProps {
    href?: string;
    label?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    
    type?: ActionType;
    font?: FontSize;
    tooltip?: string;
}