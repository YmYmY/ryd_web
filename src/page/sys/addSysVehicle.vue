<template>
    <div id="addSysVehicle">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">车辆信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>车牌号码</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleCode"   maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>车型</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicleType" placeholder="请选择">
                            <el-option v-for="item in vehicleTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" >
                <li class="item" >
                    <label class="label-term">挂车牌号</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleTrailerCode"   maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">类别</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicleTrailerType" placeholder="请选择">
                            <el-option v-for="item in vehicleTrailerTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">载重</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleLoad" v-mydoubleval maxlength="11"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">载方</label>
                    <div class="input-text">
                        <el-input v-model="obj.vehicleZaifang" v-mydoubleval maxlength="11"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>注册区域</label>
                    <div class="input-text">
                        <mycity ref="city" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">车辆属性</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicleAttributes" placeholder="请选择">
                            <el-option v-for="item in vehicleAttributesList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">专车专用</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicleDedicated" placeholder="请选择">
                            <el-option v-for="item in vehicleDedicatedList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term">客户名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.clientIds" value-key="tenantId" placeholder="请选择" multiple collapse-tags>
                            <el-option v-for="(item,index) in customerTenantList" :key="index" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>车牌颜色</label>
                    <div class="input-text">
                        <el-select v-model="obj.licensePlateColor" placeholder="请选择">
                            <el-option v-for="item in licensePlateColorList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item w_auto">
                    <label class="label-term">车辆描述</label>
                    <div class="input-text">
                        <el-input  maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容"  v-model="obj.vehicleRemarks"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">车主信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">车辆归属</label>
                    <div class="input-text">
                        <el-select v-model="obj.vehicleAttribution" placeholder="请选择">
                            <el-option v-for="item in vehicleAttributionList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">车队名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.convoyName"  maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">车主姓名</label>
                    <div class="input-text">
                        <el-input v-model="obj.carName"  maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">车主电话</label>
                    <div class="input-text">
                        <el-input v-model="obj.carPhone" v-mynumval maxlength="11"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">车主身份证</label>
                    <div class="input-text">
                        <el-input v-model="obj.carCard"  maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.paymentType" placeholder="请选择">
                            <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">开户人</label>
                    <div class="input-text">
                        <el-input v-model="obj.bankName"  maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开户城市</label>
                    <div class="input-text">
                        <mycity ref="bankCity" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">开户银行</label>
                    <div class="input-text">
                        <el-input v-model="obj.bankAccount"  maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">银行卡号</label>
                    <div class="input-text">
                        <el-input v-model="obj.bankCard"  maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">车主住址</label>
                    <div class="input-text">
                        <mycity ref="carCity" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">详细地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.carAddress"  maxlength="50"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">司机名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.driverName"   maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">司机号码</label>
                    <div class="input-text">
                        <el-input v-model="obj.driverPhone"  maxlength="11" v-mynumval ></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">图片信息</span></h3>
            <ul class="content clearfix">
                <li class="item img-upload">
                    <label class="label-term">行驶证</label>
                    <div class="input-text">
                        <myFileModel ref="drivingIcense"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">车身照</label>
                    <div class="input-text">
                        <myFileModel ref="bodyShot"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">驾驶证</label>
                    <div class="input-text">
                        <myFileModel ref="driverLicense"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">身份证正面</label>
                    <div class="input-text">
                        <myFileModel ref="cardFront"></myFileModel>
                    </div>
                </li>
                <li class="item img-upload">
                    <label class="label-term">身份证反面</label>
                    <div class="input-text">
                        <myFileModel ref="cardReverse"></myFileModel>
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
    import addSysVehicle from './addSysVehicle.js'
    export default addSysVehicle
</script>