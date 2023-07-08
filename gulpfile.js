import gulp from 'gulp';
import { deleteAsync } from 'del';
// Импорт путей, плагинов
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную
global.app = {
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
}

// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.html, html);
}

// Сценарий выполнения задач
const dev = gulp.series(reset, html, watcher);

// Выполнение сценария
gulp.task('default', dev);