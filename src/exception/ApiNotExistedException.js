import BasicException from "./BasicException";


const code = require('./errorCode');

export default class ApiNotExistedException extends BasicException{
    constructor(){
        const message = 'Api Not Found';
        super(message, code.API_NOT_FOUND);
    }
}