import gulp         from 'gulp';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import mocha        from 'gulp-mocha';
import babel        from 'gulp-babel';
import run          from 'gulp-run';
import browserify   from 'browserify';
import babelify     from 'babelify';
import { argv }     from 'yargs';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import asyncHelpers from 'async';
import eslint       from 'gulp-eslint';
import fs           from 'fs';


const src = './src/**/*.js',
      test =  './test/index.js';

const prun = cmd => {
  const fn = () => new Promise((res, rej) => {
    run(cmd).exec(undefined, err => { err ? rej(err) : res() });
  });
  fn.then = next => fn().then(next);
  return fn;
};

/*
 * Watch task for dev
 */
gulp.task('watch', () => gulp.watch([src, test], ['test']));



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
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/node/'))
      .on('end', cb),

    cb => gulp
      .src('./package.json')
      .pipe(gulp.dest('./dist'))
      .on('end', cb)

  ]);

});



/*
 * Create browserify build (exposing global if no module system)
 */
gulp.task('browserify', () => {

  const gak = browserify('./src/', { debug: true, standalone : 'gak' })
        .transform(babelify, {
          global: true,
          ignore: /\/node_modules\/(?!event-rank\/)/,
          'sourceMaps': 'both',
          'presets': [
            'stage-0',
            'es2015'
          ],
          'plugins': [
            'transform-runtime',
            'transform-class-properties',
            'transform-flow-strip-types'
          ],
          babelrc: false
        })
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
        .pipe(uglify({mangle : true}))
        .pipe(dest)
        .on('end', cb)

  ]);


});

/*
 * Bump bower + npm versions
 */
gulp.task('bump', () => {

  const bower = './bower.json';
  const npm = './package.json';

  const bump = fname => {
    const pkg = require(fname);
    const v = pkg.version;
    const bits = v.split('.').map(x => parseInt(x, 10));

    bits[2] += (argv.down ? -1 : 1);
    pkg.version = bits.join('.');
    console.log(
      `Bumped ${argv.down ? 'down ': ''}${fname} to version ${pkg.version}`
    );
    return JSON.stringify(pkg, null, 2);
  };

  fs.writeFileSync(bower, bump(bower));
  fs.writeFileSync(npm, bump(npm));
});


/*
 * Linting
 */
gulp.task('eslint', () => {
  return gulp
    .src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint('.eslintrc'))
    .pipe(eslint.format());
});



/*
 * Run linting and tests
 */
gulp.task('test', () => {

  return gulp.src(['test/index.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec',
        grep: argv.grep
      }));

});


/**
 * Generate Documentation
 */
gulp.task('docs', cb => {
  prun('./node_modules/.bin/esdoc -c ./esdoc.json && touch ./esdoc/.nojekyll')
    .then(cb)
    .catch(err => {
      throw err;
    })
});


/**
 * Deploy to github pages
 */
gulp.task('deploy-docs', ['docs'], () => {
  return prun(`./node_modules/gh-pages/bin/gh-pages --dotfiles true -d ./esdoc/`);
})


/*
 * Compile and publish bower + npm packages
 */
gulp.task('publish', ['test', 'build'], cb => {

  const version = require('./package.json').version;

  prun(`git tag -a v${version} -m "Release version ${version}"`)
    .then(prun('git push origin master --tags'))
    .then(prun('npm publish ./'))
    .then(prun('git add dist/'))
    .then(prun(`git commit -m "update bower dist to version ${version}"`))
    .then(prun(`git push`))
    .then(cb);
});



/*
 * Vanilla gulp
 */
gulp.task('default', ['test']);
