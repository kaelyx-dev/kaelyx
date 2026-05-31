# todo

# Immediates
link styling
toast service
explore https://vite-plugin-ssr.com/pre-rendering
explore scss @return bug somewhere
get a deploy pipeline setup with a prod/deploy branch and a uat/testing branch

# site
create blog cards for the blog list view

# blog
blog tags - tag filtering on BlogView
blog share button functionality - navigator.share()
blog copy link button functionality - update to use toast service.
add a reading time area.
blog auto tagger on build of manifest, short read, long read, medium read.

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
nav mobile layout
blog post page layout
responsive typography scale

# icons
remove comments and newlines from icon svgs
sanitize svg icons for security
set icons stroke/fill to currentColor for better styling
add error handling for missing icons in SvgIcon component

# scripts
setup publish script to work with both gh-pages and cloudflare pages or similar
use .env for target platform, add .env.example, add .env to .gitignore

# code quality and SOLID
- implement 404.html for gh-pages SPA fallback
- dependency inversion - useBlog should accept a source param with manifest as default - see block below
- rename ActionType to AppearanceType to signal visual-only intent, not btn vs link action
- move getRoutes().filter() out of header.vue template, export navRoutes from router
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