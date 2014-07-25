var gulp = require('gulp');
var karma = require('gulp-karma');

var testFiles = [
  'bower_components/angular/*.js',
  'bower_components/angular-mocks/*.js',
  'test/*.js',
  'autoComplete/*.js'
];

gulp.task('test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.error(err);      
      throw err;
    });
});

gulp.task('default', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    })
    .on('error', function(err) {
      return console.error(err);
    }));
});