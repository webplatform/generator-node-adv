[![NPM version](https://badge.fury.io/js/generator-node-adv.png)](http://badge.fury.io/js/generator-node-adv)
[![Dependency Status](https://david-dm.org/webplatform/generator-node-adv.png)](https://david-dm.org/webplatform/generator-node-adv)

# generator-node-adv

A generator for [Yeoman](http://yeoman.io). This generator will create a NodeJS project. It has some advanced features (hence the name):

* A `module` subgenerator (to separate your project into logical blocks)
* A `test` subgenerator (to create basic tests with little effort)
* Tests, which are run using [Mocha](http://visionmedia.github.io/mocha/ "Mocha - the fun, simple, flexible JavaScript test framework") and [Chai](http://chaijs.com/ "Home - Chai") for great flexibility
* [JSHint](http://www.jshint.com/ "JSHint, a JavaScript Code Quality Tool") is run against all JS files (main and test)
* [Travis CI](https://travis-ci.org/ "Travis CI - Free Hosted Continuous Integration Platform for the Open Source Community") integration (to get automated build and test feedback on commits and pull requests)
* [Coveralls](https://coveralls.io/ "Coveralls - Test Coverage History & Statistics") integration (to keep track of the project's test coverage)
* Different badges (you can chose which to show):
  * The latest version of your package on [NPM](https://npmjs.org/ "npm - Node Packaged Modules") (via [Gemfury](http://badge.fury.io/ "Version Badge for your RubyGems, PyPI packages, and NPM modules"))
  * Travis build status
  * Coveralls coverage statistics
  * Status of dependencies (via [David DM](https://david-dm.org/ "David, a dependency management tool for Node.js projects")), in case your referenced versions get outdated
* Running the tests locally generates additional coverage statistics (e.g. a HTML page with per-file stats and uncovered source lines marked red)
* Custom build logic via [Grunt](http://gruntjs.com/ "Grunt: The JavaScript Task Runner")


## Getting Started

To install generator-node-adv from npm, run (depending on your system, you might need to add `sudo` in front):

```
$ npm install -g generator-node-adv
```

Note that all generators will create files in the current directory, so make sure you create a new one first and change into it:

```
mkdir my-new-project && cd $_
```

Finally, initiate the generator:

```
$ yo node-adv
```

Your new project will use the MIT license. If you want to use another license, make sure to adjust `package.json` and `LICENSE`.

## Subgenerators

### node-adv:module

This creates a new module, along with a first test. It will also add an export to `index.js`:

```
$ yo node-adv:module helpers
```

### node-adv:test

New tests are easily created, with support for subdirectories:


#### This will create `test/basic/index.js`

```
$ yo node-adv:test basic
```

#### This will create `test/walk/slowly.js`

```
$ yo node-adv:test walk/slowly
```

#### This will create `test/a/b/c/d.js`

```
$ yo node-adv:test a/b/c/d
```
## Directory Layout

* The root directory contains files relevant for build automation and some meta-data files.
  * It also contains the `index.js` file, which is the entry-point of your module.
* `node_modules` - Is a standard NPM directory, that contains the modules your project depends on.
* `lib` - Contains your main source files, split into modules.
* `test` - Contains your tests' source files.
* `test-results` - Will be created by the test runner and includes results in various formats (see below).

## External Tools

Depending on what answers you gave, you will have to perform additional steps.

### Travis CI Integration

Sign into [Travis](https://travis-ci.org/) and activate the switch for the repository on your [profile page](https://travis-ci.org/profile) there. You may need to resync your repositories, if it doesn't show up.

### Coveralls Integration

Sign into [Coveralls](https://coveralls.io/repos/new) and [add the repo](https://coveralls.io/repos/new), you may need to resync here, too.

## Project workflow

The basic development workflow looks like this:

### Installing Dependencies

You can add dependencies by running `npm install my-dep-module-name --save` - the 'save' option will automatically add the module name and version to the `dependencies` field in `package.json`. You can search for ready-to-use modules on the [NPM website](https://npmjs.org/).

### Writing Code / Building / Linting

Use the approriate subgenerator (see above) to get started. You should frequently commit changed code to your local Git repository. If you also push to your remote repo on every commit, you can utilize Travis to get feedback from the tests and see if everything still works as expected. You can also run the tests locally, of course, but Travis supports some advanced features like testing on multiple version of NodeJS (see [here](http://about.travis-ci.org/docs/user/languages/javascript-with-nodejs/ "Travis CI: Building a Node.js project")). If you don't want to trigger a build on Travis (this would be the case if you only changed the README, for example), just include `[ci skip]` in your commit message and Travis will ignore the commit (see [here](http://about.travis-ci.org/docs/user/how-to-skip-a-build/ "Travis CI: How to skip a build")).

You can use `npm install` (or `npm i` for short) to (re-)build your project. This will also check your `package.json` file for errors and install any missing dependencies.

Linting is a form of static code analysis. This means that a tool will take a look at your code and provide feedback if it encounters errors in syntax or semantics. The tool used here is JSHint, the rules by which it operates are configurable. Take a look at line 12 in `Gruntfile.js` and follow the link there to setup your own options that match your environment and coding-style.

### Writing Tests

Tests are a good way to make sure your code actually does what it is supposed to do. Manual testing just doesn't scale with your codebase, but automated tests can and should be run frequently after changes to the code. Of course, they need to be written first, but that's easy!

There are two main development methods regarding tests: either write your code first and the tests later until everything is covered or write your tests first and the code later until every test passes. Pick whatever suits you best, you can also mix the two methods. In any case, you shouldn't spend too much time on just one side.

A good idea is to group tests about the same component or part of your module organized in sub-directories under `test`. Don't go into too much differentiation with those sub-directories - you can split the tests over separate files, too, and even have multiple groups of tests (or "suites") in one file. The files should have a meaningful, short name. There already is a `test/init.js` file, which will get included automatically by the test-runner. It initializes some convenience methods, so tests are even easier to write!

The test-runner used here is Mocha (in BDD mode), which supports features like: synchronous / asynchronous tests, executing hook functions before / after tests, pending tests and exclusive / inclusive tests. Take a look at the [Mocha documentation](http://visionmedia.github.io/mocha/) to learn about these features and more (for example, how to configure test timeouts). You can find a bunch of tests in the [examples section](http://visionmedia.github.io/mocha/#example-test-suites) there, too. Basically, you create suites (via `describe()`) which can contain sub-suites and tests (via `it()`).

The build environment also uses the Chai library so you can easily write your checks. Read about the different styles and what helper methods are at your disposal in the [Chai guide](http://chaijs.com/guide/styles/). The `test/init.js` file activates all three styles (should, expect and assert) automatically, so you don't need to include them and can write your tests right away!

### Running Tests

Tests can be run by executing `npm test`. This will first build your project and then run all tests under the `test` directory, while automatically collecting coverage statistics. Note that at least one test must reference a given file, for that file to show up in the coverage statistics.

This will produce output like the following:

```
  The Main module
    √ should be exposed
    
  The Second module
    √ should be exposed
    
  2 passing (12ms)
```

You can watch the test-runner executing your suites and tests, flagging passes and failures. It will also produce some additional files under the `test-results` directory:
* `coverage.html` - Contains your tested main source files. It displays % coverage and SLOC stats per file and highlights lines, which aren't covered yet.
* `slow.txt` - Lists all your suites and tests by how long they ran. Useful to find slow tests.
* `lcov.txt` - This format can be imported by a number of code coverage tools.

## Publishing

If you reached a milestone that fixes some bugs or brings new functionality and all your tests pass, it's time to publish! Check out the [NPM docs](https://npmjs.org/doc/) for commands that help you with publishing, most notably [version](https://npmjs.org/doc/cli/npm-version.html) and [publish](https://npmjs.org/doc/cli/npm-publish.html). Try sticking to [Semantic Versioning](http://semver.org/) when naming your release versions.

Record the changes of your new version in `CHANGELOG.md` and then use `npm version major|minor|patch` to bump the package's version (choose one of major|minor|patch, according to Semantic Versioning). This also creates a new tag commit, if you are working under git (the repo must be in a clean state, so make sure you have committed all your changes). Then it's just `npm publish` and your package is up on NPM's registry!

If you are publishing for the first time, you must tell your local npm command about your NPM account, just run `npm adduser` and answer the prompts. This will either create or verify an account on NPM's registry.

### Using a package's development version

You can try out packages that aren't released on NPM yet. If there is a repository on GitHub, just link to it in your `package.json` file like so:
`"NPM-NAME": "https://api.github.com/repos/ORG-OR-USER/REPO-NAME/tarball"`

If you are building the package locally and want to use it in another local project, use NPM's [pack](https://npmjs.org/doc/cli/npm-pack.html) command. Just run `npm pack` in the package's directory - it will be built, packaged and added to the local npm cache (if there already is a package with the same name and version in the cache - either from downloading off NPM or a previous pack command - it will be overridden). Then, in your project's folder, run `npm install NPM-NAME` and it will pull the package from your cache (make sure you are depending on the correct version). You can remove a cached package via `npm cache rm NPM-NAME`.

## TODO

There are still some things to be done, but feel free to give the generator a try and send pull requests or create issues. :)

* Error checking / input validation
* More customization (license?, ...)
* Describe more stuff?
* Tests
* 'end' in the app generator doesn't seem to be called (since invoking the subgen), copied to module subgen
* ...

## License

[MIT License](LICENSE)
