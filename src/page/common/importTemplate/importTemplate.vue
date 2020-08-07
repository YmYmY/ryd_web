<template>
    <div id="importTemplate" class="importTemplate">
        <div class="common-info">
            <myFileModel ref="importValue" supportFiles="table"  @successCallback="successCallback"></myFileModel>
            <ul class="content clearfix" v-show="showSelectBusiness">
                <li class="item">
                    <label class="label-term">模板类型</label>
                    <div class="input-text">
                        <el-select v-model="params.bizCode" placeholder="请选择" @change="selectBizCode();forceUpdate()">
                            <el-option v-for="item in importList" :key="item.bizCode" :label="item.bizName"
                                :value="item.bizCode"></el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <div class="tips">
               {{resultMsg}} 
               <a v-if="resultMsg.length > 0" style="font-size:16px" class="link" href="javascript:;" @click="downloadResultExcel(-1)" >导出明细</a>
            </div>
            <div class="bot-btn">
                <el-button type="primary" @click="importExcel()">导入</el-button>
                <el-button type="info" @click="downloadExcel()">下载模板</el-button>
                <!-- <el-button type="info" @click="toImportCenter()">前往导入中心</el-button> -->
                <el-button type="info" @click="closeTab()">关闭界面</el-button>
              
            </div>
            <div class="tips">
                注意<br>
                1.模板每列名称不可随意修改。<br>
                2.必填项目，必须填入；支持动态列（非必填可以删除列）<br>
                3.导入超过1000条数据,建议分多次导入。<br>
                4.导入数据越多，导入时间长，请耐心等待<br>
                5.如需导出上传文件或查询失败数据，请双击<a  style="font-size:30px" class="link" href="javascript:;" @click="toImportCenter()" >导入中心</a>前往
            </div>
        </div>
        <div class="popup" v-if="showProgress">
            <el-progress  type="circle" v-if="showProgress" :percentage="percent"></el-progress>
        </div>
    </div>
   
</template>
<script>
    import importTemplate from './importTemplate.js'
    export default importTemplate
</script>
<style lang="scss">
    .importTemplate {
        position: relative;
        .common-info {
            padding: 30px 0 60px;
        }
        .myFileModel{
            .el-upload {
                width: 550px;
                height: 240px;
            }
    
            .avatar-uploader {
                text-align: center;
                width: 552px;
                margin: 0 auto;
    
                .avatar-uploader-icon {
                    width: 550px;
                    height: 240px;
                    line-height: 240px;
                    font-size: 50px;
                }
            }
        }

        .common-info {
            .content {
                text-align: center;
                margin-top: 20px;

                .item {
                    display: inline-block;
                    float: initial;
                    width: auto;
                }
            }

            .bot-btn {
                margin-bottom: 20px;
            }
        }

        .tips {
            width: 550px;
            margin: 20px auto 0;
            word-break: break-all;
            color: red;
        }
        .popup{
            position: absolute;
            top:0;
            left:0;
            height:100%;
            width: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .el-progress{
            position: absolute;
            top:160px;
            margin-left:-63px;
            left:50%;
            .el-progress__text{
                color:#fff;
            }
        }
    }
</style>