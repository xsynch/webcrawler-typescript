import { link } from 'fs';
import {JSDOM } from 'jsdom'



export function normalizeURL(url:string): string{
    let newURL = new URL(url)
    
    return `${newURL.hostname}${newURL.pathname.replace(/\/$/,'')}`;
}


export function getURLsFromHTML(html: string, baseURL: string){
    let linksInPage: string[] = [];
    let urlDOM = new JSDOM(html);
    let links = urlDOM.window.document.querySelectorAll('a');
    if (links){
        for (let l of links){
            if (l.href.startsWith("/")){
                l.href = `${baseURL}${l.href}`
            }
            else if (!l.href.startsWith("http")){
                l.href = `${baseURL}/${l.href}`
            }
            linksInPage.push(l.href.replace(/\/$/,''));
        }
    }
    return linksInPage;

}

export async function getHTML(url: string){
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    // const headers = response.headers;
    const pageType = response.headers.get('content-type')
    if (!pageType || !pageType.startsWith('text/html')){
        throw new Error(`Content type is not html: ${pageType}`)
    }

    const body = await response.text();
    
    return body;
  } catch (error) {
    return error;
  }
}

export async function crawlPage(  baseURL: string,  currentURL: string = baseURL,  pages: Record<string, number> = {},){
    let current = new URL(currentURL);
    let base = new URL(baseURL)
    
    if (current.hostname != base.hostname){
        return pages;
    }
    let normalizedCurrentURL = normalizeURL(currentURL);
    if (normalizedCurrentURL in pages){
        pages[normalizedCurrentURL] += 1;
        return pages;
    } else {
        pages[normalizedCurrentURL] = 1;
    }
    let currentHTML =  await getHTML(currentURL);
    console.log(currentURL);
    if (typeof(currentHTML) === 'string') {
        const links = getURLsFromHTML(currentHTML,currentURL)
        
        for (let l of links){
            
            let result = await crawlPage(baseURL,l,pages)
            // for (const key in result){
            //     const value = result[key];
            //     if (key in pages) {
            //         pages[key] += value;
            //     } else {
            //         pages[key] = value;
            //     }
            // }
          
        }
    }
    return pages;
    
}
