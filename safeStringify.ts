export function safeStringify(obj: any): string {
    const cache = new Set()
    return JSON.stringify(
      obj,
      (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.has(value)) {
            return
          }
          cache.add(value)
        }
        return value
      },
      2,
    )
  }
  