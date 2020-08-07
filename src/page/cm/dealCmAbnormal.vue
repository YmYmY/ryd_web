<template>
    <div id="dealCmAbnormal" class="dealCmAbnormalPage">
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
            <h3 class="common-title mb_20"><span class="title-name">异常处理</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>处理状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.dealType" placeholder="请选择">
                            <el-option v-for="item in dealTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="fl spc-checkbox">
                    <el-checkbox v-model="platformType" @change="clickType">平台相关</el-checkbox>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>理赔对象</label>
                    <div class="input-text">
                        <el-select v-model="obj.claimId" placeholder="请选择" @change="selectTypePlatform" v-bind:disabled="!platformType">
                            <el-option v-for="item in claimIdList" :key="item.objectId" :label="item.objectName" :value="item.objectId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>费用类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.feeType" placeholder="请选择" v-bind:disabled="!platformType">
                            <el-option v-for="item in feeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>处理金额</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealFee" maxlength="10" v-bind:disabled="!platformType" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="fl spc-checkbox">
                    <el-checkbox v-model="clientOneType" @change="clickType">客户相关</el-checkbox>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>理赔对象</label>
                    <div class="input-text">
                        <el-select v-model="obj.clientClaimId" placeholder="请选择" @change="selectTypeClient" v-bind:disabled="!clientOneType">
                            <el-option v-for="item in clientClaimIdList" :key="item.objectId" :label="item.objectName" :value="item.objectId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>费用类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.clientFeeType" placeholder="请选择" v-bind:disabled="!clientOneType">
                            <el-option v-for="item in clientFeeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>处理金额</label>
                    <div class="input-text">
                        <el-input v-model="obj.clientDealFee" maxlength="10" v-bind:disabled="!clientOneType" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="fl spc-checkbox">
                    <el-checkbox v-model="supplierType"  @change="clickType">供应商相关</el-checkbox>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>理赔对象</label>
                    <div class="input-text">
                        <el-select v-model="obj.supplierClaimId" placeholder="请选择" @change="selectTypeSupplier" v-bind:disabled="!supplierType">
                            <el-option v-for="item in supplierClaimIdList" :key="item.objectId" :label="item.objectName" :value="item.objectId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>费用类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.supplierFeeType" placeholder="请选择" v-bind:disabled="!supplierType">
                            <el-option v-for="item in supplierFeeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>处理金额</label>
                    <div class="input-text">
                        <el-input v-model="obj.supplierDealFee" maxlength="10" v-bind:disabled="!supplierType" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">处理意见</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.dealNote"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">内部流转信息</span></h3>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">备注</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="此内容仅平台可见" v-model="obj.remarks"></el-input>
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
                <tableCommon tableName="dealCmAbnormalTable" ref="table" :head="head" :showNum="true"></tableCommon>
            </div>
        </div>
        <!-- 查找订单 -->
        <cmOrders ref="cmOrders" :dialogTableShow="dialogTableShow" @sureCallback="sureCallback"></cmOrders>
    </div>
</template>
<script>
    import dealCmAbnormal from './dealCmAbnormal.js'
    export default dealCmAbnormal
</script>
<style lang="scss">
.dealCmAbnormalPage{
    .common-info{
        .content{
            .img-upload{
                width: 18%!important;
                min-width: 210px;
                .label-term{
                    width: 60px;
                }
            }
            .spc-checkbox{
                line-height: 40px;
                width: 110px;
            }
        }
    }
}
</style>