import replace from 'gulp-replace';
import browsersync from 'browser-sync';
import ifPlugin from "gulp-if";

export const plugins = {
    replace: replace,
    browsersync: browsersync,
    if: ifPlugin
}