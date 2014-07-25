// Tests for autoComplete directive

beforeEach(module('autoComplete-directive'));
beforeEach(inject(function($compile, $rootScope) {
  $scope = $rootScope;
  element = angular.element('<input data-ng-model="testModel" data-auto-complete>');
  $compile(element)($rootScope);
}));

describe("autoComplete Directive Test Suite", function() {
  describe('autoComplete Directive Tests', function() {
    it("Should Look a little different", function (done) {
      done();
    });
  });
});