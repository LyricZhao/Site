<template>
    <div class="main">
        <el-carousel :autoplay="autoplay" indicator-position="outside" height="70vh">
            <el-carousel-item v-for="img_link in links" :key="img_link">
                <img class="img" :src="img_link" height="95%">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<style scoped>

.img {
    -moz-box-shadow: 5px 5px 5px #333333;
    -webkit-box-shadow: 5px 5px 5px #333333;
    box-shadow: 5px 5px 5px #333333;
    border-radius: 1vh;
}

.el-carousel__item.is-active {
    opacity: 1;
}
</style>

<script>

import server_address from '@/settings/address.js'

export default {
    name: 'memory',
    data() {
        return {
            logined: false,
            autoplay: true,
            links: []
        }
    },
    mounted() {
        this.refreshMemory()
    },
    methods: {
        switchStatus() {
            this.logined = !this.logined
        },
        switchAuto() {
            this.autoplay = !this.autoplay
        },
        refreshMemory() {
            this.links = []
            this.$http.post(server_address.get_album_list_api, {}).then((res) => {
                for(let i in res.body.list) {
                    this.links.push(server_address.static_server + '/__system_album__/' + res.body.list[i].file_name)
                }
            })
        }
    }
}
</script>
