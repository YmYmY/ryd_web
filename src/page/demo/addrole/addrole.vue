<template>
    <div id="addrole">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">员工信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>角色名称</label>
                    <div class="input-text">
                        <el-input v-model="inputvalue"></el-input>
                    </div>
                </li>
            </ul>                
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">备注说明</label>
                    <div class="input-text">
                        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="inputvalue"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">员工权限</span></h3>
            <div class="treeBox">
                <el-tree
                ref="vuetree"
                :data="data4"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
                </el-tree>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="getData()">保存</el-button>
                <el-button type="info">取消</el-button>
            </div>
        </div>
    </div>
</template>


<script>
    import addrole from './addrole.js'
    export default addrole
</script>
<style lang="scss">
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        .el-tree-node__content{
            border-bottom:$border;
            padding:3px 0;
        }
    }
</style>