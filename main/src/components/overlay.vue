<template>
    <transition name="fade">
        <div class="main" v-show="show" @click="click">
            <div class="background">
                <div class="center-div">
                    <div v-for="line in message" :key="line"> {{ line }} </div>
                    <div v-show="closable" style="font-size: 30px"> 点击屏幕以继续 </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'overlay',
    data() {
        return {
            closable: true,
            message: ['DEBUGING'],
            show: true,
            show_button: true
        }
    },
    methods: {
        click() {
            this.show = false
        }
    }
}
</script>

<style scoped>
.main {
    position: fixed;
    display: table;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.7);   
}

.background {
    display: table-cell;
    vertical-align: middle;
}

.center-div {
    color: #eeeeee;
    font-size: 72px;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.el-button {
    font-size: 36px;
}
</style>

