var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');




gulp.task('clean', function() {
	del('dist');
	return cache.clearAll(callback);
});

gulp.task('clean:dist', function(callback){
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback);
});

gulp.task('browserSync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
	});
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('useref', function() {
	var assets = useref.assets();

	return gulp.src('app/*.html')
	.pipe(assets)
	.pipe(gulpIf('*.css',minifyCSS()))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(assets.restore())
	.pipe(useref())
	.pipe(gulp.dest('dist'));
});


gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', function (callback) {
  runSequence(
    'sass', 'useref', 'images',
    callback
  );
});

gulp.task('run', function(callback) {
	runSequence('build');
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
})
