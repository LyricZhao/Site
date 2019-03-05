<template>
    <!-- SS/OK -->
    <div style="height: 100%;">
        <h2 style="font-size: 3vh"> 一键叫猪 </h2>
        <img src="/images/ui/peppa.png" height="65%">
        <el-row style="width: 80%; margin: 0px auto; margin-top: 3%">
            <el-input v-show="!logined || !is_dxr" style="height: 100%" placeholder="我想对猪说" v-model="message">
                <el-button slot="append" disabled>无权叫猪</el-button>
            </el-input>
            <el-input v-show="logined && is_dxr" style="height: 100%" placeholder="我想对猪说" v-model="message">
                <el-button slot="append" disabled>无权叫猪</el-button>
            </el-input>
        </el-row>
    </div>
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

