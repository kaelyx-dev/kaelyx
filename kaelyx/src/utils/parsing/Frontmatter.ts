export type FrontmatterValue = string | string[]
export type FrontmatterData = Record<string, FrontmatterValue>

const cleanScalar = (value: string): string => value.trim().replace(/^['\"]|['\"]$/g, "")

const parseList = (value: string | string[] | undefined): string[] => {
	if (!value) {
		return []
	}

	if (Array.isArray(value)) {
		return value.map(item => cleanScalar(item)).filter(Boolean)
	}

	const normalized = cleanScalar(value)
	if (!normalized) {
		return []
	}

	if (normalized.startsWith("[") && normalized.endsWith("]")) {
		return normalized
			.slice(1, -1)
			.split(",")
			.map(item => cleanScalar(item))
			.filter(Boolean)
	}

	return normalized
		.split(/[;,]/)
		.map(item => cleanScalar(item))
		.filter(Boolean)
}

const parseBooleanLike = (value: string | string[] | undefined): boolean | undefined => {
	if (Array.isArray(value)) {
		return undefined
	}

	if (typeof value !== "string") {
		return undefined
	}

	const normalized = cleanScalar(value).toLowerCase()
	if (normalized === "true" || normalized === "1") {
		return true
	}

	if (normalized === "false" || normalized === "0") {
		return false
	}

	return undefined
}

const parse = (content: string): FrontmatterData => {
	const frontmatterMatch = content.match(/^\s*---\s*\r?\n([\s\S]*?)\r?\n---/)
	const frontmatterBody = frontmatterMatch?.[1]
	if (!frontmatterBody) {
		return {}
	}

	const metadata: FrontmatterData = {}
	const lines = frontmatterBody.split(/\r?\n/)

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		if (!line) {
			continue
		}

		if (!line.trim()) {
			continue
		}

		const keyValueMatch = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
		if (!keyValueMatch) {
			continue
		}

		const key = keyValueMatch[1]
		const rawValue = keyValueMatch[2]
		if (!key || rawValue === undefined) {
			continue
		}

		const normalizedKey = key.trim().toLowerCase()
		const normalizedValue = rawValue.trim()

		if (normalizedValue) {
			metadata[normalizedKey] = cleanScalar(normalizedValue)
			continue
		}

		const listItems: string[] = []
		for (let j = i + 1; j < lines.length; j++) {
			const listLine = lines[j]
			if (!listLine) {
				break
			}

			const listMatch = listLine.match(/^\s*-\s*(.+)$/)
			if (!listMatch) {
				break
			}

			const item = listMatch[1]
			if (!item) {
				continue
			}

			listItems.push(cleanScalar(item))
			i = j
		}

		metadata[normalizedKey] = listItems
	}

	return metadata
}

export class Frontmatter {
	private readonly metadata: FrontmatterData

	constructor(content: string) {
		this.metadata = parse(content)
	}

	public getData(): FrontmatterData {
		return this.metadata
	}

	public getString(key: string): string | undefined {
		const value = this.metadata[key.toLowerCase()]
		return typeof value === "string" ? value : undefined
	}

	public getList(key: string): string[] | undefined {
		const value = this.metadata[key.toLowerCase()]
		if (value === undefined) {
			return undefined
		}

		return parseList(value)
	}

	public getBoolean(key: string): boolean | undefined {
		const value = this.metadata[key.toLowerCase()]
		if (value === undefined) {
			return undefined
		}

		return parseBooleanLike(value)
	}
}
