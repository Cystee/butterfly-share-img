const path = require('path')
module.exports = {
    mode: 'production', // 模式，有两个值可选 production(生产) 和 development(开发)
    entry: './post.raw.js',
    // entry: path.resolve(__dirname, 'src/main.js'), // 入口
    // 出口
    output: {
        // 路径必须是绝对路径
        path: path.resolve(__dirname, 'dist'),
        // 在该路径下输出什么文件名
        filename: 'post.js',
        asyncChunks: true,
        // chunkFilename: '[name].js',
        clean: true // 先清空 dist，然后再输出最新内容
    },
}
