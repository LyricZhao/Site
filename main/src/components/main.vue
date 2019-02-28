<template>
    <div class="main" id="main">
        <div class="topbar">
            <topbar> </topbar>
        </div>
        <div :is="current_component" v-on:mounted="onChildComponentMounted"></div>
    </div>
</template>

<script>

import create from '@/components/pages/create.vue'
import topbar from '@/components/topbar.vue'
import login from '@/components/pages/login.vue'

export default {
    data() {
        return {
            name: 'main',
            current_component: login
        }
    },
    components: {
        create: create,
        login: login,
        topbar: topbar
    },
    methods: {
        onChildComponentMounted() {}
    }
}
</script>