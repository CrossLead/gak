import gulp         from 'gulp';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import mocha        from 'gulp-mocha';
import babel        from 'gulp-babel';
import concat       from 'gulp-concat';
import fs           from 'fs';
import browserify   from 'browserify';
import babelify     from 'babelify';
import { argv }     from 'yargs';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import asyncHelpers from 'async';
import eslint       from 'gulp-eslint';

const src = './src/**/*.js',
      test =  './test/index.js';

/*
 * Watch task for dev
 */
gulp.task('watch', () => gulp.watch([src, test], ['compile', 'test']));


/*
 * Build node and browser versions of code
 */
gulp.task('build', ['compile', 'browserify']);



/*
 * Compile the code for commonJs/Node usage
 */
gulp.task('compile', () => {

  return asyncHelpers.parallel([

    cb => gulp
      .src(src)
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./dist/node/"))
      .on('end', cb),

    cb => gulp
      .src("./package.json")
      .pipe(gulp.dest("./dist"))
      .on('end', cb)

  ]);

});



/*
 * Create browserify build (exposing global if no module system)
 */
gulp.task('browserify', () => {

  const gak = browserify('./src/', { debug: true, standalone : 'gak' })
        .transform(babelify)
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); });

  const dest = gulp.dest('./dist/browser/');

  return asyncHelpers.parallel([
      cb => gak
        .pipe(source('gak.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest)
        .on('end', cb),

      cb => gak
        .pipe(source('gak.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest)
        .on('end', cb)

  ]);


});



/*
 * Linting
 */
gulp.task('eslint', function() {
  return gulp
    .src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint('.eslintrc'))
    .pipe(eslint.format());
});



/*
 * Run tests
 */
gulp.task('test', () => {

  return gulp.src(['test/index.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec',
        grep: argv.grep
      }));

});
