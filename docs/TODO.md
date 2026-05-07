# todo

# Immediates
update blog manifest script to work with yaml configs at the top, not html ones
link styling
toast service
explore https://vite-plugin-ssr.com/pre-rendering
explore scss @return bug somewhere
get a deploy pipeline setup with a prod/deploy branch and a uat/testing branch 
# site
move site contents out of App.vue and into respective components 
get useLinks working and replace hardcoded links in app.vue.

# blog
blog engine - implement BlogParser, BlogShortcodes, BlogRenderer pipeline
blog nav - previous/next post navigation
blog tags - tag filtering on BlogView
blog share button functionality - navigator.share()
blog copy link button functionality - update to use toast service.
render markdown instead of raw pre tag
add a reading time area.
blog auto tagger on build of manifest

# shortcodes
shortcode engine - BlogShortcodes.ts registry + placeholder injection
shortcode - link
shortcode - image

# projects
projects engine
projects manifest command - BuildProjectManifest.ts
projects view layout

# styling
main block styling
footer styling
nav mobile layout
blog post page layout
responsive typography scale

# icons
remove comments and newlines from icon svgs
sanitize svg icons for security
set icons stroke/fill to currentColor for better styling
add error handling for missing icons in SvgIcon component


# scripts
setup publish script to work with both gh-pages and cloudflare pages
use .env for target platform, add .env.example, add .env to .gitignore


# code quality and SOLID

- implement 404.html for gh-pages SPA fallback
- expose buildStyle directly in Style.ts for O/C principle compliance
- move Button/Link colour props into shared ThemedColourProps interface in global.types
- dependency inversion - useBlog should accept a source param with manifest as default
- rename ActionType to AppearanceType or Variant to signal visual-only intent
- move getRoutes().filter() out of App.vue template, export navRoutes from router
- fix background-position SCSS division to use math.div() - deprecated / operator

```ts
// useBlog dependency inversion
import type { BlogPost } from '@type/global.types'
import BlogManifest from '@asset/blog/blog-manifest.json'
const defaultSource: BlogPost[] = BlogManifest.posts
export const useBlog = (source: BlogPost[] = defaultSource) => {
    const getBlogPosts = (): BlogPost[] => source
}
```

```ts
// ThemedColourProps
export interface ThemedColourProps {
    backgroundColour?: Colour
    textColour?: Colour
    darkModeBackgroundColour?: Colour
    lightModeBackgroundColour?: Colour
    darkModeTextColour?: Colour
    lightModeTextColour?: Colour
}
// Button.type.ts and link.type.ts both extend this
```
