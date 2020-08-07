<template>
    <div id="sysProductLogistics">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">生效时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.takeEffectDate" @callback="data=>{obj.takeEffectDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">计费方向</label>
                    <div class="input-text">
                        <el-select v-model="obj.cityType" placeholder="请选择">
                            <el-option v-for="item in cityTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">价格名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantPrice" placeholder="请选择" @change="forceUpdate">
                            <el-option v-for="item in tenantPriceList" :key="item.priceName" :label="item.priceName" :value="item.priceId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">出发地</label>
                    <div class="input-text fl">
                        <mycity  ref="startCity"  selectType="3"  class="city" placeholder="选择地址"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">目的地</label>
                    <div class="input-text fl">
                        <mycity  ref="endCity"  selectType="3"  class="city" placeholder="选择地址"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">按大小箱计费</label>
                    <div class="input-text">
                        <el-select v-model="obj.boxType" placeholder="请选择">
                            <el-option v-for="item in boxTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">创建人</label>
                    <div class="input-text">
                        <el-input v-model="obj.userName" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysPriceStandard()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>标准价格详情列表</span>
                    <el-tooltip effect="light" content="标准价格详情列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn" v-show="sysTenant.attributionType==2">
                    <el-button type="primary"  v-entity="453" @click="updateStandard()" plain size="mini">修改</el-button>
                    <el-button type="primary"  v-entity="454" @click="deleteStandard()" plain size="mini">删除</el-button>
                    <el-button type="primary"  v-entity="93" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
                <div class="table-title-btn" v-show="sysTenant.attributionType==3">
                    <el-button type="primary"  v-entity="455" @click="updateStandard()" plain size="mini">修改</el-button>
                    <el-button type="primary"  v-entity="456" @click="deleteStandard()" plain size="mini">删除</el-button>
                    <el-button type="primary"  v-entity="103" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="priceStandardDetailsTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>

        <el-dialog title="修改标准价价" class="ladderDialogForm" :visible.sync="dialogFormVisible" center width="900px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>计费方向</label>
                        <div class="input-text">
                            <el-select v-model="sysPrice.cityType" placeholder="请选择" v-bind:disabled=true>
                                <el-option v-for="item in cityTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>出发地</label>
                        <div class="input-text">
                            <el-input v-model="startCityName" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term"><em>*</em>目的地</label>
                        <div class="input-text">
                            <el-input v-model="endCityName" v-bind:disabled=true></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>生效日期</label>
                        <div class="input-text">
                            <el-date-picker v-model="sysPrice.takeEffectDate" @blur="forceUpdate" value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="选择日期" ></el-date-picker>
                        </div>
                    </li>
                    <li class="item"  v-show="attributionType==3">
                        <label class="label-term"><em>*</em>计费方式</label>
                        <div class="input-text">
                            <el-select v-model="sysPrice.billingType" placeholder="请选择" @change="forceUpdate">
                                <el-option v-for="item in billingTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item"  v-show="attributionType==2 && tenantPriceList.length>0">
                        <label class="label-term">价格名称</label>
                        <div class="input-text">
                            <el-select v-model="sysPrice.tenantPrice" placeholder="请选择" @change="forceUpdate">
                                <el-option v-for="item in tenantPriceList" :key="item.priceName" :label="item.priceName" :value="item.priceId"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item" v-show="attributionType==2">
                        <label class="label-term">客户品牌</label>
                        <div class="input-text">
                            <el-select v-model="sysPrice.brandId" value-key="brandId" placeholder="请选择"  collapse-tags multiple @change="forceUpdate">
                                <el-option v-for="(item,index) in brandList" :key="index" :label="item.brandName"  :value="item"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item" v-show="attributionType==2">
                        <label class="label-term"><em>*</em>订单类型</label>
                        <div class="input-text">
                            <el-select v-model="sysPrice.orderType" value-key="codeValue" placeholder="请选择"  collapse-tags multiple @change="forceUpdate">
                                <el-option v-for="(item,index) in orderTypeList" :key="index" :label="item.codeName" :value="item"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">重泡货比</label>
                        <div class="input-text">
                            <el-input v-model="sysPrice.weightCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">其他费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.otherCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">保险费率</label>
                        <div class="input-text">
                            <el-input v-model="sysPrice.insuranceCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">最低保费</label>
                        <div class="input-text">
                            <el-input v-model="sysPrice.lowestCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                    <label class="label-term"><em>*</em>按大小箱计费</label>
                        <div class="input-text">
                            <el-select v-model="sysPrice.boxType" placeholder="请选择" @change="selectBoxType">
                                <el-option v-for="item in boxTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">时效</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.agingNum" @input="forceUpdate" maxlength="11" v-mynumval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">按体积</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.volumeCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">按重量</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.weightCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">按件数</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="!showBox" v-model="sysPriceStandard.numCost" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">大箱</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="showBox" v-model="sysPriceStandard.maxBox" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">中箱</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="showBox" v-model="sysPriceStandard.inBox" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">小箱</label>
                        <div class="input-text">
                            <el-input v-bind:disabled="showBox" v-model="sysPriceStandard.minBox" @input="forceUpdate" maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">提货费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.pickupCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">送货费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.deliveryCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">装卸费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.handingCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">包装费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.publicCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">最低收费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.receiveCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">送货费计算类型</label>
                        <div class="input-text">
                            <el-select v-model="sysPriceStandard.deliveryType" placeholder="请选择"  @change="forceUpdate">
                                <el-option v-for="item in calculationTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">送货费最低收费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.deliveryLowestCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">提货费计算方式</label>
                        <div class="input-text">
                            <el-select v-model="sysPriceStandard.pickupType" placeholder="请选择"  @change="forceUpdate">
                                <el-option v-for="item in calculationTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">提货费最低收费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.pickupLowestCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">包装费计算方式</label>
                        <div class="input-text">
                            <el-select v-model="sysPriceStandard.publicType" placeholder="请选择"  @change="forceUpdate">
                                <el-option v-for="item in calculationTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">包装费最低收费</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.publicLowestCost" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term">线路折扣</label>
                        <div class="input-text">
                            <el-input v-model="sysPriceStandard.lineDiscount" maxlength="11" @input="forceUpdate" v-mydoubleval></el-input>
                        </div>
                    </li>
                    <li class="item">
                        <label class="label-term">线路生效日期</label>
                        <div class="input-text">
                            <el-date-picker v-model="sysPriceStandard.takeEffectDate" @blur="forceUpdate" value-format="yyyy-MM-dd HH:mm:ss"  type="date" placeholder="选择日期" ></el-date-picker>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSave()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script>
    import priceStandardDetails from './priceStandardDetails.js'
    export default priceStandardDetails
</script>
<style lang="scss">
    .priceLadderDetailsPage{
        .ladderDialogForm{
            .common-info{
                padding: 0;
                .item{
                    width: 31%!important;
                    .label-term{
                        width: 94px!important;
                    }
                    .input-text{
                        width: calc(100% - 94px)!important;
                    }
                }
            }
        }
    }
</style>