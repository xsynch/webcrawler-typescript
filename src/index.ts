import { crawlPage, getHTML } from "./crawl";

async function main(){
    if (process.argv.length != 3){
        process.exit('1');
    }
    let baseURL = process.argv[2];
    const results =  await crawlPage(baseURL);
    console.log(results);
    process.exit(0);
    

}

main();