var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('minify-js', function() {
	gulp.src([
		'web/htb/htbApp.js',
		'web/htb/controllers/sliderCalculatorCtrl.js',
		'web/htb/directives/sliderCalculator.js'
	])
	.pipe(concat('htb.min.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('web/js'))
});

gulp.task('minify-css', function() {
  return gulp.src('web/htb/css/styles.css')
	.pipe(rename('styles.min.css'))
	.pipe(cleanCSS({
				compatibility: 'ie8',
				keepSpecialComments: 0
		})
	)
    .pipe(gulp.dest('web/htb/css'));
});
