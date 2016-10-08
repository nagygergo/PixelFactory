module.exports = function() {
  var app = './app/';
  var report = './report/';
  var root = './';
  var bower = {
    json: require('./bower.json'),
    directory: './bower_components',
  }
  var wiredep = require('wiredep', {
    bowerJson: bower.json,
    directory: bower.directory,
    ignorePath: bower.ignorePath
  });
  var libFiles = wiredep();
  var angularMocks = bower.directory + '/angular-mocks/angular-mocks.js';
  var alljs = [
    app + '**/*.module.js',
    app + '**/*.js'
  ];

  var config = {
    /**
     * File paths
     */
    // all javascript that we want to vet
    alljs: alljs,
    build: './build/',
    css: 'styles/**/*.css',
    html: app + '**/*.html',
    images: 'images/**/*.*',
    index: 'index.html',
    appdir : 'app/',
    dist : 'dist',
    // app js, with no specs
    js: [
      app + '*.module.js',
      app + '**/*.module.js',
      app + '**/*.js',
      '!' + app + '**/*.spec.js'
    ],

    buildjsOrder: [
      './build/app/*/*.module.js',
      './build/app/**/*.js',
      './build/app/app.module.js'
    ],
    sass: 'styles/**/*.scss',
    report: report,
    root: root,
    libFiles : libFiles,
    lib : '/lib',

    /**
     * optimized files
     */
    optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },

    bower: bower
  };

  config.getKarmaConfig =  function (singleRun) {
    var karmaFiles = libFiles['js'];
    karmaFiles.push(angularMocks);
    karmaFiles = karmaFiles.concat(alljs);
    var options = {
    basePath : '',
    files : karmaFiles,
    browsers : ['Chrome', 'PhantomJs', 'Firefox'],
    plugins: [
            'karma-spec-reporter',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage'
        ],
    autoWatch: true,
    singleRun : singleRun
  };
  return options;
  };
  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
}
