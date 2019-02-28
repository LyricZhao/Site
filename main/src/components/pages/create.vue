<template>
    <div class="main">
        <el-dialog :visible.sync="visible" title="新建账号" class="create-wrap">
            <el-input type="text" placeholder="用户名" v-model="username"> </el-input>
            <el-input type="text" placeholder="真实姓名" v-model="real_name"> </el-input>
            <el-input type="password" placeholder="密码" v-model="password"> </el-input>
            <el-input type="password" placeholder="再次输入密码" v-model="password_duplicate"> </el-input>
            <el-input type="password" placeholder="权限密码" v-model="root_pass"> </el-input>
            <el-select v-model="level" placeholder="请选择账号类型">
                <el-option label="管理员" value="0"> </el-option>
                <el-option label="小仙女" value="1"> </el-option>
                <el-option label="小伙伴" value="2"> </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="submit"> 确定 </el-button>
                <el-button> 取消 </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style scoped>
.el-input {
    margin-top: 15px;
}

.el-select {
    margin-top: 15px;
}
</style>

<script>
/* eslint-disable */
import ServiceAddress from '@/settings/address.js'
import sha1 from 'sha1'

export default {
    data() {
        return {
            username: '',
            real_name: '',
            root_pass: '',
            password: '',
            password_duplicate: '',
            level: '',
            visible: true
        }
    },

    methods: {
        submitFailed() {
            this.$notify.error({
                title: '提交失败',
                message: '请检查你的输入'
            })
        },
        differentPassword() {
            this.$notify.error({
                title: '提交失败',
                message: '两次密码不一致'
            })
        },
        wrongRootPassword() {
            this.$notify.error({
                title: '注册失败',
                message: '错误的权限密码或已存在的用户名'
            })
        },
        createSuccess() {
            this.$notify({
                title: '账号创建成功',
                message: '快邀请你的小伙伴登录吧',
                type: 'success'
            })
        },
        submit() {
            let level_options = ['0', '1', '2']
            if(this.username === '' || this.password === '' || this.real_name === '' || !level_options.includes(this.level)) {
                this.submitFailed()
            } else if(this.password !== this.password_duplicate) {
                this.differentPassword()
            } else {
                let data = {
                    username: this.username,
                    real_name: this.real_name,
                    root_pass: sha1(this.root_pass),
                    password: sha1(this.password),
                    level: Number(this.level),
                }
                this.$http.post(ServiceAddress.create_api, data).then((res) => {
                    if(res.body.info) {
                        this.wrongRootPassword()
                    } else {
                        this.createSuccess()
                        this.visible = false
                    }
                })
            }
        }
    }
}
</script>
