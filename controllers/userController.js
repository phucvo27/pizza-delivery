const User = require('../models/User');
const _helper = require('../lib/helpers');

exports.post = async function(data, cb){
    try{
        const user = await User.create(data.payload);
        cb(null, {status: 'success', data: { user}});
        //_helper.sendResponse(null, user, null, cb);
    }catch(e){
        cb(400, {status: 'fail', message: e.message ? e.message : e});
        //_helper.sendResponse(400, null, e, cb);
    }
}

exports.get = async function(data, cb){
    try{
        const user = await User.findOne(data.queryObject.id);
        cb(null, {status: 'success', data: {user}})
    }catch(e){
        cb(400, {status: 'fail', message: e.message ? e.message : e})
    }
}


exports.patch = async function(data, cb){
    try{
        const newUser = await User.findAndUpdate(data.queryObject.id, data.payload);
        cb(null, {status: 'success', data: {newUser}})
    }catch(e){
        cb(400, {status: 'fail', message: e.message ? e.message : e})
    }
}

exports.delete = async (data, cb)=>{
    try{
        const user = await User.findAndRemove(data.queryObject.id);
        _helper.sendResponse(undefined, user, undefined, cb);
    }catch(e){
        //cb(400, {status: 'fail', message: e.message ? e.message : e});
        _helper.sendResponse(400, undefined, e, cb);
    }
}