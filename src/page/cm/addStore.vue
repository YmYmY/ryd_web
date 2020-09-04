<template>
    <div id="addStore" class="infoPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">门店信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>门店编码</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCode"   maxlength="20" ></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>门店级别</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseType" placeholder="请选择">
                            <el-option v-for="item in storeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>门店全称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>门店简称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseName" maxlength="30"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>经营方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.manageType" placeholder="请选择">
                            <el-option v-for="item in manageTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">所属经销商</label>
                    <div class="input-text">
                        <el-select v-model="obj.belongsId" placeholder="请选择">
                            <el-option v-for="item in cmDealerList" :key="item.dealerId" :label="item.dealerFullName" :value="item.dealerId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>所选区域</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionName" maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开店日期</label>
                    <div class="input-text">
                        <el-date-picker v-model="obj.startCreateDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime"  placeholder="选择日期"></el-date-picker>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>店长名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople" maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">销售名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.salesName" maxlength="11"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone"   maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">门店座机</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseTelephone"   maxlength="20" ></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">门店面积</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseArea" maxlength="10" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">门店租金</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCost" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>门店地址</label>
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
            <h3 class="common-title mb_20"><span class="title-name">账号信息</span></h3>
            <ul class="content clearfix">
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
            <ul class="content clearfix">
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
    import addStore from './addStore.js'
    export default addStore
</script>