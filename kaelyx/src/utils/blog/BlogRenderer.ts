import { h, type VNode } from "vue"
import ShortcodeParserUtils from "./custom-parsing-extensions/CustomParsingUtils"

class BlogRenderer {
    private readonly _htmlString: string = ""
    private _htmlDOM: HTMLElement | null = null

    public constructor(htmlString: string) {
        this._htmlString = htmlString
        this.convertHtmlStringToDOM()
    }

    private convertHtmlStringToDOM() {
        this._htmlDOM = new DOMParser()
            .parseFromString(this._htmlString, "text/html")
            .body
    }

    public getVnodes(): Array<VNode | string> {
        if (!this._htmlDOM) return []
        return this.parseChildren(this._htmlDOM)
    }

    private parseChildren(parent: Node): Array<VNode | string> {
        return Array.from(parent.childNodes)
            .map(node => this.parseNode(node))
            .filter((n): n is VNode | string => n !== null)
    }

    private parseNode(node: ChildNode): VNode | string | null {

        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent ?? ""
            return text.trim() === "" ? null : text
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return null

        const el = node as Element
        const tag = el.tagName.toLowerCase()
        const htmlEl = el as HTMLElement

        if (tag === ShortcodeParserUtils.SHORTCODE_TAG || htmlEl.dataset.shortcode != null) {
            const type = htmlEl.dataset.type
            const name = htmlEl.dataset.name
            const attrString = htmlEl.dataset.attr

            const component = ShortcodeParserUtils.getComponentForShortcode(name ?? "")

            if (type && name && component) {
                const props = ShortcodeParserUtils.resolveProps(component, attrString ?? "")
                return h(component, props)
            }
            return null
        }

        const props: Record<string, string> = {}
        for (const attr of Array.from(el.attributes)) {
            props[attr.name] = attr.value
        }

        // Recurse into children
        const children = this.parseChildren(el)

        return h(tag, props, children)
    }
}

export default BlogRenderer