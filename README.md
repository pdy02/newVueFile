# 项目介绍
Learning for beginners
一款可以在文件夹右键**新建.vue后缀文件**的vscode插件.
新建时可以直接使用vue模版

# 项目结构
src<br>
├── extension.ts // 入口文件<br>
├── template<br>
│   ├── index.ts // 模版处理文件<br>
├── utils<br>
│   ├── index.ts // 工具函数库<br>
├── constants<br>
│   ├── index.ts // 常量定义<br>
├── commands<br>
│   ├── index.ts // 命令定义<br>

# 使用
在资源管理器中右键文件夹，选择`新建.vue文件`，输入文件名, 即可快速生成vue文件.自动添加.vue后缀.

## 扩展
- [x] 可在新建文件时,自动生成vue文件代码模版
- [x] 支持自定义模版

### 内置模版
在输入框中输入文件名, 使用`&`符号来添加参数.

如`home&v3-ts-sass`, 会在当前文件夹下生成`home.vue`文件, 并使用`v3-ts-sass`模版.
> v3是组合式api风格, v2则是选项式api风格



插件内置了v2和v3的模版, 和`-ts`、`-sass`、`-less`等语言风格的不同模板。可以自行搭配。
> **注意:** 如果使用**插件内置模版**, 前缀必须说明v2或者v3的. 不然是无效的内置模版(自定义模版优先级更高)
>
> **注意:**!!!!!v3的模版, 默认使用`setup语法糖`. 不需要添加`-setup`后缀.如果不需要`setup语法糖`, 请使用`-ns`, 表示v3模版不需要`setup语法糖`.

### 默认模版

可以指定默认模版.

直接使用`&`符号即可, 无需参数, 即可生成指定的模版.

插件默认模版是`v3-ts-sass`.可以通过`newvuefile.default.template`配置选项来修改默认模版.
示例:
```json
"newvuefile.default.template":[
    "<template>",
    "\t<div>",
    "\t",
    "\t</div>",
    "</template>",
    "\t",
    "<script lang=\"ts\">",
    "\t",
    "</script>",
    "\t",
    "<style scoped >",
    "</style>"
]
```

### 自定义模版

用户可以自定义模版, 通过`newvuefile.customTemplate`配置选项来配置自定义模版.

使用自己配置`&`参数, 使用自己特有风格的模版.

示例:
```json
"newvuefile.customTemplate":[
    {
        "name":"my",
        "template":[
            "<template>",
            "\t<main>",
            "\t",
            "\t</main>",
            "</template>",
            "\t",
            "<script setup lang=\"ts\">",
            "\t",
            "</script>",
            "\t",
            "<style scoped lang=\"scss\">",
            "</style>"
        ]
    }
] 
```
使用:`home&my`
