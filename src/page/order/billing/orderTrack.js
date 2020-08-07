import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
export default {
    name: 'orderTrack',
    data() {
        return {
            obj: {
                orderId: this.$route.query.order.orderId,
                orderView:"allView",
            },
            showTrackList:true,
            center: {lng: 116.404, lat: 39.915},
            zoom: 15,
            orderTrack:[],
            orderTrackList:[],
        }
    },
    beforeRouteUpdate(){
        this.doQueryOrderTrack();
    },
    mounted() {
        this.doQueryOrderTrack();
    },
    components: {
        tableCommon,
    },
    methods: {
        isShowTrack(){
            this.showTrackList = this.showTrackList ? false:true;
        },
        doQueryOrderTrack:function () {
            let that = this;
            let url = "api/ordOrderInfoBO.ajax?cmd=queryOrderInfoDetail";
            that.common.postUrl(url,that.obj,function (data) {
                that.orderTrackList = data.tracks;
                console.log("that.orderTrackList>>>>>>>>>>>>>>>>>>>>");
                console.log( that.orderTrackList);
                if(that.orderTrackList.length > 0){
                    that.changeTab(that.orderTrackList[0]);
                }
            })
        },
        changeTab(tab){
            for(let i in this.orderTrackList){
                this.orderTrackList[i].active = false;
            }
            tab.active = true;
            this.orderTrack = tab.track;
        },
    },
}