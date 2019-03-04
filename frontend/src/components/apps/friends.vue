<template>
    <el-container>
        <el-header>
            <h2> 用户列表 </h2>
        </el-header>
        <el-main>
            <div v-show="!rows">
                <h2> 当前系统中没有用户或存在网络故障 <br> 请联系管理员 </h2>
            </div>
            <el-row v-for="i in rows" :key="i" :gutter="10">
                <el-col :span="6" v-for="j in 4" :key="j">
                    <el-card v-if="(i - 1) * 4 + j <= friends.length">
                        <img :src="friends[(i - 1) * 4 + j - 1].profile_link" width="100px" height="100px">
                        <div style="font-size: 15px; margin-top: 10px">
                            {{ friends[(i - 1) * 4 + j - 1].real_name }} / {{ friends[(i - 1) * 4 + j - 1].level_name }}
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-button v-show="logined" @click="showCreate"> 邀请新的朋友 </el-button>
            <el-button v-show="!logined" disabled> 邀请新的朋友 </el-button>
        </el-footer>
    </el-container>
</template>

<script>

import server_address from '@/settings/address.js'

export default {
    name: 'call',
    data() {
        return {
            logined: false,
            rows: 0,
            friends: []
        }
    },
    mounted() {
        this.refreshFriendList()
    },
    methods: {
        refreshFriendList() {
            this.$http.post(server_address.get_all_user_api, {}).then((res) => {
            this.friends = []
            for(let i in res.body.friends) {
                this.friends.push({
                    real_name: res.body.friends[i].real_name,
                    level_name: res.body.friends[i].level_name,
                    profile_link: server_address.get_profile_api + '?username=' + res.body.friends[i].username + '&random=' + Math.random()
                })
            }
            this.rows = Math.ceil(this.friends.length / 4)
        }).catch(() => {
            this.$notify.error({
                title: '网络故障',
                message: '请联系管理员'
            })
        })
        },
        switchStatus() {
            this.logined = !this.logined
        },
        showCreate() {
            this.$emit('create')
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

