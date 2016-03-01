"use strict"

const gulp = require('gulp');
const browserify = require('browserify');
const reactify = require('reactify');
const source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify('./assets/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('copy',function() {
  gulp.src(['./assets/**/*.*', '!./assets/js/**/*.*'])
  .pipe(gulp.dest('./public'));
});

gulp.task('build', ['browserify', 'copy']);

gulp.task('watch', function(){
  gulp.watch('./assets/**/*.*', ['build']);
})

gulp.task('default', ['build', 'watch'])