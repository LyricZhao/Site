<template>
    <!-- SS/OK -->
    <div style="height: 100%;">
        <h2 style="font-size: 3vh"> 随缘吃饭 </h2>
        <div style="height: 80%;">
            <div style="height: 64%; width: 95%; margin: 0px auto;">
                <el-card @click="changeOption">
                    <el-row style="height: 100%;">
                        <el-col :span="11" style="height: 85%">
                            <img src="/images/ui/eat.jpeg" height="100%"/>
                        </el-col>
                        <el-col :span="1" style="height: 85%"></el-col>
                        <el-col :span="12" style="height: 85%;">
                            <el-row>
                                <h1 style="font-size: 6vh"> {{ choice }} </h1>
                            </el-row>
                            <el-row>
                                <br>
                                <el-button style="font-size: 1.5vh" @click="changeOption"> 点我决定你的饭 </el-button>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <h3 style="font-size: 2vh;"> 备选项 </h3>
            <div>
                <el-row v-for="i in rows" :key="i">
                    <el-col :span="6" v-for="j in 4" :key="j">
                        <div v-if="(i - 1) * 4 + j <= items.length">
                            <el-checkbox style="font-size: 2vh;" v-model="items[(i - 1) * 4 + j - 1].checked"> {{ items[(i - 1) * 4 + j - 1].name }} </el-checkbox>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'eat',
    data() {
        return {
            choice: '点击开始',
            items: [],
            rows: 1,
            times: 1
        }
    },
    mounted() {
        this.items = []
        let items = ['紫荆', '桃李', '丁香', '玉树', '清芬', '万人', '听涛', '荷园', '芝兰', '澜园', '南园']
        for(let i in items){
            this.items.push({
                name: items[i], checked: true
            })
            if((i != 0) && (i % 4 === 0)) {
                this.rows += 1
            }
        }
    },
    methods: {
        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max))
        },
        changeOption() {
            let options = []
            for(let i in this.items) {
                if(this.items[i].checked) {
                    options.push(this.items[i].name)
                }
            }
            if(options.length) {
                this.$notify({
                    title: '警告',
                    message: '长胖' + this.times + '斤',
                    type: 'warning'
                })
                this.times += 1
                this.choice = options[this.getRandomInt(options.length)]
            } else {
                this.choice = '请选一个'
            }
        }
    }
}
</script>

