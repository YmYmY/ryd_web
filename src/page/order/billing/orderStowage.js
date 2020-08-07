import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'orderStowage',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            orderStowage:[],
        }
    },
    beforeRouteUpdate(){
        this.doQueryOrderStowage();
    },
    mounted() {
        this.doQueryOrderStowage();
    },
    components: {
        tableCommon,
    },
    methods: {
        doQueryOrderStowage:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderStowage = data.departs;
            })
        },
    },
}