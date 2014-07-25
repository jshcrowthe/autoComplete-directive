;(function (angular) {
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
/* global angular */
angular.module('fsAutoComplete', ['fsAutoComplete-directive']);

/* global angular, window, FS */
angular.module('fsAutoComplete-service', [])
.service('autoCompleteService', ['$http', '$q', function($http, $q) {
  this.getSuggestions = function(viewValue, standardType) {
    var dfd = $q.defer();
    var API_URL;

    if (window.location.host.split('.')[0].indexOf('beta') > -1 || window.location.host.split('.')[0].indexOf('localhost') > -1) {
      API_URL = 'https://apibeta.familysearch.org/authorities/v1/';
    } else {
      API_URL = 'https://api.familysearch.org/authorities/v1/';
    }

    var noneOfTheAboveText = {
      'de': 'Keine der oben genannten',
      'en': 'None of the Above',
      'es': 'Ninguna de las anteriores',
      'fr': 'Aucune de ces réponses',
      'it': 'Nessuno dei precedenti',
      'pt': 'Nenhuma das opções acima',
      'ru': 'Ни один из вышеперечисленного',
      'ja': '上記のどれでもない',
      'ko': '해당 사항 없음',
      'zh': '以上都不是'
    };

    var sessionID = FS.Cookie.getCookie('fssessionid');
    var url;
    function getData(dateObj) { 
      if (!dateObj) return null;
      if (!Array.isArray(dateObj.normalized)) {
        return dateObj.normalized; 
      } else {
        return dateObj.normalized[0];
      }
    }
    function isNotNull(value) { return !!value; }
    
    // Build Query String Based on Type and FieldValues
    if (standardType === 'date') {
      url = API_URL + 'date?date=\"' + viewValue + '\"';
    } else if (standardType === 'place') {
      url = API_URL + 'place?place=\"' + viewValue + '\"&view=simple&filter=true';
    } else if (standardType === 'name') {
      url = API_URL + 'name?name=\"' + viewValue + '\"';
    }

      // Add Required Meta
      url+="&sessionId=" + sessionID;
      url+="&locale=" + FS.simpleLocale();

      var options = [];
    // Visit authorities endpoint for suggestion

    $http({
      url : url,
      method : "GET",
      headers : {
        "Content-Type": "application/json"
      },
      data:{}
    }).success(function(data) {
      if (standardType === 'date') {
        if (!data.dates || data.dates.count === 0) return dfd.resolve([]);
        options = data.dates.date.map(getData).filter(isNotNull);
        options.push(noneOfTheAboveText[FS.simpleLocale()]);
        return dfd.resolve(options);
      }
      if (standardType === 'place') {
        if (!data.places || data.places.count === 0) return dfd.resolve([]);
        options = data.places.place.map(getData).filter(isNotNull);
        options.push(noneOfTheAboveText[FS.simpleLocale()]);
        return dfd.resolve(options);
      } 
    }).error(function(error) {
      dfd.reject(error);
    });
    return dfd.promise;
  };
}]);

})(angular);