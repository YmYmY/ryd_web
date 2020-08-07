<template>
    <div id="updateSysRegion">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">区域信息</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>上级组织</label>
                    <div class="input-text">
                        <el-select v-model="obj.PId" placeholder="请选择" @change="selectPRegion()">
                            <el-option v-for="item in regionList" :key="item.regionId" :label="item.regionName" :value="item.regionId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>区域类型</label>
                    <div class="input-text">
                        <el-select v-model="obj.regionType" placeholder="请选择" @change="selectRegion()">
                            <el-option v-for="item in regionTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>区域名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionName" maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>区域等级</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionGradeName" v-bind:disabled=true></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showRegion">
                <li class="item" >
                    <label class="label-term"><em>*</em>区域负责人</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionPrincipal" maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.regionPhone" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showTenant">
                <li class="item">
                    <label class="label-term">加盟商</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantId" placeholder="请选择">
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantFullName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <h3 v-show="showAreaSet" class="common-title mb_20"><span class="title-name">区域配置</span></h3>
            <div v-show="showAreaSet" class="areasList">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr v-for="(list,index) in areasList" :key="index">
                        <td class="parentTd">
                            <el-checkbox checked="true" disabled>{{list.name}}</el-checkbox>
                        </td>
                        <td>
                            <el-checkbox-group v-model="checkAreaList" class="clearfix">
                                <el-checkbox v-for="item in list.children" :key="item.id" :label="item.id" :checked="checked"  @change="checked=!checked">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import updateSysRegion from './updateSysRegion.js'
    export default updateSysRegion
</script>