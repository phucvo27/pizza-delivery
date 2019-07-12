const userController = require('../controllers/userController');


const user = (data, cb)=>{
    const acceptableMethod = ['post', 'get', 'patch', 'delete'];
    if(acceptableMethod.indexOf(data.method) > -1){
        userController[data.method](data , cb);
    }else{
        cb(500, {status: 'Error', message: 'Invalid Method'})
    }
}



module.exports = user;