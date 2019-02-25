import vue from 'vue'
import router from 'vue-router'

import login from '@/components/login.vue'
import create from '@/components/create.vue'
import say from '@/components/say.vue'
import test_page from '@/components/test_page.vue'

vue.use(router)

export default new router({
    routes: [
        /* Login */ {
            path: '/login',
            name: 'login',
            component: login
        },
        /* Create */ {
            path: '/create',
            name: 'create',
            component: create
        },
        /* Say */ {
            path: '/say',
            name: 'say',
            component: say
        },
        /* Test Page */ {
            path: '/test_page',
            name: 'test_page',
            component: test_page
        }
    ]
})
