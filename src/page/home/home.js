import myTab from '@/components/myTab/myTab.vue'
import toMain from './toMain.vue'
import mixin from './mixin.js'

export default {
    name: 'home',
    mixins: [mixin],
    data() {
        return {
            trackingNum:null,
            trackingNumList:[],
        }
    },
    mounted() {
        this.getTab();
        this.getSysMenuButton();
        this.getSysMenuUse();
        this.getCookie();
        this.getSysUserOragnize();
        this.getSysUserRegion();        
    },
    components: {
        myTab,
        toMain,
    },
    methods: {
        async getOrderInfo(queryString, cb){
            let url = "api/ordOrderInfoBO.ajax?cmd=searchOrders";
            let data = await this.common.postUrl(url,{"orderNo":queryString});
            cb(data.items);
        },
        selectOrder:function (obj) {
            let orderId = obj.orderId;
            let that = this;
            let item = {
                urlName: "订单详情",
                urlId: "48" + orderId,
                urlPath: "/order/billing/order.vue",
                urlPathName: "/order",
                query:{order : {orderId: orderId, viewType: 1, view:1}},
            }
            that.openTab(item);
        },
    }
}