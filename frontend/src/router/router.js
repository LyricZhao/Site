import vue from 'vue'
import router from 'vue-router'

import test_page from '@/components/test_page.vue'
import main from '@/components/main.vue'
import debug from '@/components/debug.vue'

vue.use(router)

export default new router({
    routes: [
        /* Test Page */ {
            path: '/test_page',
            name: 'test_page',
            component: test_page
        },
        /* Main */ {
            path: '/main',
            name: 'main',
            component: main
        },
        /* Debug */ {
            path: '/debug',
            name: 'debug',
            component: debug
        }
    ]
})
