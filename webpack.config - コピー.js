const path = require("path");
const webpack = require("webpack");

module.exports = (_, argv) => {
	const entryPath = path.join(__dirname, "src/index.ts");
	const package = require("./package.json");

	return {
		// we output both a minified version & a non minified version on production build
		entry: { "bundle": entryPath },
		output: {
			filename: `bundle.js`,
			path: path.join(__dirname, "dist"),
			library: "game",
			libraryTarget: "umd",
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					// we use babel-loader for polyfill only on production build
					loader: ["ts-loader"],
					exclude: [
						path.join(__dirname, "node_modules"),
						path.join(__dirname, "dist"),
						path.join(__dirname, "projects"),
						path.join(__dirname, "scenes"),
					],
				},
			],
		},
		resolve: {
			extensions: [".ts", ".js"],
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: `${package.name} ${package.version} ${new Date().toString()}`,
			}),
			new webpack.WatchIgnorePlugin([
				/\.js$/,
				/\.d\.ts$/
			]),
		],
		optimization: {
			minimize: false,
			usedExports: true,
		},
		devtool: "cheap-source-map",
	};
};