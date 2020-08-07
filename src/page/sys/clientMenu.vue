<template>
    <div id="pcLimits" class="pcLimitsPage" @click="hideDialog">
        <div class="mb_20" v-if="subpage">
            <el-radio v-model="userlevel" label="3">初级用户</el-radio>
            <el-radio v-model="userlevel" label="2">中级用户</el-radio>
            <el-radio v-model="userlevel" label="1">高级用户</el-radio>
        </div>
        <h3 class="common-title mb_20" v-show="!subpage"><span class="title-name">高级客户</span></h3>
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0" v-show="userlevel==1||userlevel==0">
            <thead>
                <tr>
                    <th width="220">一级菜单<i class="el-icon-circle-plus-outline" @click="addMenuOne(advancedList)" v-show="!subpage"></i></th>
                    <th width="220">二级菜单</th>
                    <th>子菜单</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in advancedList" :key="index">
                    <td width="220" >
                        <el-input v-model="item.urlName" placeholder=""></el-input>
                        <i class="el-icon-circle-plus-outline" @click="addMenuTwo(item)" v-show="!subpage"></i>
                        <i class="el-icon-remove-outline" v-if="advancedList.length>1" @click="delMenuOne(item,advancedList)" v-show="!subpage"></i>
                    </td>
                    <td colspan="2" class="tableTb">
                        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr v-for="(item2,index2) in item.children" :key="index2">
                                <td width="220">
                                    <el-input v-model="item2.urlName" placeholder=""></el-input>
                                    <i class="el-icon-remove-outline" v-if="item.children.length>1" @click="delMenuTwo(item,item2,advancedList)" v-show="!subpage"></i>
                                    <i class="el-icon-edit" @click.stop="openPopover(item2);" v-show="!subpage"></i>
                                    <div class="popover" v-if="item2.showPopover" @click.stop="stopBub">
                                        <div class="popoverList">
                                            <h3 class="title">子菜单列表</h3>
                                            <div class="item" v-for="(list,index) in gridData" :key="index" @click="selectMenu(item2,list,advancedList)">{{list.urlName}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="fieldList">
                                    <span class="field" v-for="(item3,index) in item2.children" :key="index">{{item3.urlName}}<i class="el-icon-error" @click="delMenuThree(item2,item3)" v-show="!subpage"></i></span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 class="common-title mb_20 mt_20" v-show="!subpage"><span class="title-name">中级客户</span></h3>
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0" v-show="userlevel==2||userlevel==0">
            <thead>
            <tr>
                <th width="220">一级菜单<i class="el-icon-circle-plus-outline" @click="addMenuOne(middleList)" v-show="!subpage"></i></th>
                <th width="220">二级菜单</th>
                <th>子菜单</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in middleList" :key="index">
                <td width="220" >
                    <el-input v-model="item.urlName" placeholder=""></el-input>
                    <i class="el-icon-circle-plus-outline" @click="addMenuTwo(item)" v-show="!subpage"></i>
                    <i class="el-icon-remove-outline" v-if="middleList.length>1" @click="delMenuOne(item,middleList)" v-show="!subpage"></i>
                </td>
                <td colspan="2" class="tableTb">
                    <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr v-for="(item2,index2) in item.children" :key="index2">
                            <td width="220">
                                <el-input v-model="item2.urlName" placeholder=""></el-input>
                                <i class="el-icon-remove-outline" v-if="item.children.length>1" @click="delMenuTwo(item,item2,middleList)" v-show="!subpage"></i>
                                <i class="el-icon-edit" @click.stop="openPopover(item2);" v-show="!subpage"></i>
                                <div class="popover" v-if="item2.showPopover" @click.stop="stopBub">
                                    <div class="popoverList">
                                        <h3 class="title">子菜单列表</h3>
                                        <div class="item" v-for="(list,index) in gridData" :key="index" @click="selectMenu(item2,list,middleList)">{{list.urlName}}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="fieldList">
                                <span class="field" v-for="(item3,index) in item2.children" :key="index">{{item3.urlName}}<i class="el-icon-error" @click="delMenuThree(item2,item3)" v-show="!subpage"></i></span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
        <h3 class="common-title mb_20 mt_20" v-show="!subpage"><span class="title-name">初级客户</span></h3>
        <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0" v-show="userlevel==3||userlevel==0">
            <thead>
            <tr>
                <th width="220">一级菜单<i class="el-icon-circle-plus-outline" @click="addMenuOne(lowList)" v-show="!subpage"></i></th>
                <th width="220">二级菜单</th>
                <th>子菜单</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in lowList" :key="index">
                <td width="220" >
                    <el-input v-model="item.urlName" placeholder=""></el-input>
                    <i class="el-icon-circle-plus-outline" @click="addMenuTwo(item)" v-show="!subpage"></i>
                    <i class="el-icon-remove-outline" v-if="lowList.length>1" @click="delMenuOne(item,lowList)" v-show="!subpage"></i>
                </td>
                <td colspan="2" class="tableTb">
                    <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr v-for="(item2,index2) in item.children" :key="index2">
                            <td width="220">
                                <el-input v-model="item2.urlName" placeholder=""></el-input>
                                <i class="el-icon-remove-outline" v-if="item.children.length>1" @click="delMenuTwo(item,item2,lowList)" v-show="!subpage"></i>
                                <i class="el-icon-edit" @click.stop="openPopover(item2);" v-show="!subpage"></i>
                                <div class="popover" v-if="item2.showPopover" @click.stop="stopBub">
                                    <div class="popoverList">
                                        <h3 class="title">子菜单列表</h3>
                                        <div class="item" v-for="(list,index) in gridData" :key="index" @click="selectMenu(item2,list,lowList)">{{list.urlName}}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="fieldList">
                                <span class="field" v-for="(item3,index) in item2.children" :key="index">{{item3.urlName}}<i class="el-icon-error" @click="delMenuThree(item2,item3)" v-show="!subpage"></i></span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="page-bot-btn" v-show="!subpage">
            <el-button type="primary" @click="doSave()">保存</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </div>
    </div>
</template>

<script>
    import clientMenu from './clientMenu.js'
    export default clientMenu;
</script>
<style lang="scss">
.pcLimitsPage{
    .tableCommon{
        position: initial;
        thead{
            .el-icon-circle-plus-outline{
                vertical-align: middle;
                margin-bottom: 3px;
            }
        }
        tbody{
            tr{
                cursor: initial;
            }
        }
        th{
            padding:10px;
        }
        td{
            padding:10px;
            position: relative;
            text-align: left;
            height: auto;
            white-space: initial;
            overflow: initial;
            .el-input{
                width: 150px;
            }
            .field{
                position: relative;
                margin-right: 20px;
                &:hover .el-icon-error{
                    display: block;
                }
            }
        }
        .fieldList{
            text-align: left;
        }
        .el-icon-circle-plus-outline,.el-icon-remove-outline,.el-icon-edit{
            font-size: 16px;
            color: $main-color;
            margin-left: 8px;
            cursor: pointer;
        }
        .el-icon-edit{
            color:$tip-color;
        }
        .el-icon-error{
            font-size: 14px;
            color:red;
            position: absolute;
            top: -5px;
            right: -14px;
            cursor: pointer;
            display: none;
        }
    }
    .common-title{
        background: #fff;
    }
    .tableTb{
        padding:0!important;
        border:none;
    }
    .popover{
        position: absolute;
        left: 100%;
        top:0;
        border-radius: 3px;
        background: #fff;
        width: 200px;
        z-index: 999;
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
        &::after{
            content:"";
            position: absolute;
            top:15px;
            left:-12px;
            @include trigon(6px,#fff,right);
        }
    }
    .popoverList{
        max-height: 300px;
        overflow-y: auto;
        .title{
            height: 40px;
            line-height: 40px;
            font-weight: bold;
            text-align: center;
        }
        .item{
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-top: $border;
            cursor: pointer;
            &:hover{
                background: $hover-color;
            }
        }
    }
    .el-popover{
        padding:0;
    }
}
</style>