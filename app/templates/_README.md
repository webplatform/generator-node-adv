<% if (badgeNPM) { %>[![NPM version](https://badge.fury.io/js/<%= _.slugify(projectName) %>.png)](http://badge.fury.io/js/<%= _.slugify(projectName) %>)<% } %><% if (badgeTravis) { %>
[![Build Status](https://travis-ci.org/<%= githubUser %>/<%= githubRepo %>.png?branch=master)](https://travis-ci.org/<%= githubUser %>/<%= githubRepo %>)<% } %><% if (badgeCoveralls) { %>
[![Coverage Status](https://coveralls.io/repos/<%= githubUser %>/<%= githubRepo %>/badge.png)](https://coveralls.io/r/<%= githubUser %>/<%= githubRepo %>)<% } %><% if (badgeDependencies) { %>
[![Dependency Status](https://david-dm.org/<%= githubUser %>/<%= githubRepo %>.png)](https://david-dm.org/<%= githubUser %>/<%= githubRepo %>)<% } %>

# <%= projectName %>

<%= projectDescription %>
