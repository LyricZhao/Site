<template>
    <el-container>
        <el-header>
            <h2> 一键叫猪 </h2>
        </el-header>
        <el-main>
            <img src="/images/ui/peppa.png" width="60%">
        </el-main>
        <el-footer>
            <el-row style="margin-top: 20px">
                <el-col :span="18">
                    <el-input placeholder="我想对猪说" v-model="message"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button @click="help" v-show="logined && is_dxr" size="small"> 点击叫猪 </el-button>
                    <el-button v-show="!logined || !is_dxr" size="small" disabled> 没有权限 </el-button>
                </el-col>
            </el-row>
            
            
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: 'call',
    data() {
        return {
            logined: false,
            is_dxr: false,
            message: ''
        }
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
            this.is_dxr = false
            if(this.logined) {
                let allowed = ['管理员', '小仙女']
                if(allowed.includes(sessionStorage.getItem('level_name'))) {
                    this.is_dxr = true
                }
            }
        },
        help() {
            this.$http.post('https://api.pushover.net/1/messages.json', {
                token: 'aa4sdndtump21m73zxe8pvfifgywiz',
                user: 'uj973byh6y6yj1ac2tds9epfo2iqfj',
                message: '猪对你说:' + this.message
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

