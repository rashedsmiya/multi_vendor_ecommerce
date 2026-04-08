export function useT() {
    // For now, return the key as is. In the future, this could fetch translations based on locale
    return (key: string) => key;
}
