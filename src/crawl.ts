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
    const headers = response.headers;
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
