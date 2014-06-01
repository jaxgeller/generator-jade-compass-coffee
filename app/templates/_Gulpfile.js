// Util
var gulp =require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

// Plugins
var compass = require('gulp-compass');
var browserify = require('gulp-browserify');
var jade = require('gulp-jade');
var imagemin = require('gulp-imagemin');

var p = {
  sass: {
    src:'public/sass/main.scss',
    dest:'build/public/style/'
  },
  scripts: {
    src: 'public/scripts/main.coffee',
    dest: 'build/public/scripts/'
  },
  jade: {
    src: 'jade/*.jade',
    dest: 'build/views/' <% if (angular) { , %>
    index: {
      src: 'jade/index.jade',
      dest: 'build/'
    }
    <% } %> 
  }
}

// Livereload
gulp.task('connect', function() {
  connect.server({
    root:'build',
    livereload: true,
    port: 8000
  })
})

// Compass
gulp.task('compass', function() {
  gulp.src(p.sass.src)
    .pipe(compass({
      css: 'build/public/style',
      sass: 'public/sass', 
      require: ['susy', 'breakpoint', 'modular-scale']
    }))
    .on('error', function(err) {
      console.log(err) // plumber was not very good with compass
    })
    .pipe(minifyCss())
    .pipe(gulp.dest(p.sass.dest))
    .pipe(connect.reload())
}) 

// Coffee
gulp.task('browserify', function() {
  gulp.src(p.scripts.src, {read: false})
    .pipe(plumber())
    .pipe(browserify({
      transform: ['coffeeify'],
      extensions: ['.coffee']
    }))
    .pipe(rename('main.js'))
    <% if (!angular) {.pipe(uglify())} %>
    .pipe(gulp.dest(p.scripts.dest))
    .pipe(connect.reload())
})

// Jade
gulp.task('jade', function() {
  gulp.src(p.jade.src)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(p.jade.dest))
    .pipe(connect.reload())
})
<% if (angular) { %>
gulp.task('jadeIndex', function() {
  gulp.src(p.jade.index.src)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(p.jade.index.dest))
    .pipe(connect.reload())
})
<% } %>

// Images
gulp.task('images', function() {
  gulp.src('public/images/**/*')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('build/public/images/'))
    .pipe(connect.reload())
})

// Watch
gulp.task('watch', function() {
  gulp.watch('public/sass/**/*.scss', ['compass']);
  gulp.watch('public/scripts/**/*.coffee', ['browserify']);
  gulp.watch('jade/**/*.jade', ['jade']);
  gulp.watch('public/images/**',['images']);
})

// Go
gulp.task('default', ['connect', 'compass', 'browserify', 'jade', <% if (angular) { 'jadeIndex', } %> 'images', 'watch'], function() {
  console.log('Starting up gulp!')
})
