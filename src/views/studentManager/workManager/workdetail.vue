<template>
  <div class="dashboard-editor-container">
    <el-card>
      <div slot="header">
        <span>ID title teacher</span>
      </div>
      <el-row>
        <el-col>workcontent</el-col>
      </el-row>
      <div>
        <el-table :data="workTable" border style="width: 100%">
            <el-table-column prop="studentID" label="学号" align="center">
              
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
              
            </el-table-column>
            <el-table-column prop="class" label="班级" align="center">

            </el-table-column>
            <el-table-column prop="handoverTime" label="上交时间" align="center">

            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">

            </el-table-column>
          </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workTable: [
        {
          studentID: 101,
          name: '摇滚兔子',
          class: 'vue.js',
          handoverTime: '2018.9.5',
          status: '已交'
        },
        {
          studentID: 101,
          name: '摇滚兔子',
          class: 'vue.js',
          handoverTime: '2018.9.5',
          status: '已交'
        },
        {
          studentID: 101,
          name: '摇滚兔子',
          class: 'vue.js',
          handoverTime: '2018.9.5',
          status: '已交'
        },
        {
          studentID: 101,
          name: '摇滚兔子',
          class: 'vue.js',
          handoverTime: '2018.9.5',
          status: '已交'
        }
      ]
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
