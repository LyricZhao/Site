<template>
    <el-container>
        <el-header>
            <h3> BO盘 </h3>
            <h3 style="font-size:1.5vh" v-if="debug_message"> {{ debug_message }} </h3> 
        </el-header>

        <el-main v-if="!files.length">
            <h2> 现在没有文件<br> 快去上传一个吧 </h2>
        </el-main>

        <el-main v-if="files.length">
            <el-table :data="files" style="width: 100%">
                <el-table-column prop="tags" label="标签" width="150"> </el-table-column>
                <el-table-column prop="link" label="下载链接" width="360">
                    <template slot-scope="scope">
                        <a :href="scope.row.link"> {{ scope.row.link }} </a>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-footer>
            <el-upload action="none" :before-upload="uploadFile" :show-file-list="false">
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
            debug_message: '',
            files: [
                {tags: 'ABC', link: 'https://www.baidu.com'}
            ]
        }
    },
    mounted() {
        // this.debug_message = server_address.upload_file_api
    },
    methods: {
        uploadFile(file) {
            let fd = new FormData()
            fd.append('profile', file, file.name)            
            axios.post(server_address.upload_profile_api, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '上传成功'
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

