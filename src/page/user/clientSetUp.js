import clientMenu from '../sys/clientMenu.vue';

export default {
    name: 'clientSetUp',
    data() {
        return {
            obj:{
                userLogin:null,
                userPassword:null,
                payType:"-1",
                oragnizeids:[],
                tenantIds:[],
                tenantOne:-1,
                tenantTwo:-1,
                tenantThree:-1,
                pickType:"-1",
                intervalType:"-1",
                clientGrade:null,
            },
            oragnizeList:[],
            tenantDefList:[],
            payTypeList:[],
            deliveryTypeList:[],
            deliveryList:[],
            tenantId:this.$route.query.tenantId,
            userId:"",
            limitsSetList:[],
            checked:false,
            tenantList:[],
            showPassword:true,
        }
    },
    mounted() {
        this.doQuerySysStaticData();
    },
    components: {
        clientMenu
    },
    methods: {
        isPassword:function(){
            let that = this;
            that.showPassword=false;
            that.obj.userPassword=null;
        },
        //静态数据查询
         async doQuerySysStaticData() {
            let that = this;
            that.common.postUrl("api/sysUserBO.ajax?cmd=getSysUser",{"tenantId":that.tenantId},function (data) {
               if(!that.common.isBlank(data)){
                   that.userId = data.userId;
                   that.obj.userLogin = data.userLogin;
                   that.obj.userPassword = data.userPassword;
                   that.showPassword = true;
               }else {
                   that.showPassword = false;
               }
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysOragnizelevel",{"tenantId":that.tenantId},function (data) {
                that.oragnizeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"PAY_TYPE_CLIENT","hasAll":true},function (data) {
                that.payTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"ORDER_BEGIN_DELIVERY_TYPE","hasAll":true},function (data) {
                that.deliveryTypeList = data.items;
            })
            that.common.postUrl("api/sysStaticDataBO.ajax?cmd=selectSysStaticDataByCodeType",{"codeType":"DELIVERY_TYPE","hasAll":true},function (data) {
                that.deliveryList = data.items;
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefAll",{"attributionType":3},function (data) {
                that.tenantList = that.common.copyObj(data.items);
                that.tenantDefList = data.items;
                that.tenantDefList.unshift({"tenantId":-1,"tenantName":"请选择"});
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantDefDetails",{"tenantId":that.tenantId},function (data) {
                if(that.common.isNotBlank(data.pickType)){
                    that.obj.pickType = data.pickType+"";
                }
                if(that.common.isNotBlank(data.intervalType)){
                    that.obj.intervalType = data.intervalType+"";
                }
                if(that.common.isNotBlank(data.payType)){
                    that.obj.payType = data.payType+"";
                }
                if(that.common.isBlank(data.clientGrade) || data.clientGrade==-1){
                    that.obj.clientGrade = 1;
                }else {
                    that.obj.clientGrade = data.clientGrade;
                }
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantSupplier",{"tenantId":that.tenantId,"supplierGrade":1},function (data) {
                if(!that.common.isBlank(data)){
                    that.obj.tenantOne = data.supplierId;
                }
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantSupplier",{"tenantId":that.tenantId,"supplierGrade":2},function (data) {
                if(!that.common.isBlank(data)){
                    that.obj.tenantTwo = data.supplierId;
                }
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantSupplier",{"tenantId":that.tenantId,"supplierGrade":3},function (data) {
                if(!that.common.isBlank(data)){
                    that.obj.tenantThree = data.supplierId;
                }
            })
            that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantSupplierNe",{"tenantId":that.tenantId},function (data) {
                if(!that.common.isBlank(data)){
                    that.obj.tenantIds = data;
                }
            })
            let oragnizeids = await that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getSysTenantOragnizeOne",{"tenantId":that.tenantId});
            if(oragnizeids.length > 0){
                that.obj.oragnizeids=oragnizeids;
            }
            setTimeout(() => {
                //数据回显
                that.common.postUrl("api/sysTenantDefBO.ajax?cmd=getOragnizeUser",{"tenantId":that.tenantId},function({items}){
                    if(items.length > 0){
                        for(let el of that.limitsSetList){
                            for(let item of items){
                                if(el.parentOragnizeId == item.pId){
                                    el.oragnizeId = item.oragnizeId;
                                    el.userIds = item.userIds.split(",").map(Number);
                                    if(item.allUser==1){
                                        that.$set(el,"selectAll",true);
                                        that.$set(el,"allUser",1);
                                    }
                                    that.oragnizeChange(el.oragnizeId,el)
                                }
                            }
                        }
                    }
                })
            },1000)
        },
        doSave:function () {
            let obj = this.$refs.menu.getSubPageData(); //获取菜单选择信息
            let that = this;
            that.obj.menuOne =obj.menuOne;
            that.obj.menuTwo =obj.menuTwo;
            that.obj.menuThree =obj.menuThree;
            let menuOne = [];
            let menuTwo = [];
            menuOne =JSON.parse(obj.menuOne);
            for(let el of menuOne){
                that.obj.clientGrade=el.clientGrade;
            }
            for(let el of menuOne){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入一级菜单名称！');
                    return;
                }
            }
            menuTwo =JSON.parse(obj.menuTwo);
            for(let el of menuTwo){
                if(that.common.isBlank(el.urlName)){
                    that.$message.error('请输入二级菜单名称！');
                    return;
                }
            }
            if(that.common.isBlank(that.obj.userLogin)){
                that.$message.error('请填写超级管理员登录账号！');
                return;
            }
            if(that.common.isBlank(that.obj.userPassword)){
                that.$message.error('请填写登录密码！');
                return;
            }
            if(!that.common.validatemobile(that.obj.userLogin)){
                that.$message.error('超级管理员登录账号只能是手机号！');
                return;
            }
            for(let el of that.limitsSetList){
                if(that.common.isBlank(el.userIdStr)){
                    that.$message.error('请选择' + el.name + "员工！");
                    return;
                }
            }
            if(!that.showPassword){
                that.obj.isPassword=1;
            }else {
                that.obj.isPassword=2;
            }
            that.$confirm("", '确认该配置？', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let url ="api/sysTenantDefBO.ajax?cmd=clientSetUp";
                that.obj.limitsSetList = that.limitsSetList;
                that.obj.objLength = that.limitsSetList.length;
                that.obj.tenantId = that.tenantId;
                that.obj.userId = that.userId;
                that.common.postUrl(url,that.obj,function (data) {
                    if(data != 'success'){
                        return;
                    }else {
                        that.$message({
                            type: 'success',
                            message: "配置成功！"
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
        async limitSel(data){
            let {oragnizeId,oragnizeName,oragnizeType} = data;
            let {items} = await this.common.postUrl("api/sysOragnizeBO.ajax?cmd=getSysOragnizelevelAll",{oragnizeId})
            this.limitsSetList.push({
                oragnizeList:items, //分布列表
                name:oragnizeName,   
                userArray:[],       //员工列表
                userIds:[],         //选择员工
                oragnizeId:'',      //选择的分部
                oragnizeType,
                parentOragnizeId:oragnizeId,     //父级部门
            });
        },
        async oragnizeChange(id,data){
            let {items} = await this.common.postUrl("api/sysUserBO.ajax?cmd=getAddSysUserTenant",{"oragnizeId":id})
            data.userArray = items;
            let userIds = [];
            items.forEach(el => {
                if(el.userType==2||el.userType==3){
                    userIds.push(el.userId);
                }
            });
            data.userIds = Array.from(new Set([...userIds, ...data.userIds]));
            this.userChange(data)
            this.$forceUpdate();
        },
        userChange(data){
            if(data.userIds.length>0){
                data.userIdStr = data.userIds.toString();
            }else{
                data.userIdStr = ""
            }
        },
        //全选
        selectAllUser(data){
            if(data.selectAll){
                data.allUser = 1;
                data.userIds = [];
                data.userArray.forEach(el => {
                    data.userIds.push(el.userId);
                })
            }else{
                data.allUser = 2;
            }
            this.userChange(data);
        }
    },
    computed:{
        //单独监听部门选择对象
        oragnizeids(){
            return this.obj.oragnizeids;
        }
    },
    watch:{
        //数据权限选择部门操作
        oragnizeids:{
            async handler(n,o){
                let a = new Set(n);
                let b = new Set(o);
                if(n.length>o.length){    //新增
                    let arr = [];
                    if(o.length>0){
                        //数组取差集
                        arr = Array.from(new Set([...a].filter(x => !b.has(x))));
                    }else{
                        arr = n;
                    }
                    let that = this;
                    for(let el of this.oragnizeList){
                        for(let i in arr){
                            if(el.oragnizeId == arr[i]){
                                that.limitSel(el);
                            }
                        }
                    }
                }else{
                    let arr = [];
                    if(n.length>0){
                        arr = Array.from(new Set([...b].filter(x => !a.has(x))));
                    }else{
                        arr = o;
                    }
                    this.limitsSetList.forEach((el,index) => {
                        if(el.parentOragnizeId == arr[0]){
                            this.limitsSetList.splice(index,1);
                        }
                    })
                }
            }
        },
    }
}