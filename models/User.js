const _helper = require('../lib/helpers');
const file = require('../lib/file');

class User {

    static create(data){
        const user = User.filterBody(data,false ,'name', 'email', 'password', 'phone');
        if(user){
            user._id = _helper.hashPassword(user.email);
            user.password = _helper.hashPassword(user.password)
            return new Promise(function(resolve, reject){
                file.create('users', user._id, user, function(err){
                    if(!err){
                        resolve(user);
                    }else{
                        reject(err)
                    }
                })
            });
        }else{
            throw new Error('Missing required field')
        }
    }
    static filterBody(body, isUpdate, ...acceptField){
        const result = {};
        if(!isUpdate){
            for(let i = 0; i < acceptField.length; i++){
                if(body[acceptField[i]]){
                    result[acceptField[i]] = body[acceptField[i]]
                }else{
                    return false;
                }
            }
            return result;
        }else{
            acceptField.forEach(el => body[el] && (result[el] = body[el]))
            return result;
        }
        
    }
    
    static findOne(id){
        return new Promise((resolve, reject)=>{
            file.read('users', id, (err, data)=>{
                if(!err){
                    resolve(data);
                }else{
                    reject(err)
                }
            })
        })
    }

    static findAndUpdate(id, data){
        const newUser = User.filterBody(data, true,'name', 'email', 'password', 'phone');
        return new Promise((resolve, reject)=>{
            file.read('users', id, function(err, oldUser){
                if(!err && oldUser){
                    console.log()
                    file.update('users', id, {...oldUser, ...newUser}, function(err){
                        if(!err){
                            resolve({...oldUser, ...newUser})
                        }else{
                            reject('Could not update user')
                        }
                    })
                }else{
                    reject('The user is not exist')
                }
            })
        })
    }

    constructor(name, email, password, phone){
        this._id = _helper.hashPassword(email);
        this.name = name;
        this.email = email;
        this.password = _helper.hashPassword(password);
        this.phone = phone;
        this.orders = [];
    }

    save(){
        const user = this
        return new Promise(function(resolve, reject){
            file.create('users', user._id, user, function(err){
                if(!err){
                    resolve(user);
                }else{
                    reject(err)
                }
            })
        });
    }

    
}


module.exports = User;