import { type TokenizerAndRendererExtension } from 'marked';
import ShortcodeParserUtils from './CustomParsingUtils';

const blockShortcodeExtension: TokenizerAndRendererExtension = {
    name: 'blockShortcode',
    level: 'block',
    start(src) {
        if (src.startsWith('{{')) return 0
        const idx = src.indexOf('\n{{')
        return idx === -1 ? undefined : idx + 1
    },
    tokenizer(src) {
        const match = ShortcodeParserUtils.SHORTCODE_BLOCK.exec(src)
        if (!match) return
        const tagName = match[1] ?? ""
        if (!ShortcodeParserUtils.isBlock(tagName)) return
        return {
            type: 'blockShortcode',
            raw: match[0],
            tagName,
            attributesString: match[2],
        }
    },
    renderer(token) {
        return `<sc data-type="block" data-name="${token.tagName}" data-attr="${token.attributesString}"></sc>\n`
    },
}

export default blockShortcodeExtension