const gulp = require('gulp');

const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer');
const sass = require('gulp-dart-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const gcmqp = require('gulp-css-mqpacker');


// Copy Bootstrap JS-files
gulp.task('copy-js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    ])
        .pipe(newer('./dist/js'))
        .pipe(notify({message: 'Copy JS files'}))
        .pipe(gulp.dest('./dist/js'));
});

// Compile sass into CSS (/src/css/)
gulp.task('sass', () =>
    gulp
        .src('./scss/style.scss')
        .pipe(
            plumber({
                errorHandler: notify.onError({
                    title: 'SASS compile error!',
                    message: '<%= error.message %>',
                }),
            })
        )
        .pipe(sourcemaps.init())
        // outputStyle: expanded or compressed
        .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(gcmqp())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('./dist/css'))
);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
            directory: true,
        },
        server: {
            startPath: 'index.html',
            port: 7777,
            ui: {
                port: 7779,
            },
        }
    });
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('*/*.js').on('change', browserSync.reload);
    gulp.watch('*/*.css').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('sass'));
gulp.task('default', gulp.series('copy-js', 'sass', 'browser-sync'));