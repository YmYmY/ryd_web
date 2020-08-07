<template>
    <div id="order">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
        <component :is="componentName" @openTab="openTab"></component>
    </div>
</template>

<script>
    import innerTab from "@/components/innerTab/innerTab.vue"
    import orderDetails from '@/page/order/billing/orderDetails.vue'
    import orderStowage from '@/page/order/billing/orderStowage.vue'
    import orderOperating from '@/page/order/billing/orderOperating.vue'
    import orderModify from '@/page/order/billing/orderModify.vue'
    import orderTrack from '@/page/order/billing/orderTrack.vue'
    import orderCollect from '@/page/order/billing/orderCollect.vue'
    import orderSign from '@/page/order/billing/orderSign.vue'
    import orderEvaluation from   '@/page/order/billing/orderEvaluation.vue'
    export default {
        name: 'order',
        data() {
            return {
                componentName:orderDetails,
                tabs: [
                    {
                        name: "订单详情",
                        num: null,
                        active: true,
                        router:'orderDetails',
                    },
                    {
                        name: "配载信息",
                        num: null,
                        router:'orderStowage'
                    },
                    {
                        name: "轨迹跟踪",
                        num: null,
                        router:'orderTrack'
                    },
                    {
                        name: "操作日志",
                        num: null,
                        router:'orderOperating'
                    },
                    {
                        name: "修改记录",
                        num: null,
                        router:'orderModify'
                    },
                 /*   {
                        name: "揽收信息",
                        num: null,
                        router:'orderCollect'
                    },*/
                    {
                        name: "签收信息",
                        num: null,
                        router:'orderSign'
                    },
                   /* {
                        name: "评价信息",
                        num: null,
                        router:'orderEvaluation'
                    },*/
                ],
            }
        },
        mounted() {

        },
        methods: {
            selectCallback(data){
                this.componentName = data.router;
            },
            openTab(item){
                this.$emit('openTab', item);
            }
        },
        components: {
            orderDetails,
            orderStowage,
            orderOperating,
            orderModify,
            innerTab,
            orderTrack,
            orderCollect,
            orderSign,
            orderEvaluation,
        },
    }
</script>