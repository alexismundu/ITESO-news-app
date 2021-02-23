let gulp = require('gulp');
let sass = require('gulp-sass');
let typescript = require('gulp-typescript');
let webserver = require('gulp-webserver');

const BUILD_PATH = 'public';

// gulp.task('html', function () {
//     return gulp.src('views/index.html')
//     .pipe(gulp.dest(BUILD_PATH));
// });

// gulp.task('watch:html', gulp.series('html', function(done) {
//     gulp.watch('src/**/*.html', gulp.series('html'));
//     done();
// }));

gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('watch:styles', gulp.series('styles', function(done) {
    gulp.watch('src/**/*.scss', gulp.series('styles'));
    done();
}));

gulp.task('scripts', function () {
    let tsConfig = typescript.createProject('tsconfig.json');
    return tsConfig.src()
    .pipe(typescript())
    .pipe(gulp.dest(BUILD_PATH + '/assets/scripts'));
});

gulp.task('watch:scripts', gulp.series('scripts', function(done) {
    gulp.watch('src/**/*.ts', gulp.series('scripts'));
    done();
}));

gulp.task('serve', function() {
    return gulp.src(BUILD_PATH).pipe(
        webserver({
            open:true,
            livereload: true,
            port: 3000
        })
    );
})

// gulp.task('default', gulp.parallel(['watch:styles',  'watch:html', 'watch:scripts', 'serve']));
gulp.task('default', gulp.parallel(['watch:styles', 'watch:scripts', 'serve']));