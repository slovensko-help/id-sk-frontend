'use strict'

const paths = require('./config/paths.json')
const gulp = require('gulp')
const taskListing = require('gulp-task-listing')
const taskArguments = require('./tasks/gulp/task-arguments')

// Gulp sub-tasks
require('./tasks/gulp/clean.js')
require('./tasks/gulp/lint.js')
require('./tasks/gulp/compile-assets.js')
require('./tasks/gulp/nodemon.js')
require('./tasks/gulp/watch.js')
// new tasks
require('./tasks/gulp/copy-to-destination.js')
require('./tasks/gulp/asset-version.js')
require('./tasks/gulp/sassdoc.js')
require('./tasks/gulp/autocomplete.js')


// Umbrella scripts tasks for preview ---
// Runs js lint and compilation
// --------------------------------------
gulp.task('scripts', gulp.series(
  'js:compile',
  'js:compile-autocomplete',
))

// Umbrella styles tasks for preview ----
// Runs js lint and compilation
// --------------------------------------
gulp.task('styles', gulp.series(
  'scss:lint',
  'scss:compile',
  'scss:compile-autocomplete',
))

// Copy assets task ----------------------
// Copies assets to taskArguments.destination (public)
// --------------------------------------
gulp.task('copy:assets', () => {
  return gulp.src(paths.idsk_src + 'assets/**/*')
    .pipe(gulp.dest(taskArguments.destination + '/assets/'))
})

// Copy assets task ----------------------
// Copies assets to taskArguments.destination (public)
// --------------------------------------
gulp.task('copy:appAssets', () => {
  return gulp.src(paths.app + 'assets/**/*')
    .pipe(gulp.dest(taskArguments.destination + '/assets/'))
})

// All test combined --------------------
// Runs js, scss and accessibility tests
// --------------------------------------
gulp.task('test', gulp.series(
  'scss:lint',
  'scss:compile'
))

// Copy assets task for local & heroku --
// Copies files to
// taskArguments.destination (public)
// --------------------------------------
gulp.task('copy-assets', gulp.series(
  'styles',
  'scripts'
))

// Serve task ---------------------------
// Restarts node app when there is changed
// affecting js, css or njk files
// --------------------------------------
gulp.task('serve', gulp.parallel(
  'watch',
  'nodemon'
))

// Dev task -----------------------------
// Runs a sequence of task on start
// --------------------------------------
gulp.task('dev', gulp.series(
  'clean',
  'copy-assets',
  'copy:appAssets',
  'sassdoc',
  'serve'
))

// Build package task -----------------
// Prepare package folder for publishing
// -------------------------------------
gulp.task('build:package', gulp.series(
  'clean',
  'copy-files-govuk',
  'copy-files-idsk',
  'js:compile'
))
gulp.task('build:dist', gulp.series(
  'clean',
  'copy-assets',
  'copy:assets',
  'update-assets-version'
))

// Default task -------------------------
// Lists out available tasks.
// --------------------------------------
gulp.task('default', taskListing)
