import gulp         from 'gulp';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import mocha        from 'gulp-mocha';
import fs           from 'fs';
import browserify   from 'browserify';
import babelify     from 'babelify';
import { argv }     from 'yargs';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';


gulp.task('build', () => {

  let gak = browserify('./index.js', { debug: true, standalone : 'gak' })
        .transform(babelify)
        .bundle()
        .on('error', err => { console.error(err); this.emit('end'); });

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

gulp.task('test', () => {

  gulp.src(['test/index.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec',
        require: ['./'], // require index to register babel
        grep: argv.grep
      }));

});
