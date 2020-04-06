'use strict'

const gulp = require('gulp')
const taskArguments = require('./task-arguments')
const concat = require('gulp-concat');

const config = {
  scripts: [
    'lib/replace-diacritics.js',
    'node_modules/accessible-autocomplete/dist/accessible-autocomplete.min.js'
  ],
  styles: [
    'node_modules/accessible-autocomplete/dist/accessible-autocomplete.min.css'
  ]
}

gulp.task('js:compile-autocomplete', () => {
  return gulp.src(config.scripts)
    .pipe(concat('autocomplete.js'))
    .pipe(gulp.dest(taskArguments.destination + '/'))
})

gulp.task('scss:compile-autocomplete', () => {
  return gulp.src(config.styles)
    .pipe(concat('autocomplete.css'))
    .pipe(gulp.dest(taskArguments.destination + '/'))
})
