<template>
    <div id="sysRegion" class="permissionPage clearfix">
        <div class="treeDiv">
            <div class="title">
                <span>网络区域</span>
                <el-button class="fr" v-entity="162" @click="addSysRegion()" type="primary" size="mini">添加区域</el-button>
            </div>
            <div class="treeList">
                <tree ref="tree" :treedata="treedata" @selectItem="selectCallBack"  @dblclickItem="dblclickItem" @hoverItem="hoverItem" label="regionName">
                    <div>
                        <span class="btn" v-show="currentItem.regionStatus==1 && baseUser.tenantId==1 && currentItem.regionGrade!=0" @click.stop="review(currentItem,3)">审核通过</span>
                        <span class="btn" v-show="currentItem.regionStatus==1 && baseUser.tenantId==1 && currentItem.regionGrade!=0" @click.stop="review(currentItem,2)">审核不通过</span>
                        <span class="btn" v-show="currentItem.regionStatus==4 && currentItem.regionGrade!=0 && (currentItem.createTenantId==baseUser.tenantId || baseUser.tenantId==1)" @click.stop="review(currentItem,3)">启用</span>
                        <span class="btn" v-show="currentItem.regionStatus==3 && currentItem.regionGrade!=0 && (currentItem.createTenantId==baseUser.tenantId || baseUser.tenantId==1)" @click.stop="review(currentItem,4)">禁用</span>
                        <span class="btn" v-show="currentItem.createTenantId==baseUser.tenantId && currentItem.regionGrade!=0" @click.stop="modify(currentItem)">修改</span>
                    </div>
                </tree>
            </div>
        </div>
        <div class="rightTable">
            <h3 class="common-title">
                <span class="title-name">{{tenantName}}-员工列表</span>
            </h3>
            <div class="table-title-btn">
                <el-button type="primary" v-entity="65" @click="downloadExcelFile()" plain size="mini">导出</el-button>
            </div>
            <div class="tableDiv">
                <tableCommon tableName="sysRegionTable" ref="table" :head="head" :showSetTable="false" :showNum="true"></tableCommon>
            </div>
        </div>
    </div>
</template>

<script>
    import sysRegion from './sysRegion.js'
    export default sysRegion;
</script>
<style lang="scss" src="./permission.scss"></style>