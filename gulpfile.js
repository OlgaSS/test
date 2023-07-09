import gulp from 'gulp';
import { deleteAsync } from 'del';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
const sass = gulpSass(dartSass);

// Импорт путей, плагинов
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную
global.app = {
    build: process.argv.includes('--build'),
    dev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Удаление папки dist
const reset = () => {
    return deleteAsync(app.path.clean);
}

// Копирование html файлов и изменение пути к картинкам
const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}

// Обработка стилей
const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.dev })
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.build,
            groupCssMediaQueries()
        ))
        .pipe(app.plugins.if(
            app.build,
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })
        ))
        .pipe(app.plugins.if(
            app.build,
            cleanCss()
        ))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}

// Копирование js файлов
const js = () => {
    return app.gulp.src(app.path.src.js)
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}

// Копирование изображений
const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream());
}

// Обновление страницы в браузере
const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        port: 3000,
    });
}

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// Сценарий выполнения задач
const mainTasks = gulp.parallel(html, scss, js, images);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

export { dev }
export { build }

// Выполнение сценария
gulp.task('default', dev);