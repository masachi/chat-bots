const uuid = require('uuid');

export default class StrUtil {
    constructor(){
    }

    static encodeUnicode = (str) =>{
        if (typeof str !== 'string'){
            return str;
        }

        let value='';
        for (let i = 0; i < str.length; i++) {
            if (!str[i].match('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])')){
                value += str[i];
            } else {
                value += '\\u' + StrUtil.left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
            }

        }
        return value;
    };

    static decodeUnicode = (str) =>{
        if(!str){
            return '';
        }

        if (typeof str !== 'string'){
            return str;
        }

        let len = 1;
        let result = '';

        for (let i = 0; i < str.length; i=i+len) {
            len = 1;
            let temp = str.charAt(i);
            if(temp === '\\'){
                if(str.charAt(i+1) === 'u'){
                    let unicode = str.substr((i+2),4);
                    result += String.fromCharCode(parseInt(unicode,16).toString(10));
                    len = 6;
                }
                else{
                    result += temp;
                }
            }
            else{
                result += temp;
            }
        }
        return result;
    };

    static unicode = (str, only_chinese = true) =>{
        let value='';
        for (let i = 0; i < str.length; i++) {
            if (only_chinese && !str[i].match('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])')){
                value += str[i];
            } else {
                value += '\\u' + StrUtil.left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
            }

        }
        return value;
    };

    static reconvert = (str) =>{
        if(!str){
            return '';
        }
        str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
            return (String.fromCharCode(parseInt((encodeURIComponent($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
        });
        str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
            return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
        });
        str = str.replace(/(&#)(\d{1,6});/gi,function($0){
            return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
        });

        return str;
    };

    static left_zero_4 = (str) =>{
        if (str !== null && str !== '' && str !== 'undefined') {
            if (str.length === 2) {
                return '00' + str;
            }
        }
        return str;
    };

    static generateMessageId = () => {
        return uuid();
    };

    static generateId = () => {
        return uuid().replace(/-/g, "");
    };
}