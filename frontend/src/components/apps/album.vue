<template>
    <el-container>
        <el-header>
            <h2 style="font-size: 3vh"> 相册管理 </h2>
        </el-header>

        <el-main v-show="!files.length || !logined || !is_us">
            <h2 v-show="logined && is_us"> 现在没有照片<br> 快去上传一个吧 </h2>
            <h2 v-show="logined && !is_us"> 你没有权限管理照片 </h2>
            <h2 v-show="!logined"> 你还没有登录 </h2>
        </el-main>

        <el-main v-show="files.length && is_us" style="margin: 0px auto">
            <el-table :data="files" style="width: 100%; margin: 0px auto;" height="300">
                <el-table-column prop="file_name" label="照片" width="320"> </el-table-column>
                <el-table-column prop="file_name" label="" width="120">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="removeFile(scope.row.file_name)"> 删除 </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-footer>
            <br>
            <el-button style="font-size: 2vh" v-show="!logined || !is_us" disabled> 上传新的照片 </el-button>
            <el-upload v-show="logined && is_us" action="none" :before-upload="uploadFile" :show-file-list="false">
                <el-button style="font-size: 2vh"> 上传新的照片 </el-button>
            </el-upload>
        </el-footer>
    </el-container>
</template>

<script>
import axios from 'axios'
import server_address from '@/settings/address.js'

export default {
    name: 'bopan',
    data() {
        return {
            logined: false,
            is_us: false,
            files: []
        }
    },
    mounted() {
        this.refreshFileList()
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
            this.is_us = false
            if(this.logined) {
                this.is_us = ['管理员', '小仙女'].includes(sessionStorage.getItem('level_name'))
            }
            this.refreshFileList()
        },
        checkImg(type) {
            let allowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/gif']
            return allowed.includes(type)
        },
        checkSize(size, limit) {
            return size / 1024 < limit // in KB
        },
        uploadFile(file) {
            if(!this.checkImg(file.type) || !this.checkSize(file.size, 1024 * 2)) {
                this.$notify.error({
                    title: '格式错误',
                    message: '文件必须为PNG/JPG/JPEG/BMP/GIF文件，且大小不超过2MB'
                })
            } else {
                let fd = new FormData()
                fd.append('album', file, file.name)
                fd.append('username', sessionStorage.getItem('username'))
                axios.post(server_address.upload_album_api, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    if(!res.data.info) {
                        this.$notify({
                            title: '上传成功',
                            type: 'success'
                        })
                        this.refreshFileList()
                        this.$emit('memoryChange')
                    } else {
                        this.$notify.error({
                            title: '上传失败',
                            message: '已有重复文件'
                        })
                    }
                })
            }
        },
        refreshFileList() {
            if(this.logined) {
                let username = sessionStorage.getItem('username')
                this.$http.post(server_address.get_album_list_api, {username}).then((res) => {
                    this.files = []
                    for(let i in res.body.list) {
                        this.files.push({
                            file_name: res.body.list[i].file_name
                        })
                    }
                })
            } else {
                this.files = []
            }
        },
        removeFile(file_name) {
            let file = {
                username: sessionStorage.getItem('username'),
                file_name: file_name
            }
            this.$http.post(server_address.delete_album_api, file).then(() => {
                this.$notify({
                    title: '删除成功',
                    type: 'success'
                })
                this.$emit('memoryChange')
                this.refreshFileList()
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

