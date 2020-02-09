import BasicException from "../exception/BasicException";
import Axios from 'axios';

export default class HttpRequestUtil {
    constructor(){
        this.base_url = '';

        this.api_name = '';

        this.timeout = 3000;

        this.headers = {
            'Content-Type': 'application/json'
        };

        this.method = 'POST';

        this.body = {};

        this.response_callback = null;
    }

    setBaseUrl = (base_url) =>{
        this.base_url = base_url;
        return this;
    };

    setApiName = (api_name) =>{
        this.api_name = api_name;
        return this;
    };

    setTimeout = (timeout) =>{
        this.timeout = timeout;
        return this;
    };

    setPost = () =>{
        this.method = 'POST';
        return this;
    };

    setGET = () =>{
        this.method = 'GET';
        return this;
    };

    addHeader = (key, value) =>{
        this.headers[key] = value;
        return this;
    };

    setBody = (body) =>{
        this.body = body;
        return this;
    };

    setResponseCallBack = (response_callback) =>{
        this.response_callback = response_callback;
        return this;
    };

    sendRequest = async () =>{
        this.axios_api = Axios.create(this._getConfig());
        this._addRequestInterceptors();
        this._addResponseInterceptors();

        if (this.method.toUpperCase() === 'POST'){
            return await this.axios_api.post(this.api_name, this.body);
        }else {
            return await this.axios_api.get(this.api_name, this.body);
        }
    };

    _getConfig = () =>{
        return {
            baseURL:this.base_url,
            timeout:this.timeout,
            headers:this.headers
        };
    };

    _addRequestInterceptors = () =>{
        this.axios_api.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    };

    _addResponseInterceptors = () =>{
        this.axios_api.interceptors.response.use(
            (response) => {
                let result = response.data;

                if(this.response_callback){
                    this.response_callback(result);
                }

                return result;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    };
}