const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'index_bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/, 
                exclude:/node_modules/, 
                loader:'babel-loader'
            },
            {
                test: /\.css$/i, 
                exclude:/node_modules/, 
                use:[
                    {
                        loader:'style-loader'
                    }, 
                    {
                        loader:'css-loader', 
                        // It is for using CSS modules, e.g., className = {Styles.pro}, when it is set true, the default mehtod className='pro' does not work
                        // options:{
                        //     modules: true}
                    }
                ]
            },
            {
                test:/\.(png|svg|jpg|gif|ico)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins:[
        new HtmlPlugin({template: './src/index.html', favicon:'./images/LP.ico'}),
        ],
    resolve:{
        extensions:['.js', '.jsx']
    }
}