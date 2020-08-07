<template>
    <div id="supplierDetails">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">供应商信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>供应商编码</label>
                    <div class="input-text">
                        <el-input v-model="obj.supplierCode" maxlength="30" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>供应商类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantType" placeholder="请选择">
                            <el-option v-for="item in tenantTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>供应商全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantFullName"   maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>供应商简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantName" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>归属平台</label>
                    <div class="input-text">
                        <el-select v-model="obj.whetherPlatform" placeholder="请选择" @change="selectType()">
                            <el-option v-for="item in whetherPlatformList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>平台名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.platformType" placeholder="请选择" v-bind:disabled="!showPlatform">
                            <el-option v-for="item in platformTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>供应商性质</label>
                    <div class="input-text">
                        <el-select v-model="obj.supplierNature" placeholder="请选择">
                            <el-option v-for="item in supplierNatureList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>联系人</label>
                    <div class="input-text">
                        <el-input v-model="obj.tenantPrincipal" maxlength="10" ></el-input>
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
                <li class="item" >
                    <label class="label-term"><em>*</em>客服电话</label>
                    <div class="input-text">
                        <el-input v-model="obj.phoneOne" maxlength="20" ></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>办公区域</label>
                    <div class="input-text">
                        <mycity ref="city"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>详细地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.officeAddress" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>营业地区</label>
                    <div class="input-text">
                        <mycity ref="bankCity"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>详细地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.businessAddress" maxlength="50"></el-input>
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
                    <label class="label-term">支持选项</label>
                    <div class="input-text">
                        <el-checkbox v-model="collectionType">代收货款</el-checkbox>
                        <el-checkbox v-model="payTo">到付款</el-checkbox>
                    </div>
                </li>
            </ul>
            <h3 class="common-title"><span class="title-name">对账信息</span></h3>
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
                    <label class="label-term">账期</label>
                    <div class="input-text">
                        <el-select v-model="obj.periodType" placeholder="请选择">
                            <el-option v-for="item in periodTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.payType" placeholder="请选择">
                            <el-option v-for="item in payTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
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
            <h3 class="common-title mb_20"><span class="title-name">系统对接</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">项目名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectOne" @change="getConfigsOne" placeholder="请选择">
                            <el-option v-for="item in projectList" :disabled="obj.projectTwo==item.kdId" :key="item.kdId" :label="item.kdName" :value="item.kdId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开启对接</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectTypeOne" placeholder="请选择">
                            <el-option v-for="item in projectTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showConfigListOne">
                 <li class="item" v-for="(item,index) in configListOne" :key="index" v-show="item.filedShow == 1 || item.filedShow == 3" >
                    <label class="label-term" >{{item.fieldName}}</label>
                    <div class="input-text">
                         <el-input v-model="item.fieldValue" v-if="item.filedTypeAlias == 'input'" v-bind:disabled="true" ></el-input>
                         <el-select v-model="item.fieldValue" placeholder="请选择" v-if="item.filedTypeAlias == 'select' "  v-bind:disabled="true">
                            <el-option v-for="i in item[item.fieldKey]" :key="i.codeValue" :label="i.codeName" :value="i.codeValue"></el-option>
                         </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">项目名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectTwo" @change="getConfigsTwo" placeholder="请选择">
                            <el-option v-for="item in projectList" :disabled="obj.projectOne==item.kdId" :key="item.kdId" :label="item.kdName" :value="item.kdId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开启对接</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectTypeTwo" placeholder="请选择">
                            <el-option v-for="item in projectTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showConfigListTwo">
                <li class="item" v-for="(item,index) in configListTwo" :key="index" v-show="item.filedShow == 1 || item.filedShow == 3" >
                    <label class="label-term" >{{item.fieldName}}</label>
                    <div class="input-text">
                         <el-input v-model="item.fieldValue" v-if="item.filedTypeAlias == 'input'" v-bind:disabled="true" ></el-input>
                         <el-select v-model="item.fieldValue" placeholder="请选择" v-if="item.filedTypeAlias == 'select' "  v-bind:disabled="true">
                            <el-option v-for="i in item[item.fieldKey]" :key="i.codeValue" :label="i.codeName" :value="i.codeValue"></el-option>
                         </el-select>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">图片信息</span></h3>
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
                        <el-input  maxlength="200"  type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容"  v-model="obj.remark"></el-input>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import supplierDetails from './supplierDetails.js'
    export default supplierDetails
</script>
<style lang="scss">
    #supplierDetails{
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
            border-bottom: $border;
            margin:10px 0;
            .innerItem{
                padding:8px 12px 6px;
                box-sizing: border-box;
                float: left;
                cursor: pointer;
                border:$border;
                border-bottom:none;
                text-align: center;
                &:last-child{
                    border-left:none;
                }
                &.active,&:hover{
                    // border-bottom-color: $main-color;
                    // color: $main-color;
                    background: $hover-color;
                    position: relative;
                    border-bottom: $hover-color;
                    // top: -1px;
                    z-index: 9;
                }
            }
        }
    }
</style>