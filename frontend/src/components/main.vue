<template>
    <div class="main" id="main">
        <audio id="bgm" loop src="/music/pauline.mp3"> </audio>
        <div class="background" v-bind:style="`background: url(${background_url}) center`"> </div>
        <div class="dark_background" v-show="dark"> </div>
        <div class="topbar" style="opacity: 0.8;">
            <topbar ref="topbar" @create="showCreate" @login="showLogin" @logout="logout" @center="showCenter" @apps="switchApps" @memory="switchMemory"> </topbar>
        </div>
        <div class="dialogs">
            <login ref="login" @successLogin="onLogin"> </login>
            <create ref="create" @newFriend="refreshFriendList"> </create>
            <center ref="center" @changeProfile="refreshFriendList" @changeBackground="refreshBackground" @switchApps="switchAppsAuto" @switchDark="switchDark" @switchMemory="switchMemoryAuto"> </center>
        </div>
        <div class="center-component">
            <memory ref="memory" v-show="xiu"> </memory>
            <plaza ref="plaza" @memoryChange="refreshMemory" @create="showCreate" v-show="!xiu"> </plaza>
        </div>
        <div class="footer">
            <copyright> </copyright>
        </div>
    </div>
</template>

<style scoped>

.background {
  position: fixed;
  top: 0;
  left: 0;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}

.center-component {
    position: fixed;
    top: 40%;
    left: 50%;
    width: 80%;
    height: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
}

.dark_background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
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

<style>

.el-card {
    margin: 0px auto;
    width: 100%;
    height: 100%;
}

.el-card__body {
    height: 100%;
}

.el-table__header {
    margin: 0px auto;
}

.el-table__body {
    margin: 0px auto;
}

</style>

<script>

import service_address from '@/settings/address.js'
import topbar from '@/components/topbar.vue'
import center from '@/components/dialogs/center.vue'
import create from '@/components/dialogs/create.vue'
import login from '@/components/dialogs/login.vue'
import memory from '@/components/memory.vue'
import plaza from '@/components/apps/plaza.vue'
import copyright from '@/components/copyright.vue'

export default {
    data() {
        return {
            name: 'main',
            xiu: true,
            dark: true,
            background_url: ''
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
                    let levels = ['管理员', '小仙女', '小伙伴']
                    sessionStorage.setItem('real_name', res.body.real_name)
                    sessionStorage.setItem('token', res.body.token)
                    sessionStorage.setItem('username', res.body.username)
                    sessionStorage.setItem('level_name', levels[res.body.level])
                    this.onLogin()
                } else {
                    this.autoLoginFailed()
                    this.refreshBackground()
                }
            }, () => {
                this.autoLoginFailed()
                this.refreshBackground()
            })
        } else {
            this.refreshBackground()
        }
    },
    methods: {
        refreshBackground() {
            let username = ''
            if(sessionStorage.getItem('username')) username = sessionStorage.getItem('username')
            this.background_url = service_address.get_background_api + '?username=' + username + '&random=' + Math.random()
        },
        refreshFriendList() {
            this.$refs.plaza.refreshFriendList()
        },
        refreshMemory() {
            this.$refs.memory.refreshMemory()
        },
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
        switchDark() {
            this.dark = !this.dark
        },
        logout() {
            this.$notify({
                title: '退出登录成功',
                type: 'success'
            })
            sessionStorage.setItem('username', '')
            sessionStorage.setItem('real_name', '')
            sessionStorage.setItem('token', '')
            sessionStorage.setItem('level_name', '')
            this.switchStatus()
            this.refreshBackground()
        },
        onLogin() {
            this.switchStatus()
            this.refreshBackground()
        },
        showCreate() {
            this.$refs.create.visible = true
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