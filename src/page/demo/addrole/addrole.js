let id = 1000;

export default {
    name: 'addrole',
    data() {
        return {
            inputvalue:"",
            data4: [{
                id: 1,
                label: '一级 1',
                children: [{
                  id: 4,
                  label: '二级 1-1',
                  children: [{
                    id: 9,
                    label: '三级 1-1-1'
                  }, {
                    id: 10,
                    label: '三级 1-1-2'
                  }]
                }]
              }, {
                id: 2,
                label: '一级 2',
                children: [{
                  id: 5,
                  label: '二级 2-1'
                }, {
                  id: 6,
                  label: '二级 2-2'
                }]
              }, {
                id: 3,
                label: '一级 3',
                children: [{
                  id: 7,
                  label: '二级 3-1'
                }, {
                  id: 8,
                  label: '二级 3-2'
                }]
              }],
              defaultProps: {
                children: 'children',
                label: 'label'
              },
              addName:''
        }
    },
    mounted() {
      this.$refs.vuetree.setCheckedKeys([5,8]);      
    },
    methods: {
        append(data) {
            let addName = document.getElementById("addName");
            if(addName) addName.value = "";            
            if (!data.children) {
              this.$set(data, 'children', []);
            }
            this.$confirm(`<input id="addName" placeholder="请输入" style="padding:0 10px;height:36px;border: 1px solid #DCDFE6;width:200px;margin:20px auto;border-radius:3px;" />`, '新增权限', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                dangerouslyUseHTMLString: true
            }).then(() =>{
                const newChild = { id: id++, label: document.getElementById("addName").value, children: [] };
                data.children.push(newChild);
            })
        },
    
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
    
        renderContent(h, { node, data, store }) {
            return (
              <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                <span>
                  <span>{node.label}</span>
                </span>
                <span>
                  <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>新增</el-button>
                  <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
              </span>
            );
        },

        getData(){
          console.log(this.$refs.vuetree.getCheckedNodes());  //获取对象
          console.log(this.$refs.vuetree.getCheckedKeys());   //获取id
        }
    }
}