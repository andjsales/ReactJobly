const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve('process/browser'),
                    stream: require.resolve('stream-browserify'),
                    crypto: require.resolve('crypto-browserify'),
                    vm: require.resolve('vm-browserify'),

                }
            },
            plugins: [
                new webpack.ProvidePlugin({
                    process: 'process/browser'
                })
            ]
        }
    }
};
