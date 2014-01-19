describe('The <%= _.capitalize(name) %> module', function() {
  it('should be exposed', function() {
    require('../../').<%= _.capitalize(name) %>.should.exist;
  });
});
