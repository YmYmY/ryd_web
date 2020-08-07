<template>
    <div id="packageDemo" class="package">
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
                <tr>
                    <td>1</td>
                    <td>
                        <el-input placeholder="请输入包装箱名"></el-input>
                    </td>
                    <td class="volumn">
                        <el-input placeholder="长"></el-input>
                        *
                        <el-input placeholder="宽"></el-input>
                        *
                        <el-input placeholder="高"></el-input>
                    </td>
                    <td>
                        <el-input placeholder="请输入箱子毛重"></el-input>
                    </td>
                    <td>大箱</td>
                    <td>
                        <a href="javasript:;" class="link mr_10">增加</a>
                        <a href="javasript:;" class="link">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'packageDemo',
    data(){
        return{
                      
        }
    },
    mounted(){
        
    },
    methods:{
        
    },    
    components:{
      
    }
}
</script>

<style lang="scss">
    .package{
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