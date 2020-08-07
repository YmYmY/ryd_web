import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'

export default {
    name: 'addClientIntention',
    data() {
        return {
            operationTypeList:[],
            clientStateList:[],
            salesList:[],
            salesPersonList:[],
            obj:{
                clientName:"",
                clientBrand:"",
                clientBusiness:"",
                storeNum:"",
                regionName:"",
                operationType:"1",
                officeAddress:"",
                supplierName:"",
                clientState:"1",
            },
            linkmanList:[
                {
                    userName:"",
                    userPhone:"",
                    userPosition:""
                }
            ],
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        selectSales:function(){
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getAddSysUserOragnize",{"oragnizeId":that.obj.salesId},function (data) {
                that.salesPersonList = data.items;
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"OPERATION_TYPE"},function (data) {
                that.operationTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"CLIENT_STATE"},function (data) {
                that.clientStateList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=getSysOragnizeList",{"oragnizeType":"2"},function (data) {
                that.salesList = data.items;
            })

        },
        //企业类型发生改变
        selectType:function () {
            let that = this;
            if(that.obj.tenantType == "1"){
                that.obj.showTenant=true;
            }else {
                that.obj.showTenant=false;
            }
        },
        //企业信息保存
        doSave:function () {
            let that = this;
            if(that.common.isBlank(that.obj.clientName)){
                that.$message.error('请填写客户全称！');
                return;
            }
            that.cityOffice =that.$refs.cityOffice.getData()
            that.obj.provinceId = that.cityOffice.ProvinceId;
            that.obj.cityId = that.cityOffice.CityId;
            that.obj.districtId = that.cityOffice.DistrictId;
            that.obj.streetId = that.cityOffice.StreetId;
            if(that.common.isBlank(that.obj.provinceId)){
                that.$message.error('请选择办公区域！');
                return;
            }
            if(that.common.isBlank(that.obj.officeAddress)){
                that.$message.error('请填写办公地址！');
                return;
            }
            that.obj.cardOne = this.$refs.cardOne.getId()
            that.obj.cardTwo = this.$refs.cardTwo.getId()
            that.obj.cardThree = this.$refs.cardThree.getId()
            that.obj.cardFour = this.$refs.cardFour.getId()
            that.obj.cardFives = this.$refs.cardFives.getId()
            that.obj.linkmanList = JSON.stringify(this.linkmanList);
            that.$confirm(that.rms, '是否新增意向客户？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=doSaveClientIntention";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增意向客户成功"
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
        // 添加联系人
        addLinkman(){
            this.linkmanList.push({
                userName:"",
                userPhone:"",
                userPosition:""
            })
        },
        delLinkman(index){
            this.linkmanList.splice(index,1);
        }
    },
    components: {
        myFileModel,
        mycity
    }
}