const { httpServer } = require('./app');
const config = require('./config/enviroment');


const PORT = config.httpPort;

httpServer.listen(PORT, 'localhost', ()=>{
    console.log(`Server is listen at ${PORT}..`)
})