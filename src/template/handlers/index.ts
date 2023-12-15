import defaultHandler from "./defaultHandler";
import customTemplateHandler from "./customTemplateHandler";
import { TUserConfig } from "../..";
import * as vscode from 'vscode';
import baseHandler from "./baseHandler";
import { Ttmp } from "..";

const handlersFn = [defaultHandler, customTemplateHandler];
handlersFn.push(baseHandler);


function handlers(tmpType: Ttmp){
    const config = vscode.workspace.getConfiguration('newvuefile') as unknown as TUserConfig;
    let __index = 0;
    // 这里传入的tmpType是上一个处理器处理后的模版类型. 可选
    const next = (prevHandlerFnOfTmpType?: Ttmp) => {
        const curHandlerFn= handlersFn[++__index];
        if(curHandlerFn === undefined){
            throw new Error('没有更多的处理器了');
        }
        prevHandlerFnOfTmpType = prevHandlerFnOfTmpType || tmpType;
        return curHandlerFn(config, prevHandlerFnOfTmpType, next);
    };

    // 这时候传入的tmpType是一个原始的模版类型. 
    const tmp = handlersFn[__index](config, tmpType, next);
    return tmp;
}

export default handlers;