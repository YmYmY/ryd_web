import tree from '@/components/tree/tree.vue'
import {head} from '@/static/json.js'
import tableCommon from "@/components/table/tableCommon.vue"

export default {
    name: 'permission',
    data() {
        return {
            treedata:[],
            head
        }
    },
    mounted(){
        this.queryTreeData();
        this.queryTable();
    },
    components:{
        tree,
        tableCommon
    },
    methods:{
        selectCallBack(item){
            console.log(item);
        },
        queryTreeData(){
            let that = this;
            let url = "api/sysRegionBO.ajax?cmd=getSysRegion";
            this.common.postUrl(url,{},function({items}){
                that.treedata = items;
            })
        },
        queryTable(){
            this.$refs.table.load('api/sysUserBO.ajax?cmd=doQuerySysUserRegion',{regionId:1,regionGrade:0},function(data){
                console.log(data);
            })
        }
    }
}