const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:'user-api',
        description: 'user-api'
    },
    host:'localhost:8080',
    schemes:['https','http'],
    basePath: '/',
}
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/contacts.js'];
swaggerAutogen (outputFile, endpointsFiles, doc);