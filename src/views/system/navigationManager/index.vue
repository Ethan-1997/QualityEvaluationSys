<template style="background-color:#e3e3e3">
<el-row :gutter="22">
    <el-col :span="23">
       <el-row type="flex" class="row-bg" >
         <el-card class="box-card" style="width:80%;margin:0 auto">
            <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-tree 
                      :props='props1'
                      lazy
                      :load="loadNode"
                      @node-click="handleNodeClick"
                      ref="tree"
                      :render-content="renderContent">
                    </el-tree>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div  v-if="temp">
                   <el-form ref="form" :model="temp" label-width="80px">
                      <el-form-item label="标题">
                        <el-input v-model="temp.meta.title"></el-input>
                      </el-form-item>
                      <el-form-item label="路由名字">
                        <el-input v-model="temp.name"></el-input>
                      </el-form-item>
                      <el-form-item label="id">
                        <el-input v-model="temp.id"></el-input>
                      </el-form-item>
                      <el-form-item label="父id">
                        <el-input v-model="temp.pid"></el-input>
                      </el-form-item>
                      <el-form-item label="路径">
                        <el-input v-model="temp.path"></el-input>
                      </el-form-item>
                      <el-form-item label="组件">
                        <el-input v-model="temp.component"></el-input>
                      </el-form-item>
                       <el-form-item label="组件">
                        <el-input v-model="temp.component"></el-input>
                      </el-form-item>
                       <el-form-item label="图标">
                        <el-input v-model="temp.meta.icon"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                          <el-button type="primary" @click="InsertNav">新增</el-button>
                        <el-button>取消</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  </el-col>
         </el-card>
              
       </el-row>
    </el-col>
</el-row>
  
</template>

<script>
import { fetchList } from '@/api/role'
export default {
  data() {
    return ({
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      temp: null,
      new: {
        id: null,
        pid: null,
        gid: null,
        path: null,
        component: null,
        redirect: null,
        name: null,
        meta: {
          title: null,
          icon: null
        }
      },
      tableData: [],
      activeName: 'first'
    }

    )
  },
  methods: {
    InsertNav() {
      this.temp = Object.assign({}, this.new)
    },
    onSubmit() {

    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>标题&nbsp;:&nbsp;{data.meta.title}</span>
        </span>)
    },
    handleNodeClick(data, node) {
      this.temp = data
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        fetchList({ gid: 1, pid: 0 }).then(response => {
          const data = response.data.items
          resolve(data)
          this.tableData = [...this.tableData, ...data]
        })
      } else {
        const temp = this.$refs.tree.getCurrentNode()
        console.log(temp.id)
        fetchList({ gid: 1, pid: temp.id }).then(response => {
          const data = response.data.items
          resolve(data)
        })
      }
    }

  }
}
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node__content{
    height: 40px;
  }
  .el-tabs{
    background-color: white
  }
  .big{
     font-size: 16px;
     font-weight:bold;
  }
  
</style>
