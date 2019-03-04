<template>
    <el-container>
        <el-header>
            <h2> 随缘吃饭 </h2>
        </el-header>

        <el-main style="margin-top: 20px">
            <div>
                <el-card @click="changeOption" class="box-card">
                    <el-row :gutter="5">
                        <el-col :span="12" style="height: 210px">
                            <img src="/images/ui/eat.jpeg" height="100%"/>
                        </el-col>
                        <el-col :span="12" style="height: 170px; margin-top: -25px; margin-left: -15px">
                            <el-row>
                                <h1 style="font-size: 40pt"> {{ choice }} </h1>
                            </el-row>
                            <el-row>
                                <el-button @click="changeOption"> 点我决定你的饭 </el-button>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </el-main>

        <el-footer style="margin-top: 30px">
            <h3> 备选项 </h3>
            <el-row v-for="i in rows" :key="i">
                <el-col :span="6" v-for="j in 4" :key="j">
                    <div v-if="(i - 1) * 4 + j <= items.length">
                        <el-checkbox v-model="items[(i - 1) * 4 + j - 1].checked"> {{ items[(i - 1) * 4 + j - 1].name }} </el-checkbox>
                    </div>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<style scoped>

.el-button {
    font-size: 2vh;
}

</style>


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

