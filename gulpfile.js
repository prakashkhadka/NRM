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
    maps      =   require('gulp-sourceMaps');

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

    gulp.src('./resources/assets/scss/main.scss')

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

    gulp.watch('./resources/assets/scss/**',['compileSass'])
    
    //for test only
    console.log('sass file changed');

});


/**
 * move bootstrap scss package
 * 
 */

gulp.task('moveSass',function(){

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
})


/**
 * gulp default task
 */
gulp.task('default', ['serve']);

