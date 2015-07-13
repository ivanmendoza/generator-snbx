/*global module:false*/
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bump:{
			options:{
				files: 				['package.json'],
				updateConfigs: 		[],
				commit: 			true,
				commitMessage: 		'Release v%VERSION%',
				commitFiles: 		['-a'],
				createTag: 			true,
				tagName: 			'v%VERSION%',
				tagMessage: 		'Version %VERSION%',
				push: 				false,
				pushTo: 			'origin',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: 		false,
				prereleaseName: 	false,
				regExp: 			false
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-bump');
};