/// <reference types="node" />

import fs from "fs"

const iconPrefix = "icon-"

const iconDirectories = [
    "public/icons"
]

const iconTypes = new Set([
    "svg"
])

const iconManifestFile = "src/assets/icons/icon-manifest.json"

const getFilesInDirectory = (directory: string): string[] => {
    try {
        const files: string[] = fs.readdirSync(directory)
        return files.filter(file => {
            const fileType = file.split('.').pop()
            return iconTypes.has(fileType || "")
        })
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error)
        return []
    }
}

const runScript = async () => {
    console.log("Building icon manifest...")
    const iconManifest = {
        icons: [] as { name: string, path: string, type: string, data: string }[]
    }

    for (const directory of iconDirectories) {
        const files = getFilesInDirectory(directory)
        console.log(`Found ${files.length} icons in ${directory}`)
        for (const file of files) {
            const fileType = file.split('.').pop() || ""
            const iconName = file.replace(`.${fileType}`, "")
            const iconPath = `${directory}/${file}`
            iconManifest.icons.push({
                name: `${iconPrefix}${iconName}`,
                path: iconPath,
                type: fileType,
                data: fs.readFileSync(iconPath, 'utf-8')
            })
        }
    }

    try {
        await fs.promises.writeFile(iconManifestFile, JSON.stringify(iconManifest, null, 2))
        console.log("Icon manifest created successfully!")
    } catch (error) {
        console.error("Error creating icon manifest:", error)
    }
}

runScript()
