<template>
    <div id="addSendVehicle">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">项目派车</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>派车批次</label>
                    <div class="input-text">
                        <el-input v-model="obj.sendBatch" @input="forceUpdate" maxlength="30" @blur="pushSendNumber"></el-input>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>客户名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantFullName" filterable value-key="tenantFullName" @change="selectCustomerTenant"  placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item" >
                    <label class="label-term"><em>*</em>客户联系人</label>
                    <div class="input-text">
                        <el-input v-model="obj.sendClientName" v-bind:disabled=true @input="forceUpdate" maxlength="50"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>客户电话</label>
                    <div class="input-text">
                        <el-input v-model="obj.sendClientPhone" v-bind:disabled=true @input="forceUpdate" v-mynumval maxlength="11"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title"><span class="title-name">派车信息</span></h3>
            <div class="innerTab clearfix">
                <div :class="{'active':sendIndex==index}" class="innerItem" @click="accountChange(index)" v-for="(item,index) in sendList" :key="index">
                    {{item.name}}
                </div>
            </div>
            <div v-for="(item,index) in sendList" :key="index" v-show="sendIndex==index">
                <div class="innerInfo clearfix">
                    <ul class="content fl clearfix">
                        <li class="item">
                            <label class="label-term"><em>*</em>靠台时间</label>
                            <div class="input-text">
                                <el-date-picker @blur="forceUpdate" v-model="item.dependDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期" ></el-date-picker>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">靠台仓库</label>
                            <div class="input-text">
                                <el-select  v-model="item.dependStoreFullName"  value-key="storeFullName" @change="selectDependWarehouse"  filterable    placeholder="请选择仓库名称">
                                    <el-option v-for="item in warehouseList" :key="item.warehouseId" :label="item.storeFullName" :value="item"></el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>联系人</label>
                            <div class="input-text">
                                <el-input v-model="item.dependWarehousePerson" @input="forceUpdate" maxlength="30"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>联系电话</label>
                            <div class="input-text">
                                <el-input v-model="item.dependWarehousePhone"  @input="forceUpdate" v-mynumval maxlength="11"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>靠台地区</label>
                            <div class="input-text">
                                <mycity @selectCallback="selectDependCity" :ref="'dependCity'+index" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>详细地址</label>
                            <div class="input-text">
                                <el-input v-model="item.dependAddress" @input="forceUpdate" maxlength="30"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">定位</label>
                            <div class="input-text" @click="showMap(1)" style="cursor:pointer;">
                                <el-input readonly="readonly"  maxlength="30"></el-input>
                                <span class="unit">
                                    <img src="@/static/image/$tenantId$/u1001.png" style="width:16px;margin-top:12px;" alt="">
                                </span>
                            </div>
                        </li>
                    </ul>
                    <ul class="content fl clearfix">
                        <li class="item">
                            <label class="label-term">到达时间</label>
                            <div class="input-text">
                                <el-date-picker @blur="forceUpdate" v-model="item.arriveDate" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="选择日期" ></el-date-picker>
                            </div>
                        </li>
                        <li class="item">

                            <label class="label-term">到达仓库</label>
                            <div class="input-text">
                                <el-select  v-model="item.arriveStoreFullName"  value-key="storeFullName" @change="selectArriveWarehouse"  filterable    placeholder="请选择仓库名称">
                                    <el-option v-for="item in warehouseList" :key="item.warehouseId" :label="item.storeFullName" :value="item"></el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>联系人</label>
                            <div class="input-text">
                                <el-input v-model="item.arriveWarehousePerson" @input="forceUpdate" maxlength="30"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>联系电话</label>
                            <div class="input-text">
                                <el-input v-model="item.arriveWarehousePhone"  @input="forceUpdate" v-mynumval maxlength="11"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>到达地区</label>
                            <div class="input-text">
                                <mycity @selectCallback="selectArriveCity" :ref="'arriveCity'+index" class="fl" style="width:100%;" :selectType="selectType"></mycity>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term"><em>*</em>详细地址</label>
                            <div class="input-text">
                                <el-input v-model="item.arriveAddress" @input="forceUpdate" maxlength="30"></el-input>
                            </div>
                        </li>
                        <li class="item">
                            <label class="label-term">定位</label>
                            <div class="input-text" @click="showMap(2)" style="cursor:pointer;">
                                <el-input readonly="readonly"  maxlength="30"></el-input>
                                <span class="unit">
                                    <img src="@/static/image/$tenantId$/u1001.png" style="width:16px;margin-top:12px;" alt="">
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>车牌号码</label>
                        <div class="input-text">
                            <el-select v-model="item.vehicle" filterable value-key="vehicleCode"   @input.native ="setVehicleCode"  @change="selectVehicle"  placeholder="请选择车牌号码">
                                <el-option v-for="item in vehicleList" :key="item.vehicleCode" :label="item.vehicleCode" :value="item"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>车牌颜色</label>
                        <div class="input-text">
                            <el-select v-model="item.licensePlateColor" placeholder="请选择" @change="forceUpdate">
                                <el-option v-for="item in licensePlateColorList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>司机姓名</label>
                        <div class="input-text">
                            <el-select  v-model="item.driver" filterable value-key="driverName"  @input.native ="setDriverName"  @change="selectDriver"  placeholder="请选择司机姓名">
                                <el-option v-for="item in driverList" :key="item.driverName" :label="item.driverName" :value="item"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>司机电话</label>
                        <div class="input-text">
                            <el-input v-model="item.driverPhone" @input="forceUpdate" v-mynumval maxlength="11"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>派车单号</label>
                        <div class="input-text">
                            <el-input v-model="item.sendNumber" @input="forceUpdate" maxlength="30" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">派车重量(公斤)</label>
                        <div class="input-text">
                            <el-input v-model="item.packageWeight" @input="forceUpdate" v-mydoubleval maxlength="30"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">派车体积(方)</label>
                        <div class="input-text">
                            <el-input v-model="item.packageVolume" @input="forceUpdate" v-mydoubleval maxlength="30"></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">结算方式</label>
                        <div class="input-text">
                            <el-select @change="forceUpdate" v-model="item.paymentType" placeholder="请选择">
                                <el-option v-for="item in paymentTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">派车费用</label>
                        <div class="input-text">
                            <el-input v-model="item.sendCost" @input="forceUpdate" v-mydoubleval maxlength="11"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">备注</label>
                        <div class="input-text">
                            <el-input style="width:100%;" type="textarea" @input="forceUpdate" v-model="item.sendRemarks" maxlength="255"></el-input>
                        </div>
                    </li>
                </ul>                
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
        <mapDialog ref="mapDialog" @sureCallback="mapCallback" @hideMapBack="hideMapBack" :isShowMap="isShowMap" :mapPoint="mapPoint"></mapDialog>
        <!-- <el-dialog title="百度地图" :visible.sync="isShowMap" width="800px" :close="cleanMap">
            <div class="suggest">
                <input v-model="mapText" placeholder="请输入详细地址" id="suggestId"/>
                <div id="searchResultPanel"></div>
            </div>
            <baidu-map class="bm-view"  :center="mapObj.center" :zoom="mapObj.zoom" @ready="mapHandler"></baidu-map>
            <div class="page-bot-btn" style="padding:15px 0;margin:0 auto;">
                <el-button type="primary" @click="sureMapSite">确定</el-button>
                <el-button type="info" @click="cancelMap">取消</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
    import addSendVehicle from './addSendVehicle.js'
    export default addSendVehicle
</script>
<style lang="scss">
    #addSendVehicle{
        .el-dialog{
            .el-dialog__body{
                padding:0;
                position: relative;
                .common-info{
                    padding-bottom: 30px;
                }
            }
        }
        .innerInfo{
            border-bottom:1px dashed $border-color;
            margin-bottom: 20px;
            padding-bottom:10px;
            .content{
                width: 48%;
                margin-right: 2%;
                position: relative;
                .item{
                    width: 48%;
                    margin-right:4%;
                    &:nth-child(even){
                        margin-right: 0;
                    }
                }
                &:first-child::before{
                    content:"";
                    height: 100%;
                    width: 1px;
                    position: absolute;
                    top:0;
                    right: -2.5%;
                    border-left: 1px dashed $border-color;
                }
            }
        }
        .innerTab{
            background: #fff;
            border-bottom:$border;
            margin:10px 0;
            .innerItem{
                padding:8px 12px 6px;
                box-sizing: border-box;
                float: left;
                cursor: pointer;
                border:$border;
                border-bottom:none;
                text-align: center;
                position: relative;
                &:last-child{
                    border-left:none;
                }
                &.active,&:hover{
                    background: $hover-color;
                }
                &.active::after,&:hover::after{
                    content: "";
                    width: 100%;
                    height: 1px;
                    background: $hover-color;
                    position: absolute;
                    bottom:-1px;
                    left: 0;
                    z-index: 9;
                }
            }
        }
    }   
</style>