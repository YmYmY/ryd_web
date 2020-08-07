import myTab from '@/components/myTab/myTab.vue'
import mixin from './mixin.js'
import toMain from './toMainClient.vue'

export default {
    name: 'homeClient',
    mixins: [mixin],
    data() {
        return {
            trackingNum:null,
            trackingNumList:[],
            tenantName:'',
        }
    },
    mounted() {
        this.getTenantName();
        this.getTab();
        this.getSysMenuButton();
        this.getCookie();
    },
    components: {
        myTab,
        toMain
    },
    methods: {
        getTenantName(){
            this.tenantName = this.common.getCookie("tenantName");
        },
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
        doLogout(){
            let that = this;
            that.$confirm(that.rms, '确认退出系统？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url = "api/portalBusiBO.ajax?cmd=doLogout";
                that.common.postUrl(url,{},function (data) {
                    if(data != '0'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "退出成功"
                        });
                        window.location.href = "/loginClient";
                    }
                });
            });
        },
        sysUserDetails(type){
            let that = this;
            that.userId = this.common.getCookie("userId");
            if(type == 1){
                that.urlName = "个人信息";
            }else if(type == 2){
                that.urlName = "修改密码";
            }else {
                that.urlName = "更换手机号";
            }
            let item = {
                urlName: that.urlName,
                urlId: "10" + type,
                urlPath: "/sys/sysUserClientDetails.vue",
                urlPathName: "/sysUserClientDetails",
                query:{"userId":that.userId,type:type}
            }
            that.openTab(item);
        },
    }
}