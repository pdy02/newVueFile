// import * as vscode from 'vscode';
import { Ttmp } from './template';

declare type TUserConfig = {
    default:{
        template: string[]
        useSelectDefaultTemplate: string
        autoUseDefaultTemplate: boolean
    }
    customTemplate: {
        name: string
        template: string[]
    }[]
};


// vscode.WorkspaceConfiguration
// declare type TUserConfigWorkspace = vscode.WorkspaceConfiguration & TUserConfig;
// declare type TUserConfigWorkspace = TUserConfig;