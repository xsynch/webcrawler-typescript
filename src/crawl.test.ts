import {expect, test} from 'vitest'
import { getURLsFromHTML, normalizeURL } from "./crawl";


test('strip start from url', () => {
    expect(normalizeURL("https://boot.dev")).toBe("boot.dev")
})

test('strip start and end from url', () => {
    expect(normalizeURL("https://boot.dev/whatever/")).toBe("boot.dev/whatever")
})

test('strip start and end from url', () => {
    expect(normalizeURL("https://blog.boot.dev/")).toBe("blog.boot.dev")
})

const htmlDoc = `<!DOCTYPE html><html><body><a href="index.html">link to index</a>this is some text
<a href="https://google.com">Google Link</a>Let's go back
<a href="/images/what.gif">Look at the images directory</a>
</body></html>`

test('get full URL from relative URL',() => {
    expect(getURLsFromHTML(htmlDoc,"https://boot.dev")).toStrictEqual(["https://boot.dev/index.html","https://google.com","https://boot.dev/images/what.gif"])
})