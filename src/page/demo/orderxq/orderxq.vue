<template>
    <div id="demo">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
        <component :is="componentName"></component>
    </div>
</template>

<script>
    import innerTab from "@/components/innerTab/innerTab.vue"
    import orderInfo from '@/page/order/billing/billing.vue'
    import stowageInfo from './stowageInfo.vue'
    import getGoodsInfo from './getGoodsInfo.vue'
    import evaluateInfo from './evaluateInfo.vue'
    import mapDemo from './mapDemo.vue'
    export default {
        name: 'demo',
        data() {
            return {
                componentName:orderInfo,
                tabs: [{
                        name: "运单信息",
                        active: true,
                        router:'orderInfo',
                    },
                    {
                        name: "配载信息",
                        router:'stowageInfo'
                    },
                    {
                        name: "轨迹跟踪",
                        router:'mapDemo'    
                    },
                    {
                        name: "操作日志",
                        router:'stowageInfo'
                    },
                    {
                        name: "修改记录",
                        router:'stowageInfo'
                    },
                    {
                        name: "揽收信息",
                        router:'getGoodsInfo'
                    },
                    {
                        name: "签收信息",
                        router:'getGoodsInfo'
                    },
                    {
                        name: "评价信息",
                        router:'evaluateInfo'
                    },
                ],
            }
        },
        mounted() {
            
        },
        methods: {
            selectCallback(data){
                this.componentName = data.router;
            }
        },
        components: {
            innerTab,
            orderInfo,
            stowageInfo,
            getGoodsInfo,
            evaluateInfo,
            mapDemo,
        },
    }
</script>