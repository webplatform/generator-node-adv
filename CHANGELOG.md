# Changelog

#### 0.1.12
  - [module] Remove hardcoded reference to .js files (so a module or the app can easily put into a sub-folder later on)
  - [module] Only append export if index.js exists

#### 0.1.11
  - [app] Ensure `false` for JSON.stringify

#### 0.1.10
  - Update dependencies
  - Update README
  - [app] Don't ask for Coveralls, if Travis was disabled

#### 0.1.9
  - [app] Coverage: Use istanbul instead of blanket

#### 0.1.8
  - [app] Gruntfile.js: Ignore `test/_fixtures` when running tests

#### 0.1.7
  - [app] Gruntfile.js: Use mocha-unfunk-reporter for mocha output under Travis

#### 0.1.6
  - [app] Gruntfile.js: Change Travis output to spec when running with Coveralls support (now possible with mocha-multi process killing workaround)

#### 0.1.5
  - [app] Gruntfile.js: Add mocha before/after globals to jshint:test

#### 0.1.4
  - Remove mocha devDependency for now
  - Update README (remove TODO about removing the fix removed in 0.1.3)
  - Make CHANGELOG version headers one size smaller

#### 0.1.3
  - Remove fix for non-firing `end` event in app generator

#### 0.1.2
  - Update dependencies

#### 0.1.1
  - Fix Travis build and Coveralls task

#### 0.1.0
  - Main generator
  - Module generator
  - Test generator
  - README

#### 0.0.0
  - Initial project setup
