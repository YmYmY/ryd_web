import home from './page/home/home'

export default {
    name: 'app',  
    data(){
      return {
          tabs:[
              {
                  name:"页面一",
                  id:"1",
                  path:'list/list.vue',
                  pahtName:"/list/list"
              },
              {
                  name:"页面二",
                  id:"2",
                  path:"content/content.vue",
                  pahtName:"/content/content"
              },
              {
                  name:"页面3",
                  id:"3",
                  path:"test.vue",
                  pahtName:"/test"
              }
          ]
      }
    },
    methods:{
       add(id){
          this.tabs.forEach((item)=>{
            if(item.id==id){
              this.$router.addRoutes([
                  {
                      path: item.pahtName,
                      name: item.name,
                      component: () => import(`@/page/${item.path}`)
                  }
              ])
              this.$router.push(item.pahtName);
            }
          })
       }
    },
    components:{
        home
    }
}