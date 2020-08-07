import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'orderModify',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            orderModify:[],
        }
    },
    beforeRouteUpdate(){
        this.doQueryOrderModify();
    },
    mounted() {
        this.doQueryOrderModify();
    },
    components: {
        tableCommon,
    },
    methods: {
        doQueryOrderModify:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderModify = data.modfiyLogs;
            })
        },
    },
}