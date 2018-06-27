'use strict';
const gulp = require('gulp'),// Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    // prefixer = require('gulp-autoprefixer'),
    // uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    // rimraf = require('rimraf'),
    reload = browserSync.reload;
    
    var path = {
        build: {
            html: 'public/',
            js: 'public/js/',
            css: 'public/css/',
        },
        src: {
            html: 'src/*.html',
            js: 'src/js/main.js',
            style: 'src/sass/main.scss',
        },
        watch: {
            html: 'src/**/*.html',
            js: 'src/js/**/*.js',
            style: 'src/sass/**/*.scss',
            img: 'src/img/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        clean: './build'
    };
    
    var config = {
        server: {
            baseDir: "./public"
        },
        tunnel: true,
        host: 'localhost',
        port: 3000,
        logPrefix: "Frontend_Devil"
    };
    
    gulp.task('webserver', function () {
        browserSync(config);
    });

    // gulp.task('minify-css', () => {
    //     return gulp.src('styles/*.css')
    //       .pipe(cleanCSS({compatibility: 'ie8'}))
    //       .pipe(gulp.dest('dist'));
    // });
      
    
    // gulp.task('clean', function (cb) {
    //     rimraf(path.clean, cb);
    // });
    
    gulp.task('html:build', function () {
        gulp.src(path.src.html) 
            .pipe(rigger())
            .pipe(gulp.dest(path.build.html))
            .pipe(reload({stream: true}));
    });
    
    // gulp.task('js:build', function () {
    //     gulp.src(path.src.js) 
    //         .pipe(rigger()) 
    //         .pipe(sourcemaps.init()) 
    //         .pipe(uglify()) 
    //         .pipe(sourcemaps.write()) 
    //         .pipe(gulp.dest(path.build.js))
    //         .pipe(reload({stream: true}));
    // });
    
    gulp.task('style:build', function () {
        gulp.src(path.src.style) 
            // .pipe(sourcemaps.init())
            .pipe(sass({
                // sourceMap: true,
                // errLogToConsole: true
            }))
            // .pipe(prefixer())
            .pipe(sourcemaps.init())
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            // .pipe(cleanCSS({compatibility: 'ie8'}))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest(path.build.css))
            .pipe(reload({stream: true}));
    });
    

// gulp.task('minify-css',() => {
//   return gulp.src('./src/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(cleanCSS())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('dist'));
// });
    
gulp.task('build', [
        'html:build',
        // 'js:build',
        'style:build',
]);
    
    
gulp.task('watch', function(){
        watch([path.watch.html], function(event, cb) {
            gulp.start('html:build');
        });
        watch([path.watch.style], function(event, cb) {
            gulp.start('style:build');
        });
        // watch([path.watch.js], function(event, cb) {
        //     gulp.start('js:build');
        // });
});
    
gulp.task('default', ['build', 'webserver', 'watch']);
    
gulp.task('hello', function() {
    console.log('Hello Gulp!!');
});    
