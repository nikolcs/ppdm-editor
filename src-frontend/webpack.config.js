const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
filename: "./index.html"
});
module.exports = {
    mode: "development",
    devServer: {
        inline:true,
        port: 9000
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]'
                        }
                    }
                },
                'sass-loader'
            ],
        },
        {
            test: /\.svg$/,
            loader: 'svg-url-loader'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            // loader: 'file-loader', webpack recommend file-loader to load fonts, but warning message appears when loading them in demo part!
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                publicPath: '../fonts/'
            }
        },
        {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        quality: 85,
                        esModule: false,
                    }
                }
            ]
        },
    ]},
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    plugins: [htmlPlugin]
};