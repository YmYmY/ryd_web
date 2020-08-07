<template>
    <div id="tree">
        <div class="tree-item" v-for="(item,index) in treedata" :key="index">
            <div class="tree-item-info" @mouseenter="hoverItem(item)" :class="{'active':item.active}">
                <div class="tree-item-zindex" @click.stop="openTab(item)">
                    <i :class="{'folderState':true,'folderOpen':item.isShow,'folderClose':!item.isShow,'folderFile':item.children==null||item.children.length==0}"></i>
                    <span v-if="!item.isEdit" @click="selectItem(item)" @dblclick="dblclickItem(item)">{{item[label]}}</span>
                    <el-input placeholder="部门名称" autofocus="true" v-model="item[label]" v-if="item.isEdit"></el-input>
                    <div class="editBtn fr">  
                        <span v-if="item.isEdit" @click.stop="saveItem(item)" class="btn">保存</span>
                        <span v-if="item.isEdit" @click.stop="cancelItem(item)" class="btn">取消</span>                  
                        <slot></slot>
                    </div>
                </div>
            </div>
            <tree v-show="item.isShow && item.children!==null" :treedata="item.children" class="itemChild" @dblclickItem="dblclickItem" @selectItem="selectItem" @hoverItem="hoverItem" @saveItem="saveItem" @cleanParent="cleanParent" @cleanSelectItem="cleanSelectItem" :label="label">
                <slot></slot>
            </tree>
        </div>
    </div>
</template>

<script>
    import tree from './tree.js'
    export default tree;
</script>
<style lang="scss" src="./tree.scss"></style>