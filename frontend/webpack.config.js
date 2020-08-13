const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'frontend/main.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'static'),
//     filename: 'frontend/main.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-env"],
//           },
//         },
//       },
//       {
//       test: /\.scss$/,
//       use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: 'css-loader'
//           },
//           {
//             loader: 'sass-loader',
//             options: {
//               sourceMap: true,
//               // options...
//             }
//           }
//         ]
//     }
//   ]
//   },
//   plugins: [
//     new MiniCssExtractPlugin(),
//   ]
// };