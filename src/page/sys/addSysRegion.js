import myFileModel from '@/components/myFileModel/myFileModel.vue'
import mycity from '@/components/mycity/mycity.vue'

export default {
    name: 'addSysRegion',
    data() {
        return {
           obj:{
               PId:null,
               regionType:null,
               regionName:null,
               regionGrade:null,
               regionPrincipal:null,
               regionPhone:null,
               tenantId:null,
               regionGradeName:null,
               regionProvince:null,
               regionCity:null,
               regionStreet:null,
               cityIds:[],
           },
            regionList:{},
            regionTypeList:{},
            tenantList:{},
            showRegion:false,
            showTenant:false,
            selectType:1,
            regionGrade:null,
            checkAreaList:[],
            areasList:[],
            pId:[],
            checked:false,
            showAreaSet:false,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        //静态数据查询
        doQuerySysStaticData:function () {
            let that = this;
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"REGION_TYPE"},function (data) {
                that.regionTypeList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDef",{},function (data) {
                that.tenantList = data.items;
            })
            that.common.postUrl("api/sysRegionBO.ajax?cmd=getPSysRegionList",{},function (data) {
                that.regionList = data.items;
            })
        },
        //区域类型发生改变
        selectRegion:function () {
            let that = this;
            if(that.obj.regionType == 1){
                that.showRegion=true;
                that.showTenant=false;
            }else {
                that.showRegion=false;
                that.showTenant=true;
            }
        },
        //上级组织发生改成时
        async selectPRegion(){
            let that = this;
            that.sysRegion=null;
            this.regionList.forEach(el=>{
                if(el.regionId==that.obj.PId){
                    that.sysRegion= el;
                }
            })
            if(that.sysRegion.regionGrade == 0){    //最顶层
               that.obj.regionGradeName="一级";
               that.selectType =1;
            }else if (that.sysRegion.regionGrade == 1){     //省级
                that.obj.regionGradeName="二级";
                that.selectType =2;
            }else if(that.sysRegion.regionGrade == 2){      //市级
                that.obj.regionGradeName="三级";
                that.selectType =3;
            }else {
                that.obj.regionGradeName="底层区域"
                that.selectType =3;
            }
            that.obj.regionGrade = that.sysRegion.regionGrade;
            let {items:pCityIds} = await that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionCityList",{"regionId":that.sysRegion.regionId});
            let pId = await that.common.postUrl("api/sysRegionBO.ajax?cmd=getSysRegionCity",{"regionId":that.sysRegion.regionId});
            let cityIds = await that.common.postUrl("api/sysRegionBO.ajax?cmd=hideSysRegionCity",{"cityIds":pId});
            //区域配置逻辑
            let areasList = [];
            for(let el of pCityIds){
                let areaObj = {};
                let id = el.cityId;
                if(id==-1){
                    //顶级区域，查省
                    areaObj.name = that.sysRegion.regionName;
                    let {items} = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectProvince", "");
                    areaObj.children = items;
                    areasList.push(areaObj);
                }else{
                    //省级区域，查市
                    areaObj.name = el.cityName;
                    if(that.selectType == 2){
                        let {items} = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectCity&provinceId=" + id, "");
                        areaObj.children = items;
                        areasList.push(areaObj);
                    }
                    //市级区域，查区县
                    if(that.selectType == 3){
                        let {items} = await this.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectDistrict&cityId=" + id, "");  
                        areaObj.children = items;
                        areasList.push(areaObj);
                    }
                }
            }
            // 移除不可用区域
            areasList.forEach(el => {
                let list = el.children
                for(let index=0;index<list.length;index++){
                    for(let i in cityIds){
                        if(cityIds[i] == list[index].id){
                            el.children.splice(index,1);
                            index--;
                            break;
                        }
                    }
                }
            })
            //生成区域列表
            this.$set(this,"areasList",areasList);
            that.showAreaSet = true;            
        },
        //区域信息保存
         doSave:function () {
            let that = this;
            that.obj.cityIds = that.checkAreaList;
            if(that.common.isBlank(that.obj.PId)){
                that.$message.error('请选择上级组织！');
                return;
            }
            if(that.obj.regionGrade == 3){
                that.$message.error('上级组织是底层区域,无法在添加子区域！');
                return;
            }
            if(that.common.isBlank(that.obj.regionType)){
                that.$message.error('请选择区域类型！');
                return;
            }
             if(that.obj.cityIds.length == 0){
                 that.$message.error('请选择区域配置！');
                 return;
             }
            if(that.obj.regionType == 1){
                if(that.common.isBlank(that.obj.regionName)){
                    that.$message.error('请输入区域名称！');
                    return;
                }
                if(that.common.isBlank(that.obj.regionPrincipal)){
                    that.$message.error('请输入区域负责人！');
                    return;
                }
                if(that.common.isBlank(that.obj.regionPhone)){
                    that.$message.error('请输入联系手机！');
                    return;
                }
                if(!that.common.validatemobile(that.obj.regionPhone)){
                    that.$message.error('请输入正确的联系手机号！');
                    return;
                }
            }
            that.$confirm(that.rms, '是否新增区域？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysRegionBO.ajax?cmd=saveOrUpdateSysRegion";
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "新增区域成功"
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
        dblclickItem:function(currentItem){

        },

    },
    components: {
        myFileModel,
        mycity
    }
}