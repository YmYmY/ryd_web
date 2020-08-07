<template>
    <div id="addSysUser">
        <div class="common-info">
            <h3 class="common-title mb_20"><span class="title-name">员工信息</span></h3>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term"><em>*</em>员工姓名</label>
                    <div class="input-text">
                        <el-input v-model="obj.userName"   maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>联系手机</label>
                    <div class="input-text">
                        <el-input v-model="obj.userPhone" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" style="width:auto;">
                    <label class="label-term"><em>*</em>归属组织</label>
                    <div class="input-text">
                        <el-checkbox-group v-model="obj.oragnizeIds">
                            <el-checkbox v-for="item in oragnizeList" :key="item.oragnizeId" :label="item.oragnizeId">{{item.oragnizeName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" style="width:auto;">
                    <label class="label-term"><em>*</em>区域授权</label>
                    <div class="input-text">
                        <el-checkbox-group v-model="obj.regionIds">
                            <el-checkbox v-for="item in regionList" :key="item.regionId" :label="item.regionId">{{item.regionName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" >
                    <label class="label-term">职位名称</label>
                    <div class="input-text">
                        <el-input v-model="obj.userPosition"   maxlength="10"></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term">邮箱地址</label>
                    <div class="input-text">
                        <el-input v-model="obj.userMailbox" maxlength="20"></el-input>
                    </div>
                </li>
            </ul>


            <h3 class="common-title mb_20"><span class="title-name">账号设置</span></h3>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>登录账号</label>
                    <div class="input-text">
                        <el-input  v-model="obj.userLogin" autocomplete="off" maxlength="11" v-mynumval></el-input>
                    </div>
                </li>
                <li class="item">
                    <label class="label-term"><em>*</em>登录密码</label>
                    <div class="input-text">
                        <el-input type="password" v-model="obj.userPassword" autoComplete="new-password"  maxlength="20" ></el-input>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item">
                    <label class="label-term"><em>*</em>状态</label>
                    <div class="input-text">
                        <el-select v-model="obj.userStatus" placeholder="请选择">
                            <el-option v-for="item in userStatusList" :key="item.codeValue" :label="item.codeName" :value="item.codeValue"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <ul class="content clearfix">
                <li class="item" style="width:auto;">
                    <label class="label-term"><em>*</em>分配角色</label>
                    <div class="input-text">
                        <el-checkbox-group v-model="obj.roleIds" >
                            <el-checkbox v-for="item in roleList" :key="item.roleId" :label="item.roleId">{{item.roleName}}</el-checkbox>
                        </el-checkbox-group>
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
    import addSysUser from './addSysUser.js'
    export default addSysUser
</script>