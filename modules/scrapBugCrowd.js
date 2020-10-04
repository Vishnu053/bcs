var scraper = require('table-scraper')
const prompt = require("prompt");
let url = "";
let outputFile = "";
const properties = [
    {
        name: "targetname",
    },
    {
        name: "filename",
    },
];

prompt.start();
prompt.get(properties, function (err, result) {
    if (err) {
        return onPromptErr(err);
    }
    outputFile = result.filename;
    url = result.targetname;
    if (url) {
        console.log("  Target: https://bugcrowd.com/" + url);
        console.log("Fetching data...")
        startScrape()
    }
});


function onPromptErr(err) {
    console.log(err);
    return 1;
}

function startScrape() {
    scraper
        .get('https://bugcrowd.com/' + url)
        .then(res => {
            console.log(res);
            writeToFile(JSON.stringify(res))
        })
        .catch(e => console.log(e))
}

function writeToFile(w) {
    var fs = require("fs");
    fs.appendFileSync(
      "./outputs/" + outputFile + ".json\n",
      w,
      "UTF-8",
      { flags: "a" },
      function (err) {
        if (err) {
          return console.log(err);
        }
  
        console.log("Added " + w);
      }
    );
  }