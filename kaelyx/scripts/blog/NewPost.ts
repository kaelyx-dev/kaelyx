/// <reference types="node" />

import fs from 'node:fs';
import { Frontmatter } from '../../src/utils/parsing/Frontmatter';

const args = Object.fromEntries(process.argv.slice(2)
.filter(arg => arg.startsWith('--'))
.map(arg => (arg.replace("\"", ""), arg.trim().replace('--', '').split(`=`))))

let date: string = (args.date ? new Date((() => { let [d, m, y] = args.date.split("/").map(Number); return new Date(y, m - 1, d); })()) : new Date()).toISOString().split('T')[0]

const frontmatterKVs = {
    title: args.title || 'New Post',
    date: date,
    tags: args.tags || "",
    draft: true,
    unlisted: true
}

const template = `${Frontmatter.createFrontmatterString(frontmatterKVs)}\n\n# {{TITLE}}`

const filename = `${date}-${args.title?.toLowerCase().replaceAll(" ", "-") || "new-post"}.md`
let fileBase = `public/blog/${filename}`

let currIdx = 1
while(fs.existsSync(fileBase)) {
    const newFileBase = fileBase.replace(/\.md$/, `-${currIdx}.md`)
    if(!fs.existsSync(newFileBase)) {
        fileBase = newFileBase
        break
    }
    currIdx++
}

fs.writeFileSync(fileBase, template);


console.log(`New post created successfully! - ${fileBase}`)