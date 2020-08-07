<template>
    <div id="join">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">审核状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.approvalStatus" placeholder="请选择">
                            <el-option v-for="item in approvalStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">加盟商简称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPrincipal" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysTenantDefPlatform()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>加盟商管理列表</span>
                    <el-tooltip effect="light" content="加盟商管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="80" @click="addJoin()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="81" @click="updateJoin()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="82" v-show="baseUser.tenantId==1" @click="updateReview()" plain size="mini">审核</el-button>
                    <el-button type="primary" v-entity="83" @click="updateStatus()" plain size="mini">启用/禁用</el-button>
                    <el-button type="primary" v-entity="84" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon  tableName="joinTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>


        <el-dialog title="禁用加盟商" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;padding:0;">
                <ul class="content clearfix">
                    <li class="item w_auto">
                        <label class="label-term">禁用原因</label>
                        <div class="input-text">
                            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="150" v-model="disableRemarks"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="disable()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script>
    import join from './join.js'
    export default join
</script>
<style scoped>

</style>