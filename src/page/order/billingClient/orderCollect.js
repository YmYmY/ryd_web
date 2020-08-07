import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'orderCollect',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            orderCollect:[],
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
        this.doQueryOrderCollect();
    },
    mounted() {
        this.doQueryOrderCollect();
    },
    components: {
        tableCommon,
        myFileModel,
    },
    methods: {
        doQueryOrderCollect:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderCollect = data.modfiyLogs;
            })
        },
    },
}