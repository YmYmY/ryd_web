<template>
<div id="scrollTable" class="scrollTableComponents">
    <div class="table_height" ref="table_height" :style="'height:'+height+'px'" v-myscrolled="{changeTop}">
        <table ref="scrollTable" class="tableCommon" width="100%" border="0" cellspacing="0" cellpadding="0">
            <thead class="fixed-thead" :style="{'margin-top':headTop+'px'}">
                <tr>
                    <th width="60">序号</th>
                    <th :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in head" :key="index">{{hd.name}}</th>
                </tr>
            </thead>
            <tbody class="fixed-tbody">
                <tr v-for="(data,index) in tableData" :class="data.class" :key="index" @click="selectRow(data,index)"  @dblclick="dblclickItem(data)">
                    <td width="60">{{index+1}}</td>
                    <td :width="hd.width == undefined ? defaultW : hd.width" v-for="(hd,index) in head" :key="index" :title="data[hd.code]">
                        {{data[hd.code]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import scrollTable from './scrollTable.js'
export default scrollTable
</script>

<style lang="scss">
.scrollTableComponents{
    .table_height{
        overflow: auto;
    }
}
</style>