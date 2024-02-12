import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            injectRegister: 'auto',
            registerType  : 'autoUpdate',
            workbox       : {
                cleanupOutdatedCaches: true,
                cacheId              : 'v0.0.1',
            },
            manifest      : {
                'name'            : 'ЦУР Помощник',
                'short_name'      : 'ЦУР',
                'theme_color'     : '#84A0EF',
                'background_color': '#23252D',
                'display'         : 'standalone',
                'orientation'     : 'portrait',
                'start_url'       : '.',
                'icons'           : [
                    {
                        'src'  : '/cur-logo.png',
                        'sizes': '64x64',
                        'type' : 'image/png',
                    },
                    {
                        'src'  : '/cur-logo.png',
                        'sizes': '192x192',
                        'type' : 'image/png',
                    },
                    {
                        'src'  : '/cur-logo.png',
                        'sizes': '256x256',
                        'type' : 'image/png',
                    },
                    {
                        'src'  : '/cur-logo.png',
                        'sizes': '384x384',
                        'type' : 'image/png',
                    },
                    {
                        'src'  : '/cur-logo.png',
                        'sizes': '512x512',
                        'type' : 'image/png',
                    },
                ],
            },
        }),
    ],
    css    : {
        modules: {
            generateScopedName: '[name]_[local]_[hash:base64:5]',
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    build  : {
        manifest: true,
    },
});