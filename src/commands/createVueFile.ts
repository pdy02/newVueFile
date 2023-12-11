import * as vscode from 'vscode';
import { TextEncoder } from 'util';
// 导入预先定义的模版
import tmpMapFn, { Ttmp, v3_ts_sass } from '../template';
import { getValueParam, removeLastChar, ruleValue } from '../utils';
import { __TEMPLATETYPE__ } from '../constants';

/**
 * newvuefile.createVueFile命令
 */
export default function createVueFile(config: vscode.WorkspaceConfiguration):vscode.Disposable {
    return vscode.commands.registerCommand("newvuefile.createVueFile", async (folder) => {

		/**文件夹路径 */
		const FolderPath = folder.path;
		vscode.window.showInputBox({
            ignoreFocusOut: false, // 当焦点移动到编辑器的另一部分或另一个窗口时, 保持输入框打开
            prompt: "请输入vue文件名", // 文本输入提示
        }).then(async value => {
			/**value原始值(携带参数信息) */
			value;
			// 对 value 输入的内容进行错误拦截
			if (!value || !value?.trim()) {
                // vscode.window.showErrorMessage("你输入的文本无效");
                return;
            };
			/**预先保存的文件名 */
			const valueTrimCopy = value && removeLastChar(value?.trim());

			/**模版 */
			let tmp = '';
			/**编码器 */
			let encoder = new TextEncoder();
			if(ruleValue(value?.trim())) // 验证通过, 生成模版
			{
				// 从用户输入的value获取参数, 如果为空字符串, 则使用默认模板				
				const valueParam = (getValueParam(value) as string) || __TEMPLATETYPE__; 
				tmp = tmpMapFn(valueParam as Ttmp);
			}
			// encoder = new TextEncoder();


			// 新建一个文件
			const uri = vscode.Uri.file(`${FolderPath}/${valueTrimCopy}.vue`);
			await vscode.workspace.fs.writeFile(
				uri, 
				encoder!.encode(tmp) 
			);
			// tmp ? encoder!.encode(tmp) : new Uint8Array()
			
			const vueFileName = valueTrimCopy.trim();
			vscode.window.showInformationMessage(`${vueFileName}.vue文件创建成功!`);
			// 打开该文件
			await vscode.window.showTextDocument(uri);

        });
	});
}