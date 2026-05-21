import { ref } from 'vue'
import { useConfig } from './useConfig'

const useDocument = () => {
    const title = ref(document.title)

    const setTitle = (newTitle: string) => {
        title.value = useConfig().getString('titleBase')?.replace("{{TITLE}}", newTitle) || newTitle
        document.title = title.value ?? useConfig().getString('defaultTitle', 'Kaelyx')
    }
    
    const resetTitle = () => {
        title.value = useConfig().getString('defaultTitle', 'Kaelyx') || 'Kaelyx'
        document.title = title.value
    }
    
    const setRawTitle = (newTitle: string) => {
        title.value = newTitle
        document.title = newTitle
    }

    return { title, setTitle, resetTitle, setRawTitle }
}

export default useDocument