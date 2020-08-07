<template>
    <div id="sysRegionDetails" class="infoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">区域信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>上级组织</label>
                    <div class="input-text">
                        <el-select v-model="obj.PId" placeholder="请选择" @change="selectPRegion()" v-bind:disabled=true>
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>区域类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.regionType" placeholder="请选择" @change="selectRegion()" v-bind:disabled=true>
                            <el-option v-for="item in regionTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>区域名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionName" maxlength="10" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>区域等级</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionGradeName" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showRegion">
                <li class="item" >
                    <label class="label-term"><em>*</em>区域负责人</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionPrincipal" maxlength="10" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionPhone" maxlength="11" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showTenant">
                <li class="item">
                    <label class="label-term">加盟商</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantId" placeholder="请选择" v-bind:disabled=true>
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <h3 v-show="showAreaSet" class="common-title mb_20"><span class="title-name">区域配置</span></h3>
            <div v-show="showAreaSet" class="areasList">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr v-for="(list,index) in areasList" :key="index">
                        <td class="parentTd">
                            <el-checkbox checked="true" disabled>{{list.name}}</el-checkbox>
                        </td>
                        <td>
                            <el-checkbox-group v-model="checkAreaList" class="clearfix" v-bind:disabled=true>
                                <el-checkbox v-for="item in list.children" :key="item.id" :label="item.id" :checked="checked"  @change="checked=!checked">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-show="showSysTenant">
                <h3 class="common-title mb_20"><span class="title-name">加盟商信息</span></h3>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>加盟商类型</label>
                        <div class="input-text">
                            <el-select v-model="sys.tenantType" placeholder="请选择"  v-bind:disabled=true>
                                <el-option v-for="item in tenantTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>上级组织</label>
                        <div class="input-text">
                            <el-input v-model="sys.pTenantName" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" v-show="sys.showTenant">
                    <li class="item" >
                        <label class="label-term"><em>*</em>企业全称</label>
                        <div class="input-text">
                            <el-input v-model="sys.tenantFullName" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>企业简称</label>
                        <div class="input-text">
                            <el-input v-model="sys.tenantName" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix" v-show="sys.showTenant">
                    <li class="item" >
                        <label class="label-term"><em>*</em>社会信用代码</label>
                        <div class="input-text">
                            <el-input v-model="sys.socialCreditCode" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>办公地址</label>
                        <div class="input-text">
                            <el-input v-model="sys.officeAddress" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item" >
                        <label class="label-term"><em>*</em>联系人</label>
                        <div class="input-text">
                            <el-input v-model="sys.tenantPrincipal" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>联系手机</label>
                        <div class="input-text">
                            <el-input v-model="sys.tenantPhone" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>状态</label>
                        <div class="input-text">
                            <el-select v-model="sys.tenantStatus" placeholder="请选择" v-bind:disabled=true>
                                <el-option v-for="item in tenantStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>开通子加盟</label>
                        <div class="input-text">
                            <el-select v-model="sys.tenantPermission" placeholder="请选择" v-bind:disabled=true>
                                <el-option v-for="item in tenantPermissionList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item img-upload">
                        <label class="label-term">上传身份证照</label>
                        <div class="input-text">
                            <myFileModel ref="cardId"></myFileModel>
                        </div>
                    </li>
                    <li class="item img-upload" v-show="sys.showTenant">
                        <label class="label-term">上传营业执照</label>
                        <div class="input-text">
                            <myFileModel ref="businessLicense"></myFileModel>
                        </div>
                    </li>
                    <li class="item img-upload" v-show="sys.showTenant">
                        <label class="label-term">上传企业LOGO</label>
                        <div class="input-text">
                            <myFileModel ref="tenantLogo"></myFileModel>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bot-btn">
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import sysRegionDetails from './sysRegionDetails.js'
    export default sysRegionDetails
</script>