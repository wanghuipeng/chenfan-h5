// 参考文档地址：https://cli.vuejs.org/zh/config/
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
console.log('当前环境', process.env.NODE_ENV)
module.exports = {
    // alias 配置
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境(开启gzip压缩)
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]', // 提示示compression-webpack-plugin@3.0.0的话asset改为filename
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            // 返回一个将会被合并的对象
            return {
                optimization: {
                    minimizer: [
                        new TerserPlugin({
                            sourceMap: false,
                            terserOptions: {
                                compress: {
                                    drop_console: true
                                }
                            }
                        })
                    ]
                }
            }
        } else {
            // 开发环境

        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    // 把px单位换算成rem单位
                    require('postcss-pxtorem')({
                        rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
                        // selectorBlackList: ['.van'], // 要忽略的选择器并保留为px。
                        propList: ['*'], // 可以从px更改为rem的属性。
                        minPixelValue: 2 // 设置要替换的最小像素值。
                    })
                ]
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    outputDir: 'dist',
    assetsDir: '',
    indexPath: 'index.html',
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: false,
    integrity: false,
    devServer: {
        port: 8091,
        proxy: {
            '/api': {
                // target: 'https://h.dalieyingcai.com', // prod
                target: 'http://c.hhd.dalie.zpstar.com', // test
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        // 显示警告和错误
        overlay: {
            warnings: true,
            errors: true
        },
        // 自动打开浏览器
        open: true,
        disableHostCheck: true
    }
}