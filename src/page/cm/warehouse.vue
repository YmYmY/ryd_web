<template>
    <div id="warehouse">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">添加时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">仓库类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.warehouseType" placeholder="请选择">
                            <el-option v-for="item in warehouseTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">仓库名:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系人:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePeople" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系手机:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryWarehouse()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>仓库管理列表</span>
                    <el-tooltip effect="light" content="仓库管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="108" @click="addWarehouse()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="109" @click="updateWarehouse()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="110" @click="deleteWarehouse()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="446" @click="setBrand()" plain size="mini">品牌设置</el-button>
                    <el-button type="primary" v-entity="111" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="warehouseTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>

        <el-dialog title="设置品牌" :visible.sync="showBrand" center width="350px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>经营品牌</label>
                        <div class="input-text">
                            <el-select v-model="brandId" placeholder="请选择">
                                <el-option v-for="item in brandList" :key="item.brandId" :label="item.brandName" :value="item.brandId"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showBrand = false">取 消</el-button>
                <el-button type="primary" @click="doSaveBrand()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>


<script>
    import warehouse from './warehouse.js'
    export default warehouse
</script>
<style scoped>

</style>