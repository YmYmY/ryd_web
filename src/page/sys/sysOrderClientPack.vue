<template>
    <div id="packageDemo" class="packagePage">
        <h3 class="tips red">注：若您和平台结算的方式为大中小件计费，请务必选择准确的“算费归类”</h3>
        <table class="tableCommon packListTable" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th width="10%">序号</th>
                    <th width="18%"><em>*</em>包装箱名</th>
                    <th width="18%">包装箱尺寸（单位cm）</th>
                    <th width="18%">箱子毛重（单位公斤）</th>
                    <th width="18%"><em>*算费归类</em></th>
                    <th width="18%">操作</th>
                </tr>
            </thead>
            <tbody>
                 <tr v-for="(item,$index) in packingList" :key="$index">
                        <td width="100">{{$index+1}}</td>
                        <el-input placeholder="请输入包装箱名" v-model="item.boxName" maxlength="20" @blur="saveOrUpdate(item,$index)"  ></el-input>
                        <td class="volumn">
                            <el-input placeholder="长" v-model="item.boxLength" maxlength="10" v-mydoubleval  @blur="calVolume(item,$index)"></el-input>
                            *
                            <el-input placeholder="宽"  v-model="item.boxWidth" maxlength="10" v-mydoubleval  @blur="calVolume(item,$index)"></el-input>
                            *
                            <el-input placeholder="高"  v-model="item.boxHeight" maxlength="10" v-mydoubleval @blur="calVolume(item,$index)"></el-input>
                       </td>
                        <td width="100"><el-input v-model="item.boxWeight" maxlength="10" v-mydoubleval placeholder="请输入箱子毛重"  @blur="saveOrUpdate(item,$index)" ></el-input></td>
                        <td width="100">{{item.codeName}}</td>
                        <td>
                            <a href="javasript:;" class="link mr_10" v-show="packingList.length == $index +1"  @click="addItem()" >增加</a>
                            <a href="javasript:;" class="link mr_10" v-show="item.flowId > 0 || packingList.length != $index +1" @click="deleteItem(item,$index)" >删除</a>
                        </td>
                 </tr>
            </tbody>
        </table>
         <div class="page-bot-btn">
            <el-button type="info" @click="closeTab()">关闭</el-button>
         </div>
    </div>
</template>

 

<script>
    import sysOrderClientPack from './sysOrderClientPack.js'
    export default sysOrderClientPack
</script>

<style lang="scss">
    .packagePage{
        padding: 30px 20px;
        background: #fff;
        .tips{
            line-height: 20px;
            color: red;
            margin-bottom: 20px;
        }
        .tableCommon{
            border:$border;
            td{
                overflow: initial;
            }
            .el-input__inner{
                border:none;
                width: 100%;
                text-align: center;
            }
            .volumn{
                .el-input{
                    width: 28%;
                    display: inline-block;
                }
            }
        }
    }
</style>