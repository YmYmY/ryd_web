<template>
    <div id="sysTransit" class="sysTransitPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantFullName" filterable   @change="selectCustomerTenant" placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">店仓名称</label>
                    <div class="input-text">
                        <el-select  v-model="obj.warehouseFullName" filterable   @change="selectWarehouse" placeholder="请选择店仓名称">
                            <el-option v-for="item in warehouseList" :key="item.id" :label="item.storeFullName" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQuerySysTransit()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>中转合并设置列表</span>
                    <el-tooltip effect="light" content="中转合并设置列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="448" @click="addSysTransit()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="449" @click="updateSysTransit()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="450" @click="deleteSysTransit()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="451" @click="downloadExcelFile()"  plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="sysTransitTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>

        <el-dialog title="中转合并设置" class="settingDialog" :visible.sync="dialogFormVisible" center width="800px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>客户名称</label>
                        <el-select  v-model="from.tenantFullName" filterable   @change="selectFromTenant" placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>合并类型</label>
                        <el-select  v-model="from.mergeType" filterable    placeholder="请选择">
                            <el-option v-for="item in mergeTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>店仓名称</label>
                        <el-select  v-model="from.warehouseFullName" filterable value-key="storeFullName"  @change="selectFromWarehouse" placeholder="请选择店仓名称">
                            <el-option v-for="item in warehouseFromList" :key="item.id" :label="item.storeFullName" :value="item"></el-option>
                        </el-select>
                        <a class="lint" href="javascript:" @click="addTable()"><img src="@/static/image/$tenantId$/u2582.png" alt=""></a>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term">备注</label>
                        <div class="input-text">
                            <el-input  maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容"  v-model="from.remark"></el-input>
                        </div>
                    </li>
                </ul>
                <ul>
                    <div class="table_height">
                        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                            <tr>
                                <th width="150">店仓名</th>
                                <th width="80">联系人</th>
                                <th width="100">联系手机 </th>
                                <th>地址 </th>
                                <th width="60">操作 </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,$index) in sysTransitList" :key="$index">
                                <td width="150">{{item.warehouseFullName}}</td>
                                <td width="80">{{item.warehousePeople}}</td>
                                <td width="100">{{item.warehousePhone}}</td>
                                <td>{{item.cityName}}</td>
                                <td width="60"><a class="link" @click="delSysTransit($index)">删除</a></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveSysTransit()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>


<script>
    import sysTransit from './sysTransit.js'
    export default sysTransit
</script>
<style lang="scss">
.sysTransitPage{
    .settingDialog{
        .el-dialog__body{
            padding: 0;
            .common-info{
                padding-top: 0;
                padding-bottom: 0;
                .lint{
                    img{
                        width: 20px;
                        vertical-align: middle;
                        margin-left: 5px;
                    }
                }
            }
        }
    }
}
</style>