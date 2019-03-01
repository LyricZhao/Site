<template>
    <div class="main">
        <el-dialog :visible.sync="visible" title="个人中心" center>
            <el-row :gutter="20">
                <el-col :span="8" type="flex" style="height: 320px">
                    <el-row type="flex" justify="center">
                        <img class="img" src="/images/profile/default.jpeg" width="240px" height="240px" />
                    </el-row>
                    <el-row type="flex" justify="center" style="margin-top:30px;">
                        <el-upload action="none" :before-upload="uploadProfile" :show-file-list="false">
                            <el-button class="card-text" type="primary" round> 上传新的 </el-button>
                        </el-upload>
                    </el-row>
                </el-col>
                <el-col :span="16" style="height: 320px">
                    <el-row>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="never"> 我的身份 </el-card>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="card-text" shadow="hover"> {{ real_name }} ({{ level_name }}) </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="never"> 背景图片 </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="hover">
                                <el-button type="text" round style="margin-top: -10px;"> 上传新的 </el-button>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="hover">
                                <el-switch @change="switchDark" v-model="dark" active-text="暗" inactive-text="明"> </el-switch>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="never"> 背景音乐 </el-card>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="card-text" shadow="hover">
                                <el-switch @change="switchBgm" v-model="bgm" active-text="打开" inactive-text="关闭"> </el-switch>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="never"> 播放相册 </el-card>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="card-text" shadow="hover">
                                <el-switch @change="switchMemory" v-model="memory_auto" active-text="自动" inactive-text="手动"> </el-switch>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-card class="card-text" shadow="never"> 应用列表 </el-card>
                        </el-col>
                        <el-col :span="16">
                            <el-card class="card-text" shadow="hover">
                                <el-switch @change="switchApps" v-model="apps_auto" active-text="自动" inactive-text="手动"> </el-switch>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<style scoped>
.el-input {
    margin-top: 15px
}

.el-checkbox {
    margin-top: 25px
}

.el-col {
    border-radius: 4px;
}

.el-card {
    height: 60px
}

.card-text {
    text-align: center;
}

.img {
    vertical-align: middle
}
</style>

<script>

import axios from 'axios'
import server_address from '@/settings/address.js'

export default {
    data() {
        return {
            visible: true,
            real_name: '丁欣然', // DEBUG
            level_name: '小仙女',
            bgm: false,
            memory_auto: true,
            apps_auto: true,
            dark: true
        }
    },
    methods: {
        show() {
            this.visible = true
            this.real_name = sessionStorage.getItem('real_name')
        },
        switchBgm() {
            var audio = document.getElementById('bgm');
            if(this.bgm) {
                audio.play()
            } else {
                audio.pause()
            }
        },
        uploadProfile(file) {
            let fd = new FormData()
            fd.append('profile', file, file.name)
            fd.append('username', sessionStorage.getItem('username'))
            axios.post(server_address.upload_profile_api, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: sessionStorage.getItem('token')
                }
            }).then(() => {
                this.$notify({
                    title: '成功上传',
                    type: 'success'
                })
            }, () => {
                this.$notify.error({
                    title: '错误',
                    message: '上传失败'
                })
            })
        },
        switchMemory() {
            this.$emit('switchMemory')
        },
        switchApps() {
            this.$emit('switchApps')
        },
        switchDark() {
            this.$emit('switchDark')
        }
    }
}
</script>
