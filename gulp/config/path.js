// Получаем имя папки проекта в rootFolder
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// Пути к папкам
const buildFolder = `./dist`;
const srcFolder = `./src`;

// Сохраняем пути в объект
export const path = {
    build: {},
    src: {},
    watch: {},
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
}