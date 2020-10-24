const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify =  require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    ghPages = require('gulp-gh-pages');

gulp.task('browser-sync', function(){
browserSync({
    server: {
        baseDir: 'app'
    },
    notify: false
    });
});

gulp.task('scss', function(){
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('code', function(){
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('css-min',  function(){
    return gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('deploy', function() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('code'))
    gulp.watch(['app/js/index.js', 'app/libs/**/*.js'], gulp.parallel('scripts'))
})

gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick-carousel/slick/slick.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
})


gulp.task('clean', async function(){
    return del.sync('dist')
})

gulp.task('img', function (){
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('prebuild', async function(){
    let buildCss = gulp.src('app/css/main.css')
        .pipe(gulp.dest('dist/css'))
    let buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'))
    let buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
    let buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))

})

gulp.task('default', gulp.parallel('scss', 'scripts', 'browser-sync', 'watch'))
gulp.task('build', gulp.parallel('prebuild',  'clean', 'css-min', 'img', 'scss', 'scripts' ))
