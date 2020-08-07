<template>
    <div id="newsInfo" class="newsInfoPage">
        <div class="search-list clearfix">
            <div class="search-form clearfix">
                <div class="item">
                    <label class="label">消息时间</label>
                    <div class="input-text">
                        <el-date-picker @change="doQuerySysPushParam(true)" v-model="newsDate" value-format="yyyyMM" type="month" placeholder="选择日期"></el-date-picker>
                    </div>
                </div>
            </div>
            <div class="search-btn clearfix">

            </div>
        </div>
        <div class="table-content">
            <div class="table-title">
                <h3>
                    <span>消息列表</span>
                    <el-tooltip effect="light" content="消息列表" placement="right">
                        <img class="tip" src="@/static/image/$tenantId$/tip.png" alt="">
                    </el-tooltip>
                </h3>
                <div class="table-title-btn">
                    
                </div>
            </div>
            <el-collapse accordion>
                <el-collapse-item v-for="(item,$index) in infoList" :key="$index" >
                    <template slot="title" >
                        <div style="flex:1;padding:0 10px 0 20px" :class="item.pushState==2?'red':''" @click="updatePushReadState(item)">
                            <span>[{{item.newTypeName}}]{{item.newsTitle}}</span><span class="fr">{{item.createDate}}</span>
                        </div>
                    </template>
                    <div style="padding:0 20px;">{{item.pushContent}}</div>
                </el-collapse-item>
            </el-collapse>
            <div class="pageList">
                <span class="pagenum" @click="prePage" v-show="page>1"> < </span>
                <span class="pagenum" :class="{'active':page==num}" @click="changePage(num)" v-for="num in pageList" :key="num">{{num}}</span>
                <span class="pagenum" @click="nextPage" v-show="page!=pageList.length"> > </span>
            </div>
        </div>
    </div>
</template>


<script>
    import newsInfo from './newsInfo.js'
    export default newsInfo
</script>
<style lang="scss">
.newsInfoPage{
    .pageList{
        padding:10px;
        text-align: right;
    }
    .pagenum{
        border:$border;
        padding:0 5px;
        line-height: 23px;
        border-radius: 3px;
        margin:0 3px;
        display: inline-block;
        cursor: pointer;
        &:hover,&.active{
            color:$main-color;
            background: $bg-color;
        }
    }
}
</style>