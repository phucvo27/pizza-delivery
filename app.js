const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const _helper = require('./lib/helpers');
const routes = require('./routes/index');


const handlers = function(trimmedPath){
    if(trimmedPath.startsWith('public')){

    }else{
        return typeof routes[trimmedPath] !== 'undefined' ? routes[trimmedPath] : routes.notFound;
    }
}
const unifiedServer = (req, res)=>{
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const trimmedPath = pathname.replace(/^\/+|\/+$/i, "");
    const headers = req.headers;
    const queryObject = parsedUrl.query;
    const method = req.method.toLowerCase();
    const decoder = new StringDecoder('utf-8');
    let payload = '';

    req.on('data', chunk => {
        payload += decoder.write(chunk);
    });
    req.on('end', ()=>{
        payload += decoder.end();
        const data = {
            trimmedPath,
            headers,
            method,
            queryObject,
            payload: _helper.parseToObject(payload)
        }
        const choosenHandler = handlers(trimmedPath);
        choosenHandler(data, function(statusCode, response, contentType = 'application/json'){
            statusCode = typeof statusCode === 'number' ? statusCode : 200;
            response = typeof response === 'object' ? response : {};

            res.writeHead(statusCode, {
                'Content-type': contentType
            });
            res.end(JSON.stringify(response));
        })
        
    })
    

}

const httpServer = http.createServer(unifiedServer);

module.exports = { httpServer };