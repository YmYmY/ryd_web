import myFileModel from '@/components/myFileModel/myFileModel.vue'
import areaMatch from '@/components/areaMatch/areaMatch.vue'
import mycity from '@/components/mycity/mycity.vue'

export default {
    name: 'addcontent',
    data() {
        return {
            typeSelect: [],
            checkList:[],
            areaList:[
                {
                    name:"地址1",
                    id:1
                },
                {
                    name:"地址2",
                    id:2
                }
            ],
            defaultAreaoptions:[],
            showDefaultArea:false,
            inputvalue:"",
            imageUrl:"",
            daterange:"",
            radio:"1",
            selectType:3,
            disabled:true,
            checked:false
        }
    },
    methods:{
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        getCheckList(){
            console.log(this.checkList);
            if(this.checkList.length>1){
                this.showDefaultArea=true;
            }else{
                this.showDefaultArea=false;
            }
        },
        getAreaInfo(){
            console.log(this.$refs.city.getData());
            this.$refs.city.initData(provinceId, cityId, districtId, streetId)
        },
        doSomeThing(){
            this.$refs.city.cleanData();
        }
    },
    components:{
        myFileModel,
        areaMatch,
        mycity
    }
}