import tree from '@/components/tree/tree.vue'
import {head} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'sysRegion',
    data() {
        return {
            treedata:[],
            head :[
                {"name":"登录手机","code":"userLogin","width":"110","type" : "text"},
                {"name":"员工姓名","code":"userName","width":"100","type" : "text"},
                {"name":"所属区域","code":"regionName","width":"100","type" : "text"},
                {"name":"职位","code":"userPosition","width":"100","type" : "text"},
                {"name":"创建时间","code":"createDate","width":"100","type" : "text"}
            ],
            obj:{
                regionId:-1,
                regionGrade:0
            },
            tenantName:null,
            currentItem:[],
            baseUser:[],

        }
    },
    //进入页面
    beforeRouteEnter(to,from,next){
        next(that => {
            //调用刷新方法
            that.queryTreeData();
            that.queryTable();
            that.getBaseUser();
        });
    },
    components:{
        tree,
        tableCommon
    },
    methods:{
        downloadExcelFile:function(){
            this.$refs.table.downloadExcelFile();
        },
        getBaseUser:function(){
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getBaseUser",{},function (data) {
                that.baseUser = data;
                that.tenantName = that.common.getCookie("tenantName");
            })
        },
         queryTreeData:function(){
            let that = this;
             that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegion",{},function (data) {
                 that.treedata = data.items;
                 that.$refs.tree.resetTree(that.treedata);
             })
        },
        selectCallBack(data){
            let that = this;
            that.obj.regionId=data.regionId;
            that.obj.regionGrade=data.regionGrade;
            that.queryTable();
        },
        hoverItem(data){
            this.currentItem = data;
        },
        queryTable(){
            let that = this;
            that.$refs.table.load('api/sysUserBO.ajax?cmd=doQuerySysUserRegion',that.obj);
        },
        addSysRegion:function () {
            let that = this;
            let item = {
                urlName: "新增区域",
                urlId: "8" + new Date().getTime(),
                urlPath: "/sys/addSysRegion.vue",
                urlPathName: "/addSysRegion",
                query: {}
            }
            that.$emit('openTab', item);
        },
        //审核
        review:function (object,type) {
            let that = this;
            if(object.regionStatus == 1 && type == 3){
                that.rms = "确认审核通过该区域？"
            }
            if(object.regionStatus == 1 && type == 2){
                that.rms = "确认拒绝审核通过该区域？"
            }
            if(type == 4){
                that.rms = "确认禁用该区域？"
            }
            object.type = type;
            that.$confirm(that.rms, '确认执行操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysRegionBO.ajax?cmd=reviewSysRegion";
                that.common.postUrl(url,object,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.queryTreeData();
                        that.queryTable();
                        that.$message({
                            type: 'success',
                            message: "操作成功"
                        });
                    }
                });
            });
        },
        modify:function (data) {
            let that = this;
            let item = {
                urlName: "修改区域",
                urlId: "8" + new Date().getTime(),
                urlPath: "/sys/updateSysRegion.vue",
                urlPathName: "/updateSysRegion",
                query: {"regionId":data.regionId,createTenantId:data.createTenantId}
            }
            that.$emit('openTab', item);
        },
        dblclickItem:function (data) {
            let that = this;
            if(data.regionId > 0){
                let item = {
                    urlName: "区域详情",
                    urlId: "8" + new Date().getTime(),
                    urlPath: "/sys/sysRegionDetails.vue",
                    urlPathName: "/sysRegionDetails",
                    query: {"regionId":data.regionId,"regionType":data.regionType,"tenantId":data.tenantId,createTenantId:data.createTenantId}
                }
                that.$emit('openTab', item);
            }
        }
    }
}