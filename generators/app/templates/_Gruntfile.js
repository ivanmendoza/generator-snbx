/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
    less: {
	  production: {
	    options: {
	      paths: ["assets/css"]
	    },
	    files: {
	      "assets/<%= stylesheet_name %>.css": "<%= stylesheet_name %>.less"
	    }
	  }
	},
    watch: {
	    files: '<%= stylesheet_name %>.less',
	    tasks: ['less:production']
    },
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
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bump');
  
  grunt.registerTask('default', ['less']);

};
