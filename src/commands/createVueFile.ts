import * as vscode from 'vscode';
import { TextEncoder } from 'util';
// 导入预先定义的模版
import tmpMapFn, { Ttmp } from '../template';
import { getValueParam, removeLastChar, ruleValue } from '../utils';
import { __TEMPLATETYPE__ } from '../constants';
import { TUserConfig } from '..';

/**
 * newvuefile.createVueFile命令
 */
export default function createVueFile(config: vscode.WorkspaceConfiguration):vscode.Disposable {
    return vscode.commands.registerCommand("newvuefile.createVueFile", async (folder) => {

		/**文件夹路径 */
		let FolderPath:string;
		try {
			FolderPath = folder.path;
		} catch (error) {
			vscode.window.showErrorMessage("没有路径，不知道在哪创建！！！");
			return;
		}
		vscode.window.showInputBox({
            ignoreFocusOut: false, // 当焦点移动到编辑器的另一部分或另一个窗口时, 保持输入框打开
            prompt: "请输入vue文件名", // 文本输入提示
        }).then(async value => {
			/**value原始值(携带参数信息) */
			// 对 value 输入的内容进行错误拦截
			if (!value || !value?.trim() || !removeLastChar(value?.trim())) {
			// if (!ruleValue(value)) {
				vscode.window.showErrorMessage("你输入的文件名无效");
				return;
			};
				
			/**预先保存的文件名 */
			const valueTrimCopy = removeLastChar(value?.trim());


			/**模版 */
			let tmp = '';
			/**编码器 */
			let encoder = new TextEncoder();
			// if(ruleValue(value?.trim())) // 验证通过, 生成模版

			const config = vscode.workspace.getConfiguration('newvuefile') as unknown as TUserConfig;
			
			const hasInclude = value.trim().includes('&');
			if(hasInclude) // &验证通过, 生成模版
			{
				// 从用户输入的value获取参数, 如果为空字符串, 则使用默认模板				
				const valueParam = (getValueParam(value) as string) || __TEMPLATETYPE__; 
				// console.log('valueParam',valueParam);
				tmp = tmpMapFn(valueParam as Ttmp); // 通过参数, 获取模版
			}else{
				// 如果用户没有输入参数, 但是打开了自动使用默认模版
				if(config.default.autoUseDefaultTemplate){
					tmp = tmpMapFn(__TEMPLATETYPE__); // 自动使用默认模版;
				}
			}

			// 新建一个vue文件
			const uri = vscode.Uri.file(`${FolderPath}/${valueTrimCopy}.vue`);
			await vscode.workspace.fs.writeFile(
				uri, 
				encoder.encode(tmp)
			);
			// tmp ? encoder!.encode(tmp) : new Uint8Array()
			
			const vueFileName = valueTrimCopy.trim();
			vscode.window.showInformationMessage(`${vueFileName}.vue文件创建成功!`);
			// 打开该文件
			await vscode.window.showTextDocument(uri);

        });
	});
}