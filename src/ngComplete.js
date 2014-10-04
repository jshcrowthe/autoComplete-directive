/* global angular, FS */
angular
.module('ngComplete', ['ngCompleteProvider'])
.directive('ngComplete', ['ngCompleteService', function($service) {
  /**
   * Auto Complete Directive. This directive is to be put on an input tag and will 
   * utilize the provided url to generate an autocomplete. This function also takes an optional 
   * onselect function as an attribute.If this is provided the function mustcontain an attribute 
   * named value that will be filled with the value of the select (for more information see: 
   * http://blog-it.hypoport.de/2013/11/06/passing-functions-to-angularjs-directives/)
   * 
   * @param  {[object]} scope
   * @param  {[object]} element
   * @return {[object]}
   */
  function autoCompleteLink(scope, element) {
    element.autocomplete({
      source : function(req, res) {
        return $service.getSuggestions(scope.value).then(res, res);
      },
      select : function(event, ui) {
        scope.value = ui.item.value;
        if (typeof scope.onselect === 'function') scope.onselect({value:ui.item.value});
        return ui.item.value;
      },
      minLength: 2
    });
  }
  return {
    restrict: 'A',
    scope: {
      value: '=ngModel',
      onselect: '&'
    },
    replace: false,
    require: 'ngModel',
    link:autoCompleteLink,
  };
}]);