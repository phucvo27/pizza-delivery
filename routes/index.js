const user = require('./user');

const notFound = function(data, callback){
    callback(statusCode, {status: 'Error', message: 'This route still not defines'} )
}

const handlers = {
    "user": user,
    notFound 
};

module.exports = handlers;