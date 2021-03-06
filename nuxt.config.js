import colors from 'vuetify/es5/util/colors'

export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: 'SUNHOUSE',
        title: 'SUNHOUSE',
        htmlAttrs: {
            lang: 'vi',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // proxy: true,
        credentials: true,
    },

    proxy: {
        // '/api': {
        //     target: process..env.API_URL,
        //     target: process.env.API_URL,
        //     pathRewrite: { '^/api': '' },
        // },
    },
    auth: {
        strategies: {
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: process.env.APP_URL,

                cookie: {
                    // (optional) If set we check this cookie exsistence for loggedIn check
                    name: 'XSRF-TOKEN',
                },
                endpoints: {
                    login: { url: '/api/auth/login', method: 'post', propertyName: 'user' },
                    logout: { url: '/api/auth/logout' },
                    user: { url: '/api/auth/user', method: 'get', propertyName: null },
                    csrf: {
                        url: '/sanctum/csrf-cookie',
                    },
                },

                redirect: {
                    login: '/login',
                    logout: '/',
                    home: '/',
                },
                user: {
                    property: null,
                },
            },
            local: {
                url: process.env.APP_URL,
                endpoints: {
                    login: {
                        url: process.env.USER_LOGIN_URL,
                        method: 'post',
                        withCredentials: true,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json',
                        },
                    },
                    user: {
                        url: process.env.USER_INFO_URL,
                        method: 'get',
                        propertyName: false,
                        withCredentials: true,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'Content-Type': 'application/json',
                        },
                    },
                },
                tokenRequired: false,
                tokenType: false,
            },
        },
    },
    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,

                    sunhouse_primary: '#3CB372',
                    sunhouse_secondary: '#2C9494',
                    sunhouse_pinkLinght: '#FBB2D2',
                    sunhouse_pinkDeep: '#FF9CC7',
                    sunhouse_darkSky: '#23717D',
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
}
