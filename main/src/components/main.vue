<template>
    <div class="main" id="main">
        <audio id="bgm" loop src="/music/pauline.mp3"> </audio>
        <div class="topbar">
            <topbar ref="topbar" @login="showLogin" @logout="logout" @center="showCenter" @apps="switchApps" @memory="switchMemory"> </topbar>
        </div>
        <div class="dialogs">
            <login ref="login" @successLogin="onLogin"> </login>
            <create ref="create"> </create>
            <center ref="center" @switchApps="switchAppsAuto" @switchMemory="switchMemoryAuto"> </center>
        </div>
        <div class="center-component">
            <memory ref="memory" v-show="xiu"> </memory>
            <plaza ref="plaza" v-show="!xiu"> </plaza>
        </div>
        <div class="footer">
            <copyright> </copyright>
        </div>
    </div>
</template>

<style scoped>

.center-component {
    position: fixed;
    top: 40%;
    left: 50%;
    width: 80%;
    height: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
}

.footer {
    position: fixed;
    top: 120%;
    left: 50%;
    width: 80%;
    height: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
}

</style>


<script>

import service_address from '@/settings/address.js'
import topbar from '@/components/topbar.vue'
import center from '@/components/dialogs/center.vue'
import create from '@/components/dialogs/create.vue'
import login from '@/components/dialogs/login.vue'
import memory from '@/components/apps/memory.vue'
import plaza from '@/components/apps/plaza.vue'
import copyright from '@/components/copyright.vue'

export default {
    data() {
        return {
            name: 'main',
            xiu: true
        }
    },
    components: {
        create: create,
        center: center,
        login: login,
        topbar: topbar,
        memory: memory,
        plaza: plaza,
        copyright: copyright
    },
    mounted() {
        /* FOR DEBUG */
        sessionStorage.setItem('real_name', '丁欣然')
        // this.showCenter()

        sessionStorage.setItem('logined', false)
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
                    sessionStorage.setItem('real_name', res.body.real_name)
                    sessionStorage.setItem('token', res.body.token)
                    sessionStorage.setItem('username', res.body.username)
                    this.onLogin()
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
        switchStatus() {
            this.$refs.topbar.switchStatus()
            this.$refs.memory.switchStatus()
            this.$refs.plaza.switchStatus()
        },
        switchMemoryAuto() {
            this.$refs.memory.switchAuto()
        },
        switchAppsAuto() {
            this.$refs.plaza.switchAuto()
        },
        logout() {
            this.$notify({
                title: '退出登录成功',
                type: 'success'
            })
            this.switchStatus()
        },
        onLogin() {
            this.switchStatus()
        },
        showLogin() {
            this.$refs.login.visible = true
        },
        showCenter() {
            this.$refs.center.show()
        },
        switchApps() {
            this.xiu = false
        },
        switchMemory() {
            this.xiu = true
        }
    }
}
</script>