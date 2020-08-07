import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'orderOperating',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            orderOperating:[],
        }
    },
    beforeRouteUpdate(){
        this.doQueryOrderOperating();
    },
    mounted() {
        this.doQueryOrderOperating();
    },
    components: {
        tableCommon,
    },
    methods: {
        doQueryOrderOperating:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderOperating = data.logs;
            })
        },
    },
}