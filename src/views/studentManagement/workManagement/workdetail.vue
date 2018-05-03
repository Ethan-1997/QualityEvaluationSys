<template>
  <div class="app-container calendar-list-container">
    <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size:25px">作业提交管理</span>
    </div>
    <div class="filter-container" style="float:left">
      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="请输入标题" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.cname" :placeholder="tableCol.sclass">
        <el-option v-for="item in classOptions" :key="item.cname" :label="item.cname" :value="item.cname">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="请输入学号" v-model="listQuery.sid">
      </el-input>
      <el-select clearable style="width: 120px" class="filter-item" v-model="listQuery.submit" placeholder="提交状态">
        <el-option v-for="item in submitOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort" :placeholder="tableCol.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table  :key='tableKey' :data="allStudentWork" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" prop="title" :label="tableCol.title" width="140px">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="content" :label="tableCol.content">
        <template slot-scope="scope">
          <el-alert :title="scope.row.content" type="info" :closable="false"></el-alert>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" prop="uptime" :label="tableCol.uptime">
        <template slot-scope="scope">
          <span>{{scope.row.uptime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" prop="submitstatus" :label="tableCol.submitstatus">
        <template slot-scope="scope">
          <el-tag :type="scope.row.submitStatus === '已提交' ? 'success' : 'warning'">{{scope.row.submitStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="cname" :label="tableCol.cname" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.cname}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" prop="sname" :label="tableCol.sname" width="100px">
        <template slot-scope="scope">
          <span>{{snamefilters(scope.row.sid)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sid" :label="tableCol.sid" width="100px">
        <template slot-scope="scope" >
          <span>{{scope.row.sid}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fileList" :label="tableCol.fileList" width="100">
        <template slot-scope="scope">
          <el-button type="info" size="mini" :disabled="scope.row.stuFileList === null || scope.row.stuFileList === undefined || scope.row.stuFileList === ''" @click="fileDownload(scope.row.stuFileList)">作业下载</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="grade" :label="tableCol.grade" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.grade===null"  type="primary" size="mini" @click="handleUpdate(scope.row)">点评</el-button>
          <span v-else style="font-size:30px">{{scope.row.grade}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="点评/分数" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row.pid)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>



    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog title="点评" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 80%; margin:100px 0 0 100px;'>
        <template>
          <div>
            <span style="font-size:100px;margin:0 0 100px 0">{{temp.grade}}分</span>
            <el-slider
              v-model="temp.grade">
            </el-slider>
          </div>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
      
    </el-dialog>

    </el-card>


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :file-list="filelist">
            </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createParticipation, deleteParticipation } from '@/api/participation'
import { fetchList } from '@/api/class'
import { getStudentData } from '@/api/student'
import { getAllInfoBySid, updateStudentWork } from '@/api/studentwork'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import compare from '@/utils/compare'

export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      // '学号', '姓名', '性别', '班级', '生日', '地址', '系别', '入学时间', '操作', '排序规则'
      tableCol: {
        title: '作业标题',
        content: '内容',
        submitstatus: '提交状态',
        uptime: '提交时间',
        cname: '班级',
        sname: '姓名',
        sid: '学号',
        fileList: '作业下载',
        grade: '点评/分数',

        date: '日期',
        ssex: '性别',
        sclass: '班级',
        sprofession: '专业',
        time: '时间',
        status: '考勤状态', // 已到、迟到、请假、未到
        reason: '备注',
        sort: '排序方式'
      },
      filelist: null,
      dialogVisible: false,
      studentlength: null,
      studentdata: null,
      allStudentWork: null,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        cname: undefined,
        sid: undefined,
        submit: undefined,
        sort: '-id'
      },
      classOptions: null,
      sexOptions: ['男', '女'],
      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],
      courseOptions: ['前端', '后端'],
      submitOptions: ['已提交', '未提交'],
      statusOptions: ['已到', '迟到', '请假', '未到'],
      showReviewer: false,
      temp: {
        id: undefined,
        wid: undefined,
        sid: undefined,
        uptime: undefined,
        submitStatus: undefined,
        fileList: undefined,
        grade: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      oldtemp: null,
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      tableData: null,
      tableHeader: null,
      // sid: undefined,
      //   sname: undefined,
      //   ssex: undefined,
      //   sclass: undefined,
      //   sprofession: undefined,
      //   time: undefined,
      //   status: undefined, // 已到、迟到、请假、未到
      //   reason: undefined
      tHeader: ['date', 'sname', 'sclass', 'sid', 'time', 'status', 'reason']
    }
  },
  created() {
    this.getList()
    fetchList().then(res => {
      this.classOptions = res.data.items
    })
  },
  methods: {
    handlePreview(file) {
      window.open(file.url)
    },
    handleClose(done) {
      done()
    },
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
      if (!compare(this.tableHeader, this.tHeader)) {
        this.$notify({
          title: '失败',
          message: '导入excel格式不对',
          type: 'failed',
          duration: 2000
        })
      } else {
        for (let j = 0; data.results[j] != null; j++) {
          // 去掉导入内容的主键
          createParticipation(data.results[j]).then(res => {
          })
        }
        this.getList()
        this.$message({
          message: '导入成功',
          type: 'success'
        })
      }
    },
    getList() {
      this.listLoading = true
      getStudentData().then(response => {
        this.studentdata = response.data.items
        this.studentlength = response.data.total
        console.log(this.studentlength)
        getAllInfoBySid(this.listQuery).then(response => {
          this.allStudentWork = response.data.items
          console.log(this.allStudentWork)
          this.listLoading = false
        })
      })
    },
    fileDownload(fileList) {
      console.log(fileList)
      this.dialogVisible = true
      if (fileList === null || fileList === undefined || fileList === '') {
        this.filelist = undefined
      } else {
        this.filelist = JSON.parse(fileList)
      }

      console.log(this.filelist)
    },
    snamefilters(sid) {
      for (let i = 0; i < this.studentlength; i++) {
        console.log(this.studentdata[i].sid)
        if (this.studentdata[i].sid === sid) {
          return this.studentdata[i].sname
        }
      }
    },
    handleFilter() {
      console.log(this.listQuery)
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        wid: undefined,
        sid: undefined,
        uptime: undefined,
        submitStatus: undefined,
        fileList: undefined,
        grade: 0
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createParticipation(this.temp).then(res => {
            if (res.data.data === 'success') {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp.id = row.id
      this.temp.wid = row.wid
      this.temp.sid = row.sid
      this.temp.uptime = row.uptime
      this.temp.submitStatus = row.submitStatus
      this.temp.fileList = row.fileList
      this.temp.grade = 0
      console.log(this.temp)
      this.oldtemp = row
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateStudentWork(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '点评成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(pid) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteParticipation({ 'pid': pid }).then(res => {
          if (res.data.data === 'success') {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    filterTaskTag(value, row) {
      return row.status === value
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['date', 'sname', 'sclass', 'sid', 'time', 'status', 'reason']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel(this.tHeader, data, 'table-list')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
