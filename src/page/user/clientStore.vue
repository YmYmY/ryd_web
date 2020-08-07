<template>
    <div id="clientStore">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">所在区域</label>
                    <div class="input-text fl">
                        <mycity  ref="city"  :selectType="selectType" class="city fl" placeholder="选择地址"></mycity>
                    </div>
                </div>
                <div class="item">
                    <label class="label">客户名称:</label>
                    <div class="input-text">
                        <el-select  v-model="obj.tenantId" filterable   placeholder="请选择客户名称">
                            <el-option v-for="item in customerTenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">门店全称:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseFullName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">门店编码:</label>
                    <div class="input-text">
                        <el-input v-model="obj.warehouseCode" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">登录账户:</label>
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
                    <el-button type="primary" v-entity="165" @click="importOrder()" plain size="mini">门店导入</el-button>
                    <el-button type="primary" v-entity="584" @click="updateStore()" plain size="mini">门店修改</el-button>
                    <el-button type="primary" v-entity="593" @click="updateCustomer()" plain size="mini">专属客服</el-button>
                    <el-button type="primary" v-entity="381" @click="updateQuota()" plain size="mini">额度调整</el-button>
                    <el-button type="primary" v-entity="166" @click="deleteStore()" plain size="mini">删除</el-button>
                    <el-button type="primary" v-entity="167" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="clientStoreTable" ref="table" :head="head" :showNum="true" @dblclickItem="dblclickItem"></tableCommon>
        </div>
        <el-dialog title="专属客服" :visible.sync="showCustomer" center width="350px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item">
                        <label class="label-term"><em>*</em>客服人员</label>
                        <div class="input-text">
                            <el-select v-model="customerUserId "  placeholder="请选择" >
                                <el-option v-for="item in userOragnize" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showCustomer = false">取 消</el-button>
                <el-button type="primary" @click="doSaveCustomer()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="额度调整" :visible.sync="dialogFormVisible" center width="350px">
            <div class="common-info" style="border:none;">
                <ul class="content clearfix">
                    <li class="item item100">
                        <label class="label-term"><em>*</em>调整额度</label>
                        <div class="input-text">
                            <el-input  v-model="orderAmount"  maxlength="11" v-mydoubleval></el-input>
                        </div>
                    </li>
                </ul>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSaveQuota()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import clientStore from './clientStore.js'
    export default clientStore
</script>
<style scoped>

</style>