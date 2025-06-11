export function printReport(baseURL: string, pages: Record<string,number>){
    const url = new URL(baseURL)
    const proto = url.protocol;
    console.log(`=============================
                 REPORT for ${baseURL}
                 =============================`)
    for (const key in sortPages(pages)){
        console.log(`Found ${pages[key]} internal links to ${proto}//${key}`)
    }
}

export function sortPages(pages: Record<string,number>) {
    let sortedPages: Record<string,number> = {}
    const sortedKeys = Object.keys(pages).sort((a,b) => {
        if(pages[b] < pages[a]) return -1;
        if(pages[a] > pages[b]) return 1;
        return 0;
    });
    for (const l of sortedKeys){
        sortedPages[l] = pages[l]
    }
    // console.log(sortedPages)
    return sortedPages;

}