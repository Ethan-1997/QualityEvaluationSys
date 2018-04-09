<template>
  <div class="dashboard-editor-container">
    
  <el-row :gutter="20">
    <el-col>
        <el-card style="font-size:20px">
          <div slot="header" class="clearfix">
            <span><svg-icon icon-class="form" />&nbsp;每日任务</span>
          </div>
          <el-collapse v-model="activeNames" >
            <el-collapse-item title="2018-02-28" name="1">
              <el-table :data="taskData" style="width:94%;margin:0px auto;font-size:16px" :row-class-name="tableRowClassName" ref="daliyTask">
                <el-table-column align="center" label="序号" width="65"  :index="indexMethod">  
                  <template slot-scope="scope">
                      <span> {{scope.row.id}}</span>
                  </template> 
                </el-table-column>
                <el-table-column label="任务">
                  <template slot-scope="scope">
                      <span>{{scope.row.task}}</span>&nbsp;
                      <el-button type="primary" plain size="mini" @click="openTaskDetail(scope.row)">{{'详情'}}</el-button>
                  </template> 
                </el-table-column>
                <el-table-column label="截止时间" width="200" align="center"> 
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                      <span>{{scope.row.date}}</span>
                  </template>      
                </el-table-column>
                <el-table-column  prop="status" label="提交状态" width="120" align="center" :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]" :filter-method="filterTaskTag">
                  <template slot-scope="scope">
                      <el-button :type="scope.row.status === '已提交' ? 'success' : 'warning'"  @click="openUploadTask(scope.row)">{{scope.row.status}}</el-button>
                  </template>   
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="2018-02-27" name="2">

            </el-collapse-item>
            <el-collapse-item title="2018-02-26" name="3">

            </el-collapse-item>
            <el-collapse-item title="2018-02-25" name="4">

            </el-collapse-item>
            <el-collapse-item title="2018-02-24" name="5">

            </el-collapse-item>
            <el-collapse-item title="2018-02-23" name="6">

            </el-collapse-item>
            <el-collapse-item title="2018-02-22" name="7">

            </el-collapse-item>
            <el-collapse-item title="2018-02-21" name="8">

            </el-collapse-item>
            <el-collapse-item title="2018-02-20" name="9">

            </el-collapse-item>
            <el-collapse-item title="2018-02-19" name="10">

            </el-collapse-item>
            <el-collapse-item title="2018-02-18" name="11">

            </el-collapse-item>
            <el-collapse-item title="2018-02-17" name="12">

            </el-collapse-item>
          </el-collapse>
        </el-card>
    </el-col>
  </el-row>
  <el-dialog title="提交任务" :visible.sync="uploadTask" width="420px" center>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleChange"
      :file-list="fileList"
      drag
      :on-remove="removeFile"
      ref="uploadForm">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="uploadTask = false">取 消</el-button>
      <el-button type="primary" @click="closeUploadTask">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog title="任务详情" :visible.sync="taskDetail" width="50%" left> 
    <el-row :gutter="20">
      <el-col :span="5"><div class="taskDetail-left">标题:</div></el-col>
      <el-col :span="17"><div class="taskDetail-right">{{taskTitle}}</div></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"><div class="taskDetail-left">发布者:</div></el-col>
      <el-col :span="17"><div class="taskDetail-right">{{taskAuthor}}</div></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"><div class="taskDetail-left">截止时间:</div></el-col>
      <el-col :span="17"><div class="taskDetail-right">{{taskFinishedTime}}</div></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="5"><div class="taskDetail-left">任务详情:</div></el-col>
      <el-col :span="17"><div class="taskDetail-right">{{taskDetailText}}</div></el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="taskDetail = false">取 消</el-button>
      <el-button type="primary" @click="closeTaskDetail">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
import { daliyTask } from '@/api/daliyTask'
export default {

  data() {
    return {
      taskData: null,

      activeNames: ['1'],

      temp: null,
      fileList: [],
      taskTitle: null,
      taskAuthor: null,
      taskFinishedTime: null,
      taskDetailText: null,
      uploadTask: false,
      taskDetail: false
    }
  },
  created() {
    this.getTaskData()
  },
  methods: {
    getTaskData() {
      daliyTask().then(response => {
        this.taskData = response.data
      })
    },
    filterTaskTag(value, row) {
      return row.status === value
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.status === '已提交') {
        return 'success-row'
      }
      return ''
    },

    openTaskDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.taskTitle = this.temp.task
      this.taskAuthor = this.temp.author
      this.taskFinishedTime = this.temp.date
      this.taskDetailText = this.temp.detail
      this.taskDetail = true
    },
    closeTaskDetail() {
      this.taskDetail = false
    },

    openUploadTask(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.fileList = this.temp.rowFileList
      this.uploadTask = true
    },
    removeFile(files, fileList) {
      this.fileList = fileList
    },
    closeUploadTask() {
      console.log(this.fileList)
      for (const v of this.taskData) {
        if (v.id === this.temp.id) {
          if (this.fileList.length !== 0) {
            v.status = '已提交'

            this.$notify({
              title: '成功',
              message: '上传成功',
              type: 'success',
              duration: 2000
            })
          } else if (this.fileList.length === 0) {
            v.status = '未提交'
          }
          v.rowFileList = this.fileList
        }
      }
      this.uploadTask = false
    },

    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },

    indexMethod(index) {
      return index + 1
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

  .clearfix{:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }}

  .box-card {
    width:100%;
  }
  .el-collapse-item__header{
    font-size: 18px;
    height:60px;
    line-height: 60px;
  }
  .el-collapse-item__arrow{
    line-height:60px;
  }


  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
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
  .taskDetail-left{
    padding: 2px;
    font-size: 18px;
    float: right;
  }
  .taskDetail-right{
    padding: 2px;
    font-size: 16px;
    float: left;
  }
</style>