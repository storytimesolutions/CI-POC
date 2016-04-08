describe("AboutController", function() {
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  
  it("has two developers", function() {
    var controller = $controller('AboutController', {});
    expect(controller.developers.length).toEqual(2);
  });
});