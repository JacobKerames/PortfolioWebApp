const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Handle Cesium worker files as ES modules
      config.module.rules.push({
        test: /Cesium\/Workers\/.*\.js$/,
        type: 'javascript/auto',
      });

      // Add plugins to copy Cesium assets to the public directory
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

      // Custom Terser configuration to avoid minifying Cesium workers
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: true,
            mangle: true,
            keep_classnames: true,
            keep_fnames: true,
            module: true,
            toplevel: true,
          },
          exclude: /node_modules\/cesium\/Build\/Cesium\/Workers/,
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
