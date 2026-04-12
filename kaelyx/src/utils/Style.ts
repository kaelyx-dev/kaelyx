import type { Colour } from "@/types/global.types";

const buildStyle = (classPrefix: string, component?: string, value?: string) => {
    if (!component) return '';
    if (!value) return `${classPrefix}--${component}`;
    return `${classPrefix}--${component}-${value}`;
}

const Style = {
    buildStyle,
    backgroundColour: (classPrefix: string, colour: Colour | undefined) => buildStyle(classPrefix, 'bg-colour', colour),
    textColour: (classPrefix: string, colour: Colour | undefined) => buildStyle(classPrefix, 'text-colour', colour),
    lightBackgroundColour: (classPrefix: string, colour: Colour | undefined) => buildStyle(classPrefix, 'light-bg-colour', colour),
    darkBackgroundColour: (classPrefix: string, colour: Colour | undefined) => buildStyle(classPrefix, 'dark-bg-colour', colour),
    lightTextColour: (classPrefix: string, colour: Colour | undefined) => buildStyle(classPrefix, 'light-text-colour', colour),
    darkTextColour: (classPrefix: string, colour: Colour | undefined) => buildStyle(classPrefix, 'dark-text-colour', colour),
}

export default Style;
