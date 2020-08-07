<template>
    <div id="dockingSystem">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">系统对接</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">项目名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectOne" filterable @change="getConfigsOne" placeholder="请选择">
                            <el-option v-for="item in projectList" :disabled="obj.projectTwo==item.kdId" :key="item.kdId" :label="item.kdName" :value="item.kdId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开启对接</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectTypeOne" placeholder="请选择" @change="forceUpdate()">
                            <el-option v-for="item in projectTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showConfigListOne">
                <li class="item" v-for="(item,index) in configListOne" :key="index" v-show="item.filedShow == 1 || item.filedShow == 3" >
                    <label class="label-term" >{{item.fieldName}}</label>
                    <div class="input-text">
                        <el-input v-model="item.fieldValue" v-if="item.filedTypeAlias == 'input'" v-bind:disabled="item.filedShow == 3" ></el-input>
                        <el-select v-model="item.fieldValue" placeholder="请选择" v-if="item.filedTypeAlias == 'select' "  v-bind:disabled="item.filedShow == 3">
                            <el-option v-for="i in item[item.fieldKey]" :key="i.codeValue" :label="i.codeName" :value="i.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">项目名称</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectTwo" filterable @change="getConfigsTwo" placeholder="请选择">
                            <el-option v-for="item in projectList" :disabled="obj.projectOne==item.kdId" :key="item.kdId" :label="item.kdName" :value="item.kdId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">开启对接</label>
                    <div class="input-text">
                        <el-select v-model="obj.projectTypeTwo" placeholder="请选择" @change="forceUpdate()">
                            <el-option v-for="item in projectTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-show="showConfigListTwo">
                <li class="item" v-for="(item,index) in configListTwo" :key="index" v-show="item.filedShow == 1 || item.filedShow == 3" >
                    <label class="label-term" >{{item.fieldName}}</label>
                    <div class="input-text">
                        <el-input v-model="item.fieldValue" v-if="item.filedTypeAlias == 'input'" v-bind:disabled="item.filedShow == 3" ></el-input>
                        <el-select v-model="item.fieldValue" placeholder="请选择" v-if="item.filedTypeAlias == 'select' "  v-bind:disabled="item.filedShow == 3">
                            <el-option v-for="i in item[item.fieldKey]" :key="i.codeValue" :label="i.codeName" :value="i.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import dockingSystem from './dockingSystem.js'
    export default dockingSystem
</script>
<style lang="scss">
    #updateSupplier{
        .el-dialog{
            .el-dialog__body{
                padding:0;
                .common-info{
                    padding-bottom: 30px;
                }
            }
        }
        .innerTab{
            background: #fff;
            border-bottom: $border;
            margin:10px 0;
            .innerItem{
                padding:8px 12px 6px;
                box-sizing: border-box;
                float: left;
                cursor: pointer;
                border:$border;
                border-bottom:none;
                text-align: center;
                &:last-child{
                    border-left:none;
                }
                &.active,&:hover{
                    // border-bottom-color: $main-color;
                    // color: $main-color;
                    background: $hover-color;
                    position: relative;
                    border-bottom: $hover-color;
                    // top: -1px;
                    z-index: 9;
                }
            }
        }
    }
</style>