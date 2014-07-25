var gulp = require('gulp');
var karma = require('gulp-karma');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var closure = require('gulp-jquery-closure');
var bower = require('gulp-bower');

var testFiles = [
  'bower_components/angular/*.js',
  'bower_components/angular-mocks/*.js',
  'test/*.js',
  'autoComplete/autoComplete.js'
];

var projectFiles = [
  'test/*.js',
  'autoComplete/*.js',
];

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
  return gulp.src(['./autoComplete/*.js', '!./autoComplete/autoComplete.js'])
          .pipe(concat('autoComplete.js'))
          .pipe(closure({$: false, angular: true}))
          .pipe(uglify())
          .pipe(gulp.dest('./autoComplete'));
});


gulp.task('test', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })
    .on('error', function(err) {
      return console.error(err);
    }));
});

gulp.task('default', ['build', 'test'], function() {
  try {
    gulp.watch(projectFiles, ['build']);
    gulp.watch('./autoComplete/autoComplete.js', ['test']);
  } catch(e) {
    return console.error(e);
  }
});