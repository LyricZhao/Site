<template>
    <el-container>
        <el-header>
            <h2 style="font-size: 3vh"> BO盘 </h2>
        </el-header>

        <el-main v-show="!files.length">
            <h2 v-show="logined"> 现在没有文件<br> 快去上传一个吧 </h2>
            <h2 v-show="!logined"> 你还没有登录 </h2>
        </el-main>

        <el-main v-show="files.length" style="margin: 0px auto">
            <el-table :data="files" style="width: 100%; margin: 0px auto;" height="300">
                <el-table-column prop="file_name" label="文件名" width="120"> </el-table-column>
                <el-table-column prop="link" label="下载链接" width="320">
                    <template slot-scope="scope">
                        <a :href="scope.row.link" target="_blank"> {{ scope.row.link }} </a>
                    </template>
                </el-table-column>
                <el-table-column prop="file_name" label="" width="100">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="removeFile(scope.row.file_name)"> 删除 </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-footer>
            <br>
            <el-button style="font-size: 2vh" v-show="!logined" disabled> 上传新的文件 </el-button>
            <el-upload v-show="logined" action="none" :before-upload="uploadFile" :show-file-list="false">
                <el-button style="font-size: 2vh"> 上传新的文件 </el-button>
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
            files: []
        }
    },
    mounted() {
        this.refreshFileList()
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
            this.refreshFileList()
        },
        checkSize(size, limit) {
            return size / 1024 < limit // in KB
        },
        uploadFile(file) {
            if(!this.checkSize(file.size, 1024 * 100)) {
                this.$notify.error({
                    title: '上传失败',
                    message: '文件不能超过100MB'
                })
            } else {
                let fd = new FormData()
                fd.append('file', file, file.name)
                fd.append('username', sessionStorage.getItem('username'))
                axios.post(server_address.upload_file_api, fd, {
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
                    } else {
                        this.$notify.error({
                            title: '上传失败',
                            message: '有重名的文件'
                        })
                    }
                })
            }
        },
        refreshFileList() {
            if(this.logined) {
                let username = sessionStorage.getItem('username')
                this.$http.post(server_address.get_file_list_api, {username}).then((res) => {
                    this.files = []
                    for(let i in res.body.list) {
                        this.files.push({
                            file_name: res.body.list[i].file_name,
                            link: server_address.static_server + '/' + username + '/' + res.body.list[i].file_name
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
            this.$http.post(server_address.delete_file_api, file).then((res) => {
                if(res.body.info === 0) {
                    this.$notify({
                        title: '删除成功',
                        type: 'success'
                    })
                }
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

