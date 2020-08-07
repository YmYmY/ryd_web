<template>
    <div id="simpleTree" class="simpleTree">
        <div class="tree-item" v-for="(item,index) in treedata" :key="index">
            <div class="tree-item-info" @mouseenter="hoverItem(item)" :class="{'active':item.active}">
                <div class="tree-item-zindex" @click.stop="openTab(item)" >
                    <span class="iconspan">
                        <i class="el-icon-caret-right" v-show="!item.isShow&&item.children!==null"></i>
                        <i class="el-icon-caret-bottom" v-show="item.isShow&&item.children!==null"></i>
                    </span>
                    <div class="checkbox" @click.stop="checkItem(item)"><el-checkbox v-model="item.isChecked" :disabled="item.disabled"></el-checkbox></div>
                    <span @click.stop="checkItem(item)">{{item[label]}}</span>
                </div>
            </div>
            <simpleTree v-show="item.isShow && item.children!==null" :treedata="item.children" class="itemChild" @selectItem="selectItem" @hoverItem="hoverItem" :label="label">
                
            </simpleTree>
        </div>
    </div>
</template>

<script>
    import simpleTree from './simpleTree.js'
    export default simpleTree;
</script>
<style lang="scss" src="./simpleTree.scss"></style>