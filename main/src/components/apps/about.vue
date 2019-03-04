<template>
    <el-container>
        <el-header>
            <h2> 关于本站 </h2>
        </el-header>

        <el-main style="margin-top:-10px">
            <h3>
                这是一个集<del>实用功能</del>和爱于一体的送给欣欣然的女生节礼物的四分之一 <br> <br>
            </h3>
            <el-card style="margin-top: -30px">
                <el-row style="font-size: 40px">
                        <el-col :span="12">
                            <i class="el-icon-loading"> </i> Developer 
                        </el-col>
                        <el-col :span="12">
                            LyricZ
                        </el-col>
                </el-row>
                <el-row style="margin-top: 20px; font-size: 40px">
                        <el-col :span="12">
                            <i class="el-icon-printer"> </i> Frontend
                        </el-col>
                        <el-col :span="12">
                            Vue/Element
                        </el-col>
                </el-row>
                <el-row style="margin-top: 20px; font-size: 40px">
                        <el-col :span="12">
                            <i class="el-icon-setting"> </i> Backend
                        </el-col>
                        <el-col :span="12">
                            KOA/Mongo
                        </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">    
                    <el-col :span="12" style="font-size: 40px">
                        <i class="el-icon-star-off"> </i> Thanks 
                    </el-col>
                    <el-col :span="12" style="font-size: 20px">
                        <el-row>
                            <el-col :span="12"> Yuxian Gu </el-col>
                            <el-col :span="12"> GayGay Liu </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12"> Yixiang Tu </el-col>
                            <el-col :span="12"> Jiankai Xing </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-card>
            <el-button type="primary" @click="help" style="margin-top: 20px"> 帮助作者充值波式按摩会员卡 </el-button>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'about',
    methods: {
        help() {
            this.$alert(
                '<img src="/images/ui/pay.jpeg" width="100%">',
                '帮助作者',
                {
                    dangerouslyUseHTMLString: true,
                    showConfirmButton: false
                }
            )
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

