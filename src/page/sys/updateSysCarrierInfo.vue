<template>
    <div id="updateSysCarrierInfo">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">承运商关系</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>客户名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantFullName" filterable   @change="selectCustomerTenant" placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>承运逻辑</label>
                    <div class="input-text">
                        <el-select v-model="obj.carrierId" placeholder="请选择">
                            <el-option v-for="item in carrierIdList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==4 || obj.carrierId == 5">
                <li class="item" >
                    <label class="label-term"><em>*</em>店仓名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.storeFullName" filterable   @change="selectStore" placeholder="请选择店仓名称">
                            <el-option v-for="item in storeIdList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId!=3">
                <li class="item" >
                    <label class="label-term"><em>*</em>供应商名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.supplierFullName" filterable   @change="selectSupplierTenant" placeholder="请选择供应商">
                            <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.supplierFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==2">
                <li class="item">
                    <label class="label-term"><em>*</em>区域级别</label>
                    <div class="input-text">
                        <el-select v-model="obj.regionGrade" placeholder="请选择" @change="selectCity">
                            <el-option v-for="item in regionGradeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==2">
                <li class="item">
                    <label class="label-term">省市区</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;"  :selectType="selectType"></mycity>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==3">
                <li class="item">
                    <label class="label-term"><em>*</em>任意调拨</label>
                    <div class="input-text">
                        <el-select v-model="obj.allocateCarrierId" placeholder="请选择">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==3">
                <li class="item">
                    <label class="label-term"><em>*</em>仓库始发</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseCarrierId" placeholder="请选择">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==3">
                <li class="item">
                    <label class="label-term"><em>*</em>工厂直发</label>
                    <div class="input-text">
                        <el-select v-model="obj.factoryCarrierId" placeholder="请选择">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==3">
                <li class="item">
                    <label class="label-term"><em>*</em>逆向回货</label>
                    <div class="input-text">
                        <el-select v-model="obj.reverseCarrierId" placeholder="请选择">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="obj.carrierId==3">
                <li class="item">
                    <label class="label-term"><em>*</em>云仓电商</label>
                    <div class="input-text">
                        <el-select v-model="obj.retailerCarrierId" placeholder="请选择">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
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
    import updateSysCarrierInfo from './updateSysCarrierInfo.js'
    export default updateSysCarrierInfo
</script>