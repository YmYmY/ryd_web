<template>
    <div id="permission" class="permissionPage clearfix">
        <div class="treeDiv">
            <div class="title">
                <span>网络区域</span>
                <el-button class="fr" type="primary" size="mini">添加区域</el-button>
            </div>
            <div class="treeList">
                <tree :treedata="treedata" @selectItem="selectCallBack" @dblclickItem="dblclickItem" label="regionName"></tree>
            </div>
        </div>
        <div class="rightTable">
            <h3 class="common-title">
                <span class="title-name">任e调平台-员工列表</span>
                <el-button class="fr" type="primary" size="mini">导出</el-button>
            </h3>
            <div class="tableDiv">
                <tableCommon tableName="permissionTable" ref="table" :head="head" :showSetTable="false" :showNum="true"></tableCommon>
            </div>
        </div>
    </div>
</template>

<script>
    import permission from './permission.js'
    export default permission;
</script>
<style lang="scss" src="./permission.scss"></style>