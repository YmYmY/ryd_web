import myFileModel from '@/components/myFileModel/myFileModel.vue'
import tableCommon from "@/components/table/tableCommon.vue"
import mycity from '@/components/mycity/mycity.vue'
export default {
    name: 'storeDetails',
    data() {
        return {
            head :[
                {"name":"账号归属","code":"userName","width":"110","type" : "text"},
                {"name":"登陆账号","code":"userLogin","width":"100","type" : "text"},
                {"name":"状态","code":"userStatusName","width":"100","type" : "text"},
            ],
            obj:{
                warehouseCode:null,
                warehouseType:"",
                warehouseFullName:null,
                warehouseName:null,
                warehousePeople:null,
                salesName:null,
                manageType:"",
                belongsId:"",
                warehousePhone:null,
                warehouseTelephone:null,
                warehouseArea:null,
                warehouseCost:null,
                warehouseAddress:null,
                userLogin:null,
                userPassword:null,
                userStatus:null,
                regionName:null,
                startCreateDate:null,
                type:1,
            },
            storeTypeList:[],
            manageTypeList:[],
            belongsIdList:[],
            userStatusList:[],
            warehouseId:this.$route.query.warehouseId,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
        this.queryTable();
    },
    methods: {
        queryTable(){
            let that = this;
            that.$refs.table.load('api/sysUserBO.ajax?cmd=doQuerySysUserStore',{"storeId":that.warehouseId});
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        async doQuerySysStaticData () {
            let that = this;
            let data = await that.common.postUrl("api/cmWarehouseBO.ajax?cmd=getCmWarehouse",{"warehouseId":that.warehouseId});
            that.obj = data;
            that.$refs.city.initData(that.obj.provinceId, that.obj.cityId, that.obj.districtId, that.obj.streetId);
            that.obj.warehouseType = data.warehouseType+"";
            that.obj.manageType = data.manageType+"";
            if(!that.common.isBlank(data.startCreateDate)){
                that.obj.startCreateDate = data.startCreateDate.replace(" 00:00:00","");
            }
            if(!that.common.isBlank(data.belongsId)){
                that.obj.belongsId = data.belongsId+"";
            }
            that.obj.warehouseArea = (data.warehouseArea /100).toFixed(2);
            that.obj.warehouseCost = (data.warehouseCost /100).toFixed(2);


            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"STORE_TYPE"},function (data) {
                that.storeTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"MANAGE_TYPE"},function (data) {
                that.manageTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"USER_STATUS"},function (data) {
                that.userStatusList = data.items;
            })
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.storeCode)){
                that.$message.error('请填写门店编码！');
                return;
            }
            if(that.common.isBlank(that.obj.storeType)){
                that.$message.error('请选择门店级别！');
                return;
            }
            if(that.common.isBlank(that.obj.storeFullName)){
                that.$message.error('请填写门店全称！');
                return;
            }
            if(that.common.isBlank(that.obj.storeName)){
                that.$message.error('请填写门店简称！');
                return;
            }
            if(that.common.isBlank(that.obj.manageType)){
                that.$message.error('请选择经营方式！');
                return;
            }
            if(that.common.isBlank(that.obj.manageType)){
                that.$message.error('请选择经营方式！');
                return;
            }
            if(that.common.isBlank(that.obj.regionName)){
                that.$message.error('请填写所选区域！');
                return;
            }
            if(that.common.isBlank(that.obj.storePhone)){
                that.$message.error('请填写联系手机！');
                return;
            }
            if(that.common.isBlank(that.obj.leadershipName)){
                that.$message.error('请填写店长名称！');
                return;
            }
            that.city =that.$refs.city.getData()
            that.obj.provinceId = that.city.ProvinceId;
            that.obj.cityId = that.city.CityId;
            that.obj.districtId = that.city.DistrictId;
            that.obj.streetId = that.city.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择门店地址！');
                return;
            }
            if(that.common.isBlank(that.obj.storeAddress)){
                that.$message.error('请填写详细地址！');
                return;
            }
            if(that.common.isBlank(that.obj.userLogin)){
                that.$message.error('请填写登录账号！');
                return;
            }
            if(that.common.isBlank(that.obj.userPassword)){
                that.$message.error('请填写登录密码！');
                return;
            }
            if(that.common.isBlank(that.obj.userStatus)){
                that.$message.error('请选择状态！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userLogin)){
                that.$message.error('登陆账号只能是手机号！');
                return;
            }
            if(!that.common.validatemobile(that.obj.storePhone)){
                that.$message.error('请输入正确的联系手机号！');
                return;
            }
            that.obj.storeId = that.storeId;
            that.$confirm(that.rms, '是否修改门店？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/customerStoreBO.ajax?cmd=doSaveCustomerStore";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "修改门店成功"
                        });
                        that.$emit('clostToOther',that.$route.meta.id);
                    }
                });
            });
        },
        cancel:function () {
            let that = this;
            that.$emit('clostToOther', that.$route.meta.id);
        },
        updateSysUser:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要操作的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            if(that.selectData[0].userStatus == 1){
                that.userStatus=2;
                that.userId=that.selectData[0].userId;
                that.rms = "确认禁用该员工"
                that.message="禁用成功！"
            }else {
                that.userStatus=1;
                that.userId=that.selectData[0].userId;
                that.rms = "确认启用该员工"
                that.message="启用成功！"
            }
            that.$confirm(that.rms, '是否操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=updateSysUserStore";
                that.common.postUrl(url,{"userId":that.userId,"userStatus":that.userStatus},function (data) {
                    if(data != 'success'){
                        that.$message.error('操作失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: that.message
                        });
                        that.queryTable();
                    }
                });
            });
        },
        updatePassWord:function () {
            let that = this;
            that.selectData = that.$refs.table.getSelectItem();
            if(that.selectData.length == 0){
                that.$message.error('请选择需要操作的数据！');
                return;
            }
            if(that.selectData.length != 1){
                that.$message.error('只能选择一条数据！');
                return;
            }
            that.userId=that.selectData[0].userId;
            that.$confirm("密码将重置成123456,确认此操作？", '是否操作？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysUserBO.ajax?cmd=updatePassWord";
                that.common.postUrl(url,{"userId":that.userId},function (data) {
                    if(data != 'success'){
                        that.$message.error('操作失败！');
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "重置成功"
                        });
                        that.queryTable();
                    }
                });
            });
        },
    },
    components: {
        tableCommon,
        myFileModel,
        mycity
    }
}