const configModules = import.meta.glob<Record<string, unknown>>(
    '../assets/config/*.json',
    { eager: true, import: 'default' }
)

const merged: Record<string, unknown> = {}
for (const mod of Object.values(configModules)) {
    Object.assign(merged, mod)
}

export const useConfig = () => {

    const get = <T = unknown>(key: string, defaultValue?: T): T | undefined => {
        const parts = key.split('.')
        let current: unknown = merged
        for (const part of parts) {
            if (current == null || typeof current !== 'object') return defaultValue
            current = (current as Record<string, unknown>)[part]
        }
        if (current === undefined) return defaultValue
        return current as T
    }

    const getString = (key: string, defaultValue?: string): string | undefined => {
        const value = get(key)
        if (value === undefined) return defaultValue
        return String(value)
    }

    const getBoolean = (key: string, defaultValue?: boolean): boolean | undefined => {
        const value = get(key)
        if (value === undefined) return defaultValue
        if (typeof value === 'boolean') return value
        return value === 'true'
    }

    const getList = (key: string, defaultValue?: string[]): string[] | undefined => {
        const value = get(key)
        if (value === undefined) return defaultValue
        if (Array.isArray(value)) return value.map(String)
        if (typeof value === 'string') return value.split(';').map(s => s.trim()).filter(s => s.length > 0)
        return defaultValue
    }

    return { get, getString, getBoolean, getList }
}