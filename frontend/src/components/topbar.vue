<template>
    <div class="main" id="main">
        <div v-show="logined">
            <el-menu default-active="" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="">
                    <i class="el-icon-star-off" style="margin-top: -5px"></i>
                    祝最爱的欣然女生节快乐
                </el-menu-item>
                <el-menu-item index="center"> 个人中心 </el-menu-item>
                <el-menu-item index="memory"> Memory </el-menu-item>
                <el-menu-item index="apps"> 应用广场 </el-menu-item>
                <el-menu-item index="create" v-show="is_admin"> 邀请朋友 </el-menu-item>
                <el-menu-item index="logout"> 退出登录 </el-menu-item>
            </el-menu>
        </div>
        <div v-show="!logined">
            <el-menu default-active="" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item index="">
                    <i class="el-icon-star-off" style="margin-top: -5px"></i>
                    祝最爱的欣然女生节快乐
                </el-menu-item>
                <el-menu-item index="login"> 登录 </el-menu-item>
                <el-menu-item index="memory"> Memory </el-menu-item>
                <el-menu-item index="apps"> 应用广场 </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

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
            if(!key) return
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
