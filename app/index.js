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
        type: 'list',
        name: 'typeOfPrj',
        message: 'What kind of project would you like?',
        choices: [
          'static app (no server)',
          'dynamic (adds express)'
        ],
        filter: function (val) { val = val.split(""); return val[0] }
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
      console.log(props);
      this.prjType = props.typeOfPrj;
      this.angular = props.includeAngular;
      done();
    }.bind(this));
  },

  app: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_Gulpfile.js', "Gulpfile.js");
    this.directory('_public', 'public');
    this.directory('_jade', 'jade');
    this.directory('_build', 'build');
  }
});

module.exports = WebappGenerator;
