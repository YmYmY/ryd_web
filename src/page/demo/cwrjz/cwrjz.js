import {
  head,
  data
} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
  name: 'list',
  props:['openTab'],
  data() {
    return {
      //table组件数据
      head,
      head2: head,
      tableData: data.items,
      //筛选条件model
      obj: {
        name: 1
      },
      time: "",
      date: "",
      datetime: "2019-11-22 15:30:04",
      daterange: "",
      inputvalue: "12321",
      //选择框数据
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
      tabs:[
        {
          name:"运单信息",
          num:3000,
          active:true
        },
        {
          name:"配载信息",
          num:343,
        },
        {
          name:"操作日志",
          num:123,
        }
      ],
      dialogFormVisible:false,
      imgList:[
        {name:"img1"},
      ],
      dialogTableShow:false,
      dialogScheduleShow:false,
    }
  },
  mounted() {
    this.doQuery();
  },
  components: {
    tableCommon,
  },
  methods: {
    doQuery() {
      this.$refs.table.load('api/sysUserBO.ajax?cmd=doQuerySysUserRegion', {regionId: 1,regionGrade: 0}, function (data) {
        console.log(data);
      })
    },
    opentab(){
      let item = {
          urlName: "新增角色",
          urlId: new Date().getTime(),
          urlPath: "/demo/addfee/addfee.vue",
          urlPathName: "/addfee",
          query:{name: "dx", age: 18},
      }
      this.$emit('openTab', item);
    },
    downFile(){
      this.common.downloadFile('/static/excel/store.xlsx');
    },
    closetab(){
      this.$emit('closeTab', this.$route.meta.id);
    },
    changeSel(data){
      console.log(data);
    },
    getData(){
      console.log(this.inputvalue)
    },
    selectCallback(tab){
      console.log(tab);
    },
    showDialog(){
      this.dialogFormVisible = true
    },
    successCallback(){
      let name = "img"+(this.imgList.length+1);
      this.imgList.unshift({name});
    },
    downloadExcelFile(){
      this.common.downloadExcelFile('api/commonExportBO.ajax?cmd=downloadExcelFile');
    },
    dialogTable(){
      this.dialogTableShow = true;
    },
    dialogSchedule(){
      this.dialogScheduleShow = true;
    }
  }
}