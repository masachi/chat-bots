export default class BasicException extends Error{
    constructor(message, code = 500, body = {}){
        super(message);
        this.code = code;
        this.body = body;
        this.customer = true;
    }
}