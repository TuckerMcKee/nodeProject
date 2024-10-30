const fs = require('fs');
const axios = require('axios');
let out = null;

function output(out, data) {
    if (out) {
        fs.writeFile(process.argv[3],data,'utf-8', err => {
            if (err) {
                console.log('ERROR:',err);
                process.kill(1);
            }
        })
        return
    }
    console.log(data)
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        output(out,response.data);
        return
    } catch (error) {
        console.error("Error fetching URL:", error);
        return null;
    }
}


function cat(path) {
    let readData = null;
    console.log(path)
    fs.readFile(path,'utf-8', (err,data) => {
        if (err) {
           console.log(err);
           process.kill(1); 
        }
        output(out,data);
        return
    }
    )
}

function isURL(str) {
    return str.startsWith("http://") || str.startsWith("https://");
  }


// if (isURL(process.argv[2])) {
//     webCat(process.argv[2]);
// }
// else {
//     cat(process.argv[2]);
// }

async function catWrite() {
    if (process.argv[2] === '--out') {
        out = true
        if (isURL(process.argv[4])) {
            webCat(process.argv[4]);
        }
        else {
            console.log('in cat with argv 3')
            cat(process.argv[4]);
        }
        return
    }
        if (isURL(process.argv[2])) {
            webCat(process.argv[2]);
        }
        else {
            cat(process.argv[2]);
        }      
}

catWrite();
