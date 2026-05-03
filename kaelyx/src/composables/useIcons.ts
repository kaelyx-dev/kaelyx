
// Import the icon manifest JSON
import { h } from 'vue'
import IconManifest from '@asset/icons/icon-manifest.json'

export interface IconType {
    name: string,
    type: string,
    data: string
}

const iconPrefix = "icon-"
export const useIcons = () => {
    // Lookup icon by name
    const getIcon = (name: string) => {
        const icon = IconManifest.icons.find((icon: { name: string }) => icon.name === `${iconPrefix}${name}`)
        return icon || null
    }
    
    // Returns a VNode for an SVG sprite map containing all icons as <symbol> elements
    const createIconMapElement = () => {
        // Build <symbol> elements as a string
        const symbols = getAllIcons().map(icon => {
            // Extract the inner SVG markup (children of <svg>)
            const parser = new DOMParser()
            const svgDoc = parser.parseFromString(icon.data, "image/svg+xml")
            const svgElement = svgDoc.documentElement
            let inner = ''
            svgElement.childNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                    inner += new XMLSerializer().serializeToString(node)
                }
            })
            return `<symbol id="${icon.name}" viewBox="0 0 24 24">${inner}</symbol>`
        }).join('')
        // Return a VNode with v-html for the sprite map
        return h('svg', { style: 'display:none', innerHTML: symbols })
    }

    // Optionally, return all icons
    const getAllIcons = () => IconManifest.icons

    return {
        getIcon,
        getAllIcons,
        createIconMapElement
    }
    
}