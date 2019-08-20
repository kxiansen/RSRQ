<template>
    <div>
        <el-table  v-loading="tableLoading" style="width: 100%; margin-top: 20px">     
            <el-table-column prop="name" label="环境"></el-table-column>
            <el-table-column label="操作" width="240px"></el-table-column>
        </el-table>
        
        <el-row>
            <el-col :span="16">
                <el-form :inline="true" :model="host_query">
                    <el-form-item>
                        dev-环境
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8"  style="text-align: right">
                    <el-button type="primary" @click="toRescue(url='http://192.168.70.40:8080/jenkins/')">dev-Jenkins</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="16">
                <el-form :inline="true" :model="host_query">
                    <el-form-item>
                        qa-环境
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8"  style="text-align: right">
                    <el-button type="primary" @click="toRescue(url='http://qa-online.haizol.com:19880/')">qa-Jenkins</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form :inline="true" :model="host_query">
                    <el-form-item>
                        pre-环境
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12"  style="text-align: right">
                    <el-button type="primary" @click="toRescue(url='http://pre-online.haizol.com:18080')">pre-Jenkins</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            toRescue(jenkins_url) {
                window.open(jenkins_url);
            },
            //刷新
            refresh(){
                this.fetch(this.currentPage);
            },
        }
    }

</script>


