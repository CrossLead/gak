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
import async        from 'async';


/*
 * Build node and browser versions of code
 */
gulp.task('build', ['compile', 'browserify']);



/*
 * Compile the code for commonJs/Node usage
 */
gulp.task('compile', callback => {

  async.parallel([

    cb => gulp
      .src("./src/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./dist/node/"))
      .on('end', cb),

    cb => gulp
      .src("./package.json")
      .pipe(gulp.dest("./dist"))
      .on('end', cb)

  ], callback);

});



/*
 * Create browserify build (exposing global if no module system)
 */
gulp.task('browserify', callback => {

  let gak = browserify('./src/', { debug: true, standalone : 'gak' })
        .transform(babelify)
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); });

  let dest = gulp.dest('./dist/browser/');

  async.parallel([
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

  ], callback);


});



/*
 * Run tests
 */
gulp.task('test', () => {

  gulp.src(['test/index.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec',
        grep: argv.grep
      }));

});
