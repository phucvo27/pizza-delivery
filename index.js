const { httpServer } = require('./app');


httpServer.listen(3000, 'localhost', ()=>{
    console.log('Server is listen at 3000..')
})