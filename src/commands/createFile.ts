import * as vscode from 'vscode';
import createOneFile from '../utils/createOneFile';
import { TUserConfig } from '..';
export default function(){
    return vscode.commands.registerCommand('newvuefile.createFile', async (...argn) => {
        console.log('命令参数列表:',argn);
        const path = argn[0].path;
        
        const config = vscode.workspace.getConfiguration('newvuefile') as unknown as TUserConfig;
        const fileTypes = config.createOtherFile.exts;
        const fileType = await vscode.window.showQuickPick(fileTypes, { placeHolder: '选择新建的文件类型！！' });
        if (fileType) {
            vscode.window.showInputBox({
                ignoreFocusOut: false, // 当焦点移动到编辑器的另一部分或另一个窗口时, 保持输入框打开
                prompt: `请输入.${fileType}文件名`, // 文本输入提示
            }).then(async value => {
                if(value === undefined) {
                    return;
                };
                if(!value || !value?.trim()) {
                    vscode.window.showErrorMessage("你输入的文件名无效");
                    return;
                };
                const uri = await createOneFile(path,value,fileType);

                await vscode.window.showTextDocument(uri);
            });
        }
    });
}