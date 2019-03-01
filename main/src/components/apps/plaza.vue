<template>
    <div class="main">
        <el-carousel :autoplay="autoplay" type="card" height="60vh">
            <!-- apps below -->
            <el-carousel-item>
                <counter ref="counter"> </counter>
            </el-carousel-item>
            <el-carousel-item>
                <bopan ref="bopan"> </bopan>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import counter from '@/components/apps/counter.vue'
import bopan from '@/components/apps/bopan.vue'

export default {
    name: 'page',
    data() {
        return {
            logined: false,
            autoplay: true
        }
    },
    components: {
        counter: counter,
        bopan: bopan
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

