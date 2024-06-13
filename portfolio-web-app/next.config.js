const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /Cesium\/Workers\/.*\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
        type: 'javascript/auto',
      });

      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Workers'),
              to: path.join(__dirname, 'public/static/Cesium/Workers'),
            },
            {
              from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Assets'),
              to: path.join(__dirname, 'public/static/Cesium/Assets'),
            },
            {
              from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Widgets'),
              to: path.join(__dirname, 'public/static/Cesium/Widgets'),
            },
            {
              from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/ThirdParty'),
              to: path.join(__dirname, 'public/static/Cesium/ThirdParty'),
            },
          ],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
