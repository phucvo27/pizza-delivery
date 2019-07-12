const fs = require('fs');
const path = require('path');
const _helper = require('./helpers');

const basePath = path.join(__dirname, '..' ,'.data');

const file = {};
// the callback function accept 2 argument : 
//  First : Error -> string
//  Second ( optional ): return data if reading

file.create = function(dir, filename, data, callback){
    fs.open(`${basePath}/${dir}/${filename}.json`, 'wx', function(err, fd){
        if(!err && fd){
            fs.writeFile(fd , JSON.stringify(data), function(err){
                if(!err){
                    fs.close(fd, function(err){
                        if(!err){
                            callback(null);
                        }else{
                            callback('Could not closing file');
                        }
                    })
                }else{
                    callback('Could not write new content file');
                }
            })
        }else {
            callback('Could not open for writing file. Or file is already exist');
        }
    })
}

file.read = function(dir, filename, callback){
    fs.open(`${basePath}/${dir}/${filename}.json`, 'r', function(err, fd){
        if(!err && fd){
            fs.readFile(fd ,'utf-8',function(err, data){
                if(!err){
                    const result = _helper.parseToObject(data);
                    callback(null, result)
                }else{
                    callback('Could not read the file')
                }
            })
        }else{
            callback('The file does not exist')
        }
    })
}

file.update = function(dir, filename, data, callback){
    fs.open(`${basePath}/${dir}/${filename}.json`, 'r+', function(err, fd){
        if(!err && fd){
            // override the old content
            fs.ftruncate(fd, 0, function(err){
                if(!err){
                    fs.writeFile(fd, JSON.stringify(data), function(err){
                        if(!err){
                            fs.close(fd, function(err){
                                if(!err){
                                    callback(null);
                                }else{
                                    callback('Error when closing file')
                                }
                            })
                        }else{
                            callback('Could not write new content')
                        }
                    })
                }else{
                    callback('Error when truncating the file')
                }
            })
        }else{
            callback('Could not find the file')
        }
    })
}


file.delete = function(dir, filename, callback){
    fs.unlink(`${basePath}/${dir}/${filename}.json`, function(err){
        if(!err){
            callback(null);
        }else{
            callback('Could not find the file')
        }
    })
}

module.exports = file;