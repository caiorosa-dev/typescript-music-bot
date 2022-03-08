module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		],
		'@babel/preset-typescript'
	],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@config': './config/config.json',
					'@util': './src/utils',
					'@interface': './src/interfaces'
				}
			}
		]
	],
	ignore: ['**/*.spec.ts']
};
