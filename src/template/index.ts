import { __TEMPLATETYPE__ } from "../constants";
import handlers from './handlers';

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

export const v2 = `<template>
    <div>

    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style scoped>

</style>
`;

const tmps = ['v3-ts-sass', 'v3', 'v3-ts' ,'v2'] as const;
export type Ttmp = typeof __TEMPLATETYPE__ | typeof tmps[number];

const tmpMapFn = (tmpType: Ttmp) => {
    // 模版参数处理器
    let tmp;
    try{
        tmp = handlers(tmpType);
    }catch(e){
        console.log('Error:handlers',e);
        return '';
    }
    return tmp;
};

export default tmpMapFn;