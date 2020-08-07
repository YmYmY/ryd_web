<template>
    <div id="sysCustomize" class="sysCustomizePage">
        <div class="common-info">
            <div class="audit-title">
                <ul class="content clearfix">
                    <li class="item" >
                        <label class="label-term"><em>*</em>字段名称</label>
                        <div class="input-text">
                            <el-input v-model="fieldName"   maxlength="30" ></el-input>
                        </div>
                    </li>
                    <li class="item" >
                        <label class="label-term"></label>
                        <div class="input-text">
                            <el-radio-group v-model="fieldType">
                                <el-radio   label="1">必填</el-radio>
                                <el-radio   label="2">非必填</el-radio>
                            </el-radio-group>
                        </div>
                    </li>
                    <li class="item" >
                        <label class="label-term"></label>
                        <div class="input-text">
                            <el-radio-group v-model="selectType">
                                <el-radio   label="1">可选可输</el-radio>
                                <el-radio   label="2">只选</el-radio>
                            </el-radio-group>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="table_height">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th width="30">序号</th>
                        <th width="100">枚举值（选项名）</th>
                        <th width="100">备注说明 </th>
                        <th width="100">操作 </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,$index) in customizeList" :key="$index">
                        <td width="100">{{$index+1}}</td>
                        <td width="100"><el-input v-model="item.enumerateName" maxlength="50"></el-input></td>
                        <td width="100"><el-input v-model="item.enumerateNote" maxlength="50"></el-input></td>
                        <td width="100"><a class="link" v-show="$index==customizeList.length-1" @click="addCustomize">添加</a><a class="link" @click="delCustomize($index)" v-show="customizeList.length>1">删除</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page-bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import sysCustomize from './sysCustomize.js'
    export default sysCustomize
</script>
<style lang="scss">
.sysCustomizePage{
    .tableCommon .el-input__inner{
        border:none!important;
    }
    .bot-btn{
        text-align: center;
    }
}
</style>

