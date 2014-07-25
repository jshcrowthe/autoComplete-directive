/* global angular, FS */
angular.module('fsAutoComplete-directive', ['fsAutoComplete-service'])
.directive('autoComplete', ['autoCompleteService', function($autoCompleteService) {
  if (typeof FS === 'object' && typeof FS.File === 'object' && typeof FS.File.loadCSS === 'function') FS.File.loadCSS('jquery.autocomplete-1.10.4.css');
  /**
   * Auto Complete Directive. This directive is to be put on an input tag and will 
   * automatically utilize the date and place standards for whatever value you pass
   * to the directive (e.g. data-auto-complete="date"). This function also takes an 
   * optional onselect function as an attribute. If this is provided the function must
   * contain an attribute named value that will be filled with the value of the select
   * (for more information see: http://blog-it.hypoport.de/2013/11/06/passing-functions-to-angularjs-directives/)
   * 
   * @param  {[scope object]} scope
   * @param  {[scope object]} element
   * @param  {[scope object]} attrs
   * @param  {[scope object]} ctrl
   * @return {[object]}
   */
  function autoCompleteLink(scope, element, attrs, ctrl) {
    ctrl.$parsers.unshift(function(viewValue) {
      console.log("viewValue:", viewValue);
      element.autocomplete({
        source : function(req, res) {
          return $autoCompleteService.getSuggestions(viewValue, attrs.autoComplete || 'date')
            .then(function(data) {
              return res(data);
            });
        },
        select : function(event, ui) {
          scope.value = ui.item.value;
          if (typeof scope.onselect === 'function') scope.onselect({value:ui.item.value});
          return ui.item.value;
        },
        minLength: 2
      });
      return viewValue;
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