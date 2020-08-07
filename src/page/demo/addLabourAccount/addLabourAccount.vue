<template>
    <div id="addLabourAccount" class="addLabourAccountPage" :class="dialog?'addLabourAccountDialog':''" @click="hideSelect">
        <div class="common-info">
            <div class="tableInfo">
                <div class="head">
                    <div class="title">财  务  红  冲  单</div>
                    <div class="date">入账日期: <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker></div>
                </div>
                <div class="headInfo">
                    <div>
                        <em>*</em>冲账类型：
                        <el-select v-model="typeSelect">
                            <el-option v-for="item in defaultAreaoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="clearfix" style="margin-top:10px;">
                        <div class="fl">
                            <em>*</em>客户名称：                        
                            <el-select v-model="typeSelect">
                                <el-option v-for="item in defaultAreaoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                        <div class="fr">红冲单号:<em>SJ123456</em></div>
                    </div>
                </div>
                <table class="feeTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr class="thead">
                        <td width="20%" rowspan="2">对账单信息</td>
                        <td width="10%" rowspan="2">对账金额</td>
                        <td width="10%" rowspan="2">核销金额</td>
                        <td width="20%" rowspan="2">备注内容</td>
                        <td width="20%" colspan="10"><em>*</em>红冲金额</td>
                        <td width="10%" rowspan="2">附单据数</td>
                    </tr>
                    <tr>
                        <td width="10%">千</td>
                        <td width="10%">百</td>
                        <td width="10%">十</td>
                        <td width="10%">万</td>
                        <td width="10%">千</td>
                        <td width="10%">百</td>
                        <td width="10%">十</td>
                        <td width="10%">元</td>
                        <td width="10%">角</td>
                        <td width="10%">分</td>
                    </tr>
                    <tr>
                        <td width="20%">
                            <el-select v-model="typeSelect">
                                <el-option v-for="item in defaultAreaoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </td>
                        <td width="10%">
                            <el-input></el-input>
                        </td>
                        <td width="10%">
                            <el-input></el-input>
                        </td>
                        <td width="20%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="2%">
                            <el-input></el-input>
                        </td>
                        <td width="20%">
                            <el-input></el-input>
                        </td>
                    </tr>
                    <tr class="tfoot">
                        <td width="20%"></td>
                        <td width="10%"></td>
                        <td width="10%"></td>
                        <td width="20%"></td>
                        <td width="20%" colspan="10"><em>800</em></td>
                        <td width="20%"></td>
                    </tr>
                </table>
            </div>
            <ul class="content clearfix mt_20">
                <li class="item fr">
                    <label class="label-term">制单人</label>
                    <div class="input-text">
                        <el-input v-model="inputvalue"></el-input>
                    </div>
                </li>
                <li class="item fr">
                    <label class="label-term">审核人</label>
                    <div class="input-text">
                        <el-input v-model="inputvalue"></el-input>
                    </div>
                </li>
            </ul>
            <div class="page-bot-btn">
                <el-button type="primary">保存</el-button>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'batchTarckDemo',
    props:[
        'dialog'
    ],
    data(){
        return{
            inputvalue:'',
            date:'',
            isShowSub:false            
        }
    },
    mounted(){
        
    },
    methods:{
        showSub(){
            this.isShowSub = true;
        },
        hideSelect(){
            this.isShowSub = false;
        },
        cancel(){
            let data = '回调数据';
            this.$emit("closeCallback",data);
        }
    },    
    components:{
      
    }
}
</script>

<style lang="scss" src="./addLabourAccount.scss"></style>