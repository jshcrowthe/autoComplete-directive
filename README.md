fsAutoCompleteStandards [![Build Status](https://travis-ci.org/jshcrowthe/fsAutoCompleteStandards.svg?branch=master)](https://travis-ci.org/jshcrowthe/fsAutoCompleteStandards)
=======================

This is an Angular Directive for FamilySearch's name and place standards. Currently this directive has a dependency on jQuery autoComplete but is designed to play well with it. 

Including this module is very simple. All of the needed services and things can be included by simply adding fsAutoComplete to your injected dependencies:

    angular.module('YOUR_MODULE_HERE', ['fsAutoComplete']);

After including this module all you have to do is add an attribute "data-auto-complete" to an input tag that you wish to use date and place standards on. (NOTE: This directive REQUIRES that the input have a ng-model attribute!):

Won't work:

    <input data-auto-complete>

Will work:

    <input data-ng-model="test" data-auto-complete>
