<template>
    <div class="main" id="main">
        <div class="topbar">
            <topbar> </topbar>
        </div>
        <div :is="current_component" v-on:mounted="onChildComponentMounted"></div>
    </div>
</template>

<script>

import create from '@/components/pages/create.vue'
import topbar from '@/components/topbar.vue'
import login from '@/components/pages/login.vue'
import ServiceAddress from '@/settings/address.js'

export default {
    data() {
        return {
            name: 'main',
            current_component: login
        }
    },
    components: {
        create: create,
        login: login,
        topbar: topbar
    },
    mounted() {
        let data = this.extractUserCookie()
        if(data) {
            this.$notify.info({
                title: '登录',
                message: '正在尝试自动登录'
            })
            this.$http.post(ServiceAddress.login_api, data).then((res) => {
                if(res.body.info === 0) {
                    this.$notify({
                        title: '自动登录成功',
                        type: 'success'
                    })
                } else {
                    this.$notify.error({
                        title: '自动登录失败',
                        message: '请手动登录'
                    })
                    document.cookie = "lpuid=;path=/";
                    document.cookie = "lppass=;path=/";
                }
            })
        }
    },
    methods: {
        extractUserCookie() {
            let username = document.cookie.replace(/(?:(?:^|.*;\s*)lpuid\s*=\s*([^;]*).*$)|^.*$/, "$1")
            let password = document.cookie.replace(/(?:(?:^|.*;\s*)lppass\s*=\s*([^;]*).*$)|^.*$/, "$1")
            if(!username || !password) {
                return null
            } else {
                return {username, password}
            }
        },
        onChildComponentMounted() {}
    }
}
</script>