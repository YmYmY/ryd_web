  import innerTab from "@/components/innerTab/innerTab.vue"
  export default {
    name: 'dbTableDemo2',
    props: ['tableData','head'],
    data() {
      return {
        tabs: [{
            name: "专线物流",
            active: true,
          },
          {
            name: "快递快运",
          }
        ],
        inputValue: "",
        typeSelect: '',

        otherFeeName: '其他费',
        showOtherFeeEdit: false,
      }
    },
    mounted() {
      
    },
    components: {
      innerTab
    },
    methods: {
      selectCallback() {

      },
      editOtherFee(){
        this.showOtherFeeEdit = true;
      },
      sureEditOtherFee(){
        this.showOtherFeeEdit = false;
      },
      goback(){ //返回上一页
        this.$emit("goback",this.tableData)
      }
    }
  }