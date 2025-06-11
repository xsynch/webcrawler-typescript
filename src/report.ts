export function printReport(baseURL: string, pages: Record<string,number>[]){
    console.log(`=============================
                 REPORT for ${baseURL}
                 =============================`)
    for (const key in sortPages(pages)){
        console.log(`Found ${pages[key]} internal links to ${key}`)
    }
}

function sortPages(pages: Record<string,number>[]) {
    return pages;

}