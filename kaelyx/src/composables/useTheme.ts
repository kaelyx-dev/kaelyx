import { ref , watch } from 'vue'

export type Theme = 'light' | 'dark'

const currentTheme = ref('dark')


export const useTheme = () => {
    const setTheme = (theme: Theme) => {
        currentTheme.value = theme
    }
    
    watch(currentTheme, (newTheme) => {
        document.documentElement.dataset.theme = newTheme
        localStorage.setItem('theme', newTheme)
    })
    
    const initTheme = () => {
        const presavedTheme = localStorage.getItem('theme') as Theme | null
        
        if(presavedTheme) {
            setTheme(presavedTheme)
            return
        }
        
        const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
    }
    
    return {setTheme, initTheme, currentTheme}
}