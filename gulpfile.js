var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var print = require('gulp-print');
var filter = require('gulp-filter');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

var publicDir = 'public';

var src = {
  css: [ // TODO(pcsforeducation) should be bower based.
    'public/css/*.css',
    'bower_components/datatables.net-bs/css/dataTables.bootstrap.css',
    '!public/css/min.css'
  ],
  js: [
    //'bower_components/jquery/dist/jquery.js',
    // NOTE(pcsforeducation) Not sure what the deal is here..but bower version breaks
    'public/js/jquery.min.js',
    'bower_components/Chart.js/Chart.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/underscore/underscore.js',
    'bower_components/zeroclipboard/dist/ZeroClipboard.js',
    'bower_components/socket.io-client/socket.io.js',
    'bower_components/datatables.net/js/jquery.dataTables.js',
    'bower_components/datatables.net-bs/js/dataTables.bootstrap.js',
    'public/js/funcs.js',
    'public/js/eventhandler.js'
  ]
};

var dist = {
  css: publicDir + '/css/',
  js: publicDir + '/js/',
  fonts: publicDir + '/fonts/'
};

/**
 * Build our font from the icon svg.
 *
 * @return {*} A gulp stream that performs this action.
 */
gulp.task('iconfont', function() {
  gulp.src([dist.fonts + 'openstack/*.svg'])
    .pipe(iconfont({
      fontName: 'openstack',
      appendCodepoints: true,
      appendUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
    }))
    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs,
        fontName: 'openstack',
        fontPath: '../fonts/openstack/',
        className: 'of'
      };
      return gulp.src(dist.fonts + 'openstack/font-openstack.css')
        .pipe(consolidate('lodash', options))
        .pipe(gulp.dest(dist.css));
    })
    .pipe(gulp.dest(dist.fonts + 'openstack/'));
});

/**
 * Compress and Combine CSS & JS
 */
gulp.task('css', function () {
  return gulp.src(src.css)
    .pipe(print())
    .pipe(concat('min.css'))
    //.pipe(cssmin())
    .pipe(gulp.dest(dist.css))
});

gulp.task('js', function () {
  return gulp.src(src.js)
    .pipe(print())
    .pipe(concat('min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(dist.js))
});

gulp.task('lint', function() {});

gulp.task('default', ['js', 'css']);
