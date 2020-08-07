<template>
    <div id="mapDialog" class="mapDialogPage">
        <el-dialog title="百度地图" :visible.sync="isShow" destroy-on-close="true" width="800px" @close="cancelMap">
            <div class="suggest">
                <input v-model="mapText" placeholder="请输入详细地址" id="suggestId"/>
                <div id="searchResultPanel"></div>
            </div>
            <baidu-map class="bm-view"  :center="mapObj.center" :zoom="mapObj.zoom" @ready="mapHandler"></baidu-map>
            <div class="page-bot-btn" style="padding:15px 0;margin:0 auto;">
                <el-button type="primary" @click="sureMapSite">确定</el-button>
                <el-button type="info" @click="cancelMap">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import mapDialog from './mapDialog.js'
    export default mapDialog;
</script>
<style lang="scss" src="./mapDialog.scss"></style>