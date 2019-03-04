<template>
    <div class="main">
        <el-carousel :autoplay="autoplay" type="card" height="60vh">
            <!-- apps below -->
            <el-carousel-item v-if="counter_enable">
                <counter ref="counter"> </counter>
            </el-carousel-item>
            <el-carousel-item v-if="bopan_enable">
                <bopan ref="bopan"> </bopan>
            </el-carousel-item>
            <el-carousel-item v-if="eat_enable">
                <eat ref="eat"> </eat>
            </el-carousel-item>
            <el-carousel-item v-if="friends_enable">
                <friends @create="showCreate" ref="friends"> </friends>
            </el-carousel-item>
            <el-carousel-item v-if="call_enable">
                <call ref="call"> </call>
            </el-carousel-item>
            <el-carousel-item v-if="about_enable">
                <about ref="about"> </about>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import call from '@/components/apps/call.vue'
import counter from '@/components/apps/counter.vue'
import bopan from '@/components/apps/bopan.vue'
import eat from '@/components/apps/eat.vue'
import about from '@/components/apps/about.vue'
import friends from '@/components/apps/friends.vue'

export default {
    name: 'page',
    data() {
        return {
            logined: false,
            autoplay: true,
            call_enable: false,
            counter_enable: false,
            bopan_enable: true,
            eat_enable: false,
            about_enable: false,
            friends_enable: false
        }
    },
    components: {
        call: call,
        counter: counter,
        bopan: bopan,
        eat: eat,
        about: about,
        friends: friends
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
            this.$refs.bopan.switchStatus()
        },
        switchAuto() {
            this.autoplay = !this.autoplay
        },
        showCreate() {
            this.$emit('create')
        },
        refreshFriendList() {
            this.$refs.friends.refreshFriendList()
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

