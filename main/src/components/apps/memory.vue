<template>
    <div class="main">
        <el-carousel :autoplay="autoplay" indicator-position="outside" height="60vh">
            <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>

.el-carousel__item {
    background: rgb(255, 255, 255);
    opacity: 0.8;
    -webkit-transition: ease 500ms;
    -moz-transition: ease 500ms;
    -ms-transition: ease 500ms;
    -o-transition: ease 500ms;
    transition: ease 500ms;
    border-radius: 1vh;
}

.el-carousel__item.is-active {
    opacity: 1;
}
</style>

<script>
export default {
    name: 'memory',
    data() {
        return {
            logined: false,
            autoplay: true
        }
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
        },
        switchAuto() {
            this.autoplay = !this.autoplay
        }
    }
}
</script>
