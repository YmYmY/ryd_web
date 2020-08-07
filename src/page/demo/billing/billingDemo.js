import ipttable from '@/components/iptTable/iptTable.vue'
import mycity from '@/components/mycity/mycity.vue'
import {head,headFee} from './billingDemoJson.js'

export default {
    name: 'billing',
    data(){
      return{
        head,
        headFee,
        feeData:{},
        //选择框数据静态数据   记得删
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        selectValue: '',
        //选择框数据 end
        //最近联系人静态数据  记得删
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        //最近联系人静态数据  记得删  end

        radioValue:"",
        consignerDdate:"",
        isVisitConsigner:true,
        latelyLinkmanBox:false,
      }
    },
    mounted(){
      this.initFeeData();
    },
    methods:{
      initFeeData(){
        this.headFee.forEach(el => {
          this.$set(this.feeData,el.code,"");
        });
      },
      showlatelyLinkman(){
        this.latelyLinkmanBox = true;
      }
    },
    components:{
        ipttable,
        mycity
    }
}