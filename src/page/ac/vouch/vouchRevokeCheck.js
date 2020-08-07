import {tabs} from './json.js'
import innerTab from "@/components/innerTab/innerTab.vue"
import vouchDetailManager from '@/page/ac/vouch/vouchDetailManager.vue'
import vouchManager from '@/page/ac/vouch/vouchManager.vue'

 export default {
  name: 'vouchRevokeCheck',
  data() {
    return {
      tabs:tabs,
      revokeFlag:true,
      componentName:vouchDetailManager
    }
  },
  mounted() {
  
  },
  methods: {
    selectCallback(data){
      this.tab = data;
      this.componentName = data.router;
   },
   openTab(item){
    this.$emit('openTab', item);
   },
  },
  components: {
    innerTab,
    vouchDetailManager,
    vouchManager
  }
}