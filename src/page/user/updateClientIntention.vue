<template>
    <div id="updateClientIntention" class="updateClientIntentionPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">客户信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>客户全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.clientName"   maxlength="20"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">拥有品牌</label>
                    <div class="input-text">
                        <el-input v-model="obj.clientBrand" maxlength="20"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">主营业务</label>
                    <div class="input-text">
                        <el-input v-model="obj.clientBusiness"   maxlength="20"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">门店数量</label>
                    <div class="input-text">
                        <el-input v-model="obj.storeNum" maxlength="20"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">经营区域</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionName"   maxlength="20"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">运营规模</label>
                    <div class="input-text">
                        <el-select v-model="obj.operationType" placeholder="请选择">
                            <el-option v-for="item in operationTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>办公地区</label>
                    <div class="input-text">
                        <mycity ref="cityOffice" class="fl" style="width:100%;"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>办公地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.officeAddress" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">合作供应商</label>
                    <div class="input-text">
                        <el-input v-model="obj.supplierName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">客户状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.clientState" placeholder="请选择">
                            <el-option v-for="item in clientStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">销售部门</label>
                    <div class="input-text">
                        <el-select v-model="obj.salesId" placeholder="请选择" @change="selectSales()">
                            <el-option v-for="item in salesList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">销售人员</label>
                    <div class="input-text">
                        <el-select v-model="obj.salesPersonId" placeholder="请选择">
                            <el-option v-for="item in salesPersonList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">联系人</span></h3>
            <div class="table_height mb_20">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th width="100">姓名</th>
                        <th width="100">联系电话 </th>
                        <th width="100">职位 </th>
                        <th width="100">操作 </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,$index) in linkmanList" :key="$index">
                        <td width="100"><el-input v-model="item.userName" maxlength="11"></el-input></td>
                        <td width="100"><el-input v-model="item.userPhone" maxlength="11"></el-input></td>
                        <td width="100"><el-input v-model="item.userPosition" maxlength="20"></el-input></td>
                        <td width="100"><a class="link" v-show="$index==linkmanList.length-1" @click="addLinkman">添加</a><a class="link" @click="delLinkman($index)" v-show="linkmanList.length>1">删除</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <h3 class="common-title mb_20"><span class="title-name">附件信息</span></h3>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">名片1</label>
                    <div class="input-text">
                        <myFileModel ref="cardOne"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" >
                    <label class="label-term">名片2</label>
                    <div class="input-text">
                        <myFileModel ref="cardTwo"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">名片3</label>
                    <div class="input-text">
                        <myFileModel ref="cardThree"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">名片4</label>
                    <div class="input-text">
                        <myFileModel ref="cardFour"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">名片5</label>
                    <div class="input-text">
                        <myFileModel ref="cardFives"></myFileModel>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">拜访记录</span></h3>
            <div class="table-content">
                <div class="table-title">
                    <h3>
                        <span>拜访记录列表</span>
                        <el-tooltip effect="light" content="拜访记录列表" placement="right">
                            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                        </el-tooltip>
                    </h3>
                    <div class="table-title-btn">
                    </div>
                </div>
                <tableCommon tableName="updateClientIntentionTable" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import updateClientIntention from './updateClientIntention.js'
    export default updateClientIntention
</script>
<style lang="scss">
.updateClientIntentionPage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>