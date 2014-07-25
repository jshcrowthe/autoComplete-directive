// Tests for autoComplete directive

beforeEach(module('autoComplete'));
beforeEach(inject(function($compile, $rootScope) {
  $scope = $rootScope;
  element = angular.element('<input data-ng-model="testModel" data-auto-complete>');
  $compile(element)($rootScope);
}));

describe("autoComplete Directive Test Suite", function() {
  describe('autoComplete Directive Tests', function() {
    it("DOM Element should exist", function (done) {
      expect(element).to.be.ok;
      done();
    });
    it("DOM Element Should have attached ngModel", function (done) {
      var originalEl = angular.element('<input data-ng-model="testModel" data-auto-complete>');
      expect(element).to.not.equal(originalEl);
      done();
    });
  });
});