<template>
    <div id="ladderTable" class="ladderTable">
        <div class="table_height" ref="ladderTableScroll">
            <table class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead ref="ladderThead" class="fixed-thead" :style="{'margin-top':headTop+'px'}">
                    <tr>
                        <th width="60"></th>
                        <th v-for="hd in head" :key="hd.code" :width="hd.width">
                            <!-- 首重 -->
                            <div v-if="hd.code=='startWeight'">
                                <div><el-checkbox :disabled="disabledEdit" v-model="heavyCheck0" @change="changeHeavy(0)"><em>*</em>{{hd.name}}</el-checkbox></div>
                                <div><el-input :disabled="disabledEdit"  v-model="heavy0" v-mydoubleval @input.native="heavyIpt(0)"></el-input></div>
                            </div>
                            <!-- 续重范围1（公斤） -->
                            <div v-else-if="hd.code=='weightOne'">
                                <div><el-checkbox :disabled="disabledEdit"  v-model="heavyCheckOne" @change="changeHeavy('One')"><em>*</em>{{hd.name}}</el-checkbox></div>
                                <div>
                                    <el-input v-model="heavy0" disabled style="width:80px;"></el-input>
                                    <span>-</span>
                                    <el-input :disabled="disabledEdit"  v-model="heavyOne" v-mydoubleval style="width:80px;" @blur="checkVal('One')" @input.native="heavyIpt('One')"></el-input>
                                </div>
                            </div>
                            <!-- 续重范围2（公斤） -->
                            <div v-else-if="hd.code=='weightTwo'">
                                <div><el-checkbox v-model="heavyCheckTwo" :disabled="disabledEdit" @change="changeHeavy('Two')">{{hd.name}}</el-checkbox></div>
                                <div>
                                    <el-input v-model="heavyOne" disabled style="width:80px;"></el-input>
                                    <span>-</span>
                                    <el-input :disabled="disabledEdit"  v-model="heavyTwo" v-mydoubleval style="width:80px;" @blur="checkVal('Two')" @input.native="heavyIpt('Two')"></el-input>
                                </div>
                            </div>
                            <!-- 续重范围3（公斤） -->
                            <div v-else-if="hd.code=='weightThree'">
                                <div><el-checkbox v-model="heavyCheckThree" :disabled="disabledEdit" @change="changeHeavy('Three')">{{hd.name}}</el-checkbox></div>
                                <div>
                                    <el-input v-model="heavyTwo" disabled style="width:80px;"></el-input>
                                    <span>-</span>
                                    <el-input :disabled="disabledEdit"  v-model="heavyThree" v-mydoubleval style="width:80px;" @blur="checkVal('Three')" @input.native="heavyIpt('Three')"></el-input>
                                </div>
                            </div>
                            <!-- 续重范围4（公斤） -->
                            <div v-else-if="hd.code=='weightFour'">
                                <div><el-checkbox :disabled="disabledEdit"  v-model="heavyCheckFour" @change="changeHeavy('Four')">{{hd.name}}</el-checkbox></div>
                                <div>
                                    <el-input v-model="heavyThree" disabled style="width:80px;"></el-input>
                                    <span>-</span>
                                    <el-input :disabled="disabledEdit"  v-model="heavyFour" v-mydoubleval style="width:80px;" @blur="checkVal('Four')" @input.native="heavyIpt('Four')"></el-input>
                                </div>
                            </div>
                            <!-- 续重范围5（公斤） -->
                            <div v-else-if="hd.code=='weightFives'">
                                <div><el-checkbox :disabled="disabledEdit"  v-model="heavyCheckFives" @change="changeHeavy('Fives')">{{hd.name}}</el-checkbox></div>
                                <div>
                                    <el-input v-model="heavyFour" disabled style="width:80px;"></el-input>
                                    <span>-</span>
                                    <el-input :disabled="disabledEdit"  v-model="heavyFives" v-mydoubleval style="width:80px;" @blur="checkVal('Fives')" @input.native="heavyIpt('Fives')"></el-input>
                                </div>
                            </div>
                            <div v-else>
                                <em v-if="hd.ismust">*</em>{{hd.name}}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="fixed-tbody" :style="{'margin-top':thH+'px'}">
                    <!-- 
                        ismust      是否为必填
                        type        默认为输入框,text时为展示框,selectTime时为选择时间,city为可展开省市
                        inputType:"num/double" 
                    -->
                    <tr v-for="(data,index) in tableData" :key="index" v-show="!data.isHide" @click="selectTd(data)">
                        <td width="60">
                            <el-checkbox v-model="data.isSelect" style="pointer-events: none;"></el-checkbox>
                        </td>
                        <td v-for="hd in head" :key="hd.code" :width="hd.width">
                            <div v-if="hd.type=='text'">
                                {{data[hd.code]}}
                            </div>
                            <div v-else-if="hd.type=='city'" style="text-align:left;padding-left:24px;box-sizing:border-box;">
                                <i class="folderState" :class="{'folderFile':!data.provType && !data.cityType,'folderNext':!data.provType}" @click.stop="getCity(data,index)"></i>
                                {{data.name}}
                            </div>
                            <div v-else-if="hd.type=='selectTime'">
                                <el-date-picker v-model="data[hd.code]" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" @click.native.stop="stopbub()" @blur="updateDom" placeholder="选择日期时间"></el-date-picker>
                            </div>
                            <div v-else-if="hd.type=='select'">
                                <el-select v-model="data[hd.code]" :placeholder="hd.placeholder?hd.placeholder:'请选择'">
                                    <el-option v-for="item in hd.selectData" :key="item.value" :label="item.codeName" :value="item.codeValue"></el-option>
                                </el-select>
                            </div>
                            <div v-else-if="hd.inputType=='double'">
                                <el-input :disabled="disabledEdit || hd.disabledEdit" @input="updateDom" v-mydoubleval @click.native.stop="stopbub()" v-model="data[hd.code]" maxlength="11"></el-input>
                            </div>
                            <div v-else>
                                <el-input :disabled="disabledEdit || hd.disabledEdit" @input="updateDom" v-mynumval @click.native.stop="stopbub()" v-model="data[hd.code]" maxlength="11"></el-input>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import ladderTable from './ladderTable.js'
    export default ladderTable
</script>

<style lang="scss" src="./ladderTable.scss"></style>