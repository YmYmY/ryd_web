<template>
    <div id="clientUser" class="clientUserPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">创建时间</label>
                    <div class="input-text">
                        <dataPicker :model="obj.createDate" @callback="data=>{obj.createDate=data}" startPlaceholder="开始" endPlaceholder="结束"></dataPicker>
                    </div>
                </div>
                <div class="item">
                    <label class="label">状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.userStatus" placeholder="请选择">
                            <el-option v-for="item in userStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">所属角色</label>
                    <div class="input-text">
                        <el-select v-model="obj.roleId" placeholder="请选择">
                            <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">用户类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.userType" placeholder="请选择">
                            <el-option v-for="item in userTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <label class="label">姓名:</label>
                    <div class="input-text">
                        <el-input v-model="obj.userName" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="item">
                    <label class="label">手机:</label>
                    <div class="input-text">
                        <el-input v-model="obj.userPhone" placeholder="请输入"></el-input>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">
                <div class="btn">
                    <el-button type="primary" @click="doQueryClientUser()" plain size="mini" icon="el-icon-search">搜索</el-button>
                </div>
                <div class="btn">
                    <el-button type="danger" @click="clear()" plain size="mini" icon="el-icon-close">清空</el-button>
                </div>
            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>用户管理列表</span>
                    <el-tooltip effect="light" content="用户管理列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    <el-button type="primary" v-entity="118" @click="addClientUser()" plain size="mini">新增员工</el-button>
                    <el-button type="primary" v-entity="119" @click="updateClientUser()" plain size="mini">修改员工</el-button>
                    <el-button type="primary" v-entity="120" @click="deleteSysUser()" plain size="mini">删除员工</el-button>
                    <el-button type="primary" v-entity="121" @click="downloadExcelFile()" plain size="mini">导出</el-button>
                </div>
            </div>
            <tableCommon tableName="clientUserTable" ref="table" :head="head" :showNum="true"></tableCommon>
        </div>
        <el-dialog
                title="员工区域授权"
                :visible.sync="dialogVisible"
                width="450px">
            <div class="tip clearfix">
                <div class="fl"><em>注：</em></div>
                <div class="fl">
                    <p><em>1.所有员工支持操作多个区域</em></p>
                    <p><em>2.拥有多个区域权限的员工可以操作网点切换</em></p>
                </div>
            </div>
            <div class="areaList">
                <el-checkbox-group v-model="regionIds">
                    <el-checkbox v-for="item in regionList" :key="item.regionId" :checked="checked"  @change="checked=!checked" :label="item.regionId">{{item.regionName}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doSave()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
    import clientUser from './clientUser.js'
    export default clientUser
</script>
<style lang="scss">
.clientUserPage{
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