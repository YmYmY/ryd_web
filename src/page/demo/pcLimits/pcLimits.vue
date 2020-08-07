<template>
    <div id="pcLimits" class="pcLimitsPage">
        <h3 class="common-title mb_20"><span class="title-name">高级客户</span></h3>
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th width="200">一级菜单<i class="el-icon-circle-plus-outline"></i></th>
                    <th width="200">二级菜单</th>
                    <th>子菜单</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td width="200">
                        <el-input placeholder=""></el-input>
                        <i class="el-icon-circle-plus-outline"></i>
                        <i class="el-icon-remove-outline"></i>
                    </td>
                    <td width="200">
                        <el-input placeholder=""></el-input>
                        <i class="el-icon-remove-outline"></i>
                        <i class="el-icon-edit" v-popover:popover4></i>
                    </td>
                    <td class="fieldList">
                        <span class="field">字段<i class="el-icon-error"></i></span>
                        <span class="field">字段<i class="el-icon-error"></i></span>
                        <span class="field">字段<i class="el-icon-error"></i></span>
                    </td>
                </tr>
            </tbody>
        </table>
        <el-popover
            ref="popover4"
            placement="right"
            width="200"
            trigger="click">
            <div class="popoverList">
                <h3 class="title">子菜单列表</h3>
                <div class="item" @dblclick="closePopover">订单录入</div>
                <div class="item">订单录入</div>
                <div class="item">订单录入</div>
                <div class="item">订单录入</div>
                <div class="item">订单录入</div>
                <div class="item">订单录入</div>
            </div>
        </el-popover>
    </div>
</template>

<script>
    import pcLimits from './pcLimits.js'
    export default pcLimits;
</script>
<style lang="scss" src="./pcLimits.scss"></style>