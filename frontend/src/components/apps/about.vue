<template>
    <!-- SS/OK -->
    <div style="height: 100%;">
        <el-container>
            <el-main>
                <h2 style="font-size: 3vh"> 关于本站 </h2>
                <h3 style="font-size: 2vh">
                    这是一个集<del>实用功能</del>和爱于一体的送给欣欣然的女生节礼物的四分之一 <br> <br>
                </h3>
                <div style="width: 95%; margin: 0px auto;">
                    <el-card>
                        <el-row style="font-size: 4vh">
                                <el-col :span="12">
                                    <i class="el-icon-loading"> </i> Developer 
                                </el-col>
                                <el-col :span="12">
                                    LyricZ
                                </el-col>
                        </el-row>
                        <el-row style="font-size: 4vh; margin-top: 2%;">
                                <el-col :span="12">
                                    <i class="el-icon-printer"> </i> Frontend
                                </el-col>
                                <el-col :span="12">
                                    Vue/Element
                                </el-col>
                        </el-row>
                        <el-row style="font-size: 4vh; margin-top: 2%;">
                                <el-col :span="12">
                                    <i class="el-icon-setting"> </i> Backend
                                </el-col>
                                <el-col :span="12">
                                    KOA/Mongo
                                </el-col>
                        </el-row>
                        <el-row style="margin-top: 2%;">    
                            <el-col :span="12" style="font-size: 4vh">
                                <i class="el-icon-star-off"> </i> Thanks 
                            </el-col>
                            <el-col :span="12" style="font-size: 2vh">
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
                </div>
            </el-main>
            <el-footer>
                <el-button type="primary" @click="help" style="font-size: 2vh"> 帮助作者充值波式按摩会员卡 </el-button>
            </el-footer>
        </el-container>
    </div>
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

