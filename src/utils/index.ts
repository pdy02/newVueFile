
/**
 * @description: 验证规则, 验证用户输入的值是否符合规则
 * @param {string | undefined} val : 用户输入的value值 
 * @returns { boolean }
 */
export const ruleValue = (val: string) => {
    // if (!val) {
    //     return false;
    // }
    // 只有一个&, 就是默认模版(v3_ts_sass)
    // if (val.split('').at(-1) === '&') {
    if (val.includes('&')) {
        return true;
    }
    return false;
};


/**
 * @description: 去除用户输入的文件名&符号后面的参数,以防带到文件名
 * @param {string} value : 用户输入的原始value值
 * @returns {string} : 返回去除&符号之后的value值
 */
export const removeLastChar = (value: string) => {
    const has = value && value?.includes('&');
    if(!has) {
        return value;
    };
    return value!.split('&')[0];
};

/**
 * @description: 获取用户输入的参数
 * @param { string } value : 用户输入的原始value值
 * @returns { string } : 返回去除&符号之后的value值
 */
export const getValueParam = (value: string) => {
    const originValue = value.split('&').at(-1);
    return originValue;
};

/**
 * @description: 把一个模版数组拼接成模版字符串
 * @param { string[] } templateArray: 模版数组
 * @returns { string } : 返回拼接好的模版字符串 
 */
export const concatTemplate = (templateArray: string[]) => {
    let tmp = '';
    for (const item of templateArray) {
        tmp += item + '\r\n';
    }
    return tmp;
};