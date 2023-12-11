// 插件入口文件
//模块` vscode `包含了VS Code扩展API
//在下面的代码中导入模块并使用别名vscode引用它
import * as vscode from 'vscode';
import { createVueFile } from './commands';
//当你的扩展被激活时，这个方法会被调用
//你的扩展在第一次执行命令时被激活
export function activate(context: vscode.ExtensionContext) {

	const userSettings = vscode.workspace.getConfiguration();

	// 编辑器资源管理器的文件夹右键菜单
	// 点击'创建一个新的.vue文件', 触发的命令
	const addRigthMenuItem = createVueFile(userSettings);

	// context.subscriptions.push(disposable);
	context.subscriptions.push(addRigthMenuItem);
	// context.subscriptions.push(quickPick);
}

// This method is called when your extension is deactivated
export function deactivate() { }
