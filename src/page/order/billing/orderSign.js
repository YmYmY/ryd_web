import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'orderSign',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            orderSign:[],
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
        this.doQueryOrderSign();
    },
    mounted() {
        this.doQueryOrderSign();
    },
    components: {
        tableCommon,
        myFileModel,
    },
    methods: {
        doQueryOrderSign:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderSign = data.sign;
                if(!that.common.isBlank(that.orderSign.signFlowIds)){
                    let signFlowIds = that.orderSign.signFlowIds.split(",");
                    for(let i=0;i<signFlowIds.length;i++){
                        that.$refs['img'+(i+1)][0].initDate(signFlowIds[i]);
                    }
                }
            })
        },
    },
}