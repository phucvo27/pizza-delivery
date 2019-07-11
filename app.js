const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const _helpder = require('./lib/helpers');

console.log(_helpder.hashPassword('abc123459'));

const unifiedServer = (req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const trimmedPathname = pathname.replace(/^\/+|\/+$/i, "");
    const headers = req.headers;
    const queryObject = parsedUrl.query;

    const decoder = new StringDecoder('utf-8');
    let payload = '';

    req.on('data', chunk => {
        payload += decoder.write(chunk);
    });
    req.on('end', ()=>{
        payload += decoder.end();
        console.log(`Headers is : ${headers}, and trimmedPath is :${trimmedPathname}`);
        console.log(`queryObject is : ${JSON.stringify(queryObject)}`);

        res.end("done \n")
    })
    

}

const httpServer = http.createServer(unifiedServer);

module.exports = { httpServer };