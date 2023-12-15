import * as vscode from 'vscode';
/**
 * @description 错误消息提示
 * @param { string } msg 
 */
export const errMsg = (msg: string) => {
    vscode.window.showErrorMessage(msg);
};