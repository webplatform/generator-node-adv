describe('The <%= _.capitalize(name) %> module', function() {
  it('should be exposed', function() {
    require('../../index.js').<%= _.capitalize(name) %>.should.exist;
  });
});
