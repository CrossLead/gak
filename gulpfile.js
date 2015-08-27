var gulp = require('gulp');
var mocha = require('gulp-mocha');
var fs = require('fs');
var browserify = require('browserify');
var babelify = require("babelify");
var argv = require('yargs').argv;
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('build', function() {

  var gak = browserify('./index.js', { debug: true, standalone : 'gak' })
        .transform(babelify)
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); });

  gak
    .pipe(source('gak.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));

  gak
    .pipe(source('gak.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));

});

gulp.task('test', function() {

  gulp.src(['test/index.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec',
        require: ['./'], // require index to register babel
        grep: argv.grep
      }));

});
