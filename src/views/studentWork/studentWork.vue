<template>
  <div class="dashboard-editor-container">
    
    <el-row :gutter="20">
      <el-col>
          <el-card style="font-size:20px">
            <div slot="header" class="clearfix">
              <span><svg-icon icon-class="form" />&nbsp;学生作业</span>
            </div>
            <el-table :data="taskData" style="width:94%;margin:0px auto;font-size:16px" :row-class-name="tableRowClassName">
                  <el-table-column label="作业" >
                    <template slot-scope="scope">
                        <span>{{scope.row.title}}</span>&nbsp;
                        <el-button type="primary" plain size="mini" @click="openTaskDetail(scope.row)">{{'详情'}}</el-button>
                    </template> 
                  </el-table-column>
                  <el-table-column label="开始时间" width="200" align="center"> 
                    <template slot-scope="scope">
                      <el-alert :title="scope.row.startTime" type="info" :closable="false"></el-alert>
                    </template>      
                  </el-table-column>
                  <el-table-column label="截止时间" width="200" align="center"> 
                    <template slot-scope="scope">
                      <el-alert :title="scope.row.endTime" type="info" :closable="false"></el-alert>
                    </template>      
                  </el-table-column>
                  <el-table-column label="提交状态" prop="submitStatus" width="120" align="center" :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]" :filter-method="filterTaskTag">
                    <template slot-scope="scope">
                        <el-button :type="scope.row.submitStatus === '已提交' ? 'success' : 'warning'" @click="openUploadTask(scope.row)">{{scope.row.submitStatus}}</el-button>
                    </template>   
                  </el-table-column>
                </el-table>
          </el-card>
      </el-col>
    </el-row>
    <el-dialog title="提交任务" :visible.sync="uploadTask" width="420px" center>
      <el-upload
          ref="upload"
          action="https://upload.qiniup.com"
          multiple
          :auto-upload="false"
          :data="uptoken"
          :file-list="fileList"
          :on-success="handleUploadSuccess" 
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
       <el-row :gutter="20" v-if="fileList1!==undefined">
        <el-col :span="5"><div class="taskDetail-left">附件:</div></el-col>
        <el-col :span="17">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :file-list="fileList1">
            </el-upload>
          </el-col>
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
import { getAllInfoBySid, updateStudentWork } from '@/api/studentwork'
import { getCurrentUser } from '@/api/user'
import { getToken } from '@/api/qiniu'

export default {

  data() {
    return {
      taskData: [],
      activeNames: ['1'],
      temp: null,
      fileList: null,
      taskTitle: null,
      taskAuthor: null,
      taskFinishedTime: null,
      taskDetailText: null,
      uploadTask: false,
      taskDetail: false,
      sid: null,
      fileList1: null,
      uptoken: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    show() {
      console.log(this.fileList)
      console.log(this.temp)
    },
    beforeUpload() {
      return getToken().then(response => {
        this.uptoken = {
          token: response.data.upToken
        }
      })
    },
    handleRemove(file, fileList) {
      this.fileList1 = JSON.stringify(fileList)
    },
    handleUploadSuccess(response, file, fileList) {
      // p6k20rdt2.bkt.clouddn.com/FoiCdTJ3kxLZGCICyUZn7VlV9DiF?attname=123.exe
      // 获取文件名 file.name  获取hash值 response.key
      file.url = global.downloadhost + response.key + '?attname' + file.name
      this.fileList = fileList
    },
    handlePreview(file) {
      window.open(file.url)
    },
    getList() {
      getCurrentUser().then(response => {
        this.sid = response.data.user.sid

        getAllInfoBySid({ sid: this.sid }).then(response => {
          this.taskData = response.data.items
          console.log(response.data)
        })
      })
    },
    filterTaskTag(value, row) {
      return row.submitStatus === value
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.submitStatus === '已提交') {
        return 'success-row'
      }
      return ''
    },

    openTaskDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.taskTitle = this.temp.title
      this.taskAuthor = this.temp.author
      this.taskFinishedTime = this.temp.endTime
      this.taskDetailText = this.temp.content
      this.fileList1 = JSON.parse(this.temp.teaFileList)
      if (this.fileList1 === null) {
        this.fileList1 = undefined
      }
      this.taskDetail = true
    },
    closeTaskDetail() {
      this.taskDetail = false
    },

    openUploadTask(row) {
      debugger
      this.temp = Object.assign({}, row) // copy obj
      if (this.temp.stuFileList !== undefined && this.temp.stuFileList !== '' && this.temp.stuFileList !== 'null' && this.temp.stuFileList !== null) {
        this.fileList = JSON.parse(this.temp.stuFileList)
      } else {
        this.fileList = undefined
      }

      // this.fileList = JSON.parse(this.temp.stuFileList)
      this.uploadTask = true
    },
    removeFile(files, fileList) {
      this.fileList = JSON.stringify(fileList)
    },
    closeUploadTask() {
      this.temp.stuFileList = JSON.stringify(this.fileList)
      if (this.temp.stuFileList != null) {
        this.temp.submitstatus = '已提交'
      } else {
        this.temp.submitstatus = '未提交'
      }
      this.temp.filelist = this.temp.stuFileList
      updateStudentWork(this.temp).then(res => {
        const data = res.data
        if (data.data === 'success') {
          this.getList()
          this.$notify({
            title: '成功',
            message: '上传成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: '上传失败',
            type: 'error',
            duration: 2000
          })
        }
      })
      // for (const v of this.taskData) {
      //   if (v.id === this.temp.id) {
      //     if (this.fileList !== '') {
      //       v.submitStatus = '已提交'
      //       this.$notify({
      //         title: '成功',
      //         message: '上传成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     } else if (this.fileList === '') {
      //       v.submitStatus = '未提交'
      //     }
      //     v.rowFileList = this.fileList
      //     console.log(v)
      //     // updateStudentWork(v).then(res => {

      //     // })
      //   }
      // }
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