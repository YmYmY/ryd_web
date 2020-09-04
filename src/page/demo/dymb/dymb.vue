<template>
    <div id="definitionTemplate" class="definitionTemplatePage">
        <div class="titleSet">
            <span>模板名称:<el-input type="text" name="name" v-model="printConfig.bizName"></el-input></span>
            <span>页宽:<el-input type="text" id="width" name="width" v-model="printConfig.pageWidth"></el-input>mm</span>
            <span>页高:<el-input type="text" id="height" name="height" v-model="printConfig.pageHeight"></el-input>mm</span>
            <span>左边距:<el-input type="text" id="left" name="left" v-model="printConfig.leftOffset"></el-input>mm</span>
            <span>上边距:<el-input type="text" id="top" name="top" v-model="printConfig.topOffset"></el-input>mm</span>
            <span>打印机:
                <el-select name="orient" v-model="printConfig.intOrient">
                    <el-option value="1">纵向</el-option>
                    <el-option value="2">横向</el-option>
                    <el-option value="0">自动</el-option>
                </el-select>
            </span>
        </div>
        <div class="itemSet clearfix">
            <!-- <i class="@/static/image/$tenantId$/strip.gif"></i> -->
            <i class="icon fw-icon"></i>
            <i class="icon scale-icon"></i>
            <i class="icon narrow-icon"></i>
            <i class="icon left-icon"></i>
            <i class="icon center-icon"></i>
            <i class="icon right-icon"></i>
            <span class="ml_10">宽<el-input type="text"></el-input>mm</span>
            <span>高<el-input type="text"></el-input>mm</span>
            <span>左<el-input type="text"></el-input>mm</span>
            <span>上<el-input type="text"></el-input>mm</span>
            <span>字体<el-input type="text"></el-input>pt</span>
            <span>名称<el-input type="text"></el-input></span>
        </div>
        <div class="dragBox" ref="dragBox">
            <div class="dragBg" ref="dragBg">                
                <drag :resizable="true" v-for="(item,index) in dragList" :key="index" 
                    :x="item.leftOffset" :y="item.topOffset" 
                    :w="item.itemWidth" :h="item.itemHeight"
                    @mousedown.native="onDragStartCallback(item,index)" 
                    @mouseup.native="onDragEndLeftCallback(item,index)" 
                    :on-drag="onDragCallback" 
                >
                    <p>{{item.name}}</p>
                </drag>
            </div>    
            <div class="dragList fr" ref="dragList">
                <div class="title">控件工具栏</div>
                <drag :ref="'dragRight'+index" :resizable="true" 
                    v-for="(item,index) in dragRightList" :key="index"
                    @mousedown.native="onDragStartCallback(item,index)" 
                    @mouseup.native="onDragEndRightCallback(item,index)" 
                    :on-drag="onDragCallback" 
                    :x="item.leftOffset" :y="item.topOffset"
                    :w="item.itemWidth" :h="item.itemHeight"
                >
                    <p>{{item.name}}</p>
                </drag>
            </div>
        </div>
    </div>
</template>


<script>
    import dymb from "./dymb.js"
    export default dymb
</script>
<style lang="scss" src="./dymb.scss"></style>