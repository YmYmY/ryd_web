<template>
    <div id="addCmDealer" class="infoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">经销商信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>经销商编码</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerCode"   maxlength="20" v-bind:disabled=true></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>经销商级别</label>
                    <div class="input-text">
                        <el-select v-model="obj.dealerType" placeholder="请选择">
                            <el-option v-for="item in dealerTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>经销商全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerFullName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>经销商简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerName" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>经销商类别</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerNature" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>联系人</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerPeople" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerPhone" maxlength="11"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">联系座机</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerTelephone" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>销售区域</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionName" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">加盟日期</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.startCreateDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期"></el-date-picker>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">加盟期限</label>
                    <div class="input-text">
                        <el-select v-model="obj.dateType" placeholder="请选择">
                            <el-option v-for="item in dateTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">拿货折扣</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerDiscount" maxlength="10" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">退货率</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerRate" maxlength="10" v-mydoubleval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>经销商地址</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>详情地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.dealerAddress" maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <div class="input-text">
                        <el-checkbox v-model="collectionType">开具系统账号</el-checkbox>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20" v-show="collectionType"><span class="title-name">账号信息</span></h3>
            <ul class="content clearfix" v-show="collectionType">
                <li class="item">
                    <label class="label-term"><em>*</em>登录账号</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" autocomplete="off" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password" v-model="obj.userPassword" autoComplete="new-password"  maxlength="20"></el-input>
                        <!--<a class="lint" href="javascript:;">重置密码</a>-->
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="collectionType">
                <li class="item">
                    <label class="label-term"><em>*</em>状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.userStatus" placeholder="请选择">
                            <el-option v-for="item in userStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
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
    import addCmDealer from './addCmDealer.js'
    export default addCmDealer
</script>