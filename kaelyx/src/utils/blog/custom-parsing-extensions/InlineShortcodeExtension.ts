import { type TokenizerAndRendererExtension } from 'marked';
import ShortcodeParserUtils from './CustomParsingUtils';

const inlineShortcodeExtension: TokenizerAndRendererExtension = {
    name: 'inlineShortcode',
    level: 'inline',
    start(src) {
        return src.match(ShortcodeParserUtils.SHORTCODE_BODY)?.index
    },
    tokenizer(src) {
        const match = ShortcodeParserUtils.SHORTCODE_INLINE.exec(src)
        if (!match) return
        const tagName = match[1] ?? ""
        if (!ShortcodeParserUtils.isInline(tagName)) return
        return {
            type: 'inlineShortcode',
            raw: match[0],
            tagName,
            attributesString: match[2],
        }
    },
    renderer(token) {
        return `<sc data-type="inline" data-name="${token.tagName}" data-attr="${token.attributesString}"></sc>`
    },
}

export default inlineShortcodeExtension