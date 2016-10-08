var gulp = require('gulp'),
    gutil = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');
    connect = require('gulp-connect');
    opn = require('opn');
    htmlmin = require('gulp-htmlmin');
    config = require('./gulp.config')();
    print = require('gulp-print');
    eslint = require('gulp-eslint');
    args = require('yargs').argv;
    plumber = require('gulp-plumber');
    scss = require('gulp-sass');
    imagemin = require('gulp-imagemin');
    gulporder = require('gulp-order');
    inject = require('gulp-inject');
    wiredep = require('gulp-wiredep');
    htmlmin = require('gulp-htmlmin');
    clean = require('gulp-clean');
    rimraf = require('gulp-rimraf');
    gulpSequence = require('gulp-sequence');
    ghPages = require('gulp-gh-pages');
    concatCss = require('gulp-concat-css');
    cleanCss = require('gulp-clean-css');
    concat = require('gulp-concat');
    Server = require('karma').Server;



gulp.task('build', function (callback) {
  gulpSequence('lint', 'clean', 'images', 'html', 'styles', 'styles-inject', 'wiredep', 'js', 'js-inject')(callback);
});

gulp.task('deploy', ['build'], function () {
  return gulp
    .src(config.build + '**/*')
    .pipe(ghPages({cacheDir : config.dist}));
})

gulp.task('test', function (done) {
  new Server(
    config.getKarmaConfig(true),
  done).start();
});

gulp.task('tdd', function (done) {
  new Server({
    config : config.getKarmaConfig(),
  }, done).start();
})

gulp.task('html', function () {
    var production  = args.mode === 'production' ? true : false;
    gulp
    .src(config.root + config.index)
    .pipe(gulp.dest(config.build));

    return gulp
    .src(config.html)
    .pipe(gulpif(production, htmlmin()))
    .pipe(gulp.dest(config.build + config.appdir));
});

gulp.task('clean', function () {
    return gulp
      .src(config.build, {read: false})
      .pipe(rimraf({force : true}));
})

gulp.task('reload', ['build'], function () {
  return gulp.src('build/**/**.*')
    .pipe(connect.reload());
});

gulp.task('connect', ['build'], function (done) {
  connect.server({
    root: 'build',
    port: 8080,
    livereload: true
  });
  opn('http://localhost:8080', done);
});

gulp.task('watch', function () {
  gulp.watch([config.images, config.js, config.html, config.sass], ['reload']);
});

gulp.task('serve', ['connect', 'watch']);

gulp.task('lint', function () {
  log('Analyzing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe(gulpif(args.verbose, print()))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('styles', function () {
  var production  = args.mode === 'production' ? true : false;

  log('Compiling Sass --> CSS');
    return gulp
    .src(config.sass)
    .pipe(plumber())
    .pipe(scss())
    .pipe(gulpif(production, concatCss('/bundle.css')))
    .pipe(gulpif(production, cleanCss()))
    .pipe(gulp.dest(config.build + 'styles'));
});

gulp.task('styles-inject', function () {
  return gulp
  .src(config.build + config.index)
  .pipe(inject(gulp.src(config.build + config.css, {read : false}), {relative : true}))
  .pipe(gulp.dest(config.build));
})

gulp.task('images', [], function () {
  log('Compressing and copying images');

  return gulp
    .src(config.images)
    .pipe(imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.build + 'images/'));

});

gulp.task('copybower',['copybower-js', 'copybower-styles']);

gulp.task('copybower-js', function () {
  var sources = config.libFiles['js'];
  var production  = args.mode === 'production' ? true : false;
  return gulp
  .src(sources)
  .pipe(gulpif(production, uglify()))
  .pipe(gulpif(production, concat('bundle.js')))
  .pipe(gulp.dest(config.build + config.lib));
})

gulp.task('copybower-styles', function () {
  var sources = config.libFiles['css'];
  var production  = args.mode === 'production' ? true : false;
  return gulp
  .src(sources)
  .pipe(gulpif(production, uglify()))
  .pipe(gulpif(production, concat('bundle.css')))
  .pipe(gulp.dest(config.build + config.lib));
})

gulp.task('wiredep', ['copybower'], function() {
  log('Wiring the bower dependencies into the html');

  // Only include stubs if flag is enabled

  return gulp
  .src(config.build + config.index)
  .pipe(inject(gulp.src(config.build + config.lib + '/*.*'), {name : 'bower', relative : true}))
  .pipe(gulp.dest(config.build));
});

gulp.task('js', function () {
  log('Copying files to build dir')
  return gulp
    .src(config.js)
    .pipe(gulp.dest(config.build + config.appdir));
})

gulp.task('js-inject', function () {
  return gulp
  .src(config.build + config.index)
  .pipe(inject(gulp.src(config.buildjsOrder), {relative : true}))
  .pipe(gulp.dest(config.build));
})


function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        gutil.log(gutil.colors.blue(msg[item]));
      }
    }
  } else {
    gutil.log(gutil.colors.blue(msg));
  }
}
