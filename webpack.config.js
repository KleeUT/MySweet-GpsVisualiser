var webpack = require('webpack');
module.exports = {
    entry: [
      "./client/app.jsx"
    ],
    output: {
      path: __dirname + '/server/public/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['jsx-loader'], exclude: /node_modules/},
            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            { test: /\.ico$/,    loader: "file-loader" }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.ProvidePlugin({
         $: "jquery",
         jQuery: "jquery"
     })
   ],
   externals:{
     "google":"google",
     "io":"io",
     "React":"React",
     "ReactDom":"ReactDom"
   }

};
