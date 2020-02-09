export default class ArrayUtil {

    constructor(){
    }

    static chunkArray = (array, size) =>{
        let new_array = [];
        let length = array.length;
        let start = 0;
        let end = 0;

        while (start < length){
            end = start + size;
            if(end < length){
                new_array.push(array.slice(start, end));
            }else {
                new_array.push(array.slice(start));
            }

            start = end;
        }

        return new_array;
    };


    /**
     *  create object with index for a array
     * @param array
     * @param key
     */
    static getArrayRefer = (array, key) => {
        let res = {};

        array.forEach((item) => {
            res[item[key]] = item;
        });

        return res;
    };


    /**
     * get unique array
     * @param array
     * @returns {Array}
     */
    static arrayUnique = (array) => {
        let res = [];

        for (let item of array) {
            if (res.includes(item)) {
                continue
            }
            res.push(item);
        }

        return res;
    };

    /**
     * get unique array
     * @param list
     * @param key
     * @returns {Array}
     */
    static getKeysFromList = (list, key) => {
        if (!Array.isArray(list)){
            return [list[key]];
        }else{
        return list.map((item) => {
            return item[key];
        });
        }
    };

    /**
     * merge two array
     * @param array
     * @param another_array
     * @param is_unique
     * @returns {Array}
     */
    static mergeAndUniqueArray = (array, another_array, is_unique = true) => {
        let res = [];

        for (let item of array) {
            res.push(item);
        }

        for (let another_item of another_array) {
            if (is_unique && res.includes(another_item)) {
                continue;
            }
            res.push(another_item);
        }

        return res;
    };

    /**
     * get diff Element compare array to another_array
     * @param array
     * @param another_array
     * @returns {Array}
     */
    static arrayDiff = (array, another_array) => {
        let res = [];
        let refer = {};

        for (let another_item of another_array) {
            refer[another_item] = another_item;
        }

        for (let item of array) {
            if (!refer[item]) {
                res.push(item);
            }
        }

        return res;
    };

    /**
     * get intersect from two array
     * @param array
     * @param another_array
     * @returns {Array}
     */
    static arrayIntersect = (array, another_array) => {
        let res = [];

        for (let item of array) {
            if (another_array.includes(item)) {
                res.push(item);
            }
        }

        return res;
    };

    /**
     * get unique object list
     * @param array
     * @param key
     */
    static objectUnique = (array, key) => {
        let res = [];
        if (key) {
            let array_refer = ArrayUtil.getArrayRefer(array, key);
            for (let key in array_refer) {
                res.push(array_refer[key]);
            }
        }

        return res;
    };

}