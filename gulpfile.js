const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const wait = require('gulp-wait');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return gulp
    .src('website/scss/**/*.scss')
    .pipe(wait(500))
    .pipe(
      sass({
        includePaths: ['website/scss']
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('website/css'))
    .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './website'
  });

  gulp
    .watch(['website/scss/**/*.scss'], ['sass'])
    .on('change', browserSync.reload);
  gulp.watch('website/*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);
