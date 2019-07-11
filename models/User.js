const _helper = require('../lib/helpers');

class User {
    constructor(name, email, password, phone){
        this.name = name;
        this.email = email;
        this.password = _helper.hashPassword(password);
        this.phone = phone;
        this.orders = [];
    }
}


module.exports = User;