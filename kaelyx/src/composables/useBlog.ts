import { useRouter } from "vue-router" 
import { useConfig } from "./useConfig"
import BlogManifest from '@asset/blog/blog-manifest.json'

import type { BlogPost } from '@type/global.types'

const toFetchPath = (manifestPath: string): string =>
    '/' + manifestPath.replace(/^public\//, '')

const getPostEntries = (): [string, BlogPost][] =>
    Object.entries(BlogManifest.posts as Record<string, BlogPost>)

const getPostValues = (): BlogPost[] =>
    getPostEntries().map(([_, post]) => post)

const isDraft = (post: BlogPost): boolean => post.draft === true
const isUnlisted = (post: BlogPost): boolean => post.unlisted === true

export const getPublishedPosts = (): BlogPost[] => getPostValues().filter(post => !isDraft(post))
export const getListedPosts = (): BlogPost[] => getPostValues().filter(post => !isUnlisted(post) && !isDraft(post))
export const getDraftPosts = (): BlogPost[] => getPostValues().filter(isDraft)
export const getUnlistedPosts = (): BlogPost[] => getPostValues().filter(isUnlisted)

export const useBlog = () => {

    const base = useConfig().getString('base', 'kaelyx.dev')
    const blogPath = useConfig().getString('paths.blog', 'public/blog')

    const getBlogPosts = (visibility: 'published' | 'listed' | 'draft' | 'unlisted' = 'published'): BlogPost[] => {
        switch (visibility) {
            case 'listed': // draft = false and unlisted = false
                return getListedPosts()
            case 'draft': // draft = true 
                return getDraftPosts()
            case 'unlisted': // unlisted = true
                return getUnlistedPosts()
            case 'published': // draft = false (regardless of unlisted)
            default:
                return getPublishedPosts()
        }
    }
    
    const getAllCategories = (): string[] => BlogManifest.categories
    const getAllTags = (): string[] => BlogManifest.tags
    
    const getPostToNavigateTo = (post: BlogPost) => {
        const {category, slug} = post.route.match(/\/(?:(?<category>[^/]+)\/)?(?<slug>[^/]+)$/)?.groups ?? {}
        return category ? { name: 'BlogPostWithCategory', params: { category, slug } } : { name: 'BlogPost', params: { slug } }
    }
    
    const getPostFromPath = (path: string): BlogPost | undefined => (BlogManifest.posts as Record<string, BlogPost>)[path]
    
    const getBlogPath = (category: string | undefined, slug: string): string => {
        const normalizedSlug = slug.trim().toLowerCase().replace(/\s+/g, '-')
        const normalizedCategory = category ? category.trim().toLowerCase().replace(/\s+/g, '-') : undefined
        return normalizedCategory ? `/${normalizedCategory}/${normalizedSlug}` : `/${normalizedSlug}`
    }
    
    const fetchPostContent = async (post: BlogPost): Promise<string> => {
        return await fetch(toFetchPath(post.path)).then(res => {
            if (!res.ok) {
                throw new Error(`Failed to fetch blog post content from ${post.path}: ${res.status} ${res.statusText}`)
            }
            return res.text()
        })
        
    }

    return { base, blogPath, getBlogPosts, fetchPostContent, getAllCategories, getAllTags, getPostToNavigateTo, getPostFromPath, getBlogPath }
}