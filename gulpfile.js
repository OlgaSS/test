import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';

// Передаем значения в глобальную переменную
global.app = {
    path: path,
    gulp: gulp,
}

// Копирование html файлов
const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.gulp.dest(app.path.build.html))
}