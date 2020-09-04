<template>
    <div id="clientSetUp" class="clientSetUpPage">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">账号设置</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>超级管理员</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" autocomplete="off" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password" v-model="obj.userPassword" v-bind:disabled="showPassword" autoComplete="new-password"  maxlength="20"></el-input>
                        <a class="lint" href="javascript:;" @click="isPassword()">重置密码</a>
                    </div>
                </li>
            </ul>
          <!--  <h3 class="common-title mb_20"><span class="title-name">数据权限</span></h3>
            <ul class="content clearfix">
                <li class="item item100">
                    <div class="input-text">
                        <el-checkbox-group v-model="obj.oragnizeids">
                            <el-checkbox v-for="item in oragnizeList" :checked="checked" @change="checked=!checked" :key="item.oragnizeId" :label="item.oragnizeId">{{item.oragnizeName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix" v-for="(list,index) in limitsSetList" :key="index">
                <li class="item">
                    <label class="label-term">{{list.name}}部门</label>
                    <div class="input-text">
                        <el-select v-model="list.oragnizeId" placeholder="请选择" @change="oragnizeChange(list.oragnizeId,list)">
                            <el-option v-for="item in list.oragnizeList"  :key="item.oragnizeId" :label="item.oragnizeName" :value="item.oragnizeId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item item100">
                    <label class="label-term">{{list.name}}专员</label>
                    <div class="input-text">
                        <em v-if="list.userArray.length==0">该部门没有员工,请重新选择</em> 
                        <div v-if="list.userArray.length>0">
                            <el-checkbox v-model="list.selectAll" @change="selectAllUser(list)">默认全员</el-checkbox>
                            <el-checkbox-group v-model="list.userIds" @change="userChange(list)">
                                <el-checkbox v-for="item in list.userArray" :key="item.userId" :label="item.userId" :disabled="item.userType==2||item.userType==3">{{item.userName}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </li>
            </ul>-->
            <h3 class="common-title mb_20" ><span class="title-name">默认配置</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">前端提货</label>
                    <div class="input-text">
                        <el-select v-model="obj.pickType" placeholder="请选择">
                            <el-option v-for="item in deliveryTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">提货时间</label>
                    <div class="input-text">
                        <el-select v-model="obj.intervalType" placeholder="请选择">
                            <el-option v-for="item in deliveryList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">结算方式</label>
                    <div class="input-text">
                        <el-select v-model="obj.payType" placeholder="请选择">
                            <el-option v-for="item in payTypeList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">剔除供应商</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantIds" placeholder="请选择" multiple collapse-tags>
                            <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.tenantName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term">优先供应商1</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantOne" placeholder="请选择">
                            <el-option v-for="item in tenantDefList" :key="item.tenantId" :label="item.tenantName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">优先供应商2</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantTwo" placeholder="请选择">
                            <el-option v-for="item in tenantDefList" :key="item.tenantId" :label="item.tenantName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">优先供应商3</label>
                    <div class="input-text">
                        <el-select v-model="obj.tenantThree" placeholder="请选择">
                            <el-option v-for="item in tenantDefList" :key="item.tenantId" :label="item.tenantName" :value="item.tenantId"></el-option>
                        </el-select>
                    </div>
                </li>

            </ul>
            <h3 class="common-title mb_20"><span class="title-name">菜单选择</span></h3>
            <clientMenu ref="menu" :clientGrade="obj.clientGrade" :tenantId="tenantId" subpage="true"></clientMenu>
            <div class="bot-btn">
                <el-button type="primary" @click="doSave()">保存</el-button>
                <el-button type="info" @click="cancel()">取消</el-button>
            </div>
        </div>
    </div>

</template>
<script>
    import clientSetUp from './clientSetUp.js'
    export default clientSetUp
</script>
<style lang="scss">
.clientSetUpPage{
    .tenantPrice{
        &>div{
            border-bottom:1px dashed $border-color;
            padding-bottom: 20px;
            margin-bottom: 20px;
            position: relative;
            &:last-child{
                border:none;
                margin:0;
            }
            .addIcon,.delIcon{
                width: 25px;
                cursor: pointer;
                margin: 7px 5px 0;
            }
            .title{
                float: left;
                width: 90px;
                line-height: 150px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                border-right:1px dashed $border-color;
                box-sizing: border-box;
            }
            .info{
                float: left;
                width: calc(100% - 110px);
                margin-left: 20px;
            }
        }
    }
}
</style>