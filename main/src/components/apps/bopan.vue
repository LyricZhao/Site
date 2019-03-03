<template>
    <el-container>
        <el-header>
            <h3> BO盘 </h3>
        </el-header>

        <el-main v-show="!files.length">
            <h2 v-show="logined"> 现在没有文件<br> 快去上传一个吧 </h2>
            <h2 v-show="!logined"> 你还没有登录 </h2>
        </el-main>

        <el-main v-show="files.length">
            <el-table :data="files" style="width: 100%">
                <el-table-column prop="file_name" label="文件名" width="150"> </el-table-column>
                <el-table-column prop="link" label="下载链接" width="360">
                    <template slot-scope="scope">
                        <a :href="scope.row.link"> {{ scope.row.link }} </a>
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
            <el-button v-show="!logined" disabled> 上传新的文件 </el-button>
            <el-upload v-show="logined" action="none" :before-upload="uploadFile" :show-file-list="false">
                <el-button> 上传新的文件 </el-button>
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
        uploadFile(file) {
            let fd = new FormData()
            fd.append('file', file, file.name)
            fd.append('username', sessionStorage.getItem('username')) // DEBUG
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

