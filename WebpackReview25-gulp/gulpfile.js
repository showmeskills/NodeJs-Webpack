const gulp = require('gulp');
const uglify = require('gulp-uglify');//用于js文件压缩
const concat = require('gulp-concat');//用于js文件合并
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const path = require('path');
const demo =()=>{
    return gulp.src(path.join(__dirname,'src/index.js'))
            .pipe(gulp.dest(path.join(__dirname,'dist/scripts/')))
}

const scripts = ()=>{
    return gulp.src(path.join(__dirname,'src/**/*.js'))
            .pipe(uglify())
            .pipe(concat('main.min.js'))
            .pipe(gulp.dest(path.join(__dirname,'dist/scripts/')))
}


const styleLess = ()=>{
    return gulp.src(path.join(__dirname,'src/**/*.less'))
            .pipe(less())
            .pipe(cleanCss())
            .pipe(concat('bundle.css'))
            .pipe(rename({
                basename:'main',
                suffix:'.min'
            }))
            .pipe(gulp.dest(path.join(__dirname,'dist/styles/')))
}

const watch = ()=>{
    gulp.watch('./src/**/*.js',scripts)
    gulp.watch('./src/**/*.less',styleLess)
}

exports.demo = demo;
exports.scripts = scripts;
exports.styleLess = styleLess;
exports.default = watch;