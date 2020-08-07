<template>
    <div id="freightSetting" class="freightSettingPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">计费产品</span></h3>
            <div class="tenantPrice">
                <div v-for="(item,$index) in tenantPriceList" :key="$index" class="clearfix">
                    <div class="title">产品{{$index+1}}
                        <em v-show="item.isDefault==1" style="position: absolute;top: 25px;left: 0;width: 90px;">(默认)</em>
                    </div>
                    <div class="info">
                        <ul class="content clearfix">
                            <li class="item">
                                <label class="label-term"><em>*</em>价格名称</label>
                                <div class="input-text">
                                    <el-input  v-model="item.priceName" placeholder="请输入价格名称" maxlength="50"></el-input>
                                </div>
                            </li>
                            <li class="item">
                                <label class="label-term"><em>*</em>价格类型</label>
                                <div class="input-text">
                                    <el-select v-model="item.priceType"  v-bind:disabled='item.isDefault==1' placeholder="请选择" >
                                        <el-option v-for="item in sysPriceList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                                    </el-select>
                                </div>
                            </li>
                        </ul>
                        <ul class="content clearfix">
                            <li class="item item100">
                                <label class="label-term"><em>*</em>选择类型</label>
                                <div class="input-text" style="width:calc(48% - 84px)" v-show="item.selectType=='1'">
                                    <el-input class="fl" style="width:30%" v-model="item.weightStart" placeholder="最小值"  maxlength="11" v-mydoubleval></el-input>
                                    <em class="fl" style="font-size:18px;width:5%;text-align: center;"><</em>
                                    <el-select class="fl" style="width:30%" v-model="item.selectType" placeholder="请选择">
                                        <el-option v-for="item in selectType" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                                    </el-select>
                                    <em class="fl" style="font-size:18px;width:5%;text-align: center;">≤</em>
                                    <el-input class="fl" style="width:30%"  v-model="item.weightEnd" placeholder="最大值" maxlength="11" v-mydoubleval></el-input>
                                </div>
                                <div class="input-text" style="width:calc(48% - 84px)" v-show="item.selectType=='2'">
                                    <el-input class="fl" style="width:30%" v-model="item.volumeStart" placeholder="最小值"  maxlength="11" v-mydoubleval></el-input>
                                    <em class="fl" style="font-size:18px;width:5%;text-align: center;"><</em>
                                    <el-select class="fl" style="width:30%" v-model="item.selectType" placeholder="请选择">
                                        <el-option v-for="item in selectType" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                                    </el-select>
                                    <em class="fl" style="font-size:18px;width:5%;text-align: center;">≤</em>
                                    <el-input class="fl" style="width:30%"  v-model="item.volumeEnd" placeholder="最大值" maxlength="11" v-mydoubleval></el-input>
                                </div>
                                <div class="input-text" style="width:calc(48% - 84px)" v-show="item.selectType=='3'">
                                    <el-input class="fl" style="width:30%" v-model="item.piecesStart" placeholder="最小值"  maxlength="11" v-mydoubleval></el-input>
                                    <em class="fl" style="font-size:18px;width:5%;text-align: center;"><</em>
                                    <el-select class="fl" style="width:30%" v-model="item.selectType" placeholder="请选择">
                                        <el-option v-for="item in selectType" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                                    </el-select>
                                    <em class="fl" style="font-size:18px;width:5%;text-align: center;">≤</em>
                                    <el-input class="fl" style="width:30%"  v-model="item.piecesEnd" placeholder="最大值" maxlength="11" v-mydoubleval></el-input>
                                </div>
                            </li>
                        </ul>
                        <ul class="content clearfix">
                            <li class="item">
                                <label class="label-term"><em>*</em>订单类型</label>
                                <div class="input-text">
                                    <el-select v-model="item.orderType" placeholder="请选择" multiple collapse-tags>
                                        <el-option v-for="item in orderTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="item">
                                <label class="label-term"><em>*</em>状态</label>
                                <div class="input-text">
                                    <el-select v-model="item.priceStatus" placeholder="请选择">
                                        <el-option v-for="item in priceStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                                    </el-select>
                                </div>
                            </li>
                            <img class="addIcon" src="@/static/image/$tenantId$/u2584.png" title="删除" v-show="item.isDefault==2" @click="delTable($index)">
                            <img class="delIcon" src="@/static/image/$tenantId$/u2582.png" title="增加" v-show="$index==tenantPriceList.length-1" @click="addTable()">
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="common-title"><span class="title-name">计费设置</span></h3>
            <div class="tip">注：1.开启进阶后，系统将按进阶后的重量进行计算，
                        2.每个客户只支持一种进阶方式，
                        3.0.5进阶指的是计费时重量都是0.5的整数倍，1进阶就是计费时重量为1的整数倍，
                        4.到付上浮指的是结算方式选择到付时，运价按所选择比例对总收入进行上浮计算</div>
            <ul class="content clearfix">
                <li class="item item100">
                    <label class="label-term"><em>*</em>进阶数据</label>
                    <div class="input-text">
                        <el-checkbox v-model="stepPrice">阶梯价</el-checkbox>
                        <el-checkbox v-model="standardPrice">标准价</el-checkbox>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>重量进阶</label>
                    <div class="input-text">
                        <el-select v-model="obj.weightAdvanced" placeholder="请选择">
                            <el-option v-for="item in weightAdvancedList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>到付上浮</label>
                    <div class="input-text">
                        <el-select v-model="obj.collectAdvanced" placeholder="请选择">
                            <el-option v-for="item in collectAdvancedList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>折扣方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.discountType" placeholder="请选择">
                            <el-option v-for="item in discountTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <h3 class="common-title" ><span class="title-name">折扣配置</span></h3>
            <div class="tip">注：1.总运费折扣指的是按每个自然月对账时，对该客户发送运费总额达到一定金额时做出的运费折扣优惠
                        2.多重优惠，只享受其中运费总额最大值的优惠
                        3.折扣录入原则，总运费越高折扣享受的折扣越大；
                        4.总运费折扣/总单量折扣只能选其中一种。</div>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">一般折扣</label>
                    <div class="input-text input-range">
                        <el-input placeholder="总额" v-model="obj.discountOne"  maxlength="11" v-mydoubleval></el-input>
                        <span>-</span>
                        <el-input placeholder="折扣（%）" v-model="obj.rateOne"  maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item w_auto">
                    <label class="label-term">次优折扣</label>
                    <div class="input-text input-range">
                        <el-input placeholder="总额" v-model="obj.discountTwo" maxlength="11" v-mydoubleval></el-input>
                        <span>-</span>
                        <el-input  placeholder="折扣（%）" v-model="obj.rateTwo" maxlength="11" v-mydoubleval></el-input>
                    </div>
                </li>
                <li class="item w_auto">
                    <label class="label-term">最优折扣</label>
                    <div class="input-text input-range">
                        <el-input placeholder="总额" v-model="obj.discountThree" maxlength="11" v-mydoubleval></el-input>
                        <span>-</span>
                        <el-input  placeholder="折扣（%）" v-model="obj.rateThree" maxlength="11" v-mydoubleval></el-input>
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
    import freightSetting from './freightSetting.js'
    export default freightSetting
</script>
<style lang="scss">
    .freightSettingPage{
        .tenantPrice{
            &>div{
                border-bottom:1px dashed $border-color;
                padding-bottom: 20px;
                margin-bottom: 20px;
                position: relative;
                &:last-child{
                    border:none;
                    margin:0;
                }
                .addIcon,.delIcon{
                    width: 25px;
                    cursor: pointer;
                    margin: 7px 5px 0;
                }
                .title{
                    float: left;
                    width: 90px;
                    line-height: 150px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    border-right:1px dashed $border-color;
                    box-sizing: border-box;
                }
                .info{
                    float: left;
                    width: calc(100% - 110px);
                    margin-left: 20px;
                }
            }
        }
        .tip{
            color: red;
            background: #ffffcc;
            padding: 5px 30px;
            line-height: 24px;
        }
    }
</style>