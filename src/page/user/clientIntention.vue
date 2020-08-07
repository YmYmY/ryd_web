<template>
    <div id="clientIntention" class="clientIntentionPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">添加时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">所在地区</label>
                    <div class="input-text fl">
                        <mycity  ref="city"  class="city fl" placeholder="选择地址"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.clientState" placeholder="请选择">
                            <el-option v-for="item in clientStateList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户全称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.clientName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">预约拜访时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.intentionDate" @callback="data=>{obj.intentionDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">销售部门</label>
                    <div class="input-text">
                        <el-select v-model="obj.salesId" placeholder="请选择">
                            <el-option v-for="item in salesList" :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">销售人员:</label>
                    <div class="input-text">
                        <el-input v-model="obj.salesPersonName" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryClientIntention()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>意向客户列表</span>
                    <el-tooltip effect="light" content="意向客户列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="173" @click="addClientIntention()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="174" @click="openReservation()" plain size="mini">预约拜访</el-button>
                    <el-button type="primary" v-entity="175" @click="openMaintain()" plain size="mini">拜访维护</el-button>
                    <el-button type="primary" v-entity="176" @click="updateClientIntention()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="177" @click="deleteClientIntention()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="178" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="clientIntentionTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>


        <el-dialog title="预约拜访" :visible.sync="reservation" center width="550px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>预约时间</label>
                        <div class="input-text">
                            <el-date-picker v-model="from.intentionDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>拜访方式</label>
                        <div class="input-text">
                            <el-select v-model="from.reservationType" placeholder="请选择">
                                <el-option v-for="item in reservationTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">拜访对象</label>
                        <div class="input-text">
                            <el-input v-model="from.otherName"  maxlength="11" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">拜访事由</label>
                        <div class="input-text">
                            <el-input v-model="from.causeThing"  maxlength="11" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">拜访人</label>
                        <div class="input-text">
                            <el-input v-model="from.reservationName" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">备注</label>
                        <div class="input-text">
                            <div class="input-text">
                                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="150" v-model="from.remarks"></el-input>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="reservation = false">取 消</el-button>
                <el-button type="primary" @click="doSaveReservation()">确 定</el-button>
            </div>
        </el-dialog>



        <el-dialog title="维护拜访" :visible.sync="maintain" center width="550px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>拜访时间</label>
                        <div class="input-text">
                            <el-date-picker v-model="from.intentionDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>拜访方式</label>
                        <div class="input-text">
                            <el-select v-model="from.reservationType" placeholder="请选择">
                                <el-option v-for="item in reservationTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">拜访对象</label>
                        <div class="input-text">
                            <el-input v-model="from.otherName"  maxlength="11" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">跟进情况</label>
                        <div class="input-text">
                            <el-input v-model="from.cause"  maxlength="11" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">下一步计划</label>
                        <div class="input-text">
                            <el-input v-model="from.plan" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">拜访人</label>
                        <div class="input-text">
                            <el-input v-model="from.reservationName" ></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">备注</label>
                        <div class="input-text">
                            <div class="input-text">
                                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" maxlength="150" v-model="from.remarks"></el-input>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="maintain = false">取 消</el-button>
                <el-button type="primary" @click="doSaveMaintain()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>


<script>
    import clientIntention from './clientIntention.js'
    export default clientIntention
</script>
<style lang="scss">
.clientIntentionPage{
    .el-dialog__body{
        padding:10px 20px 0;
        .areaList{
            margin-top:20px;
        }
        .el-checkbox{
            margin-bottom:15px;
        }
        .areaDefault{
            width: 100%;
            margin-bottom: 20px;
            .label-term{
                line-height: 40px;
                margin-right: 15px;
            }
        }
    }
    .el-dialog__footer{
        text-align: center;
    }
}
</style>