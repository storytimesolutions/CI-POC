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
  
  it("has names for each developer", function(){
     var controller = $controller('AboutController', {});
     controller.developers.forEach(function(element) {
         expect(element.name).toBeDefined();
         expect(angular.isString(element.name)).toBeTruthy();
     }, this);
  });
  
  it("has bios for each developer", function(){
     var controller = $controller('AboutController', {});
     controller.developers.forEach(function(element) {
         expect(element.bio).toBeDefined();
         expect(angular.isString(element.bio)).toBeTruthy();
     }, this);
  });
  
  it("has imageUrl for each developer", function(){
     var controller = $controller('AboutController', {});
     controller.developers.forEach(function(element) {
         expect(element.imageUrl).toBeDefined();
         expect(angular.isString(element.imageUrl)).toBeTruthy();
     }, this);
  });
});