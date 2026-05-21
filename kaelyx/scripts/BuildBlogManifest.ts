/// <reference types="node" />

import fs from "fs"
import { Frontmatter } from "../src/utils/parsing/frontmatter"

const blogDirectory = "public/blog"
const blogManifestFile = "src/assets/blog/blog-manifest.json"
const wordsPerMinuteReadTime = 200

type BlogManifestPost = {
    title: string
    date: string
    tags: string[]
    categories: string[]
    keywords: string[]
    draft: boolean
    unlisted: boolean
    slug: string
    route: string
    path: string
    readTime: number
}

const sanitizeSegment = (value: string): string =>
    value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-/_]/g, "")
        .replace(/^\/+|\/+$/g, "")

const getDefaultSlugFromFile = (fileName: string): string =>
    sanitizeSegment(fileName.replace(/\.md$/i, ""))

const buildRoute = (category: string | undefined, slug: string): string => {
    const normalizedSlug = sanitizeSegment(slug)
    const normalizedCategory = category ? sanitizeSegment(category) : ""
    return normalizedCategory ? `/${normalizedCategory}/${normalizedSlug}` : `/${normalizedSlug}`
}

const runScript = async () => {
    console.log("Building blog manifest...")

    const blogManifest = {
        posts: {} as Record<string, BlogManifestPost>
    }

    try {
        const files: string[] = fs.readdirSync(blogDirectory)
        console.log(`Found ${files.length} blog posts in ${blogDirectory}`)
        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = `${blogDirectory}/${file}`
                const content = fs.readFileSync(filePath, 'utf-8')
                const frontmatter = new Frontmatter(content)
                const title = frontmatter.getString("title") ?? ""
                const date = frontmatter.getString("date") ?? ""
                const tags = frontmatter.getList("tags") ?? []
                const categories = frontmatter.getList("categories") ?? frontmatter.getList("category") ?? []
                const keywords = frontmatter.getList("keywords") ?? []
                const draft = frontmatter.getBoolean("draft") ?? false
                const unlisted = frontmatter.getBoolean("unlisted") ?? false
                const slugOverride = frontmatter.getString("slug") ?? ""
                const defaultSlug = getDefaultSlugFromFile(file)
                const slug = sanitizeSegment(slugOverride || defaultSlug)
                const route = buildRoute(categories[0], slug)

                if (title && date) {
                    const post: BlogManifestPost = {
                        title,
                        date,
                        tags,
                        categories,
                        keywords,
                        draft,
                        unlisted,
                        slug,
                        route,
                        path: filePath,
                        readTime: content.split(/\s+/).length / wordsPerMinuteReadTime
                    }

                    blogManifest.posts[route] = post
                }
            }
        }
        fs.writeFileSync(blogManifestFile, JSON.stringify(blogManifest, null, 2))
        console.log(`Blog manifest written to ${blogManifestFile}`)
    } catch (error) {
        console.error("Error building blog manifest:", error)
    }
}

runScript()