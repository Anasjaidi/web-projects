// call node modules
const {watch, src, dest, series} = require('gulp');
const	gulp = require('gulp'),
		sass = require('gulp-sass')(require('sass')),
		pug = require('gulp-pug'),
		htmlmin = require('gulp-htmlmin'),
		rename = require('gulp-rename'),
		jsmin = require('gulp-terser'),
		imgmin = require('gulp-imagemin'),
		cssmin = require('gulp-clean-css'),
		prefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		live = require('browser-sync').create(),
		postcss = require('gulp-postcss'),
		tailwind = require('tailwindcss');

// create files and dests vars
const	pugFiles = './src/index.pug',
		pugDest = './dist';
const	sassFiles = './src/sass/**/*.sass',
		sassDest = './dist/css';
const	jsFiles = './src/scripts/**/*.js',
		jsDest = './dist/js';
const	imgFiles = './src/img/**/*',
		imgDest = './dist/img';

// create tasks function
const	sassFunction = function (){
	return src(sassFiles, {sourcemaps:true})
			.pipe(sass())
			.pipe(postcss([
				tailwind('./tailwind.config.js')
			]))
			.pipe(prefixer('last 7 versions'))
			.pipe(dest(sassDest))
}
const pugFunction = function (){
	return src(pugFiles, {sourcemaps:true})
			.pipe(pug({pretty:true}))
			.pipe(dest(pugDest));
}
const jsFunction = function (){
	return src(jsFiles)
			.pipe(concat('main.js'))
			.pipe(dest(jsDest));
}
const	cssminFunction = function (){
	return src('../dist/css/main.css')
			.pipe(cssmin())
			.pipe(rename('all.min.css'))
			.pipe(dest(sassDest));
}
const	jsminFunction = function (){
	return src('../dist/js/main.js')
			.pipe(jsmin())
			.pipe(rename('all.min.js'))
			.pipe(gulp.dest(jsDest));
}
const	htmlminFunction = function (){
	return src('../dist/index.html')
			.pipe(htmlmin({collapseWhitespace:true}))
			.pipe(dest(pugDest));
}
const	imgminFunction = function () {
	return	src('../dist/imgs/**/*')
			.pipe(imgmin())
			.pipe(dest(imgDest));
}
var	imgFunction = function (){
	return src(imgFiles)
			.pipe(dest(imgDest));
}
const	minFunction = function (){
	return jsminFunction(), cssminFunction(), htmlminFunction(), imgminFunction();

}
var	serverFunction = function(cb)
{
	live.init({
		server : {
			baseDir: './dist'
		}
	});
	cb();
}
var	sync = function(cb)
{
	live.reload();
	cb();
}

var	watchFunction = function (){
	gulp.watch(pugFiles, series(pugFunction, sassFunction, sync));
	gulp.watch(sassFiles, series(sassFunction, sync));
	gulp.watch(jsFiles, series(jsFunction, sync));
	gulp.watch(imgDest, series(imgFunction, sync));
	gulp.watch('./dist/**/*', sync);
}

// create tasks 
exports.sass = sassFunction;
exports.pug = series(pugFunction, sassFunction);
exports.js = jsFunction;
exports.htmlmin = htmlminFunction;
exports.jsmin = jsminFunction;
exports.cssmin = cssminFunction;
exports.min = minFunction;
exports.img = imgFunction;
exports.server = serverFunction;
exports.watch = watchFunction;

// default gulp task
exports.default = series(sassFunction, pugFunction, jsFunction, imgFunction, serverFunction, watchFunction);
