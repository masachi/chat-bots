import HttpRequestUtil from "./HttpRequestUtil";
import BasicException from "../exception/BasicException";

const uri = require('../config/uri');

export default class CallbackUtil {
    constructor(){
        this.record_callback_uri = 'internal/recorded/callback';

        this.online_callback_uri = 'internal/user/online';

        this.offline_callback_uri = 'internal/user/offline';
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new CallbackUtil();
        }

        return this.instance;
    }

    sendRecordCallback = async (conversation, record) =>{
        let body = {
            body:{
                conversation_id: conversation.id,
                refer_id: record.refer_id,
                refer_type: record.refer_type,
                subject: record.subject,
                messages: record.messages,
                created_by: record.created_by,
                create_time: record.create_time,
                update_time: record.update_time
            }
        };

        let util = new HttpRequestUtil();
        let result = await util.setBaseUrl(uri.PARETO_BACKEND)
            .setApiName(this.record_callback_uri)
            .setPost()
            .setBody(body)
            .setResponseCallBack(this._validateResponse)
            .sendRequest();

        return result.body;
    };

    sendOnlineCallback = async (user_id) =>{
        let util = new HttpRequestUtil();
        let result = await util.setBaseUrl(uri.PARETO_BACKEND)
            .setApiName(this.online_callback_uri)
            .setPost()
            .addHeader('X-Hylaa-UserId', user_id)
            .setBody({body:{}})
            .setResponseCallBack(this._validateResponse)
            .sendRequest();

        return result.body;
    };

    sendOfflineCallback = async (user_id) =>{
        let util = new HttpRequestUtil();
        let result = await util.setBaseUrl(uri.PARETO_BACKEND)
            .setApiName(this.offline_callback_uri)
            .setPost()
            .addHeader('X-Hylaa-UserId', user_id)
            .setBody({body:{}})
            .setResponseCallBack(this._validateResponse)
            .sendRequest();

        return result.body;
    };

    _validateResponse = (response) =>{
        if (response.code !== 200){
            throw new BasicException(response.message, response.code);
        }
    }

}