<template>
    <div id="price">
        <innerTab :tabs="tabs" @selectCallback="selectCallback"></innerTab>
        <component :is="componentName" @clostToOther="clostToOther" :priceId="priceId"></component>
    </div>
</template>

<script>
    import innerTab from "@/components/innerTab/innerTab.vue"
    import priceStandard from '@/page/user/addPriceStandard.vue'
    import priceLadder from '@/page/user/addPriceLadder.vue'
    export default {
        name: 'price',
        data() {
            return {
                componentName:priceLadder,
                priceId:'',
                tabs: [
                    {
                        name: "阶梯价",
                        num: null,
                        active: true,
                        router:'priceLadder',
                    },
                    {
                        name: "标准价",
                        num: null,
                        router:'priceStandard'
                    },
                ],
            }
        },
        mounted() {
            let url ="api/sysTenantDefBO.ajax?cmd=getSysTenantPrice";
            let _this = this;
            this.common.postUrl(url,{"tenantId":this.$route.query.tenantId},function (data) {
                if(data.items.length>0){
                    _this.tabs = [];
                    data.items.forEach((el,inde) => {
                        let obj = {};
                        obj.name = el.priceName;
                        obj.priceId = el.priceId;
                        if(el.priceType == 1){
                            obj.router = "priceLadder";
                        }else if(el.priceType == 2){
                            obj.router = "priceStandard";
                        }
                        _this.tabs.push(obj);
                    });
                    _this.tabs[0].active = true;
                    _this.componentName = _this.tabs[0].router;
                    _this.priceId = _this.tabs[0].priceId;
                }
            });
        },
        methods: {
            selectCallback(data){
                this.componentName = data.router;
                this.priceId = data.priceId;
            },
            clostToOther(){
                this.$emit('clostToOther', that.$route.meta.id);
            },
            clostToOther(item){
                this.$emit('clostToOther', item);
            }
        },
        components: {
            priceStandard,
            priceLadder,
            innerTab,
        },
    }
</script>