<template>
    <div id="batchTarckDemo" class="batchTarckDemo">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>        
        <div class="common-info">
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>跟踪时间</label>
                    <div class="input-text">
                        <el-input v-model="inputvalue"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                <label class="label-term"><em>*</em>运输状态</label>
                    <div class="input-text">
                        <el-input v-model="inputvalue"></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term">跟踪信息</label>
                    <div class="input-text">
                        <el-input v-model="inputvalue" type="textarea"></el-input>
                        <div class="addremark" @click="showRemark"><i class="el-icon-plus"></i></div>
                        <remark ref="remark" @remarkCallBack="remarkCallBack"></remark>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term"></label>
                    <div class="input-text">
                        <p>更新到运单跟踪日志</p>
                        <p>更新到运单跟踪日志</p>
                        <p>更新到运单跟踪日志</p>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item w_auto">
                    <label class="label-term"></label>
                    <div class="input-text">
                        <el-checkbox>更新到运单跟踪日志</el-checkbox>
                    </div>
                </li>
            </ul>

            <div class="page-bot-btn">
                <el-button type="primary">保存</el-button>
                <el-button type="info">取消</el-button>
            </div>
            <h3 class="common-title mt_20"><span class="title-name">跟踪清单</span></h3>
            <div class="delorder">
                <el-button type="danger" size="mini">移除订单</el-button>
            </div>
            <div class="table_height">
                <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th width="60"><el-checkbox></el-checkbox></th>
                            <th width="100">中转时间</th>
                            <th width="100">上次跟踪时间</th>
                            <th width="100">中转区域</th>
                            <th width="100">跟踪状态</th>
                            <th width="100">在途信息</th>
                            <th width="100">跟踪人</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- v-for="(data,index) in tableData" :key="index" -->
                        <tr>
                            <td width="60"><el-checkbox></el-checkbox></td>
                            <td width="100">南大区</td>
                            <td width="100">南大区</td>
                            <td width="100">南大区</td>
                            <td width="100">南大区</td>
                            <td width="100">南大区</td>
                            <td width="100">南大区</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import innerTab from "@/components/innerTab/innerTab.vue"
import remark from '@/page/order/billing/billingRemark.vue'

export default {
    name: 'batchTarckDemo',
    props:[
        
    ],
    data(){
        return{
            inputvalue:'',
            tabs: [{
                    name: "手动跟踪",
                    num: 3000,
                    active: true,
                    router:'list',
                },
                {
                    name: "自动跟踪",
                    num: 123,
                    router:'addcontent'
                },
            ],
            
        }
    },
    mounted(){
        
    },
    methods:{
        showRemark(){
            this.$refs.remark.showLatelyRemark();
        },
        selectCallback(){

        }
    },    
    components:{
      remark,
      innerTab
    }
}
</script>

<style lang="scss">
    .batchTarckDemo{
        .addremark{
            width:18px;
            height: 18px;
            border-radius: 3px;
            border:1px solid $main-color;
            position: absolute;
            top:10px;
            right: -30px;
            font-size: 14px;
            color:$main-color;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
        }
        .selectAlertBox{
            left: 431px;
            top: 10px;
        }
        .delorder{
            text-align: right;
            padding: 20px 0 12px;
        }
        .tableCommon{
            border-left: $border;
            border-right: $border;
        }
        .table_height{
            overflow-x:auto;
        }
    }
</style>