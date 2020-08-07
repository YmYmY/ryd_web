<template>
    <div id="updateClient">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">企业信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>企业全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantFullName"   maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>企业简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantName" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>企业类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantType" placeholder="请选择">
                            <el-option v-for="item in tenantTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>联系人</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPrincipal" maxlength="10"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPhone" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>联系电话</label>
                    <div class="input-text">
                        <el-input v-model="obj.phoneOne" maxlength="20" v-mynumval></el-input>
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
                    <label class="label-term"><em>*</em>状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantStatus" placeholder="请选择" @change="selectType()">
                            <el-option v-for="item in tenantStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>停用期限</label>
                    <div class="input-text">
                        <el-select v-model="obj.disableType" placeholder="请选择" v-bind:disabled="!showDisable">
                            <el-option v-for="item in disableTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">开票信息</span></h3>
            <div class="innerTab clearfix">
                <div :class="{'active':accountIndex==index}" class="innerItem" @click="accountChange(index)" v-for="(item,index) in accountList" :key="index">
                    {{item.name}}
                </div>
            </div>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">开票抬头</label>
                    <div class="input-text">
                        <el-input v-model="accountList[accountIndex].billingName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">税号</label>
                    <div class="input-text">
                        <el-input v-model="accountList[accountIndex].taxId" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">开户银行</label>
                    <div class="input-text">
                        <el-input v-model="accountList[accountIndex].bankName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">银行账号</label>
                    <div class="input-text">
                        <el-input v-model="accountList[accountIndex].bankNo" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">地址</label>
                    <div class="input-text">
                        <el-input v-model="accountList[accountIndex].bankAddress" maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">电话</label>
                    <div class="input-text">
                        <el-input v-model="accountList[accountIndex].bankPhone" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">对账员名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.accountName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">对账员电话</label>
                    <div class="input-text">
                        <el-input v-model="obj.accountPhone" maxlength="30" placeholder="手机或者电话"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">对账员微信</label>
                    <div class="input-text">
                        <el-input v-model="obj.accountWx" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">对账员QQ</label>
                    <div class="input-text">
                        <el-input v-model="obj.accountQq" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">对账员邮箱</label>
                    <div class="input-text">
                        <el-input v-model="obj.accountMailbox" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">对账员地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.accountAddress" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">附件信息</span></h3>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">上传身份证照正面</label>
                    <div class="input-text">
                        <myFileModel ref="cardId"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" >
                    <label class="label-term">上传营业执照正面</label>
                    <div class="input-text">
                        <myFileModel ref="businessLicense"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">上传企业LOGO正面</label>
                    <div class="input-text">
                        <myFileModel ref="tenantLogo"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">对账员微信二维码</label>
                    <div class="input-text">
                        <myFileModel ref="accountWxId"></myFileModel>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">合同相关</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>合同期限</label>
                    <div class="input-text">
                        <dataPicker :model="obj.jmDate" @callback="data=>{obj.jmDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </li>
                <li class="item item100">
                    <label class="label-term"><em>*</em>支持结算方式</label>
                    <div class="input-text">
                        <el-checkbox v-model="nowPay">现付</el-checkbox>
                        <el-checkbox v-model="appPay">到付</el-checkbox>
                        <el-checkbox v-model="monPay">月结</el-checkbox>
                        <el-checkbox v-model="recPay">回单付</el-checkbox>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">客户额度</label>
                    <div class="input-text">
                        <el-input  v-model="obj.tenantCost"  maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">店铺额度</label>
                    <div class="input-text">
                        <el-select v-model="obj.quotaType" placeholder="请选择" @change="selectQuotaType">
                            <el-option v-for="item in quotaTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul  class="content clearfix" v-show="showQuotaType">
                <li class="item">
                    <label class="label-term"><em>*</em>店铺下单额度</label>
                    <div class="input-text">
                        <el-input  v-model="obj.orderAmount" autocomplete="off" maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>加盟店铺</label>
                    <div class="input-text">
                        <el-select v-model="obj.franchiseStore" placeholder="请选择">
                            <el-option v-for="item in franchiseStoreList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul  class="content clearfix">
                <li class="item">
                    <label class="label-term">账期</label>
                    <div class="input-text">
                        <el-select v-model="obj.periodType" placeholder="请选择">
                            <el-option v-for="item in periodTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">单号定制</label>
                    <div class="input-text">
                        <el-select v-model="obj.ordNumType" placeholder="请选择" @change="selectQuotaType">
                            <el-option v-for="item in ordNumTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>结算日</label>
                    <div class="input-text">
                        <el-select v-model="obj.settlementType" placeholder="请选择">
                            <el-option v-for="item in datTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">对账日</label>
                    <div class="input-text">
                        <el-select v-model="obj.reconciliationType" placeholder="请选择">
                            <el-option v-for="item in datTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>销售部门</label>
                    <div class="input-text">
                        <el-select v-model="obj.salesId" placeholder="请选择" @change="selectSales()">
                            <el-option v-for="item in salesList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>销售人员</label>
                    <div class="input-text">
                        <el-select v-model="obj.salesPersonId" placeholder="请选择">
                            <el-option v-for="item in salesPersonList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">客服人员</label>
                    <div class="input-text">
                        <el-select v-model="customerUserName"  value-key="userName" placeholder="请选择" @change="selectCustomerUser">
                            <el-option v-for="item in userOragnize" :key="item.userId" :label="item.userName" :value="item"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">客服电话</label>
                    <div class="input-text">
                        <el-input  v-model="obj.customerUserPhone"  maxlength="20" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">归属区域</label>
                    <div class="input-text">
                        <el-select v-model="obj.createRegion" filterable placeholder="请选择">
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">合同附件</label>
                    <div class="input-text">
                        <myFileModel ref="contract" supportFiles="file"></myFileModel>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">备注</label>
                    <div class="input-text">
                        <el-input  maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容"  v-model="obj.remark"></el-input>
                    </div>
                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import updateClient from './updateClient.js'
    export default updateClient
</script>
<style lang="scss">
    #updateClient{
        .el-dialog{
            .el-dialog__body{
                padding:0;
                .common-info{
                    padding-bottom: 30px;
                }
            }
        }
        .innerTab{
            background: #fff;
            border-bottom:$border;
            margin:10px 0;
            .innerItem{
                padding:8px 12px 6px;
                box-sizing: border-box;
                float: left;
                cursor: pointer;
                border:$border;
                border-bottom:none;
                text-align: center;
                position: relative;
                &:last-child{
                    border-left:none;
                }
                &.active,&:hover{
                    background: $hover-color;
                }
                &.active::after,&:hover::after{
                    content: "";
                    width: 100%;
                    height: 1px;
                    background: $hover-color;
                    position: absolute;
                    bottom:-1px;
                    left: 0;
                    z-index: 9;
                }
            }
        }
    }
</style>