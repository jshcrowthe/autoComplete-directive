ngComplete [![Build Status](https://travis-ci.org/jshcrowthe/ngComplete.svg?branch=master)](https://travis-ci.org/jshcrowthe/ngComplete)
=======================

This is an Angular Directive for use with jQuery-UI AutoComplete. 

# Injection
Include this module in your app by the name `ngComplete`
```js
angular.module('YOUR_MODULE_HERE', ['ngComplete']);
```

# Configuration
This module is configured with a provider that requires some initial configuration. After initializing your app in the app.config you can modify the settings.

#### Example:
```js
var app = angular.module('YOUR_MODULE_HERE', ['ngComplete'])
app.config(['ngCompleteServiceProvider', function(ngCompleter) {
  ngCompleter.setURL('https://api.github.com/search/repositories?q=');
  ngCompleter.setResponseParser(function(response) {
    return response.items;
  });
  ngCompleter.setDataMapper(function(item) {
    return {label: item.full_name, value: item.url};
  });
}]);
```

There are 3 functions that you can use to configure this module in your app
- setURL
  - This function takes a string that will be used as the first part of the url of the request (Example: https://api.github.com/search/repositories?q=). The term that you use will be URI parsed and added to the end of the string.
- setResponseParser
  - This function is what will be called if the response from the server is not an array. This is designed to be the means whereby you can access the array of data you wish to surface for your autocomplete. (See above for an example using the github api);
- setDataMapper
  - This function is the function that will be passed to the map function of the response (or responseParser). This is set by default to a function that verify's that the results are strings and nullifies everything else. The null nodes are then removed. If you do not provide a function here this will be the default functionality.

# Directive Usage
After including this module all you have to do is add an attribute "data-ng-complete" to an input tag that you wish to use date and place standards on. (NOTE: This directive REQUIRES that the input have a ng-model attribute!):

Won't work:
```html
<input data-ng-complete>
```
Will work:
```html
<input data-ng-model="test" data-ng-complete>
```