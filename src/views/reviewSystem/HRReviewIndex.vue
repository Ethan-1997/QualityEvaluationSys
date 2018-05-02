<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div slot="header">
            <span style="font-size:25px">学中综合评定</span>
          </div>
          <el-table :data="reviewTable" border style="width: 100%">
            <el-table-column prop="name" width="200px" label="班级" align="center">
              <template slot-scope="scope">
                <el-alert title="" type="success" center :closable="false">{{scope.row.name}}</el-alert>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="人数" align="center">
              <template slot-scope="scope">
                <el-alert title="" type="info" center :closable="false">{{scope.row.number}}</el-alert>
              </template>
            </el-table-column>
            <el-table-column prop="routerButton" width="150px" label="评定" align="center">
              <template slot-scope="scope">
                <el-button @click="goToDeatil(scope.row)" type="primary">综合评定</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reviewTable: [
        {
          name: 'vue.js',
          number: 10,
          routerButton: 'router'
        }
      ]
    }
  },
  methods: {
    goToDeatil(row) {
      this.$router.push({ name: 'midTeacherReview' })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
