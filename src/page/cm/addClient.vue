<template>
    <div id="addClient" class="infoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">客户信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">公司名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>收货人</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople" maxlength="10"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>手机号码</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone" maxlength="11"></el-input>
                    </div>
                </li>

            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>省市区</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>详情地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseAddress" maxlength="50"></el-input>
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
    import addClient from './addClient.js'
    export default addClient
</script>