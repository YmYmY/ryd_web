<template>
    <div id="sysOrgInfo" class="sysOrgInfoPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">网点简称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">手机号码:</label>
                    <div class="input-text">
                        <el-input v-model="obj.orgPhone" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">登录账号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.userLogin" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysOrgInfo()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>网点管理列表</span>
                    <el-tooltip effect="light" content="网点管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="154" @click="addSysOrgInfo()" plain size="mini">新增网点</el-button>
                    <el-button type="primary" v-entity="155" @click="updateSysOrgInfo()" plain size="mini">修改网点</el-button>
                    <el-button type="primary" v-entity="156" @click="deleteSysOrgInfo()" plain size="mini">删除网点</el-button>
                    <el-button type="primary" v-entity="157" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="sysOrgInfoTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import sysOrgInfo from './sysOrgInfo.js'
    export default sysOrgInfo
</script>
<style lang="scss">
.sysOrgInfoPage{
    .el-dialog__body{
        padding:10px 20px 0;
        .areaList{
            margin-top:20px;
        }
        .el-checkbox{
            margin-bottom:15px;
        }
        .areaDefault{
            width: 100%;
            margin-bottom: 20px;
            .label-term{
                line-height: 40px;
                margin-right: 15px;
            }
        }
    }
    .el-dialog__footer{
        text-align: center;
    }
}
</style>