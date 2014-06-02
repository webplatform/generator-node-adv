var util = require('util');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var _ = require('lodash-node');
var _s = require('underscore.string');
_.mixin(_s.exports());

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  var parts = this.name.split('/');
  if (parts.length == 1) {
    parts.push('index');
  }
  this.moduleName = parts[parts.length - 1];
  parts.pop();
  this.moduleBase = parts.join('/');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.files = function files() {
  this.mkdir('lib/' + this.moduleBase);
  this.template('_module.js', 'lib/' + this.moduleBase + '/' + this.moduleName + '.js');
  if (fs.existsSync('index.js')) {
    fs.appendFileSync('index.js', 'exports.' + _(this.name).classify() + ' = require(\'./lib/' + this.moduleBase + '/' + this.moduleName + '.js\');\n');
  }

  this.mkdir('test/' + this.moduleBase);
  this.template('_test.js', 'test/' + this.moduleBase + '/' + this.moduleName + '.js');
};
