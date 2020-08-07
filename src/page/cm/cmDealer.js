import {
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'cmDealer',
    data() {
        return {
            //table组件数据
            head :[
                {"name":"经销商编号","code":"dealer_code","width":"150","type" : "text"},
                {"name":"经销商全称","code":"dealer_full_name","width":"100","type" : "text"},
                {"name":"经销商简称","code":"dealer_name","width":"100","type" : "text"},
                {"name":"经销商级别","code":"dealerTypeName","width":"100","type" : "text"},
                {"name":"经销商类别","code":"dealer_nature","width":"100","type" : "text"},
                {"name":"联系人","code":"dealer_people","width":"80","type" : "text"},
                {"name":"联系手机","code":"dealer_phone","width":"80","type" : "text"},
                {"name":"联系座机","code":"dealer_telephone","width":"120","type" : "text"},
                {"name":"加盟商时间","code":"start_create_date","width":"120","type" : "text"},
                {"name":"加盟期限","code":"dateTypeName","width":"120","type" : "text"},
                {"name":"经销商地址","code":"dealer_address","width":"120","type" : "text"}
            ],
            obj:{
                startCreateDate:"",
                dealerType:null,
                dealerFullName:null,
                dealerPhone:null,
            },
            dealerTypeList:[],
        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.doQuerycmDealer();
            that.doQuerySysStaticData();
        });
    },
    components: {
        tableCommon,
        mycity
    },
    methods: {
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        // 跳转到 导入界面
        importOrder(){
            let item = {
                urlName: "经销商信息导入",
                urlId: new Date().getTime(),
                urlPath: "/common/importTemplate/importTemplate.vue",
                urlPathName: "/importOrderTemplate",
                query:{
                    importList : [
                        {bizName:"经销商导入",excelFile:"/static/excel/cmDealer.xlsx",bizCode:"IMP_PRICE_10006",remarks:"经销商导入"},
                    ]
                },
            }
            this.$emit('openTab', item);
        },
        //清空查询条件
        clear:function () {
            let that = this;
            that.obj ={
                startCreateDate:"",
                dealerType:null,
                dealerFullName:null,
                dealerPhone:null,
            }
        },
        doQuerycmDealer:function () {
            let that = this;
            let url = "api/cmDealerBO.ajax?cmd=doQueryCmDealer";
            this.$refs.table.load(url,that.obj);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"STORE_TYPE"},function (data) {
                that.dealerTypeList = data.items;
            })
        },
        //新增
        addCmDealer:function () {
            let that = this;
            let item = {
                urlName: "新增经销商",
                urlId: "64" + new Date().getTime(),
                urlPath: "/cm/addCmDealer.vue",
                urlPathName: "/addCmDealer",
                query:{}
            }
            that.$emit('openTab', item);
        },
        //修改
        updateCmDealer:function () {
            let that = this;
            let selectData = that.$refs.table.getSelectItem();
            if(selectData.length == 0){
                that.$message.error('请选择需要修改的数据！');
                return;
            }
            if(selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            let item = {
                urlName: "修改经销商",
                urlId: "64" + new Date().getTime(),
                urlPath: "/cm/updateCmDealer.vue",
                urlPathName: "/updateCmDealer",
                query:{"dealerId":selectData[0].dealer_id}
            }
            that.$emit('openTab', item);
        },
        //删除
        deleteCmDealer:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要删除的数据！');
                return;
            }
            that.dealerIds="";
            that.selectData.forEach((el,index)=>{
                if(index == that.selectData.length-1){
                    that.dealerIds+=el.dealer_id ;
                }else {
                    that.dealerIds+=el.dealer_id + ",";
                }
            })
            that.$confirm("是否删除！", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.common.postUrl("api/cmDealerBO.ajax?cmd=deleteCmDealer",{"dealerIds": that.dealerIds},function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.doQuerycmDealer();
                        that.$message({
                            type: 'success',
                            message: "删除成功！"
                        });
                    }
                });
            });
        },
    },
}