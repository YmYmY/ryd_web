<template>
    <div id="sysOragnize" class="permissionPage clearfix">
        <div class="treeDiv">
            <div class="title">
                <span>组织架构</span>
                <el-button v-entity="163" class="fr" type="primary" size="mini" @click="addLower()">添加下级</el-button>
            </div>
            <div class="treeList">
                <tree ref="tree" :treedata="treedata" @selectItem="selectCallBack" @hoverItem="hoverItem" @saveItem="saveItem" editItem="true" label="oragnizeName">
                   <span class="btn" v-show="currentItem.oragnizeStatus==2" @click="deleteSysOragnize(currentItem)">删除</span>
                </tree>
            </div>
        </div>
        <div class="rightTable">
            <h3 class="common-title">
                <span class="title-name">{{tenantName}}-{{oragnizeName}}-员工列表</span>
            </h3>
            <div class="table-title-btn">
                <el-button type="primary" v-entity="70" v-show="obj.oragnizeId>0"  @click="setUpSupervisor(2)" plain size="mini">设置主管</el-button>
                <el-button type="primary" v-entity="71" v-show="obj.oragnizeId>0"  @click="setUpSupervisor(3)" plain size="mini">设置副主管</el-button>
                <el-button type="primary" v-entity="72" v-show="obj.oragnizeId>0"  @click="addSysUser()" plain size="mini">添加员工</el-button>
                <el-button type="primary" v-entity="73" v-show="obj.oragnizeId>0" @click="setUpSupervisor(1)" plain size="mini">移除管理</el-button>
                <el-button type="primary" v-entity="74" @click="downloadExcelFile()" plain size="mini">导出</el-button>
            </div>
            <div class="tableDiv">
                <tableCommon tableName="sysOraginzeTable" ref="table" :head="head" :showSetTable="false" :showNum="true"></tableCommon>
            </div>
        </div>

        <!-- 添加员工 -->
        <div class="popup_bj" v-show="showAddSysUser">
            <div class="common-switch-box">
                <div class="setRowTop">
                    <h3>部门添加员工</h3>
                </div>
                <div class="clearfix" style="position:relative;">
                    <!-- 不展示列 -->
                    <div class="fl flow_row">
                        <div class="selet_all">
                            <div class="controls fl">
                                <!-- <el-checkbox>未选定</el-checkbox> -->
                                未选定
                            </div>
                        </div>
                        <div class="select_list">
                            <ul>
                                <li>                                
                                    <el-checkbox-group v-model="deleteUserList" class="clearfix">
                                        <el-checkbox v-for="item in deleteUser" :key="item.userId" :label="item.userId" :checked="checked"  @change="checked=!checked">{{item.userName}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="sure_select">
                        <el-button type="primary" icon="el-icon-arrow-right" size="mini" @click="addUserFn()"></el-button>
                        <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="deleteUserFn()"></el-button>
                    </div>
                    <!-- 展示列 -->
                    <div class="fr flow_row">
                        <div class="selet_all">
                            <div class="controls fl">
                                <!-- <el-checkbox>已选定</el-checkbox> -->
                                已选定
                            </div>
                        </div>
                        <div class="select_list">
                            <ul>
                                <li>
                                    <el-checkbox-group v-model="addUserList">
                                         <el-checkbox v-for="item in addUser" :key="item.userId" :label="item.userId">{{item.userName}}</el-checkbox>
                                    </el-checkbox-group>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="botBtn bottom_set_btn">
                    <el-button size="mini" @click="doSaveUserOragnize()">确定</el-button>
                    <el-button size="mini" @click="showAddSysUser=false">取消</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import sysOragnize from './sysOragnize.js'
    export default sysOragnize;
</script>
<style lang="scss" src="./permission.scss"></style>