const fs = require('fs');
const axios = require('axios');

async function webCat(url) {
    let res = await axios.get(url); //issue here catching failed url errors, if the request fails node seems to automatically print res exit the process so I am unable to log the error
    if (res.status > 400) {
        console.log(`Error: Request failed with status code ${res.data.status}`);
        return 
    } 
    console.log(res.status)
}

function cat(path) {
    fs.readFile(path,'utf-8', (err,data) => {
        if (err) {
           console.log(err);
           process.exit(1); 
        }
        console.log(data);
        }
    )
}

function isURL(str) {
    return str.startsWith("http://") || str.startsWith("https://");
  }


if (isURL(process.argv[2])) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}

