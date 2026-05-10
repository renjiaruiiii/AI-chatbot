//环境变量声明文件

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // 在此处添加自定义环境变量的类型...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
