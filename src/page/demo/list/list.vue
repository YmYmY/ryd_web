<template>
  <div id="list">
    <div class="search-list clearfix">
      <div class="search-form clearfix">
        <img :src="decodeImg" alt="">
        <div class="item">
          <label class="label">输入框</label>
          <div class="input-text">
            <!-- <input type="text" v-model="inputvalue" v-mynumval placeholder="请输入" @input="inputtest"> -->
            <el-input v-model="inputvalue" v-mynumval="{ set: this, name: 'inputvalue' }" placeholder="请输入" @input="inputtest" type="text" autocomplete="new-password"></el-input>
          </div>
        </div>
        <div class="item">
          <label class="label">选择框</label>
          <div class="input-text">
            <el-select v-model="selectValue" placeholder="请选择" @change="changeSel">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div class="item">
          <label class="label">时间</label>
          <div class="input-text">
            <el-time-picker v-model="time" placeholder="选择时间"></el-time-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">日期</label>
          <div class="input-text">
            <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">时间日期</label>
          <div class="input-text">
            <el-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">日期范围</label>
          <div class="input-text">
            <el-date-picker v-model="daterange" type="datetimerange" :default-time="['00:00:00','23:59:59']" range-separator="-" start-placeholder="开始"
              end-placeholder="结束" value-format="yyyy-MM-dd" @change="daterangeChange()"></el-date-picker>
          </div>
        </div>
        <div class="item">
          <label class="label">            
            <el-select v-model="selectValue" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </label>
          <div class="input-text">
            <el-select v-model="selectValue" placeholder="请选择" @change="changeSel">
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="search-btn clearfix">
        <div class="btn">
          <el-button type="primary" plain size="mini" icon="el-icon-search" @click="getData();">搜索</el-button>
        </div>
        <div class="btn">
          <el-button type="danger" plain size="mini" icon="el-icon-close">清空</el-button>
        </div>
      </div>
    </div>
    <div class="table-content">
      <div class="table-title">
        <h3>
          <span>订单列表</span>
          <el-tooltip effect="light" content="Right Center 提示文字" placement="right">
            <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
          </el-tooltip>
        </h3>
        <div class="table-title-btn">
          <el-button type="primary" plain size="mini" @click="invoice()">发票申请</el-button>
          <el-button type="primary" plain size="mini" @click="showAddLabourAccount()">新增手工账</el-button>
          <el-button type="primary" plain size="mini" @click="dialogSchedule()">进度列表弹窗</el-button>
          <el-button type="primary" plain size="mini" @click="dialogTable()">列表弹窗</el-button>
          <el-button type="primary" plain size="mini" @click="downloadExcelFile()">导出</el-button>
          <el-button type="primary" plain size="mini" @click="opentab()">新开页面</el-button>
          <el-button type="primary" plain size="mini" @click="downFile()">下载文件</el-button>
          <el-button type="primary" plain size="mini" @click="showDialog()">可以输入的弹窗</el-button>
        </div>
      </div>
      <tableCommon tableName="listTable" ref="table" :head="head"></tableCommon>
    </div>

    <el-dialog title="分配供应商" :visible.sync="dialogFormVisible" center width="400px">
      <div class="common-info" style="border:none;padding:0;">
        <!-- <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>店员姓名</label>
            <div class="input-text">
              <el-input v-model="inputvalue"></el-input>
            </div>
          </li>
        </ul> -->
        <ul class="content clearfix">
          <li class="item item100">
            <label class="label-term"><em>*</em>供应商</label>
            <div class="input-text">
              <el-select></el-select>
            </div>
          </li>
        </ul>
      <!-- <ul class="content clearfix">
        <li class="item img-upload">
          <label class="label-term"><em>*</em>上传照片</label>
          <div class="input-text">
            <myFileModel v-for="(list,index) in imgList" :key="index" :ref="list.name" @successCallback="successCallback"></myFileModel>
          </div>
        </li>
      </ul> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">修改并派发</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">确认修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="跟踪日志" :visible.sync="dialogTableShow" center width="500px">
      <div class="mb_20">
        <span style="margin-right:30px;">运单号：213123</span>
        <span>中转单号：213123</span>
      </div>
      <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout: auto;">
        <thead>
          <tr>
            <th width="60">序号</th>
            <th width="100">跟踪时间</th>
            <th width="300">跟踪内容</th>
            <th width="100">跟踪人</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12321312</td>
            <td>sdf对方违法范文芳</td>
            <td>呃呃我</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>

    <el-dialog title="跟踪日志" :visible.sync="dialogScheduleShow" class="trackScheduleDialog" width="400px">
      <div class="topInfo"><span>快递商:顺丰快递</span><span>物流单号:231231231</span></div>
      <div class="trackSchedule">
        <ul class="trackList">
            <li>
                <p>2018-09-28  16:28:15</p>
                <p>货物已全部签收完成</p>
            </li>
            <li>
                <p>2018-09-28  16:28:15</p>
                <p>货物已全部签收完成</p>
            </li>
            <li>
                <p>2018-09-28  16:28:15</p>
                <p>货物已全部签收完成</p>
            </li>
            <li class="first">
                <p>2018-09-28  16:28:15</p>
                <p>货物已全部签收完成</p>
            </li>
        </ul>
      </div>
    </el-dialog>
    
    <el-dialog title="新增手工账" :visible.sync="addLabourAccountShow" width="1100px">
      <addLabourAccount dialog="true" @closeCallback="closeCallback"></addLabourAccount>
    </el-dialog>
    
    <el-dialog title="申请开票" :visible.sync="invoiceShow" width="1000px">
      <div class="common-info" style="border:none;padding:0;">
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
        <div class="bot-btn">
            <el-button type="info">取消</el-button>
            <el-button type="primary">保存</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import list from './list.js'
export default list
</script>
<style lang="scss">
.trackScheduleDialog{
  .el-dialog__body{
    padding: 0;
    .topInfo{
      padding:0 20px 10px;
      border-bottom: $border;
      span{
        margin-right: 20px;
        font-weight: bold;
      }
    }
  }
  .trackSchedule{
      background: #fff;
      padding:10px 20px;
      .trackList{
          max-height: 400px;
          overflow-y:auto;
          position: relative;
          &::before,&::after{
              content: "";
              height: calc(100% - 60px);
              width: 1px;
              background: $border-color;
              position: absolute;
              left: 5px;
              top: 20px;
          }
          &::after{
              left:10px;
          }
          li{
              padding-left: 30px;
              position: relative;
              margin-bottom: 20px;
              z-index: 99;
              &::after{
                  content: '';
                  width:14px;
                  height: 14px;
                  border:$border;
                  border-radius: 50%;
                  position: absolute;
                  left: 0;
                  top:50%;
                  margin-top: -8px;
                  background: #fff;
                  z-index: 9;
              }
              &::before{
                  content: '';
                  width:8px;
                  height: 8px;
                  background:$border-color;
                  border-radius: 50%;
                  position: absolute;
                  left: 4px;
                  top:50%;
                  margin-top: -4px;
                  z-index: 99;
              }
          }
          li.first{
              &::before{
                  background: $tip-color;
              }
              &::after{
                  border-color: $tip-color;
              }
              p{
                  color:$tip-color;
              }
          }
      }
  }
}
</style>