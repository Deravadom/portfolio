import { generatePath, PathParam } from "react-router"

export const capitalize = (word: string) =>
    `${word[0].toUpperCase()}${word.slice(1)}`

export const labelize = (word: string) =>
    word.split('_').map(capitalize).join(' ')

export const removePrefix = (words: string, delim: string | RegExp = ' ', join: string = ' ') => {
    const [_, ...items] = words.split(delim)
    return items.join(join)
}

export const routeName = () => {
    const actualPathname = window.location.pathname
    const pathname = actualPathname === "/" ? '' : actualPathname
    return capitalize(pathname)
}

export const appendUrl = (path: string, params?: { [key in PathParam<string>]: string | null; }) =>
    generatePath(window.location.pathname + path, params)

export default {}