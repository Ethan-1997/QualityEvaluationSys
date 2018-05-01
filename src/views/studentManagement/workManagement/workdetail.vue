<template>
  <div class="dashboard-editor-container">
    <el-card>
      <div slot="header">
        <div slot="header" style="font-size:25px">作业提交详情<el-button style="float: right; padding: 3px 0;font-size:18px" type="text" @click="goToWorkManagement">返回作业管理</el-button></div>
        
      </div>
      <el-card>
        <div>
          <el-row>
            <el-col :span="4" class="title">标题：</el-col>
            <el-col :span="20">{{workCol.title}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="title">发布老师：</el-col>
            <el-col :span="20">{{workCol.author}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="title">作业内容：</el-col>
            <el-col :span="20">{{workCol.content}}</el-col>
          </el-row>
        </div>
      </el-card>
      <el-card style="margin:10px 0 0 0">
        <div style="margin-top:20px">


          <div class="filter-container" style="float:right">
            <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.Cid" placeholder="请选择班级">
              <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
            <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="学号" v-model="listQuery.Sid">
            </el-input>
            <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="学号" v-model="listQuery.Sname">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search">{{$t('table.search')}}</el-button>
          </div>


          <el-table :data="workTable" border style="width: 100%">
              <el-table-column prop="Cname" label="班级" width="120px" align="center">

              </el-table-column>
              <el-table-column prop="Sid" label="学号" width="100px" align="center">
                
              </el-table-column>
              <el-table-column prop="Sname" label="姓名" width="120px" align="center">
                
              </el-table-column>
              <el-table-column prop="submitTime" label="上交时间" align="center">

              </el-table-column>
              <el-table-column prop="submitStatus" label="状态" width="80px" align="center" :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]" :filter-method="filterTaskTag">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.submitStatus === '已提交' ? 'success' : 'warning'">{{scope.row.submitStatus}}</el-tag>
                </template>   
              </el-table-column>
              <el-table-column prop="grade" label="成绩" width="80px" align="center">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.grade >= 80 ? 'primary' : scope.row.grade >= 60 ? 'warning' :  scope.row.grade >= 0 ? 'danger': null">{{scope.row.grade}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="submitStatus" label="操作"  width="200px" align="center">
                <template slot-scope="scope">
                  <el-button type="info" size="mini" icon="el-icon-upload2" :disabled="scope.row.submitStatus === '未提交'">作业导出</el-button>
                  <el-button type="primary" size="mini"  @click="handleUpdate(scope.row)">评分</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </el-card>
    </el-card>
        <el-dialog width="450px" title="评分" :visible.sync="dialogFormVisible">
          <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 80%; margin-left:50px;'>
            <el-form-item label="成绩">
              <el-input-number v-model="temp.grade" controls-position="right" size="large" :min="0" :max="100"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="updateData">确认</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workCol: null,
      dialogFormVisible: false,
      temp: {
        Cid: null,
        Wid: null,
        grade: 0
      },
      listQuery: {
        page: 1,
        limit: 20,
        Sid: undefined,
        Sname: undefined,
        Cid: undefined,
        Wid: undefined,
        order: '+id'
      },
      classOptions: ['101', '102', '103', '104', '105', '106', '107', '108', '109'],
      workTable: [
        {
          Sid: 101,
          Sname: '摇滚兔子',
          Cname: 'vue.js',
          submitTime: '2018.9.5',
          grade: 80,
          submitStatus: '已提交'
        },
        {
          Sid: 101,
          Sname: '摇滚兔子',
          Cname: 'vue.js',
          submitTime: '2018.9.5',
          grade: 80,
          submitStatus: '已提交'
        },
        {
          Sid: 101,
          Sname: '摇滚兔子',
          Cname: 'vue.js',
          submitTime: '2018.9.5',
          grade: 80,
          submitStatus: '已提交'
        },
        {
          Sid: 101,
          Sname: '摇滚兔子',
          Cname: 'vue.js',
          submitTime: null,
          submitStatus: '未提交'
        }
      ]
    }
  },
  methods: {
    goToWorkManagement() {
      this.$router.push({ name: 'workManagement' })
    },
    filterTaskTag(value, row) {
      return row.submitStatus === value
    },
    handleUpdate(row) {
      // this.temp = Object.assign({}, row) // copy obj

      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
.title{
  font-weight:bold;
  font-size:18px
}
</style>
