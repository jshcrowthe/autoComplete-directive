var gulp = require('gulp');
var karma = require('gulp-karma');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var closure = require('gulp-jquery-closure');
var bower = require('gulp-bower');
var rename = require('gulp-rename');

var rawTestFiles = [
  'bower_components/angular/*.js',
  'bower_components/angular-mocks/*.js',
  'test/*.js',
  'dist/autoComplete.js'
];

var minTestFiles = [
  'bower_components/angular/*.js',
  'bower_components/angular-mocks/*.js',
  'test/*.js',
  'dist/autoComplete.min.js'
];

var projectFiles = [
  'test/*.js',
  'source/*.js',
];

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('./bower_components'));
});

gulp.task('build', function() {
  return gulp.src(['./source/*.js'])
          .pipe(concat('autoComplete.js'))
          .pipe(closure({$: false, angular: true}))
          .pipe(gulp.dest('./dist'));
});

gulp.task('minify', function() {
  return gulp.src('./dist/autoComplete.js')
          .pipe(uglify())
          .pipe(rename(function(path) {
            path.extname = '.min' + path.extname;
          }))
          .pipe(gulp.dest('./dist'));
});


gulp.task('testRaw', function() {
  return gulp.src(rawTestFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })
    .on('error', function(err) {
      throw err;
    }));
});

gulp.task('testMin', function() {
  return gulp.src(minTestFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })
    .on('error', function(err) {
      throw err;
    }));
});

gulp.task('default', function() {
  try {
    gulp.watch(projectFiles, ['build']);
    gulp.watch('./dist/*.js', ['testRaw']);
    gulp.watch('./dist/*.js', ['minify']);
    gulp.watch('./dist/*.min.js', ['testMin']);
  } catch(e) {
    return console.error(e);
  }
});