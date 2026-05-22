import Test from "@/components/shortcodes/Test.vue"

class BlogRenderer {
    public static readonly SHORTCODE_TEMPLATE: string = ""

    private _htmlString: string = ""
    private _htmlDOM: HTMLElement | null = null
    private _shortcodeMap: Record<string, string> = {}

    public constructor(htmlString: string) {
        this._htmlString = htmlString

        this.convertHtmlStringToDOM()
        this.generateShortcodeMap()
        this.replaceShortcodesWithPlaceholders()
    }

    private convertHtmlStringToDOM() {
        this._htmlDOM = new DOMParser().parseFromString(this._htmlString, "text/html").body
    }

    private generateShortcodeMap() {
        
    }

    private replaceShortcodesWithPlaceholders() {

    }

    public getVnodes(): any {

    }
}

export default BlogRenderer