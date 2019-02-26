<template>
    <el-container>
        <el-header>
            <h3> 计时器 </h3>
        </el-header>

        <el-main>
            <div>
            <!-- {{ Math.floor(days) }} 天 <br>
            也就是 {{ Math.floor(hours) }} 小时 <br>
            也就是 {{ Math.floor(minutes) }} 分钟 <br>
            也就是 {{ seconds }} 秒 <br> -->
            </div>
        </el-main>

        <el-footer>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    name: 'counter',
    data() {
        return {
            days: '', hours: '', minutes: '', seconds: ''
        }
    },
    mounted() {
        this.UpdateTime()
        this.timerID = setInterval(this.UpdateTime, 1000)
    },
    methods: {
        UpdateTime() {
            let timestamp = Date.parse(new Date()) / 1000
            this.seconds = timestamp - 1546272000 /* 2019.01.01-00:00 */
            this.minutes = this.seconds / 60
            this.hours = this.minutes / 60
            this.days = this.hours / 24
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

