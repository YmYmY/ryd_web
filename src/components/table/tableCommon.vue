<template>
    <div id="tableCommon" class="tableCommonDiv" :class="isScaleTable?'scaleTable':''" @mouseenter="showFull" @mouseleave="hideFull">
        <div class="noData" v-if="tableData.length==0">表格暂无数据</div>
        <img class="fullscreen" @click="scaleTable" v-if="isshowFull&&!hideScale" src="@/static/image/$tenantId$/fullscreen.png" title="放大/缩小表格" alt="全屏">
        <!-- 表格设置 -->
        <div class="setTableRow" v-show="isShowSetTable" >
            <el-button type="primary" @click="showSetting()" size="mini">表格设置</el-button>
            <div class="package" v-show="setTabelShow">
                <div class="listShow">
                    <vuedraggable v-model="headList">
                        <transition-group :name="'flip-list'" type="transition">
                            <div class="item clearfix" v-for="(hd,index) in headList" :key="hd.code">
                                <el-checkbox class="fl" v-model="hd.isShow" @change="hideRow(hd)">{{hd.name}}</el-checkbox>
                                <el-switch class="fr" v-model="hd.isFix" @change="fixRow(hd,index)" active-text="固定"></el-switch>
                            </div>
                        </transition-group>
                    </vuedraggable>
                </div>
                <div class="bot_btn clearfix">
                    <el-button class="fl" type="primary" size="mini" @click="saveTableRow()">确定</el-button>
                    <el-button class="fr" type="danger" size="mini" @click="cancelSet()">取消</el-button>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div class="table_height" ref="tableHeight" v-myscrolled="{changeTop}">
            <!-- 
                hd.width    页面配置的列宽
                hd.isShow   页面配置的是否展示列
                hd.isFix    页面配置的是否固定列
                hd.haveFlag 页面配置，该列是否有标签
                hd.type     页面配置的单元格类型，type：input时为输入框
                hd.isSum    页面配置该列是否统计
                data.class  后台配置的样式类名，前端提供样式（bg_yellow,bg_orange）
                data.flag   后台配置的属性，支持属性：pickerOvertime、dispatchOvertime
            -->
            <!-- 固定 -->
            <table class="tableCommon tableCommonFix" id="js_my_fixtable" width="10" border="0" cellspacing="0" cellpadding="0">
                <thead class="fixed-thead" :style="{'margin-top':headTop+'px'}">
                    <tr>
                        <th :width="multi_w">
                            <el-checkbox v-model="selectAll" @change="selectAllCheck()" v-if="!singleSelect"></el-checkbox>
                        </th>
                        <th :width="num_w" v-if="isShowNum">序号</th>
                        <th :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in headListFix" :key="index">{{hd.name}}</th>
                    </tr>
                </thead>
                <tbody class="fixed-tbody">
                    <tr v-for="(data,index) in tableData" :class="[data.class,{'hover':data.isSelect}]" :key="index" @click="selectRow(data,index)" @dblclick="dblclickItem(data)">
                        <td :width="multi_w">
                            <el-checkbox class="checkbox_row" v-model="data.isSelect"></el-checkbox>
                        </td>
                        <td :width="num_w" v-if="isShowNum">{{index+1}}</td>
                        <td :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in headListFix" :key="index" :title="data[hd.code]">
                            <div v-if="hd.type=='input'"><el-input v-model="data[hd.code]" :placeholder="hd.placeholder"></el-input></div>
                            <span v-else>{{data[hd.code]}}</span>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="fixed-tfoot tfoot" :style="{'top':_fixBottomRight+'px'}" v-if="doSum">
                    <tr>
                        <td :width="multi_w"><em class="fw">统计</em></td>
                        <td :width="num_w" v-if="isShowNum"></td>
                        <td :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in headListFix" :key="index"><em class="fw">{{hd.sum}}</em></td>
                    </tr>
                </tfoot>
            </table>
            <!-- 非固定 -->
            <table class="tableCommon" ref="js_my_table" width="100%" border="0" cellspacing="0" cellpadding="0" :style="{'margin-left':leftTableW+'px','width':'calc(100% - '+leftTableW+'px + 1px)'}">
                <thead class="fixed-thead" :style="{'margin-top':headTop+'px'}">
                    <tr>
                        <th :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in headListShow" :key="index" @click="doSort(hd.code)">{{hd.name}}</th>
                    </tr>
                </thead>
                <tbody class="fixed-tbody">
                    <tr v-for="(data,index) in tableData" :class="[data.class,{'hover':data.isSelect}]" :key="index" @click="selectRow(data,index)"  @dblclick="dblclickItem(data)">
                        <td :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in headListShow" :key="index" :title="data[hd.code]">
                            <span class="flag" :class="data.flag" v-if="hd.haveFlag&&data.flag=='pickerOvertime'">取件超时</span>
                            <span class="flag" :class="data.flag" v-if="hd.haveFlag&&data.flag=='dispatchOvertime'">派送超时</span>
                            <div v-if="hd.type=='input'"><el-input v-model="data[hd.code]" :placeholder="hd.placeholder"></el-input></div>
                            <span v-else>{{data[hd.code]}}</span>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="fixed-tfoot tfoot" :style="{'top':_fixBottomRight+'px'}" v-if="doSum">
                    <tr>
                        <td :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in headListShow" :key="index"><em class="fw">{{hd.sum}}</em></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="table_page clearfix">
            <div class="fl">
                共<span class="total">{{totalNum}}</span>条数据，显示
                <span class="num" :class="{'active':rows==50}" @click="changeRows(50)">50</span>
                <span class="num" :class="{'active':rows==80}" @click="changeRows(80)">80</span>
                <span class="num" :class="{'active':rows==100}" @click="changeRows(100)">100</span>条
            </div>
            <div class="fr">
                <span class="num" @click="prePage" v-show="page>1"> < </span>
                <!-- <span class="num" v-show="pageList.length>4&&page>1">...</span> -->
                <span class="num" :class="{'active':page==num}" @click="changePage(num)" v-for="num in pageList" :key="num" v-show="num<5 || page+1>=num">{{num}}</span>
                <span class="num" v-show="pageList.length>4&&page!=pageList.length">...</span>
                <!-- <span class="num" v-show="pageList.length>3">{{pageList.length-1}}</span> -->
                <!-- <span class="num" :class="{'active':page==pageList.length-1}" v-show="pageList.length>4" @click="changePage(pageList.length-1)">{{pageList.length-1}}</span>
                <span class="num" :class="{'active':page==pageList.length}" v-show="pageList.length>4" @click="changePage(pageList.length)">{{pageList.length}}</span> -->
                <span class="num" @click="nextPage" v-show="page!=pageList.length"> > </span>
            </div>
        </div>
    </div>
</template>

<script>
import tableCommon from './tableCommon.js'
export default tableCommon
</script>
<style lang="scss" src="./tableCommon.scss"></style>
