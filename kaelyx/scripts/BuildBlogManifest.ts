/// <reference types="node" />

import fs from "fs"

const blogDirectory = "public/blog"
const blogManifestFile = "src/assets/blog/blog-manifest.json"
const wordsPerMinuteReadTime = 200

const runScript = async () => {
    console.log("Building blog manifest...")

    const blogManifest = {
        posts: [] as { title: string, date: string, tags: string[], path: string, readTime: number }[]
    }

    try {
        const files: string[] = fs.readdirSync(blogDirectory)
        console.log(`Found ${files.length} blog posts in ${blogDirectory}`)
        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = `${blogDirectory}/${file}`
                const content = fs.readFileSync(filePath, 'utf-8')
                const titleMatch = content.match(/<!--Title:\s*(.+?)\s*-->/)
                const dateMatch = content.match(/<!--Date:\s*(.+?)\s*-->/)
                const tagsMatch = content.match(/<!--Tags:\s*(.+?)\s*-->/)
                if (titleMatch && dateMatch && tagsMatch) {
                    blogManifest.posts.push({
                        title: titleMatch[1],
                        date: dateMatch[1],
                        tags: tagsMatch[1].split(',').map(tag => tag.trim()),
                        path: filePath,
                        readTime: content.split(/\s+/).length / wordsPerMinuteReadTime
                    })
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