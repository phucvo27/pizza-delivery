const User = require('../models/User');

exports.post = async function(data, cb){
    try{
        const user = await User.create(data.payload);
        cb(null, {status: 'success', data: { user}})
    }catch(e){
        cb(400, {status: 'fail', message: e.message ? e.message : e})
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

