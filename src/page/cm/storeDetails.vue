<template>
    <div id="storeDetails" class="infoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">门店信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>门店编码</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCode" v-bind:disabled=true  maxlength="20"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>门店级别</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseType" placeholder="请选择" v-bind:disabled=true>
                            <el-option v-for="item in storeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>门店全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" v-bind:disabled=true maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>门店简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseName" v-bind:disabled=true maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>经营方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.manageType" placeholder="请选择" v-bind:disabled=true>
                            <el-option v-for="item in manageTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">所属经销商</label>
                    <div class="input-text">
                        <el-select v-model="obj.belongsId" placeholder="请选择" v-bind:disabled=true>
                            <el-option v-for="item in belongsIdList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>所选区域</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionName" v-bind:disabled=true maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开店日期</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.startCreateDate" v-bind:disabled=true value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>店长名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople"  v-bind:disabled=true maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">销售名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.salesName" maxlength="11"  v-bind:disabled=true v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone" v-bind:disabled=true  maxlength="11"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">门店座机</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseTelephone" v-bind:disabled=true  maxlength="20"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">门店面积</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseArea" v-bind:disabled=true maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">门店租金</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCost" v-bind:disabled=true maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>门店地址</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;" v-bind:disabled=true></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>详情地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseAddress" v-bind:disabled=true  maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">账号信息</span></h3>
            <div class="rightTable">
                <div class="table-title-btn">
                    <el-button type="primary" plain size="mini" @click="updateSysUser()">启动/禁用</el-button>
                    <el-button type="primary" plain size="mini" @click="updatePassWord()">密码重置</el-button>
                </div>
                <div class="tableDiv">
                    <tableCommon tableName="storeDetailsTable" ref="table" :head="head" :showSetTable="false" :showNum="true"></tableCommon>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import storeDetails from './storeDetails.js'
    export default storeDetails
</script>