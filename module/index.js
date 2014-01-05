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

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], bower: false });
  });
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.files = function files() {
  this.mkdir('lib');
  this.template('_module.js', 'lib/' + this.name + '.js');
  fs.appendFileSync('index.js', 'exports.' + _(this.name).capitalize() + ' = require(\'./lib/' + this.name + '.js\');\n');

  this.mkdir('test/' + this.name);
  this.template('_test.js', 'test/' + this.name + '/' + 'index.js');
};
