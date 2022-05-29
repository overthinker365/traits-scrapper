/********************************* 
 * 
 * TRAITS SCRAPPER BY OVERTHINKER 
 * 
 * ********************************/

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const folderName ='jsonfiles';

if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

  (async () => {
    //input collection size
    const qty = 9999; 
    //input Base URI of collection's IPFS. The defeault URI below belongs to Bored Ape Yacht Club
    //note, this scrapper will only work if the metadata identifier increments by running number
    const baseURI = "https://opensea.mypinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/"; 
    

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    for (let counter = 0; counter < qty; counter++) {
        const URI = baseURI + counter;
        const response = await page.goto(URI);

        await page.content(); 

        let jsonDetails = await page.evaluate(() =>  {
            return JSON.parse(document.querySelector("body").innerText); 
        }); 

        console.log("innerText now contains the JSON");
        console.log(jsonDetails);

        const fileName = counter + ".json";
        const filePath = path.resolve(__dirname, folderName, fileName);
       
        fs.writeFile(filePath, JSON.stringify(jsonDetails,null,2), (err) => {
            if (err)
              console.log(err);
            else {
              console.log("File written successfully\n");
            }
          });

    }
    await browser.close();

  })();