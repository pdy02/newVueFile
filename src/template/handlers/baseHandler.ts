import { v2, v3 } from "..";
import { TUserConfig } from "../..";

/**
 * @description 基础模版处理器
 * @param config 用户配置
 * @param tmpType 用户选择的模版类型
 * @param next 下一步处理函数
 * @returns { string } 模版字符串
 */
export default function baseHandler(config: TUserConfig, tmpType: string, next: Function): string {    
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

    const isIncludeSass = tmpTypeArr.includes('sass') || tmpTypeArr.includes('scss');
    const styleType = isIncludeSass ? ' lang="scss"' 
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
    data(){
        return {
            
        }
    }
}
</script>

<style scoped ${styleType}>

</style>
`;
    }
    return tmp;
}