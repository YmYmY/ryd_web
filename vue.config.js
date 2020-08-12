const packageJson = require('./package.json');
const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const Timestamp = new Date().getTime();  //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
const timer = new Date().getDate()+"_"+new Date().getHours()+"_"+new Date().getMinutes();

module.exports = {
    publicPath: '/',
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: { 
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
            filename: debug?'[name].[hash].js':`[name].[chunkhash:8].V${packageJson.version}.T${timer}.js`,
            chunkFilename: debug?'[name].[hash].js':`[name].[chunkhash:8].V${packageJson.version}.T${timer}.js`
        },
        // externals:{
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex':'Vuex',
        //     "element-ui": "ELEMENT",
        //     'echarts': 'echarts',
        // },
        externals:{
            'vue': 'Vue',
            "element-ui": "ELEMENT",
        },
        // resolve: {
        //     alias: {
        //         '@': resolve('src')
        //     }
        // }
    },
    chainWebpack(config) {
        config.plugins.delete('preload') 
        config.plugins.delete('prefetch')  
    },
    css: { // 配置高于chainWebpack中关于css loader的配置
        // modules: true, // 是否开启支持‘foo.module.css’样式
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        sourceMap: false, // 是否在构建样式地图，false将提高构建速度
        loaderOptions: { // css预设器配置项
            sass: {
                data: `@import "@/static/css/global.scss";`
            }
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        inline: false,
        // hotOnly: false,
        proxy:{
            "/api":{
                target:"http://183.238.55.102:9090",//测试
                // target:"http://192.168.1.134:11002",//本地
                changeOrigin:true,//true为开启代理
                // secure: false, // 如果是https接口，需要配置这个参数
                pathRewrite:{
                    '^/api': '/'//路径的替换规则
                   /*
                    *这里的配置是正则表达式，以/api开头的路径将会被‘/'替换掉
                    *假如后台文档的接口是 "http://www.zhangpeiyue.com/user/add"
                    *前端调取API接口应写：axios.get('/api/user/add')
                    */
                }
            }
        },
        before: app => {}
    }
}
