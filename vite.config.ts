import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: 'src/App.svelte',
            name: 'NestedComponentPlugin',
        },
        rollupOptions: {
            external: ['svelte'],
            output: {
                globals: {
                    svelte: 'svelte',
                }
            },
        },
    },
    plugins: [svelte({
        /*compilerOptions:{
            customElement: true
        }*/
    })],
})
