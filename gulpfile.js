'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var wrap = require('gulp-wrap');
 
 // 路径配置
var path = {
  scss: './Src/scss/',
  css: './Content/css/600106/',
  html: './app/region/600106/',
  htmlWrap: '',
}

// sass 编译、sourcemap、浏览器兼容
gulp.task('sass', function () {
  return gulp.src(`${path.scss}**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })
    )
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({stream: true}));
});

// html 建设
gulp.task('build', function(){
    gulp.src('./Src/html/**/*.html')
    .pipe(wrap({src: './Src/template/common.html'}))
    .pipe(gulp.dest(path.html))
    .pipe(browserSync.reload({stream: true}));
});
 
 // wacth
gulp.task('watch', ['browserSync','build'], function () {
  gulp.watch(`${path.scss}**/*.scss`, ['sass']);
  gulp.watch(['./Src/html/**/*.html'], ['build']);
});

// 浏览器同步
gulp.task('browserSync', function(){
    browserSync({server: {baseDir: './'}}, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
});

// 浏览器自动刷新
gulp.task('autoreload', function(){
    browserSync.reload();
});

// 默认启动项
gulp.task('default', ['sass','watch']);