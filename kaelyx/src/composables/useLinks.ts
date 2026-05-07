import { useConfig } from "@composable/useConfig"
import { type LinkProps } from "@component/base/links/link.types"
export interface LinkObject {
    name: string
    href: string
    target?: LinkProps['target']
    icon?: string
}

export const useLinks = () => {

    const config = useConfig()
    
    const createLinkObject = (linkName: string): LinkObject | undefined => {
        const linkData = config.get<Record<string, unknown>>(`links.${linkName}`)
        if (!linkData) return undefined
        return {
            name: linkName,
            target: config.getString('config.defaultTarget', '_blank') as LinkProps['target'],
            href: String(linkData.href),
            ...linkData
        }
    }

    const getLink = (linkName: string) : LinkObject | undefined => {
        return config.get<Record<string, unknown>>(`links.${linkName}`)
        ? createLinkObject(linkName)
        : undefined
    }

    const getGroup = (linkGroup: string) : LinkObject[] | undefined => {
        return config.get<string[]>(`link-groups.${linkGroup}`)
        ?.map(_g => createLinkObject(_g))
        .filter(Boolean) as LinkObject[] | undefined
    }

    return { getLink, getGroup }
}