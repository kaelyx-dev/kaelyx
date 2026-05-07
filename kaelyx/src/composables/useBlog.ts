import { useConfig } from "./useConfig"
import BlogManifest from '@asset/blog/blog-manifest.json'

import type { BlogPost } from '@type/global.types'

const toFetchPath = (manifestPath: string): string =>
    '/' + manifestPath.replace(/^public\//, '')

const toSlug = (manifestPath: string): string =>
    manifestPath.replace(/^.*\//, '').replace(/\.md$/, '')

export const useBlog = () => {

    const base = useConfig().getString('base', 'kaelyx.dev')
    const blogPath = useConfig().getString('paths.blog', 'public/blog')

    const getBlogPosts = (): BlogPost[] => {
        return BlogManifest.posts
    }

    const getBlogPost = (pathString: string): BlogPost | undefined => {
        return BlogManifest.posts.find(p => p.path === pathString)
    }

    const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
        return BlogManifest.posts.find(p => toSlug(p.path) === slug)
    }

    const getSlug = (post: BlogPost): string => toSlug(post.path)

    const fetchBlogContent = async (post: BlogPost): Promise<string> => {
        const response = await fetch(toFetchPath(post.path))
        if (!response.ok) throw new Error(`Failed to load post: ${post.path}`)
        return response.text()
    }

    return { base, blogPath, getBlogPosts, getBlogPost, getBlogPostBySlug, getSlug, fetchBlogContent }
}