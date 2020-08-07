<template>
    <div id="fcCheckDes" class="fcCheckDesPage">
        <div class="common-info">
            <div class="audit-title">
                <ul class="content clearfix">
                    <li class="item item100" >
                        <label class="label-term"><em>*</em>类型</label>
                        <div class="input-text">
                             <el-select v-model="data.desItemType"  placeholder="请选择">
                                   <el-option v-for="item in desItemTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                             </el-select>
                        </div>
                    </li>
                    <li class="item item100" >
                        <label class="label-term"><em>*</em>核销去向</label>
                        <div class="input-text">
                            <el-input v-model="data.desItemName"  maxlength="20" ></el-input>
                        </div>
                    </li>
                </ul>
            </div>
              <div class="page-bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">关闭页面</el-button>
            </div>
            <div class="table_height mt_20">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                    <tr>
                        <th width="30">序号</th>
                        <th width="100">类型</th>
                        <th width="100">核销去向</th>
                        <th width="100">设置默认</th>
                        <th width="100">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,$index) in items" :key="$index">
                        <td width="100">{{$index+1}}</td>
                        <td width="100">{{item.desItemName}}</td>
                        <td width="100">{{item.desItemTypeName}}</td>
                        <td width="100"><el-radio :label="true"  v-model="item.defFlagTrue" @change="updateDefaultCheckDes(item)">{{''}}</el-radio></td>
                        <td width="100"><a class="link"   @click="deleteCheckDes(item)">删除</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
          
        </div>
    </div>
</template>

<script>
    import fcCheckDes from './fcCheckDes.js'
    export default fcCheckDes
</script>
<style lang="scss">
.fcCheckDesPage{
    .audit-title{
        width: 334px;
        margin: 0 auto;
        position: relative;
        left: -42px;
    }
    .page-bot-btn{
        margin-top: 20px;

    }
}
</style>

