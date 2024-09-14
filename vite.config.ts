// vite.config.ts

/// <reference types="vitest" />

import { resolve }      from 'path';
import { defineConfig } from 'vite';
import dts              from 'vite-plugin-dts';
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build:   {
        lib: {
            entry:    resolve(__dirname, 'src/index.ts'),
            name:     'symfony-routes',
            fileName: 'index',
        },
    },
    plugins: [dts({
        insertTypesEntry: true,
    })],
});
