import ladderTable from '@/components/ladderTable/ladderTable.vue'
import innerTab from '@/components/innerTab/innerTab.vue'

export default {
    name: 'addfee',
    data(){
        return{
            tabs:[
                {
                    name:"阶梯价",
                    active:true
                },
                {
                    name:"标准价"
                }
            ],
            selVal:''
        }
    },
    mounted(){
        
    },
    methods:{
        selectCallback(tab){

        }
    },
    components:{
        ladderTable,
        innerTab
    }
}