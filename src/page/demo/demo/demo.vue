<template>
    <div id="demo">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
        <component :is="componentName" @openTab="openTab" :tab="tab"></component>
    </div>
</template>

<script>
    import innerTab from "@/components/innerTab/innerTab.vue"
    import list from '@/page/demo/list/list.vue'
    import addcontent from '@/page/demo/addcontent/addcontent.vue'
    import addrole from '@/page/demo/addrole/addrole.vue'
    export default {
        name: 'demo',
        data() {
            return {
                componentName:list,
                tabs: [{
                        name: "表格页",
                        num: 3000,
                        active: true,
                        router:'list',
                    },
                    {
                        name: "新增页",
                        num: 123,
                        router:'addcontent'
                    },
                    {
                        name: "新增角色",
                        num: 123,
                        router:'addrole'
                    },
                ],
                tab:{},
            }
        },
        mounted() {
            this.tab = this.tabs[0];
            this.$forceUpdate();
        },
        methods: {
            selectCallback(data){
                this.tab = data;
                this.componentName = data.router;
            },
            openTab(item){
                this.$emit('openTab', item);
            }
        },
        components: {
            innerTab,
            list,
            addcontent,
            addrole
        },
    }
</script>