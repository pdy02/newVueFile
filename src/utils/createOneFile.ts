import * as vscode from 'vscode';
/**
 * 接收一个后缀名,生成一个文件
 * @param path 文件生成路径
 * @param filename 文件名
 * @param ext 文件后缀名
 */
export default async function (path: string, filename: string,ext: string) {
    // 新建一个文件
    const uri = vscode.Uri.file(`${path}/${filename}.${ext}`);
    try{
        await vscode.workspace.fs.stat(uri); // 如果文件不存在, 则抛出异常
        vscode.window.showErrorMessage("文件已存在");
    }
    catch(e){
        // 文件不存在, 创建文件
        await vscode.workspace.fs.writeFile(
            uri,
            new TextEncoder().encode(``)
        );
    }
    return uri;
}