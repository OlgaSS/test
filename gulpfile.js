import gulp from 'gulp';
import { deleteAsync } from 'del';
// Импорт путей
import { path } from './gulp/config/path.js';

// Передаем значения в глобальную переменную
global.app = {
    path: path,
    gulp: gulp,
}

// Удаление папки dist
const reset = () => {
    return deleteAsync(app.path.clean);
}

// Копирование html файлов
const html = () => {
    return app.gulp.src(app.path.src.html)
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