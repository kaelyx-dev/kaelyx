
// Import the icon manifest JSON
import { h } from 'vue'
import IconManifest from '@asset/icons/icon-manifest.json'

export interface IconType {
    name: string,
    type: string,
    data: string
}

const iconPrefix = "icon-"

const spriteMap = (() => {
    const symbols = IconManifest.icons.map(icon => {
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
        const viewBox = svgElement.getAttribute('viewBox') ?? '0 0 24 24'
        const fill = svgElement.getAttribute('fill')
        const stroke = svgElement.getAttribute('stroke')
        const fillAttr = fill == null ? '' : ` fill="${fill}"`
        const strokeAttr = stroke == null ? '' : ` stroke="${stroke}"`
        return `<symbol id="${icon.name}" viewBox="${viewBox}"${fillAttr}${strokeAttr}>${inner}</symbol>`
    }).join('')
    // Return a VNode with v-html for the sprite map
    return h('svg', { style: 'display:none', innerHTML: symbols })
})()

export const useIcons = () => {
    // Lookup icon by name
    const getIcon = (name: string) => {
        const icon = IconManifest.icons.find((icon: { name: string }) => icon.name === `${iconPrefix}${name}`)
        return icon || null
    }

    // Optionally, return all icons
    const getAllIcons = () => IconManifest.icons

    return {
        getIcon,
        getAllIcons,
        createIconMapElement: () => spriteMap
    }

}