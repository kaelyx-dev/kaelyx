/// <reference types="node" />

import fs from 'fs';

const args = Object.fromEntries(process.argv.slice(2)
.filter(arg => arg.startsWith('--'))
.map(arg => (arg.replace("\"", ""), arg.trim().replace('--', '').split(`=`))))

let date: string = (args.date ? new Date((() => { let [d, m, y] = args.date.split("/").map(Number); return new Date(y, m - 1, d); })()) : new Date()).toISOString().split('T')[0]

const template = 
`
---
title : {{TITLE}}
date  : {{DATE}}
tags  : {{TAGS}}
---

# {{TITLE}}`

.replaceAll(`{{TITLE}}`, args.title || 'New Post')
.replaceAll(`{{DATE}}`, date)
.replaceAll(`{{TAGS}}`, args.tags || 'uncategorized');

const fileBase = `public/blog/${date}-${args.title?.toLowerCase().replaceAll(" ", "-") || "new-post"}.md`

if(fs.existsSync(fileBase)) {
    console.error(`Error: A post with the title "${args.title}" already exists! Please choose a different title or delete the existing post.`)
    process.exit(1)
}

fs.writeFileSync(fileBase, template);

console.log("New post created successfully!")