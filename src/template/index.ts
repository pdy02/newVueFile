import * as vscode from 'vscode';
import { __TEMPLATETYPE__ } from "../constants";
import { concatTemplate } from '../utils';
const config = vscode.workspace.getConfiguration('newvuefile');
export const v3_ts_sass = `<template>
    <div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

</style>
`;

export const v3 = `<template>
    <div>

    </div>
</template>

<script setup>

</script>

<style scoped>

</style>
`;

export const v3_ts = `<template>
    <div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
`;

export const v2 = `<template>
    <div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>
`;

// 导出map映射
// const tmpMap = new Map();
// tmpMap.set('v3_ts_sass', v3_ts_sass);
// tmpMap.set('v2', v2);

export const tmps = ['v3-ts-sass', 'v3', 'v3-ts' ,'v2'] as const;
export type Ttmp = typeof __TEMPLATETYPE__ | typeof tmps[number];


/**
 * @description: 模版映射函数， 根据模版类型返回对应的模版
 * @param { Ttmp } tmpType: 模版类型
 * @returns { string } 模板字符串
 */
const tmpMapFn = (tmpType: Ttmp) => {
    // 默认模版处理(单个&符号时)
    const defaultTmp = tmpDefaultHandler(tmpType);
    if(defaultTmp){
        return defaultTmp.template;
    };

    // 自定义模版处理
    const customTmp = customTemplateHandler(tmpType);
    if(customTmp){
        return customTmp.template;
    };
    
    /**基础模版:v2选项式, v3组合式 */
    type Tv = 'v2' | 'v3';
    const v23 = {
        'v2':() =>{
            return v2;
        },
        'v3':() =>{
            return v3;
        },
    };
    if(tmpType in v23){
        return v23[tmpType as Tv]();
    }
    const tmpTypeArr = tmpType.split('-');

    const V = tmpTypeArr[0] as Tv; // v3 or v2
    let tmp = '';

    const styleType = tmpTypeArr.includes('sass') ? ' lang="scss"' 
    : tmpTypeArr.includes('less') ? ' lang="less"' : '';

    const scriptType = tmpTypeArr.includes('ts') ? ' lang="ts"' : '';

    const setupType = tmpTypeArr.includes('ns') ? '' : ' setup';
    if(V === 'v3'){
        tmp = `<template>
    <div>

    </div>
</template>

<script${setupType}${scriptType}>

</script>

<style scoped${styleType}>

</style>
    `;
    }else if(V === 'v2'){
        tmp = 
`<template>
    <div>

    </div>
</template>

<script ${scriptType}>
export default {
    
}
</script>

<style scoped ${styleType}>

</style>
`;
    }
    return tmp;
};

/**
 * @description: 默认模版处理函数
 */
const tmpDefaultHandler = (tmpType: Ttmp) => {
    if(tmpType === __TEMPLATETYPE__){
        const defaultTemplate =  config.default.template as string[];
        let tmp = concatTemplate(defaultTemplate);

        return {
            status: true,
            template: tmp, 
        };
    }
    return false;
};

const userCustomTmp = new Map();

/**
 * @description: 自定义模版处理函数
 */
const customTemplateHandler = (tmpType: Ttmp) => {
    if(userCustomTmp.has(tmpType)){
        return {
            status: true,
            template: userCustomTmp.get(tmpType),
        };
    }
    type TCustomTemplateItem = {
        name: string
        template: string[]
    };
    type TCustomTemplate = TCustomTemplateItem[];
    const custTmp = config.customTemplate as TCustomTemplate;
    const tmp = custTmp.find(item => {
        return item.name === tmpType;
    });
    if(tmp){
        const template = concatTemplate(tmp.template);
        userCustomTmp.set(tmp.name, template);
        return {
            status: true,
            template,
        };
    }

    return false;
};


export default tmpMapFn;