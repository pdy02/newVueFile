import { TUserConfig } from "../..";
import { concatTemplate } from "../../utils";

/**
 * @description 自定义模版处理器
 * @param config 用户配置
 * @param tmpType 用户选择的模版类型
 * @param next 下一步处理函数
 * @returns { string } 模版字符串
 */
export default function customTemplateHandler(config: TUserConfig, tmpType: string, next: Function): string {
    const custTmp = config.customTemplate;
    const tmp = custTmp.find(item => {
        return item.name === tmpType;
    });
    if(tmp){
        return concatTemplate(tmp.template);
    }
    return next(tmpType);
}