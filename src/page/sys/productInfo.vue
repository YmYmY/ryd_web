<template>
    <div id="productInfo" class="productInfoPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">产品名称:</label>
                    <div class="input-text">
                        <el-select v-model="obj.productType" placeholder="请选择">
                            <el-option v-for="item in productTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueyProductInfo()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>产品管理列表</span>
                    <el-tooltip effect="light" content="产品管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="244" @click="addProductInfo()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="245" @click="updateProductInfo()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="246" @click="deleteProductInfo()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="247" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="productInfoTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
    </div>
</template>


<script>
    import productInfo from './productInfo.js'
    export default productInfo
</script>
<style lang="scss">
.productInfoPage{
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