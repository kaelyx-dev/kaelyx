export type NormalColour = 'red' | 'purple' | 'pink' | 'orange' | 'yellow' | 'blue' | 'green' | 'black' | 'white';
export type DarkColour = `dark-${Exclude<NormalColour, 'black' | 'white'>}`;
export type Colour = NormalColour | DarkColour;

export type Theme = 'light' | 'dark';

export type FontSize = 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'p3';

export type LinkType = 'link' | 'negative-link';
export type ButtonType = 'primary' | 'secondary' | 'tertiary';
export type ActionType = LinkType | ButtonType | Colour | 'inverted';

export interface BlogPost {
    title: string;
    date: string;
    tags: string[];
    categories: string[];
    keywords: string[];
    draft: boolean;
    unlisted: boolean;
    slug: string;
    route: string;
    path: string;
    readTime: number;
}

export interface ThemedColourProps {
    backgroundColour?: Colour
    textColour?: Colour
    darkModeBackgroundColour?: Colour
    lightModeBackgroundColour?: Colour
    darkModeTextColour?: Colour
    lightModeTextColour?: Colour
}
