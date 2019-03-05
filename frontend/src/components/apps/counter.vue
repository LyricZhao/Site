<template>
    <!-- SS/OK -->
    <div style="height: 100%;">
        <h2 style="font-size: 3vh"> 计时器 </h2>
        <div style="height: 80%; font-size: 1.8vh;"> 
            <img src="/images/ui/counter.jpeg" class="img">
            <br> <br>
            我们在一起已经 {{ Math.floor(days) }} 天 ({{ Math.floor(hours) }} 小时 / {{ Math.floor(minutes) }} 分钟 / {{ seconds }} 秒) 了 <br>
            距离一百年还有 {{ 36500 - Math.floor(days) }} 天 ({{876000 - Math.floor(hours) }} 小时 / {{ 52560000 - Math.floor(minutes) }} 分钟 / {{ 3153600000 - seconds }} 秒)
        </div>
    </div>
</template>

<style scoped>

.img {
    height: 80%;
    margin: 0px auto;
    border-radius: 2vh 2vh 2vh 2vh;
    box-shadow: 5px 5px 5px #888888;
}

</style>


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

