describe('The <%= _.classify(name) %> module', function() {
  it('should be exposed', function() {
    require('../<%= moduleBase.replace(/[^/]+(\/|$)/g, '../') %>').<%= _.classify(name) %>.should.exist;
  });
});
