<template>
    <div class="main">
        <el-dialog :visible.sync="visible" title="个人中心" center>
            <el-row :gutter="20">
                <el-col :span="8" type="flex" style="height: 320px">
                    <el-row type="flex" justify="center">
                        <img class="img" :src="profile_addr" width="240px" height="240px" alt="唔 好像出BUG了"/>
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
                                <el-upload action="none" :before-upload="uploadBackground" :show-file-list="false">
                                    <el-button type="text" round style="margin-top: -10px;"> 上传新的 </el-button>
                                </el-upload>
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
            visible: false,
            real_name: '',
            level_name: '',
            bgm: false,
            memory_auto: true,
            apps_auto: true,
            dark: true,
            profile_addr: ''
        }
    },
    methods: {
        checkImg(type) {
            let allowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/gif']
            return allowed.includes(type)
        },
        checkSize(size, limit) {
            return size / 1024 < limit // in KB
        },
        show() {
            this.real_name = sessionStorage.getItem('real_name')
            this.level_name = sessionStorage.getItem('level_name')
            this.profile_addr = server_address.get_profile_api + '?username=' + sessionStorage.getItem('username') + '&random=' + Math.random()
            this.visible = true
        },
        switchBgm() {
            var audio = document.getElementById('bgm');
            if(this.bgm) {
                audio.play()
            } else {
                audio.pause()
            }
        },
        getHeaders() {
            return {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: sessionStorage.getItem('token')
                }
            }
        },
        uploadSuccess() {
            this.$notify({
                title: '成功上传',
                type: 'success'
            })
            this.$emit('changeProfile')
        },
        uploadFailed() {
            this.$notify.error({
                title: '错误',
                message: '上传失败'
            })
        },
        uploadFormatError() {
            this.$notify.error({
                title: '格式错误',
                message: '文件必须为PNG/JPG/JPEG/BMP/GIF文件，且大小不超过2MB'
            })
        },
        uploadBackground(file) {
            if(!this.checkImg(file.type) || !this.checkSize(file.size, 2048)) {
                this.uploadFormatError()
            } else {
                let fd = new FormData()
                fd.append('background', file, file.name)
                fd.append('username', sessionStorage.getItem('username'))
                axios.post(server_address.upload_background_api, fd, this.getHeaders()).then(() => {
                    this.uploadSuccess()
                    this.$emit('changeBackground')
                }, this.uploadFailed)
            }
        },
        uploadProfile(file) {
            if(!this.checkImg(file.type) || !this.checkSize(file.size, 2048)) {
                this.uploadFormatError()
            } else {
                let fd = new FormData()
                fd.append('profile', file, file.name)
                fd.append('username', sessionStorage.getItem('username'))
                axios.post(server_address.upload_profile_api, fd, this.getHeaders()).then(() => {
                    this.uploadSuccess()
                    this.show()
                }, this.uploadFailed)
            }
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
