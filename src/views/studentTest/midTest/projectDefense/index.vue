<template>

 <div class="dashboard-editor-container">
  <el-card style="width:85%;margin:0 auto">
    <el-button @click="handleCreate" type="success">新建</el-button>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="title"
        label="项目标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="startAndEndTime[0]"
        label="开始日期">
      </el-table-column>
        <el-table-column
        prop="startAndEndTime[1]"
        label="结束日期">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="项目简介">
      </el-table-column>
       <el-table-column width="200px">
          <template slot-scope="scope">
             <el-button @click="handleClick(scope.row)" type="success">编辑</el-button>
             <el-button type="danger">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </el-card>
 </div>
</template>

<script>
import { fetchList } from '@/api/projectDefense'
export default {
  data() {
    return {
      tableData: null
    }
  },
  created() {
    fetchList().then(response => {
      this.tableData = response.data.items
    })
  },
  methods: {
    handleClick(row) {
      this.$storage.set('row', row)
      this.$storage.set('status', 'update')
      this.$router.push('/projectDefense/detail')
    },
    handleCreate() {
      this.$storage.set('status', 'create')
      this.$router.push('/projectDefense/detail')
    }
  }
}
</script>

<style>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
