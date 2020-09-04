<template>
    <div id="updateWarehouse" class="infoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">仓库信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>仓库编码</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCode"   maxlength="20"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>仓库类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseType" placeholder="请选择">
                            <el-option v-for="item in warehouseTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>仓库全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>仓库简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseName" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>负责人</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople" maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">仓库座机</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseTelephone"   maxlength="20"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>仓库性质</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseNature" placeholder="请选择">
                            <el-option v-for="item in warehouseNatureList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">仓库面积</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseArea" maxlength="10" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">月租金</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCost" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>仓库地址</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>详情地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseAddress" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">经营品牌</label>
                    <div class="input-text">
                        <el-select v-model="obj.brandId" placeholder="请选择">
                            <el-option v-for="item in brandList" :key="item.brandId" :label="item.brandName" :value="item.brandId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">备注</label>
                    <div class="input-text">
                        <el-input maxlength="200"  type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.remark"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">图片信息</span></h3>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">仓库照片</label>
                    <div class="input-text">
                        <myFileModel ref="warehouseOne"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload" >
                    <label class="label-term">仓库照片</label>
                    <div class="input-text">
                        <myFileModel ref="warehouseTwo"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">仓库照片</label>
                    <div class="input-text">
                        <myFileModel ref="warehouseThree"></myFileModel>
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
    import updateWarehouse from './updateWarehouse.js'
    export default updateWarehouse
</script>