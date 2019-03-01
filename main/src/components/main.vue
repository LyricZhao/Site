<template>
    <div class="main" id="main">
        <div class="topbar">
            <topbar @login="showLogin" @center="switchCenter" @apps="switchApps" @memory="switchMemory"> </topbar>
        </div>
        <div class="dialogs">
            <login ref="login"> </login>
            <create ref="create"> </create>
        </div>
        <div :is="current_component"> </div>
    </div>
</template>

<script>

import service_address from '@/settings/address.js'
import topbar from '@/components/topbar.vue'
import create from '@/components/dialogs/create.vue'
import login from '@/components/dialogs/login.vue'
import plaza from '@/components/apps/plaza.vue'

export default {
    data() {
        return {
            name: 'main',
            current_component: undefined
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
            this.$http.post(service_address.login_api, data).then((res) => {
                if(res.body.info === 0) {
                    this.$notify({
                        title: '自动登录成功',
                        type: 'success'
                    })
                } else {
                    this.autoLoginFailed()
                }
            }, () => {
                this.autoLoginFailed()
            })
        }
    },
    methods: {
        autoLoginFailed() {
            this.$notify.error({
                title: '自动登录失败',
                message: '请手动登录'
            })
            document.cookie = "lpuid=;path=/"
            document.cookie = "lppass=;path=/"
        },
        extractUserCookie() {
            let username = document.cookie.replace(/(?:(?:^|.*;\s*)lpuid\s*=\s*([^;]*).*$)|^.*$/, "$1")
            let password = document.cookie.replace(/(?:(?:^|.*;\s*)lppass\s*=\s*([^;]*).*$)|^.*$/, "$1")
            if(!username || !password) {
                return null
            } else {
                return {username, password}
            }
        },
        showLogin() {
            this.$refs.login.visible = true
        },
        switchCenter() {

        },
        switchApps() {
            console.log('!')
            this.current_component = plaza
        },
        switchMemory() {

        }
    }
}
</script>