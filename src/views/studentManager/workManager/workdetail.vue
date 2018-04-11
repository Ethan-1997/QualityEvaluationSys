<template>
  <div class="dashboard-editor-container">
    <el-card>
      <div slot="header">
        <div slot="header" style="font-size:25px">作业提交详情</div>
      </div>
      <el-card>
        <div>
          <el-row>
            <el-col :span="2">作业ID：</el-col>
            <el-col :span="21">{{workCol.id}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="2">标题：</el-col>
            <el-col :span="21">{{workCol.title}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="2">发布老师：</el-col>
            <el-col :span="21">{{workCol.author}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="2">作业内容：</el-col>
            <el-col :span="21">{{workCol.content}}</el-col>
          </el-row>
        </div>
      </el-card>
      <div style="margin-top:20px">
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
      workCol: null,
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
  },
  created() {
    this.workCol = this.$storage.get('workCol')
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
