
export default {
    name: 'simpleDemo',   //对应页面id，和页面命名，不影响使用，但对应一下比较号
    data(){               //与页面双向绑定的数据
      return{             //return用于组件的数据隔离，请不要漏
        demoText:"这是一个demo"
      }
    },
    mounted(){            //页面渲染完毕运行的方法
        console.log("页面渲染完成了！")
    },
    methods : {            //页面方法的存放位置
        doNext(){
            console.log('我被点击了');
        }
    }
  }