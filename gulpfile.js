/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload,
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename');

gulp.task('serve',['browser-sync'], function(){
    //console.log("Server is woking");
    gulp.watch('public/**/*.js').on('change', reload);
    gulp.watch('public/**/*.css').on('change', reload);
    gulp.watch('public/**/*.html').on('change', reload);
});

gulp.task('browser-sync',['nodemon'], function(){
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        browser: 'google-chrome',
        port: 5000
    });
});

gulp.task('nodemon', function(done){
    console.log("Server restarted");
    var running = false;
    return nodemon({
        script : 'app.js',
        watch: ['app.js', 'public/**/*.js']
    }).on('start', function(){
        if(!running){
            done();
        }
        running = true;
    }).on('restart', function(){
        setTimeout(function(){
            reload();
        }, 500);
    });
});


/**rajesh gulp task **/


/**
 * Compile sass file to css
 */

gulp.task('compileSass',function(){

    gulp.src('./resources/assets/sass/main.scss')

            .pipe(sass().on('Error',sass.logError))
            .pipe(rename('app.css'))
            .pipe(gulp.dest('./public/stylesheets'));

            //for test only
            console.log('compiles sass file');

});


/**
 * watch sass files
 */

gulp.task('sass:watch',function(){

    gulp.watch('./resources/assets/sass/**',['compileSass']);

    //for test only
    console.log('sass file changed');

});

gulp.task('default', ['serve']);

