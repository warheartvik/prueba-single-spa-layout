const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv) => {
  const orgName = "quipubyteltda";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
  });

  return webpackMerge.smart(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        { parser: { system: false } },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        }
      ]
    },    
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
          orgName,
        },
      }),
    ],
    externals: [
      'single-spa',
      'vue',
      'vue-router'
    ]    
  });
};

// const path = require('path');
// const Dotenv = require('dotenv-webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {
//   CleanWebpackPlugin,
// } = require('clean-webpack-plugin');

// module.exports = env => ({
//   entry: {
//     'main': path.resolve(__dirname, 'main'),
//   },
//   output: {
//     filename: '[name].js',
//     libraryTarget: 'system',
//     path: path.resolve(__dirname, 'dist')
//   },
//   devtool: 'sourcemap',
//   module: {
//     rules: [
//       { parser: { system: false } },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [{ loader: 'babel-loader' }]
//       }
//     ]
//   },
//   devServer: {
//     port: 5000,
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     },
//     disableHostCheck: true,
//     historyApiFallback: true
//   },
//   plugins: [
//     new Dotenv({
//       path: path.resolve(__dirname, './.env')
//     }),
//     new HtmlWebpackPlugin({
//       inject: false,
//       template: 'src/index.ejs',
//       templateParameters: {
//         isLocal: env && env.isLocal
//       }
//     }),
//     new CleanWebpackPlugin()
//   ],
//   externals: [
//     'single-spa',
//     'vue',
//     'vue-router'
//   ]
// });