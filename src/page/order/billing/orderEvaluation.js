import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'orderEvaluation',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            orderEvaluation:[],
            imgList:[
                {code:'img1'},
                {code:'img2'},
                {code:'img3'},
                {code:'img4'},
                {code:'img5'},
                {code:'img6'},
                {code:'img7'},
                {code:'img8'},
                {code:'img9'},
                {code:'img10'},
            ]
        }
    },
    beforeRouteUpdate(){
        this.doQueryOrderEvaluation();
    },
    mounted() {
        this.doQueryOrderEvaluation();
    },
    components: {
        tableCommon,
        myFileModel,
    },
    methods: {
        doQueryOrderEvaluation:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderEvaluation = data.sign;
            })
        },
    },
}