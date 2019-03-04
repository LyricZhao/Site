<template>
    <el-container>
        <el-header>
            <h2> 一键叫猪 </h2>
        </el-header>
        <el-main>
            <img src="/images/ui/peppa.png" width="60%">
        </el-main>
        <el-footer>
            <el-button @click="help" v-show="is_dxr"> 点我把猪送到你面前 </el-button>
            <el-button v-show="!is_dxr" disabled> 你没有叫猪的权限 </el-button>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: 'call',
    data() {
        return {
            logined: false,
            is_dxr: false
        }
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
            this.is_dxr = false
            if(this.logined) {
                if(sessionStorage.getItem('level_name') === '小仙女') {
                    this.is_dxr = true
                }
            }
        },
        help() {
            this.$http.post('https://api.pushover.net/1/messages.json', {
                token: 'aa4sdndtump21m73zxe8pvfifgywiz',
                user: 'uj973byh6y6yj1ac2tds9epfo2iqfj',
                message: '猪叫你！'
            }).then(() => {
                this.$notify({
                    title: '叫猪成功',
                    type: 'success'
                })
            }).catch(() => {
                this.$notify.error({
                    title: '网络故障',
                    message: '叫猪失败'
                })
            })
        }
    }
}
</script>

<style scoped>
.el-button {
    font-size: 2vh;
}

.el-footer {
    position: absolute;
    width: 100%;
    bottom: 3vh;
}
</style>

