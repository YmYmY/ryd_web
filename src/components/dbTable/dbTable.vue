<template>
    <!-- 
    关于表头说明:
        head        默认表头
        rightHead   右边表头(页面没设置则使用默认表头)
        hd.isShow   是否展示该列
        hd.isFix    是否固定该列
        hd.width    该列的单元格长度     
        hd.type     该列的类型(默认text,支持input)
        hd.placeholder      type类型为input是设置placeholder
     -->
    <div id="dbTable" class="tableCommonDiv dbTable clearfix">
        <div class="leftTable" :style="'width:'+leftWidth" v-show="showLeftTable">
            <div class="noData" v-if="tableData.length==0">表格暂无数据</div>
            <!-- 表格设置 -->
            <div class="setTableRow" v-show="isShowSetTable" >
                <el-button type="primary" @click="showSetting('left')" size="mini">表格设置</el-button>
                <div class="tableChange" @click="scaleTable(1)"><img src="@/static/image/$tenantId$/change.png" alt=""></div>
                <div class="package" v-show="setTabelShow">
                    <div class="listShow">
                        <vuedraggable v-model="headList">
                            <transition-group :name="'flip-list'" type="transition">
                                <div class="item clearfix" v-for="(hd,index) in headList" :key="hd.code">
                                    <el-checkbox class="fl" v-model="hd.isShow">{{hd.name}}</el-checkbox>
                                    <el-switch class="fr" v-model="hd.isFix" @change="fixRow(hd,index)" active-text="固定"></el-switch>
                                </div>
                            </transition-group>
                        </vuedraggable>
                    </div>
                    <div class="bot_btn clearfix">
                        <el-button type="primary" size="mini" @click="saveTableRow()">确定</el-button>
                        <el-button type="danger" size="mini" @click="cancelSet()">取消</el-button>
                    </div>
                </div>
            </div>
            <!-- 表格 -->
            <div class="table_height" ref="table_height_left" v-myscrolled="{changeTop}">
                <!-- 固定 -->
                <table class="tableCommon tableCommonFix" id="js_my_fixtable" width="10" border="0" cellspacing="0" cellpadding="0">
                    <thead class="fixed-thead" :style="{'margin-top':headTop+'px'}">
                        <tr>
                            <th :width="multi_w">
                                <el-tooltip effect="dark" content="该表格数据全部移到右侧" placement="top-start" :hide-after='500'>
                                    <i class="el-icon-circle-plus" @click="toRightTable(data,index,'all')"></i>
                                </el-tooltip>
                            </th>
                            <th :width="num_w" v-if="isShowNum">序号</th>
                            <th :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListFix" :key="hd.code">{{hd.name}}</th>
                        </tr>
                    </thead>
                    <tbody class="fixed-tbody">
                        <tr v-for="(data,index) in tableData" :key="index" @click="selectRow(data,index)" @dblclick="toRightTable(data,index)">
                            <td :width="multi_w">
                                <el-tooltip effect="dark" content="增加此行" placement="top-start" :hide-after='500'>
                                    <i class="el-icon-circle-plus" @click="toRightTable(data,index)"></i>
                                </el-tooltip>
                            </td>
                            <td :width="num_w" v-if="isShowNum">{{index+1}}</td>
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListFix" :key="hd.code" :title="data[hd.code]">{{data[hd.code]}}</td>
                        </tr>
                    </tbody>
                    <tfoot class="fixed-tfoot tfoot" :style="{'top':_fixBottom+'px'}">
                        <tr>
                            <td :width="multi_w"><em style="font-weight:bold;">{{totalNum}}</em></td>
                            <td :width="num_w" v-if="isShowNum"></td>
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListFix" :key="hd.code"><em class="fw">{{hd.sum}}</em></td>
                        </tr>
                    </tfoot>
                </table>
                <!-- 非固定 -->
                <table class="tableCommon" ref="js_my_table_left" width="100%" border="0" cellspacing="0" cellpadding="0" :style="{'margin-left':leftTableW+'px','width':'calc(100% - '+leftTableW+'px + 1px)'}">
                    <thead class="fixed-thead" :style="{'margin-top':headTop+'px'}">
                        <tr>
                            <th :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListShow" :key="hd.code" @click="doSort(hd.code,tableData)">{{hd.name}}</th>
                        </tr>
                    </thead>
                    <tbody class="fixed-tbody">
                        <tr v-for="(data,index) in tableData" :key="index" @click="selectRow(data,index)" @dblclick="toRightTable(data,index)">
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListShow" :key="hd.code" :title="data[hd.code]">{{data[hd.code]}}</td>
                        </tr>
                    </tbody>
                    <tfoot class="fixed-tfoot tfoot" :style="{'top':_fixBottom+'px'}">
                        <tr>
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListShow" :key="hd.code"><em class="fw">{{hd.sum}}</em></td>
                        </tr>
                    </tfoot>
                </table>                
            </div>
        </div>
        <div class="rightTable" :style="'width:'+rightWidth" v-show="showRightTable">
            <div class="noData" v-if="tableDataRight.length==0">表格暂无数据</div>
            <!-- 表格设置 -->
            <div class="setTableRow" v-show="isShowSetTable" >
                <el-button type="success" @click="goNext()" size="mini">{{nextBtnText?nextBtnText:'下一步'}}</el-button>
                <el-button v-if="isshowDispatchBtn" type="warning" @click="goDispatch()" size="mini">{{dispatchBtnText?dispatchBtnText:'一键派单'}}</el-button>
                <el-button type="primary" @click="showSetting('right')" size="mini">表格设置</el-button>
                <div class="tableChange" @click="scaleTable(2)"><img src="@/static/image/$tenantId$/change.png" alt=""></div>
                <div class="package" v-show="setRightTabelShow">
                    <div class="listShow">
                        <vuedraggable v-model="headListRight">
                            <transition-group :name="'flip-list'" type="transition">
                                <div class="item clearfix" v-for="(hd,index) in headListRight" :key="hd.code">
                                    <el-checkbox class="fl" v-model="hd.isShow">{{hd.name}}</el-checkbox>
                                    <el-switch class="fr" v-model="hd.isFix" @change="fixRow(hd,index,'right')" active-text="固定"></el-switch>
                                </div>
                            </transition-group>
                        </vuedraggable>
                    </div>
                    <div class="bot_btn clearfix">
                        <el-button type="primary" size="mini" @click="saveRightTableRow()">确定</el-button>
                        <el-button type="danger" size="mini" @click="cancelRightSet()">取消</el-button>
                    </div>
                </div>
            </div>
            <!-- 表格 -->
            <div class="table_height" ref="table_height_right" v-myRightScrolled="{changeTop}">
                <!-- 固定 -->
                <table class="tableCommon tableCommonFix" id="js_my_fixtable_right" width="10" border="0" cellspacing="0" cellpadding="0">
                    <thead class="fixed-thead" :style="{'margin-top':headTopRight+'px'}">
                        <tr>
                            <th :width="multi_w">                                
                                <el-tooltip effect="dark" content="该表格数据全部移到左侧" placement="top-start" :hide-after='500'>
                                    <i class="el-icon-remove" @click="toLeftTable(data,index,'all')"></i>
                                </el-tooltip>
                            </th>
                            <th :width="num_w" v-if="isShowNum">序号</th>
                            <th :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListRightFix" :key="hd.code">{{hd.name}}</th>
                        </tr>
                    </thead>
                    <tbody class="fixed-tbody">
                        <tr v-for="(data,index) in tableDataRight" :key="index" @click="selectRow(data,index)" @dblclick="toLeftTable(data,index)">
                            <td :width="multi_w">
                                <el-tooltip effect="dark" content="移除此行" placement="top-start" :hide-after='500'>
                                    <i class="el-icon-remove" @click="toLeftTable(data,index)"></i>
                                </el-tooltip>
                            </td>
                            <td :width="num_w" v-if="isShowNum">{{index+1}}</td>
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListRightFix" :key="hd.code" :title="data[hd.code]">{{data[hd.code]}}</td>
                        </tr>
                    </tbody>
                    <tfoot class="fixed-tfoot tfoot" :style="{'top':_fixBottomRight+'px'}">
                        <tr>
                            <td :width="multi_w"><em style="font-weight:bold;">{{tableDataRight.length}}</em></td>
                            <td :width="num_w" v-if="isShowNum"></td>
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListRightFix" :key="hd.code"><em class="fw">{{hd.sum}}</em></td>
                        </tr>
                    </tfoot>
                </table>
                <!-- 非固定 -->
                <table class="tableCommon" ref="js_my_table_right" width="100%" border="0" cellspacing="0" cellpadding="0" :style="{'margin-left':leftTableWRight+'px','width':'calc(100% - '+leftTableWRight+'px + 1px)'}">
                    <thead class="fixed-thead" :style="{'margin-top':headTopRight+'px'}">
                        <tr>
                            <th :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListRightShow" :key="hd.code" @click="doSort(hd.code,tableDataRight)">{{hd.name}}</th>
                        </tr>
                    </thead>
                    <tbody class="fixed-tbody">
                        <tr v-for="(data,index) in tableDataRight" :key="index" @click="selectRow(data,index)" @dblclick="toLeftTable(data,index)">
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListRightShow" :key="hd.code" :title="data[hd.code]">
                                <div v-if="hd.type=='input'"><el-input v-model="data[hd.code]" :placeholder="hd.placeholder"></el-input></div>
                                <span v-else>{{data[hd.code]}}</span>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="fixed-tfoot tfoot" :style="{'top':_fixBottomRight+'px'}">
                        <tr>
                            <td :width="hd.width == undefined ? defaultW : hd.width" v-for="hd in headListRightShow" :key="hd.code"><em class="fw">{{hd.sum}}</em></td>
                        </tr>
                    </tfoot>
                </table>                
            </div>
        </div>
    </div>
</template>

<script>
import dbTable from './dbTable.js'
export default dbTable
</script>
<style lang="scss" src="./dbTable.scss"></style>
