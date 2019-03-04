<template>
    <el-container>
        <el-header>
            <h2> 计时器 </h2>
        </el-header>

        <el-main style="margin-top:-10px">
            <el-card>
                <img src="/images/ui/counter.jpeg" width="80%">
            </el-card>
            <div>
            <br>
            我们在一起已经 {{ Math.floor(days) }} 天 ({{ Math.floor(hours) }} 小时 / {{ Math.floor(minutes) }} 分钟 / {{ seconds }} 秒) 了 <br>
            距离一百年还有 {{ 36500 - Math.floor(days) }} 天 ({{876000 - Math.floor(hours) }} 小时 / {{ 52560000 - Math.floor(minutes) }} 分钟 / {{ 3153600000 - seconds }} 秒)
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
        this.updateTime()
        this.timerID = setInterval(this.updateTime, 1000)
    },
    methods: {
        updateTime() {
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

