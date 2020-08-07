<template>
    <div id="price">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
        <component :is="componentName" @clostToOther="clostToOther"></component>
    </div>
</template>

<script>
    import innerTab from "@/components/innerTab/innerTab.vue"
    import priceLadderDetails from '@/page/user/priceLadderDetails.vue'
    import priceStandardDetails from '@/page/user/priceStandardDetails.vue'
    export default {
        name: 'price',
        data() {
            return {
                componentName:priceLadderDetails,
                tabs: [
                    {
                    name: "阶梯价详情",
                    num: null,
                    active: true,
                    router:'priceLadderDetails',
                    },
                    {
                        name: "标准价详情",
                        num: null,
                        router:'priceStandardDetails'
                    },
                ],
            }
        },
        mounted() {

        },
        methods: {
            selectCallback(data){
                this.componentName = data.router;
            },
            clostToOther(){
                this.$emit('clostToOther', that.$route.meta.id);
            },
            clostToOther(item){
                this.$emit('clostToOther', item);
            }
        },
        components: {
            priceLadderDetails,
            priceStandardDetails,
            innerTab,
        },
    }
</script>