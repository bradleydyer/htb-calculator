var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('js', function() {
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
