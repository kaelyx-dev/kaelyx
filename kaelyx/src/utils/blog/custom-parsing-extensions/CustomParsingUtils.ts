import Test from '@component/shortcodes/Test.vue';

class ShortcodeParserUtils {

    public static readonly SHORTCODE_BODY = /\{\{\s*([a-zA-Z][\w-]*)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*\}\}/;
    public static readonly SHORTCODE_INLINE = new RegExp('^' + ShortcodeParserUtils.SHORTCODE_BODY.source);
    public static readonly SHORTCODE_BLOCK = new RegExp('^' + ShortcodeParserUtils.SHORTCODE_BODY.source + '[ \\t]*(?:\\n|$)');
    public static readonly SHORTCODE_TAG = "sc"

    public static shortcodeList: Record<string, { type: string; component: any }> = {
        "test-block": {
            "type": "block",
            "component": Test
        },
        "test-inline": {
            "type": "inline",
            "component": Test
        }
    }

    public static readonly isInline = (tagName: string): boolean => {
        return this.shortcodeList[tagName]?.type === "inline"
    }

    public static readonly isBlock = (tagName: string): boolean => {
        return this.shortcodeList[tagName]?.type === "block"
    }

    public static readonly getComponentForShortcode = (tagName: string): any => {
        if (!tagName || !this.shortcodeList[tagName]) {
            console.warn(`No component found for shortcode with tag name: ${tagName}`)
            return null
        }
        return this.shortcodeList[tagName]?.component
    }


    public static readonly getPropsFromAttributeString = (attrString: string): Record<string, string> => {
        const attrRegex = /([\w-]+)(?:="([^"]*)")?/g
        const props: Record<string, string> = {}
        let match: RegExpExecArray | null

        while ((match = attrRegex.exec(attrString)) !== null) {
            const key = match[1]!
            const value = match[2] ?? "true"
            props[key] = value
        }

        return props
    }

    public static resolveProps(component: any, propsAttributeString: string): Record<string, unknown> {
        const candidateProps = this.getPropsFromAttributeString(propsAttributeString)
        const declared = component.props
        if (!declared) return {}

        if (Array.isArray(declared)) {
            return Object.fromEntries(
                Object.entries(candidateProps).filter(([k]) => declared.includes(k))
            )
        }

        return Object.fromEntries(
            Object.entries(candidateProps).filter(([k]) => k in declared)
        )
    }
}

export default ShortcodeParserUtils