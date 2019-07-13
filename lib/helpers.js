const crypto = require('crypto');
const helpers = {};


helpers.hashPassword = function(str){
    if(typeof str === 'string' && str.length > 7){
        const hash = crypto.createHash('sha512').update(str).digest('hex');
        return hash;
    }else{
        return null;
    }
}

helpers.parseToObject = function(str){
    if(typeof str === 'string'){
        try{
            return JSON.parse(str);
        }catch(e){
            return null;
        }
    }else{
        return null;
    }
}

helpers.validatePhone = function(str){
    return typeof str === 'string' && str.length === 10;  
}

helpers.sendResponse = function(statusCode, data, msg = '', cb){
    const responseObject = {status: statusCode ? 'success' : 'fail'};
    if(msg.length === 0){
        responseObject.data = data;
    }else{
        responseObject.message = msg.message ? msg.message : msg;
    }
    cb(statusCode, responseObject);
    return;
}

module.exports = helpers;