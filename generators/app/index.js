'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('SNBX') + ' generator!'
    ));

    var prompts = [{
        name: 'project_title',
        message: 'Write the project title',
        default: 'My web page'
    },{
        name: 'project_name',
        message: 'Write the project id (like a name without spaces ej:mywebpage)',
        default: 'mywebpage'
    },{
        name: 'stylesheet_name',
        message: 'Write a name for your main stylesheet',
        default: 'style'
    },{
      type: 'list',
      name: 'grid_system',
      message: 'Which grid system want to use?',
      default: 0,
      choices: [
      	{name: "16 columns desktop / 6 mobile", value: "16"},
      	{name: "12 columns desktop / 4 mobile", value: "12"},
      	{name: "None", value: "0"}
      ]
    },{
      type: 'list',
      name: 'js_type',
      message: 'Do you want include Javascript features?',
      default: 1,
      choices: [
      	{name: "Yes, only SNBX features", value: "1"},
      	{name: "Yes, SNBX features + jQuery", value: "2"},
      	{name: "No", value: "0"}
      ]
    },{
        type: 'confirm',
        name: 'ie_compatibility',
        message: 'Would you like add compatibility for IE8-9?',
        default: "Y"
    },{
      type: 'checkbox',
      name: 'addons',
      message: 'Which addons do you want to install?',
      choices: [
      	{name: "Flexkit: Mixin to add Flexbox support", value: "flexkit"}, 
      	{name: "FormsX: Mixin to improve input styles", value: "formsx"}, 
      	{name: "IconsX: Mixin to handle sprites", value: "iconsx"}, 
      	{name: "LabelX: Mixin to create label styles", value: "labelx"}
      ]
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
	  
	  this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
	  	{
		  project_name: 	this.props.project_name
		}
      );
	  this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
	  	{
		  project_name: 	this.props.project_name
		}
      );

	  this.fs.copyTpl(
        this.templatePath('_Gruntfile.js'),
        this.destinationPath('Gruntfile.js'),
	  	{
		  stylesheet_name: 	this.props.stylesheet_name
		}
      );
	      
      var current_date 		= new Date();
      var month 			= new Array();
	  		month[0] 		= "January";
	  		month[1] 		= "February";
	  		month[2] 		= "March";
	  		month[3] 		= "April";
	  		month[4] 		= "May";
	  		month[5] 		= "June";
	  		month[6] 		= "July";
	  		month[7] 		= "August";
	  		month[8] 		= "September";
	  		month[9] 		= "October";
	  		month[10] 		= "November";
	  		month[11] 		= "December";
	  var current_month 	= month[current_date.getMonth()]; 
	  var current_year 		= current_date.getFullYear(); 
	  this.fs.copyTpl(
        this.templatePath('_style.less'),
        this.destinationPath(this.props.stylesheet_name + ".less"),
	  	{
		  project_title: 	this.props.project_title,
		  month: 			current_month,
		  year: 			current_year,
		  grid_system: 		this.props.grid_system, 
		  addons: 			this.props.addons
		}
      );
      
	  this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
	  	{ 
		  project_title: 	this.props.project_title,
		  js_type: 			this.props.js_type,
		  stylesheet_name: 	this.props.stylesheet_name,
		  grid_system: 		this.props.grid_system, 
		  ie_compatibility: this.props.ie_compatibility
		}
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
    }
  },

  install: function () {
    this.installDependencies({callback: function () {
      this.spawnCommand('grunt', ['less']);
    }.bind(this)});
  }
});
