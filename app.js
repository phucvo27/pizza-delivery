const http = require('http');
const url = require('url');


const unifiedServer = (req, res)=>{
    res.end("Hello from node")
}

const httpServer = http.createServer(unifiedServer);

module.exports = { httpServer };