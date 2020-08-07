<template>
<div id="registerInvoice" class="registerInvoicePage">
    <div class="common-info">
        <h3 class="common-title mb_20">  
            <span class="title-name">账单信息</span>          
            <span class="tip">（客户名称：卡丹路工业）</span>
        </h3>
        <table ref="scrollTable" class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead class="fixed-thead">
                <tr>
                    <th width="100">账单编号</th>
                    <th width="100">账单周期</th>
                    <th width="100">运单收入</th>
                    <th width="100">异常金额</th>
                    <th width="100">需开票金额</th>
                    <th width="100">开票金额</th>
                </tr>
            </thead>
            <tbody class="fixed-tbody">
                <tr>
                    <td width="100">200410001</td>
                    <td width="100"></td>
                    <td width="100">12000</td>
                    <td width="100">
                        <el-checkbox>计入开票 +300</el-checkbox>
                    </td>
                    <td width="100"></td>
                    <td width="100"></td>
                </tr>
            </tbody>
        </table>
        <h3 class="common-title mb_20">  
            <span class="title-name">账单信息</span>          
            <span class="tip">（开票总额：￥20300）</span>
        </h3>
        <ul class="content clearfix">
            <li class="item">
                <label class="label-term">开票金额</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">开票类型</label>
                <div class="input-text">
                    <el-select v-model="typeSelect">
                        <el-option v-for="item in defaultAreaoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
            </li>
            <li class="item">
                <label class="label-term">开票抬头</label>
                <div class="input-text">
                    <el-autocomplete
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    ></el-autocomplete>
                </div>
            </li>
            <li class="item">
                <label class="label-term">税号</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
        </ul>
        <ul class="content clearfix">
            <li class="item">
                <label class="label-term">开户银行</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">银行账号</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">地址</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">电话</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
        </ul>
        <div class="bot-btn" style="margin:20px 0;">
            <el-button type="warning">保存并添加</el-button>
        </div>
        
        <table ref="scrollTable" class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead class="fixed-thead">
                <tr>
                    <th width="40">序号</th>
                    <th width="100">开票金额</th>
                    <th width="100">开票类型</th>
                    <th width="100">开票抬头</th>
                    <th width="100">税号</th>
                    <th width="100">开户银行</th>
                    <th width="100">银行账号</th>
                    <th width="100">地址</th>
                    <th width="100">电话</th>
                    <th width="100">操作</th>
                </tr>
            </thead>
            <tbody class="fixed-tbody">
                <tr>
                    <td width="40"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100"></td>
                    <td width="100">
                        <a class="link" href="javascript:;">修改</a>
                        <a href="javascript:;" class="red link" style="margin:0 10px;">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        
        <h3 class="common-title mb_20">  
            <span class="title-name">寄出登记</span>          
        </h3>
        
        <ul class="content clearfix">
            <li class="item">
                <label class="label-term">收件人</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">收件电话</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">收件地址</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">快递名称</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
            <li class="item">
                <label class="label-term">快递单号</label>
                <div class="input-text">
                    <el-input v-model="inputvalue"></el-input>
                </div>
            </li>
        </ul>

        <div class="bot-btn">
            <el-button type="info">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
    </div>
</div>
</template>

<script>
import registerInvoice from './registerInvoice.js'
export default registerInvoice
</script>

<style lang="scss">
.registerInvoicePage{
    
}
</style>