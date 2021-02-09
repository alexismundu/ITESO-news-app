let gulp = require('gulp');
let sass = require('gulp-sass');
let typescript = require('gulp-typescript');

gulp.task('html', function () {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});


gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/styles'));
});

gulp.task('scripts', function () {
    let tsConfig = typescript.createProject('tsconfig.json');
    return tsConfig.src()
    .pipe(typescript())
    .pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('default', gulp.parallel(['styles', 'scripts', 'html']));