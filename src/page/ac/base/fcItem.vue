<template>
  <div id="fcItem" class="subjectDefPage">
    <div class="common-info clearfix">
        <div class="table-info">
            <div class="common-title mb_20">
                <span class="title-name">科目列表</span>
                <div class="fr">
                    <el-button type="primary" size="mini" class="fl"  @click="openTree()" >全部展开</el-button>
                    <el-button type="primary" size="mini" class="fl"  @click="closeTree()" >全部收起</el-button>
                    <el-button type="primary" size="mini" class="fl" v-entity="312" @click="doQuery('all')" >显示已删除科目</el-button>
                    <el-button type="primary" size="mini" class="fl" v-entity="313"  @click="exportItem()">导出</el-button>
                </div>
            </div>
            <table class="" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td>科目一</td>
                    <td>科目二</td>
                    <td>科目三</td>
                    <td>科目四</td>
                    <td>科目代码</td>
                    <td>借贷方向</td>
                    <td>备注</td>
                    <td>操作</td>
                </tr>
                <tr v-show="item.havingShowRow" v-for="(item,$index) in items" :key="$index" :class="item.state == 0 ? 'del' :''">
                    <td class="sub" :title="item.itemLevel == 1 ? item.itemName : ''">
                         <img v-show="item.havingChild && !item.havingOpenChild && item.itemLevel == 1" @click="openChildTree(item)" src="@/static/image/$tenantId$/u2582.png" alt="展开"> 
                         <img v-show="item.havingChild && item.havingOpenChild && item.itemLevel == 1" @click="closeChildTree(item)" src="@/static/image/$tenantId$/u2584.png" alt="关闭"> 
                         {{item.itemLevel == 1 ? item.itemName : ""}} 
                     </td>
                    <td class="sub" :title="item.itemLevel == 2 ? item.itemName : ''"  @click="clickItem(item)">
                        <img v-show="item.havingChild && !item.havingOpenChild && item.itemLevel == 2" @click="openChildTree(item)" src="@/static/image/$tenantId$/u2582.png" alt="展开"> 
                         <img v-show="item.havingChild && item.havingOpenChild && item.itemLevel == 2" @click="closeChildTree(item)" src="@/static/image/$tenantId$/u2584.png" alt="关闭"> 
                        {{item.itemLevel == 2 ? item.itemName : ""}}
                    </td>
                    <td class="sub" :title="item.itemLevel == 3 ? item.itemName : ''"  @click="clickItem(item)">
                         <img v-show="item.havingChild && !item.havingOpenChild && item.itemLevel == 3" @click="openChildTree(item)" src="@/static/image/$tenantId$/u2582.png" alt="展开"> 
                         <img v-show="item.havingChild && item.havingOpenChild && item.itemLevel == 3" @click="closeChildTree(item)" src="@/static/image/$tenantId$/u2584.png" alt="关闭"> 
                        {{item.itemLevel == 3 ? item.itemName : ""}}
                    </td>
                     <td class="sub" :title="item.itemLevel == 4 ? item.itemName : ''"  @click="clickItem(item)">
                        {{item.itemLevel == 4 ? item.itemName : ""}}
                    </td>
                    <td :title="item.itemCode"  @click="clickItem(item)" >{{item.itemCode}}</td>
                    <td :title="item.balDireName"  @click="clickItem(item)" >{{item.balDireName}}</td>
                    <td :title="item.remarks"  @click="clickItem(item)">{{item.remarks}}</td>
                    <td>
                        <a v-show="item.tenantId != -1 && item.state == 1" v-entity="314" @click="deleteItem(item)"  href="javascript:;" class="link">删除</a>
                    </td>
                    
                </tr>
            </table>
        </div>
        <div class="td-info fr">
            <div class="currentInfo">
                当前科目代码：<span>{{data.parentItem}}</span>                
            </div>
            <div class="currentInfo">
                当前科目名称：<span>{{data.parentItemName}}</span>                
            </div>
            <div class="addChoose">
                <el-radio v-model="data.levelOne" @change="selectLevel(1)" label="1">增加一级科目</el-radio>
                <el-radio v-model="data.levelOne" @change="selectLevel(2)" label="2">增加下级科目</el-radio>
            </div>
            <ul class="content clearfix">
                <li class="item item100">
                    <label class="label-term">科目代码</label>
                    <div class="input-text">
                        <el-input v-model="data.itemCode" v-bind:disabled="data.levelOne !=1"></el-input>
                    </div>
                </li>
                <li class="item item100">
                    <label class="label-term">科目名称</label>
                    <div class="input-text">
                        <el-input v-model="data.itemName" maxlength="30"></el-input>
                    </div>
                </li>
                <li class="item item100">
                    <label class="label-term">借贷方向</label>
                    <div class="input-text">
                       <el-select v-model="data.balDire"  v-bind:disabled="data.levelOne == 2" placeholder="请选择">
                            <el-option v-for="item in balDireList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                     </el-select>
                    </div>
                </li>
                <li class="item item100">
                    <label class="label-term">备注</label>
                    <div class="input-text">
                        <el-input type="textarea" v-model="data.remarks" maxlength="100"></el-input>
                    </div>
                </li>
            </ul>
            <div class="page-bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
            </div>
            <div class="att clearfix">
                <div class="att-item">注意1：最大只支持4级科目</div>
                <div class="att-item">注意2：公共科目不允许删除</div>
                <div class="att-item">注意3：科目代码不允许修改</div>
                <div class="att-item">注意4：含有下级科目不允许删除</div>
                <div class="att-item">注意5：已使用的科目不允许删除</div>
                <div class="att-item">注意6：科目名称不允许重复</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import fcItem from './fcItem.js'
export default fcItem
</script>
<style lang="scss">
.subjectDefPage{
    .common-info{
        .common-title{
            height: 28px;
            line-height: 28px;
            padding:10px;
        }
    }
    .table-info{
        width: calc(100% - 340px);
        float: left;
        table{
            border-left: $border;
            border-top: $border;
            table-layout: fixed;
            tr:hover{
                background: $hover-color;
            }
            td{
                height: 45px;
                border-right: $border;
                border-bottom: $border;
                text-align: center;
                position: relative;
                @include textoverflow;
                &.sub{
                    text-align: left;
                    padding-left: 24px;
                    img{
                        width:18px;
                        vertical-align: middle;
                        margin-top: -1px;
                        cursor: pointer;
                        position: absolute;
                        left: 3px;
                        top: 14px;
                    }
                }
            }
            tr.del{
                td{
                    color:red;
                }
            }
        }
    }
    .td-info{
        border:$border;
        padding: 20px 0;
        width: 320px;
        .currentInfo{
            padding:0 30px;
            font-weight: 700;
            line-height: 32px;
            >span{
                color:$main-color;
            }
        }
        .addChoose{
            padding:0 30px;
            line-height: 50px;
        }
        .content{
            padding:0 30px;
            .el-textarea__inner{
                width: 100%;
            }
        }
        .page-bot-btn{
            padding: 10px 40px;
            border-bottom: $border;
            margin:0 0 20px;
        }
        .att{
            padding:0 30px;
            .att-item{
                line-height: 20px;
                color:red;
            }
        }
    }
}
</style>