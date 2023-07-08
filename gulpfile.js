import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';

// Передаем значения в глобальную переменную
global.app = {
    path: path,
    gulp: gulp,
}