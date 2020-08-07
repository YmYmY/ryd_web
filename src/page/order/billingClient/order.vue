<template>
    <div id="order">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
        <component :is="componentName"></component>
    </div>
</template>

<script>
    import innerTab from "@/components/innerTab/innerTab.vue"
    import orderDetails from '@/page/order/billingClient/orderDetails.vue'
    import orderStowage from '@/page/order/billingClient/orderStowage.vue'
    import orderOperating from '@/page/order/billingClient/orderOperating.vue'
    import orderModify from '@/page/order/billingClient/orderModify.vue'
    import orderTrack from '@/page/order/billingClient/orderTrack.vue'
    import orderCollect from '@/page/order/billingClient/orderCollect.vue'
    import orderSign from '@/page/order/billingClient/orderSign.vue'
    import orderEvaluation from   '@/page/order/billingClient/orderEvaluation.vue'
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
                    // {
                    //     name: "配载信息",
                    //     num: null,
                    //     router:'orderStowage'
                    // },
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