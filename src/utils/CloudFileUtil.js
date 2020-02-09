import HttpRequestUtil from "./HttpRequestUtil";

const uri = require('../config/uri');

export default class CloudFileUtil {
    constructor(uid){
        this.send_api = 'files/merge';

        this.uid = uid;
    }

    static getInstance(uid) {
        if (!this.instance) {
            this.instance = new CloudFileUtil(uid);
        }

        return this.instance;
    }


    fileMerge = async (files, scale = 4, width = 132) =>{
        let util = new HttpRequestUtil();
        return await util.setBaseUrl(uri.CLOUD_FILE)
            .setApiName(this.send_api)
            .setPost()
            .addHeader('X-Hylaa-UserId', this.uid)
            .setBody({
                body:{
                    file_urls: files,
                    scale: scale,
                    width: width
                }
            })
            .sendRequest();
    };

}