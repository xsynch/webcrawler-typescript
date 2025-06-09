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