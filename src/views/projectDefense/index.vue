<template>
  <el-card style="width:85%;margin:0 auto">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="项目标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="项目日期">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="项目简介">
      </el-table-column>
       <el-table-column>
          <template slot-scope="scope">
             <el-button @click="handleClick(scope.row)" type="success">编辑</el-button>
             <el-button type="danger">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        id: '1',
        startAndEndTime: '2016-05-02',
        introduction: '基于B/S架构的素质评测系统',
        title: '学生综合素质评测系统'
      }]
    }
  },
  methods: {
    handleClick(row) {
      this.$storage.set('row', row)
      this.$router.push('/projectDefense/detail')
    }
  }
}
</script>

<style>

</style>
