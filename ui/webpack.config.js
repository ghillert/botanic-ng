var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var stylishReporter = require('jshint-loader-stylish')({
    // options...
});

var config = {
    entry: path.resolve(__dirname, 'src/app/index.module.js'),
    output: {
        path: path.resolve(__dirname, '../src/main/resources/public'),
        filename: 'bundle.js',
    },
    resolve: {
        alias: {
            "eventEmitter/EventEmitter": "wolfy87-eventemitter"
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            ON_TEST: process.env.NODE_ENV === 'test'
        }),
        new StatsPlugin('stats.json', {
            chunkModules: true,
            exclude: /node_modules/
        })
    ],

    node: {
        net: 'empty'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/, // include .js files
                exclude: /node_modules/, // exclude any and all files in the node_modules folder
                loader: "jshint-loader"
            }
        ],
        loaders: [
            { test: /\.css$/,      loader: 'style!css'},
            { test: /\.less$/,     loader: 'style!css!less'},
            { test: /\.js$/,       loader: 'ng-annotate', exclude: /node_modules/},
            { test: /\.js$/,       loader: 'babel', exclude: /node_modules/},
            { test: /\.html$/,     loader: 'html',        exclude: /index\.html/},
            { test: /jquery\.js$/, loader: 'expose?$' },
            { test: /jquery\.js$/, loader: 'expose?jQuery' },
            { test: /\.json$/,     loader: "json"},
            { test: /masonry-layout/, loader: 'imports?define=>false&this=>window'},
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=image/svg+xml"
            }, {
                test: /masonry-layout/,
                loader: 'imports?define=>false&this=>window'
            }
        ]
    },
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:9900',
                secure: false
            },
            '/websocketbroker/*': {
                target: 'http://localhost:9900',
                secure: false
            }
        },
    },
    // more options in the optional jshint object
    jshint: {
        // any jshint option http://www.jshint.com/docs/options/
        // i. e.
        camelcase: true,
        globals : {
            "angular" : false,
            "module" : false,
            "console" : false,
            "window" : false
        },
        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: false
        //reporter : stylishReporter
    }
};

if (process.env.NODE_ENV === 'production') {
    //config.output.path = __dirname + '/dist';
    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin(
        {
            compress: {
                warnings: false
            }
        }
    ));
    config.devtool = 'source-map';
}

module.exports = config;
