import Test from '@component/shortcodes/Test.vue';

class ShortcodeParserUtils {
    
    public static readonly SHORTCODE_BODY = /\{\{\s*([a-zA-Z][\w-]*)((?:\s+[\w-]+(?:="[^"]*")?)*)\s*\}\}/;
    public static readonly SHORTCODE_INLINE  = new RegExp('^' + ShortcodeParserUtils.SHORTCODE_BODY.source);
    public static readonly SHORTCODE_BLOCK   = new RegExp('^' + ShortcodeParserUtils.SHORTCODE_BODY.source + '[ \\t]*(?:\\n|$)');

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

    public static isInline = (tagName: string): boolean => {
        return this.shortcodeList[tagName]?.type === "inline"
    }

    public static isBlock = (tagName: string): boolean => {
        return this.shortcodeList[tagName]?.type === "block"
    }

    public static getComponentForShortcode = (tagName: string): any => {
        return this.shortcodeList[tagName]?.component
    }

    public static parseShortcode(shortcodeString: string): { tagName: string; attributes: Record<string, string> } | null {
        return null // TODO: implement this function to parse the shortcode string and extract the tag name and attributes
    }
}

export default ShortcodeParserUtils