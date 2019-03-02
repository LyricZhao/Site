<template>
    <div class="main" id="main">
        <div v-show="logined">
            <el-menu default-active="memory" mode="horizontal" @select="handleSelect">
                <el-menu-item index="center"> 个人中心 </el-menu-item>
                <el-menu-item index="memory"> Memory </el-menu-item>
                <el-menu-item index="apps"> 应用广场 </el-menu-item>
                <el-menu-item index="create" v-show="is_admin"> 邀请朋友 </el-menu-item>
                <el-menu-item index="logout"> 退出登录 </el-menu-item>
            </el-menu>
        </div>
        <div v-show="!logined">
            <el-menu default-active="memory" mode="horizontal" @select="handleSelect">
                <el-menu-item index="login"> 登录 </el-menu-item>
                <el-menu-item index="memory"> Memory </el-menu-item>
                <el-menu-item index="apps"> 应用广场 </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style scoped>
</style>


<script>

export default {
    name: 'topbar',
    data() {
        return {
            logined: false,
            is_admin: false
        }
    },
    methods: {
        handleSelect(key) {
            let keys = ['login', 'center', 'apps', 'memory', 'create']
            if(keys.includes(key)) {
                this.$emit(key)
            } else if(key === 'logout') {
                this.logout()
            }
        },
        switchStatus() {
            this.logined = !this.logined
            if(this.logined) {
                this.is_admin = ['管理员', '小仙女'].includes(sessionStorage.getItem('level_name'))
            }
        },
        logout() {
            document.cookie = "lpuid=;path=/"
            document.cookie = "lppass=;path=/"
            this.$emit('logout')
        }
    }
}
</script>
