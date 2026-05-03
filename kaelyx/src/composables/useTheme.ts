import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const currentTheme: ReturnType<typeof ref<Theme>> = ref('dark')

export const useTheme = () => {
    const setTheme = (theme: Theme) => {
        currentTheme.value = theme;
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }

    const initTheme = () => {
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved) {
            setTheme(saved);
            return;
        }
        const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
    
    const isLight = () => currentTheme.value === 'light'
    const isDark = () => currentTheme.value === 'dark'
    
    const toggleTheme = () => {
        setTheme(isLight() ? 'dark' : 'light')
    }

    return { setTheme, initTheme, currentTheme, isLight, isDark, toggleTheme }
}