<template style="background-color:#e3e3e3">
<el-row :gutter="22">
    <el-col :span="23">
       <el-row type="flex" class="row-bg" >
         <el-card class="box-card" style="width:80%;margin:0 auto">
            <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-radio-group v-model="treeOwner" @change="changeTree">
                        <el-radio :label="1">学生</el-radio>
                        <el-radio :label="2">老师</el-radio>
                      </el-radio-group>
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
                  <div class="grid-content bg-purple-light" v-if="temp">
                     
                      <el-form ref="form" :model="temp" label-width="80px">
                        <el-form-item> <div class="head">{{temp.meta.title}}</div></el-form-item>
                        <el-form-item>
                          
                          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                           
                            <el-checkbox-group  v-model="checkedRoles">
                              <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
                            </el-checkbox-group>
                            <div style="margin: 20px 0;"></div>
                          <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                          </el-form-item>
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
const roleOptions = ['学生', '教师']
export default {
  data() {
    return ({
      props1: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
      treeOwner: 1,
      temp: null,
      isIndeterminate: true,
      checkAll: false,
      checkedRoles: [],
      roles: roleOptions,
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
    changeTree() {
      this.$refs.tree.remo
    },
    InsertNav() {
      this.temp = Object.assign({}, this.new)
    },
    handleCheckAllChange(val) {
      this.checkedRoles = val ? roleOptions : []
      this.isIndeterminate = false
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
        fetchList({ gid: this.treeOwner, pid: 0 }).then(response => {
          const data = response.data.items
          resolve(data)
          this.tableData = [...this.tableData, ...data]
        })
      } else {
        const temp = this.$refs.tree.getCurrentNode()
        console.log(temp.id)
        fetchList({ gid: this.treeOwner, pid: temp.id }).then(response => {
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
  .head{
    font-size: 30px;
  }
  
</style>
