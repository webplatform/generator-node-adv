var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash-node');
var _s = require('underscore.string');
_.mixin(_s.exports());


var NodeAdvGenerator = module.exports = function NodeAdvGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], bower: false });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodeAdvGenerator, yeoman.generators.Base);

function answer(name) {
  return function(answers) {
    return answers[name];
  };
}

function whenAnswer(name, value) {
  return function(answers) {
    return answers[name] === value;
  };
}

function whenAnswers(map) {
  return function(answers) {
    var result = true;
    Object.getOwnPropertyNames(map).forEach(function (name) {
      if (answers[name] !== map[name]) {
        result = false;
      }
    });
    return result;
  };
}

// options and their defaults:
//
// projectName = slugify(humanize(cwd))
// projectDescription
// projectKeywords
// projectAuthor
// githubUser
// githubRepo = slugify(humanize(projectName))
// travis = true
// travisIRC = true
// travisIRCServer = "chat.freenode.net"
// travisIRCChannel
// travisMail = false
// lint = true
// coveralls = true

NodeAdvGenerator.prototype.welcome = function welcome() {
  // have Yeoman greet the user.
  console.log(this.yeoman);
};


NodeAdvGenerator.prototype.askProject = function askProject() {
  var done = this.async();

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'What\'s the name of your project?',
    default: _(path.basename(process.cwd())).humanize().slugify()
  }, {
    type: 'input',
    name: 'projectDescription',
    message: 'Enter a short description of your project:'
  }, {
    type: 'input',
    name: 'projectKeywords',
    message: 'Provide some keywords (comma-separated):'
  }, {
    type: 'input',
    name: 'author',
    message: 'Your first and last name?'
  }, {
    type: 'input',
    name: 'mail',
    message: 'Your email address?'
  }, {
    type: 'input',
    name: 'githubUser',
    message: 'What\'s your GitHub username or organization?'
  }, {
    type: 'input',
    name: 'githubRepo',
    message: 'How will the repository for this project be called?',
    default: function(answers) { return _(path.basename(answers.projectName)).humanize().slugify(); }
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.projectKeywords = props.projectKeywords;
    this.projectAuthor = props.author;
    if (props.mail) this.projectAuthor = this.projectAuthor + ' <' + props.mail + '>';
    this.githubUser = props.githubUser;
    this.githubRepo = props.githubRepo;

    done();
  }.bind(this));
};


NodeAdvGenerator.prototype.filesProject = function filesProject() {
  this.template('_.editorconfig', '.editorconfig');
  this.template('_.gitattributes', '.gitattributes');
  this.template('_.gitignore', '.gitignore');
  this.template('_CHANGELOG.md', 'CHANGELOG.md');
  this.template('_LICENSE', 'LICENSE');
};


NodeAdvGenerator.prototype.askTravis = function askTravis() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'travis',
    message: 'Enable Travis CI support?',
    default: true
  }, {
    type: 'confirm',
    name: 'travisIRC',
    message: 'Send build notifications via IRC?',
    default: true,
    when: whenAnswer('travis', true)
  }, {
    type: 'input',
    name: 'travisIRCServer',
    message: 'IRC server:',
    default: 'chat.freenode.net',
    when: whenAnswers({
      travis: true,
      travisIRC: true
    })
  }, {
    type: 'input',
    name: 'travisIRCChannel',
    message: 'IRC channel:',
    when: whenAnswers({
      travis: true,
      travisIRC: true
    })
  }, {
    type: 'confirm',
    name: 'travisMail',
    message: 'Send build notifications via mail?',
    default: whenAnswer('travisIRC', false),
    when: whenAnswer('travis', true)
  }];

  this.prompt(prompts, function (props) {
    this.travis = props.travis;
    this.travisIRC = props.travisIRC;
    this.travisIRCServer = props.travisIRCServer;
    this.travisIRCChannel = props.travisIRCChannel;
    this.travisMail = props.travisMail;

    done();
  }.bind(this));
};

NodeAdvGenerator.prototype.filesTravis = function filesTravis() {
  if (this.travis) {
    this.template('_.travis.yml', '.travis.yml');
  }
}


NodeAdvGenerator.prototype.askLint = function askLint() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'lint',
    message: 'Enable linting?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.lint = props.lint;

    done();
  }.bind(this));
};


NodeAdvGenerator.prototype.askCoveralls = function askLint() {
  var done = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'coveralls',
    message: 'Enable Coveralls integration?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.coveralls = props.coveralls;

    done();
  }.bind(this));
};


NodeAdvGenerator.prototype.askBadges = function askBadges() {
  var done = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'badges',
    message: 'What badges should be displayed in the README file?',
    choices: [
      {
        name: 'Newest version on NPM',
        value: 'badgeNPM',
        checked: true
      },
      {
        name: 'Build status from Travis CI',
        value: 'badgeTravis',
        checked: this.travis
      },
      {
        name: '% covered via Coveralls',
        value: 'badgeCoveralls',
        checked: this.coveralls
      },
      {
        name: 'Freshness of dependencies',
        value: 'badgeDependencies',
        checked: true
      }
    ]
  }];

  this.prompt(prompts, function (props) {
    this.badgeNPM = props.badges.indexOf('badgeNPM') >= 0;
    this.badgeTravis = props.badges.indexOf('badgeTravis') >= 0;
    this.badgeCoveralls = props.badges.indexOf('badgeCoveralls') >= 0;
    this.badgeDependencies = props.badges.indexOf('badgeDependencies') >= 0;

    done();
  }.bind(this));
};


NodeAdvGenerator.prototype.filesProject2 = function filesProject2() {
  this.template('_package.json', 'package.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_README.md', 'README.md');

  this.template('_index.js', 'index.js');

  this.mkdir('test');
  this.copy('test/init.js');
};

NodeAdvGenerator.prototype.filesModule = function filesModule() {
  var done = this.async();

  var prompts = [{
    type: 'input',
    name: 'moduleName',
    message: 'Your first module\'s name:',
    default: 'main'
  }];

  this.prompt(prompts, function (props) {
    this.invoke('node-adv:module', { args: [props.moduleName] });

    done();
  }.bind(this));
};
