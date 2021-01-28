var HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './client/scripts/app.js',
	image: './client/scripts/image.js',
	sw: './client/sw.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
	  template: './client/index.html',
	  favicon: "./client/favicon.ico"
	}),
	new copyWebpackPlugin(
		{
			patterns: [
				{ from: 'client/assets', to: 'assets'},
				{ from: 'client/styles', to: 'styles'},
				{ from: 'client/manifest.json', to: 'manifest.json'}
			]	
		},
	)
  ],
};
