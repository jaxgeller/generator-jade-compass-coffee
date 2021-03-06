'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var WebappGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();
    this.log(yosay('Yo yo yo time to generate some apps!'));

    var prompts = [
      {
        type: 'confirm',
        name: 'includeCoffee',
        message: 'Include Coffescript?',
        default: false
      },
      {
        type: 'confirm',
        name: 'includeAngular',
        message: 'Include Angular?',
        default: false
      },
      {
        type: 'confirm',
        name: 'goTime',
        message: 'Start Generator?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.angular = props.includeAngular;
      this.includeCoffee = props.includeCoffee;
      console.log(this.includeCoffee)
      done();
    }.bind(this));
  },

  app: function () {
    this.copy('_package.json', 'package.json');
    this.template('_Gulpfile.js', "Gulpfile.js");
    this.directory('_public', 'public');
    this.directory('_jade', 'jade');
    this.directory('_build', 'build');
  }
});

module.exports = WebappGenerator;
