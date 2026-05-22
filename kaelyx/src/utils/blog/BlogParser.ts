import { Marked, type Tokens, type RendererObject } from 'marked';
import DOMPurify from 'dompurify';

import BlockShortcodeExtension from './custom-parsing-extensions/BlockShortcodeExtension';
import InlineShortcodeExtension from './custom-parsing-extensions/InlineShortcodeExtension';

class BlogParser {
    public static readonly FRONTMATTER_DELIMITER = '---';

    private _content: string = ""
    private _html: string = ""
    private _isSanitised: boolean = false

    public constructor(rawContent: string) {
        this._content = rawContent
        this.parseContent()
    }

    public setRawContent(rawContent: string): void {
        this._isSanitised = false
        this._html = ""
        this._content = rawContent
    }

    public parseContent(): void {
        if (!this.hasContent()) return;
        this.stripFrontmatter()
        this.convertMarkdownToHtml()
        this.sanitiseHtml()
    }

    private hasContent(): boolean {
        return !!(this._content && this._content.trim().length > 0)
    }

    private stripFrontmatter(): void {
        this._content = removeFrontmatter(this._content)
    }

    public getHtml(): string | undefined {
        if (!this._html) return undefined
        if (!this._isSanitised) console.warn("HTML content has not been sanitised yet. Call parseContent() to ensure sanitisation.")
        return this._html
    }

    private convertMarkdownToHtml(): void {
        if (!this.hasContent()) return;
        this._content = filterNonStandardSpaceCharacters(this._content)
        const markedInstance = new Marked()
        markedInstance.use({
            breaks: true, 
            gfm: true,
            renderer: tokenParsers, 
            extensions: [
                BlockShortcodeExtension,
                InlineShortcodeExtension
            ]
        })
        this._html = markedInstance.parse(this._content, { async: false })
    }

    private sanitiseHtml(): void {
        if (!this._html) return;
        this._html = DOMPurify.sanitize(this._html, 
            {
                ADD_TAGS: ['sc'],
                CUSTOM_ELEMENT_HANDLING: {
                    attributeNameCheck: /.*/
                }
            })
        this._isSanitised = true
    }
}

export default BlogParser

// Ancillary functions.
const filterNonStandardSpaceCharacters = (content: string) => content.replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF]/g, "")
const removeFrontmatter = (content: string): string => {
    const lines = content.split("\n")
    if (lines && lines.length > 0 && lines[0]?.trim() === BlogParser.FRONTMATTER_DELIMITER) {
        const closingIndex = lines.slice(1).findIndex(line => line.trim() === BlogParser.FRONTMATTER_DELIMITER)
        if (closingIndex !== -1) {
            return lines.slice(closingIndex + 2).join("\n")
        }
    }
    return content
}

// Customer token renderer functions
const tokenParsers: RendererObject = {
    code(token: Tokens.Code): string | false {
        return false
    }
}