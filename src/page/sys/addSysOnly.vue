<template>
    <div id="addSysOnly">
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
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>发货店仓</label>
                    <div class="input-text">
                        <el-select  v-model="obj.storeName" filterable   @change="selectStore" placeholder="请选择门仓名称">
                            <el-option v-for="item in storeIdList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>收货店仓</label>
                    <div class="input-text">
                        <el-select  v-model="obj.storeFullName" filterable   @change="receiveStore" placeholder="请选择门仓名称">
                            <el-option v-for="item in receiveStoreIdList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>供应商名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.supplierFullName" filterable   @change="selectSupplierTenant" placeholder="请选择供应商">
                            <el-option v-for="item in supplierTenantList" :key="item.tenantId" :label="item.supplierFullName" :value="item.tenantId"></el-option>
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
    import addSysOnly from './addSysOnly.js'
    export default addSysOnly
</script>