var gulp = require('gulp'),
	jade = require('gulp-jade'),
	runSequence = require('run-sequence'),
	plumber = require('gulp-plumber'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
    reload      = browserSync.reload,
	gutil = require('gulp-util');

var onError = function (err) {
	gutil.beep();
	console.log(err);
};

gulp.task('jade', function() {
	return gulp.src('./src/jade/*.jade')
		.pipe(plumber(onError))
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	});
});

gulp.task('clean', function () {
	return gulp.src('build')
		.pipe(clean({}));
});

gulp.task('copy', function() {
	gulp.src('src/*.html').pipe(gulp.dest('build'));
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('build/img'));

	gulp.src('src/fonts/**')
		.pipe(gulp.dest('build/fonts'));

	gulp.src('src/css/**')
		.pipe(gulp.dest('build/css'));

	gulp.src('src/js/**')
		.pipe(gulp.dest('build/js'));

	gulp.src('bower_components/**')
		.pipe(gulp.dest('build/bower_components'));

	gulp.src('CNAME')
		.pipe(gulp.dest('build/'));
});


gulp.task('_build', function(cb) {
	runSequence('jade', 'copy', cb);
});

gulp.task('build', function(cb) {
	runSequence('clean', '_build', cb);
});

gulp.task('run', function(cb) {
	runSequence('build', 'browser-sync', cb);
	// gulp.watch('./src/sass/**/*.sass', ['sass']);
	// gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch('./src/jade/*.jade', ['jade']);//.on('change', function (evt) {change_event(evt);});
	// gulp.watch('./src/img/*.png', ['copy']);
	// gulp.watch('./src/img/*.jpg', ['copy']);
	// gulp.watch('./src/img/*.svg', ['copy']);
});