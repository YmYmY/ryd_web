import axios from 'axios'

export default {
    props:['supportFiles'],
    name: 'myFileModel',
    data() {
        return {
            typeSelect: [],
            inputvalue: "",
            imageUrl: "",   //压缩图路径
            bigImageUrl:"", //大图路径
            postUrl:"",
            haveImg:false,
            imgData:{},
            typeList:{
                img:".gif,.GIF,.jpg,.JPG,.png,.PNG,.jpeg,.JPEG,.ico,.ICO",
                table:".xls,.xlsx,.XLS,.XLSX",
                file:"file"
            },
            type:'',
            isShowBigImg:false,//是否展示大图
        }
    },
    mounted(){
        this.initType();
    },
    methods: {
        initType(){
            if(this.common.isBlank(this.supportFiles) || this.supportFiles=="img"){
                this.type = 'img';
            }else if(this.supportFiles=="table"){
                this.type = 'table';
            }else if(this.supportFiles=="file"){
                this.type = 'file';
            }
        },
        parseUrlParam(orginUrl, paramArray) {
            let paramStr = "";
            if (orginUrl != undefined) {
                let url = orginUrl.substring(orginUrl.lastIndexOf("/")+1);
                let idx = url.indexOf("&");
                 if (idx > 0) {
                     paramStr = url.substring(0, idx);
                     let params = url.substring(idx+1).split("&");
                     for (let i in params) {
                         if (params[i].split("=")[1] !== "null" && params[i].split("=")[1] !== "") {
                             paramArray.push(params[i]);
                         }
                     }
                 } else {
                     paramStr = url;
                 }
            }
            return paramStr;
        },
        handleAvatarSuccess(res, file) {
            
        },
        beforeAvatarUpload(file) {
            if(!this.checkFile(file) && this.type!='file') return
            let fd = new FormData();
            let that = this;
            fd.append('file',file);//传文件
            fd.append('sign',this.common.md5('attach.ajax?cmd=doUpload'+this.common.getCookie("token")));
            //遮罩层
            const mainPopup = document.getElementById("mainPopup");
            mainPopup.style.display = "block";

            axios.post('/api/attach.ajax?cmd=doUpload',fd).then(function(res){
                that.haveImg = true;
                that.imgData = res;
                that.initDate(res.data);
                mainPopup.style.display = "none";//关闭遮罩层
            })
            return false//屏蔽了action的默认上传
        },
        checkFile(file){
            let suffix = file.name.substring(file.name.lastIndexOf('.'),file.name.length);
            if(this.typeList[this.type].indexOf(suffix)>-1){
                return true
            }else{
                if(this.type == 'img'){
                    this.$message.error('请上传图片');
                }else if(this.type == 'table'){
                    this.$message.error('请上传excel文档');
                }
                return false;
            }
        },
        async initDate(flowId){
            if(this.common.isBlank(flowId)) return;
            let url="api/attach.ajax?cmd=doQuery&_GRID_TYPE=jq&flowIds="+flowId;
            let data = await this.common.postUrl(url,"");
            this.imgData.data = data.rows[0].flowId;
            this.imgData.fullPath = data.rows[0].fullPath;
            if(this.common.isNotBlank(this.imgData.fullPath)){
                this.haveImg = true;
            }
            if(this.type == 'img'){
                this.imageUrl = data.rows[0].fullPath;
                //生成大图路径
                let host = this.imageUrl.substring(0,this.imageUrl.lastIndexOf('/'));
                let name = this.imageUrl.substring(this.imageUrl.lastIndexOf('/'),this.imageUrl.length);
                let num = name.indexOf('.');
                this.bigImageUrl = host + name.slice(0,num)+'_big'+name.slice(num,name.length);
            }else if(this.type == 'table'){
                this.imageUrl = 'table'
            }else if(this.type == 'file'){
                this.imageUrl = 'file'
            }
            this.$emit("successCallback",data);
        },
        async delImg(){
            //遮罩层
            const mainPopup = document.getElementById("mainPopup");
            mainPopup.style.display = "block";

            let url="api/attach.ajax?cmd=doDel&flowId="+this.imgData.data;
            await this.common.postUrl(url,"");
            this.haveImg = false;
            this.imageUrl = "";
            mainPopup.style.display = "none";//关闭遮罩层
        },
        clean(){
            this.haveImg = false;
            this.imageUrl = "";
            this.imgData = {};
        },
        visitFile(){
            if(this.type == 'img'){
                this.seeBigImg();
            }else{
                this.common.downloadFile(this.imgData.fullPath)
            }
        },
        seeBigImg(){
            this.isShowBigImg = true;
        },
        hideBigImg(){
            this.isShowBigImg = false;
        },
        getId(){
            return this.imgData.data;
        }
    }
}