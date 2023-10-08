export const api_url = "http://localhost:3001"

export function url(path: string) {
    console.log('api-url', api_url + path)
    return api_url + path
}