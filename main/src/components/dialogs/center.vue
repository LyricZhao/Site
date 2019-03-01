<template>
    <div class="main">
        <el-dialog :visible.sync="visible" title="个人中心" center>
            <el-row :gutter="20">
                <el-col :span="8" type="flex">
                    <el-row type="flex" justify="center">
                        <img class="img" src="/images/profile/default2.jpeg" width="70%" height="70%" />
                    </el-row>
                    <el-row type="flex" justify="center" style="margin-top:20px;">
                        <el-button class="card-text" type="primary" round> 上传新的 </el-button>
                    </el-row>
                </el-col>
                <el-col :span="16">
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

.card-text {
    text-align: center;
}

.img {
    vertical-align: middle
}
</style>

<script>
export default {
    data() {
        return {
            visible: true,
            real_name: '丁欣然', // DEBUG
            level_name: '小仙女',
            bgm: false,
            memory_auto: true,
            apps_auto: true
        }
    },
    methods: {
        show() {
            this.visible = true
            this.real_name = sessionStorage.getItem('real_name')
        },
        setConfig(bgm_, memory_auto_, apps_auto_) {
            this.bgm = bgm_
            this.memory_auto = memory_auto_
            this.apps_auto = apps_auto_
        },
        switchBgm() {
            var audio = document.getElementById('bgm');
            if(this.bgm) {
                audio.play()
            } else {
                audio.pause()
            }
        },
        switchMemory() {
            this.$emit('switchMemory')
        },
        switchApps() {
            this.$emit('switchApps')
        }
    }
}
</script>
