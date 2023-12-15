import { Ttmp } from "..";
import { TUserConfig } from "../..";
import { __TEMPLATETYPE__ } from "../../constants";
import { concatTemplate } from "../../utils";

/**
 * @description 默认模版处理器
 * @param config 用户配置
 * @param tmpType 用户选择的模版类型
 * @param next 下一步处理函数
 * @returns { string } 模版字符串
 */
export default function defaultHandler(config: TUserConfig, tmpType: Ttmp, next: Function): string{
    if(tmpType === __TEMPLATETYPE__){
        const defaultTemplate =  config.default.useSelectDefaultTemplate;
        return next(defaultTemplate);
    }
    return next();
};