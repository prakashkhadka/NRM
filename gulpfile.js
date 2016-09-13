/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gulp            =   require('gulp');
    nodemon         =   require('gulp-nodemon'),
    sass            =   require('gulp-sass'),
    rename          =   require('gulp-rename'),
    plumber         =   require('gulp-plumber'),
    browserSync     =   require('browser-sync').create(),
    reload          =   browserSync.reload,
    maps            =   require('gulp-sourceMaps');

gulp.task('serve',['browser-sync'], function(){
    console.log("Server is woking");
    gulp.watch('public/**/*.js').on('change', reload);
    gulp.watch('public/**/*.css').on('change', reload);
    gulp.watch('public/**/*.html').on('change', reload);
    gulp.watch('public/stylesheets/app.css').on('change', reload);
});

gulp.task('browser-sync',['nodemon'], function(){
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        browser: 'google-chrome',
        port: 5000
    });
});

gulp.task('compileSass',function(){
    console.log("compileSass Working");
    gulp.src('resources/assets/scss/main.scss')
        .pipe(sass().on('Error',sass.logError))
        .pipe(rename('app.css'))
        .pipe(gulp.dest('public/stylesheets'));
        console.log('compiles sass file');
});
gulp.task('sassWatch',function(){
    console.log("sassWatch working");
    gulp.watch('resources/assets/**/*.scss',['compileSass']);
});

gulp.task('nodemon', function(done){
    console.log("Server restarted");
    var running = false;
    return nodemon({
        script : 'app.js',
        watch: ['app.js', 'app_client/**/**.*']
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
gulp.task('default', ['serve', 'sassWatch']);

gulp.task('moveSass',function(){
    console.log("I am moveSass");
    gulp.src('bower_components/bootstrap/scss/**/*')
    .pipe(plumber({
        errorHandler:function(error){
            console.log('Error occured while compiling sass ');
            console.log(error.toString);
            this.emit('end');
        }
    }))
    .pipe(gulp.dest('resources/assets/scss/vendors/bootstrap'));
    console.log('Successfully moved bootstrap sass port files.');
});

