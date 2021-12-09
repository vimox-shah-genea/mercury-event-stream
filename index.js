process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require('axios');
const https = require('https')
const parseString = require('xml2js').parseString;


const agent = new https.Agent({
    rejectUnauthorized: false
  });

axios({
    method: "get",
    url: "https://192.168.2.69/PSIA/Metadata/stream",
    responseType: "stream", 
    httpsAgent: agent,
    auth: { username: 'qwerty', password: 'shah2021' },
}).then(function (response) {
    response.data.on('data', (chunk) => {
        const lines = chunk.toString().split('\n');
        for(let i=0; i<lines.length; i++) {
            const line = lines[i];
            if(line.includes('<?xml')) {
                console.log(line)
                parseString(line, function (err, result) {
                    console.log(JSON.stringify(result));
                });
            }
        }
        
        });

    response.data.on('end', () => {
        console.log("READ STREAM END");
        });
    
    response.data.on('close', () => {
    console.log("READ STREAM CLOSE");
    });
    
    response.data.on('error', (error) => {
    console.error("READ STREAM ERROR", error);
    });
    // response.data.pipe(fs.createWriteStream("./my.txt"));
}).catch(function (error) {
    console.log(error);
  });
