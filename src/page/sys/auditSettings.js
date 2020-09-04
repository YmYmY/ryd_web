import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import myFileModel from '@/components/myFileModel/myFileModel.vue'

export default {
    name: 'auditSettings',
    data() {
        return {
            orderAudit:"2",
            orderType:"1",
            orderTypeList:[],
            orderSourceList:[],
            orderAttributionList:[],
            shopAudit:"2",
            shopSettlement:"2",
            orderAuditShow:false,
            id:null,
            button:"保存"
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        tableCommon,
        myFileModel
    },
    methods: {
        cancelType:function(){
            let that = this;
            if(that.orderType == "1"){
                that.orderTypeList=[];
                that.orderAttributionList=[];
            }else if(that.orderType == "2"){
                that.orderSourceList=[];
                that.orderAttributionList=[];
            }else if(that.orderType == "3"){
                that.orderTypeList=[];
                that.orderSourceList=[];
            }
        },
        doQuerySysStaticData:function(){
            let that = this;
            let url ="api/auditBO.ajax?cmd=getAuditSettings";
            that.common.postUrl(url,{},function (data) {
                if(!that.common.isBlank(data)){
                    that.id = data.id;
                    that.button="修改";
                    that.orderAudit = data.orderAudit+"";
                    if(that.orderAudit == 1){
                        that.orderAuditShow=true;
                    }else {
                        that.orderAuditShow=false;
                    }
                    that.orderType = data.orderType+"";
                    that.shopAudit = data.shopAudit+"";
                    that.shopSettlement = data.shopSettlement+"";
                    //来源接口对接运单
                    if(data.orderForeign == 1){
                        that.orderSourceList.push("1");
                    }
                    //来源客户端PC端
                    if(data.orderClient == 1){
                        that.orderSourceList.push("4");
                    }
                    //来源客户端小程序
                    if(data.orderApplets == 1){
                        that.orderSourceList.push("3");
                    }
                    //仓库始发
                    if(data.orderWarehouse == 1){
                        that.orderTypeList.push("1");
                    }
                    //任意调拨
                    if(data.orderAllocate == 1){
                        that.orderTypeList.push("2");
                    }
                    //逆向回货
                    if(data.orderReturn == 1){
                        that.orderTypeList.push("3");
                    }
                    //工厂直发
                    if(data.orderDirect == 1){
                        that.orderTypeList.push("4");
                    }
                    //电商云仓
                    if(data.orderYuncang == 1){
                        that.orderTypeList.push("5");
                    }
                    //直营订单
                    if(data.orderMyself == 1){
                        that.orderAttributionList.push("1");
                    }
                    //非直营订单
                    if(data.orderNotmyself == 1){
                        that.orderAttributionList.push("2");
                    }
                }
            });
        },
        doSave:function(){
            let that = this;
            that.obj ={};
            //that.obj.id = that.id;
            that.obj.orderAudit = that.orderAudit;
            that.obj.orderType = that.orderType;
            //来源接口对接运单
            if(that.orderSourceList.indexOf("1") >= 0){
                that.obj.orderForeign =1;
            }else {
                that.obj.orderForeign =2;
            }
            //来源客户端PC端
            if(that.orderSourceList.indexOf("4") >= 0){
                that.obj.orderClient =1;
            }else {
                that.obj.orderClient =2;
            }
            //来源客户端小程序
            if(that.orderSourceList.indexOf("3") >= 0){
                that.obj.orderApplets =1;
            }else {
                that.obj.orderApplets =2;
            }
            //仓库始发
            if(that.orderTypeList.indexOf("1") >= 0){
                that.obj.orderWarehouse =1;
            }else {
                that.obj.orderWarehouse =2;
            }
            //任意调拨
            if(that.orderTypeList.indexOf("2") >= 0){
                that.obj.orderAllocate =1;
            }else {
                that.obj.orderAllocate =2;
            }
            //逆向回货
            if(that.orderTypeList.indexOf("3") >= 0){
                that.obj.orderReturn =1;
            }else {
                that.obj.orderReturn =2;
            }
            //工厂直发
            if(that.orderTypeList.indexOf("4") >= 0){
                that.obj.orderDirect =1;
            }else {
                that.obj.orderDirect =2;
            }
            //电商云仓
            if(that.orderTypeList.indexOf("5") >= 0){
                that.obj.orderYuncang =1;
            }else {
                that.obj.orderYuncang =2;
            }
            //直营订单
            if(that.orderAttributionList.indexOf("1") >= 0){
                that.obj.orderMyself =1;
            }else {
                that.obj.orderMyself =2;
            }
            //非直营订单
            if(that.orderAttributionList.indexOf("1") >= 0){
                that.obj.orderNotmyself =1;
            }else {
                that.obj.orderNotmyself =2;
            }
            that.obj.shopSettlement =that.shopSettlement;
            that.obj.shopAudit =that.shopAudit;
            that.$confirm("", '是否确认操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/auditBO.ajax?cmd=auditSettings";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "操作成功！"
                        });
                        that.$emit('clostToOther', that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        showAudit:function(){
            let that = this;
            if(that.orderAudit == "1"){
                that.orderAuditShow=true;
            }else {
                that.orderAuditShow=false;
            }
        },
    }
}