<template>
    <div id="addClientRole" class="addClientRolePage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">角色信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>角色名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.roleName" maxlength="15"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">备注说明</label>
                    <div class="input-text">
                        <el-input maxlength="200" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入内容" v-model="obj.remarks"></el-input>
                    </div>
                </li>
            </ul>
            <h3 class="common-title mb_20"><span class="title-name">角色权限</span></h3>
            <div class="treeBox">
                <simpleTree ref="tree" :treedata="data4" label="urlName"></simpleTree>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>



<script>
    import addClientRole from './addClientRole.js'
    export default addClientRole
</script>
<style lang="scss">
.addClientRolePage{
    .treeBox{
        border:$border;
        border-bottom: none;
        border-radius: 3px;
        .el-tree-node__content{
            border-bottom:$border;
            padding:3px 0;
        }
    }
}
</style>