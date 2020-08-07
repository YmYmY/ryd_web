<template>
    <div id="updateCmAbnormal" class="updateCmAbnormalPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">异常登记</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">运单号</label>
                    <div class="input-text">
                        <el-input v-model="trackingNum"   maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"></label>
                    <div class="input-text">
                        <el-button type="primary" @click="showDialog()">查找订单</el-button>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">运单信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">下单客户</label>
                    <div class="input-text">
                        <el-input v-model="customerTenant" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">客户简称</label>
                    <div class="input-text">
                        <el-input v-model="tenantName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">客户联系人</label>
                    <div class="input-text">
                        <el-input v-model="tenantPhone" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">货品名</label>
                    <div class="input-text">
                        <el-input v-model="goodsName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">打包件数</label>
                    <div class="input-text">
                        <el-input v-model="packageNumber" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">打包重量</label>
                    <div class="input-text">
                        <el-input v-model="packageWeight" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">发货店仓</label>
                    <div class="input-text">
                        <el-input v-model="consignorName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">发货人</label>
                    <div class="input-text">
                        <el-input v-model="consignorLinkmanName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">联系方式</label>
                    <div class="input-text">
                        <el-input v-model="consignorBill" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">收货方</label>
                    <div class="input-text">
                        <el-input v-model="consigneeName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">收货人</label>
                    <div class="input-text">
                        <el-input v-model="consigneeLinkmanName" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">联系方式</label>
                    <div class="input-text">
                        <el-input v-model="consigneeBill" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">异常登记</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">客户可见</label>
                    <div class="input-text">
                        <el-checkbox v-model="clientType"><em>注:勾选后客户端可同步看到异常信息</em></el-checkbox>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>责任方</label>
                    <div class="input-text">
                        <el-select v-model="obj.responId" placeholder="请选择" @change="selectType">
                            <el-option v-for="item in responTypeList" :key="item.objectId" :label="item.objectName" :value="item.objectId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>异常类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.abnormalType" placeholder="请选择">
                            <el-option v-for="item in abnormalTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>异常数量</label>
                    <div class="input-text">
                        <el-input v-model="obj.abnormalNum" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">异常金额</label>
                    <div class="input-text">
                        <el-input v-model="obj.registerFee" maxlength="10" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">异常描述</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.abnormalNote"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">异常图片</span></h3>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">异常图片</label>
                    <div class="input-text">
                        <myFileModel ref="abnormalOne"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" >
                    <label class="label-term">异常图片</label>
                    <div class="input-text">
                        <myFileModel ref="abnormalTwo"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">异常图片</label>
                    <div class="input-text">
                        <myFileModel ref="abnormalThree"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">异常图片</label>
                    <div class="input-text">
                        <myFileModel ref="abnormalFour"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">异常图片</label>
                    <div class="input-text">
                        <myFileModel ref="abnormalFives"></myFileModel>
                    </div>
                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
            <h3 class="common-title mb_20"><span class="title-name">异常登记历史</span></h3>
            <div class="table-content">
                <div class="table-title">
                    <h3>
                        <span>异常登记历史列表</span>
                        <el-tooltip effect="light" content="异常登记历史列表" placement="right">
                            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                        </el-tooltip>
                    </h3>
                    <div class="table-title-btn">
                    </div>
                </div>
                <tableCommon tableName="updateCmAbnormalTable" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
        </div>

        <!-- 查找订单 -->
        <cmOrders ref="cmOrders" :dialogTableShow="dialogTableShow" @sureCallback="sureCallback"></cmOrders>
    </div>
</template>
<script>
    import updateCmAbnormal from './updateCmAbnormal.js'
    export default updateCmAbnormal
</script>
<style lang="scss">
    .updateCmAbnormalPage{
        .table_height{
            max-height:300px;
        }
    }
</style>