var util = require('util');
var yeoman = require('yeoman-generator');

var TestGenerator = module.exports = function TestGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  var parts = this.name.split('/');
  if (parts.length == 1) {
    parts.push('index');
  }
  this.testName = parts[parts.length - 1];
  parts.pop();
  this.testBase = parts.join('/');
};

util.inherits(TestGenerator, yeoman.generators.NamedBase);

TestGenerator.prototype.files = function files() {
  this.mkdir('test/' + this.testBase);
  this.template('_test.js', 'test/' + this.testBase + '/' + this.testName + '.js');
};
