<template>
    <el-container>
        <el-header>
            <h3> BO盘 </h3>
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
            <el-button>
                上传新的文件
            </el-button>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: 'bopan',
    data() {
        return {
            files: [
                {tags: 'ABC', link: 'https://www.baidu.com'}
            ]
        }
    },
    mounted() {
    },
    methods: {
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

