<template>
    <div id="store">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">添加时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">门店全称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">联系手机:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehousePhone" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">登陆账号:</label>
                    <div class="input-text">
                        <el-input v-model="obj.userLogin" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryStore()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>门店管理列表</span>
                    <el-tooltip effect="light" content="门店管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="112" @click="addStore()" plain size="mini">新增</el-button>
                    <el-button type="primary" v-entity="113" @click="updateStore()" plain size="mini">修改</el-button>
                    <el-button type="primary" v-entity="114" @click="addStoreSysUser()" plain size="mini">添加店员</el-button>
                    <el-button type="primary" v-entity="115" @click="importOrder()" plain size="mini">门店导入</el-button>
                    <el-button type="primary" v-entity="445" @click="setBrand()" plain size="mini">品牌设置</el-button>
                    <el-button type="primary" v-entity="116" @click="deleteStore()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="117" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="storeTable" ref="table" :head="head" :showNum="true" @dblclickItem="dblclickItem"></tableCommon>
        </div>

        <el-dialog title="添加店员" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>店员姓名</label>
                        <div class="input-text">
                            <el-input v-model="userName" maxlength="11"></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>店员手机</label>
                        <div class="input-text">
                            <el-input v-model="userPhone" maxlength="11" v-mynumval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>登录账号</label>
                        <div class="input-text">
                            <el-input v-model="userLogin"  maxlength="11" autocomplete="off" v-mynumval></el-input>
                        </div>
                    </li>
                </ul>
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>登录密码</label>
                        <div class="input-text">
                            <el-input v-model="userPassword" type="password" autoComplete="new-password"  maxlength="20"></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSaveUser()">确 定</el-button>
            </div>
        </el-dialog>


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
    import store from './store.js'
    export default store
</script>
<style scoped>

</style>