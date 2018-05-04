<template>
  <div class="app-container calendar-list-container">
    <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size:25px">作业发布管理</span>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 180px;" class="filter-item" placeholder="请输标题" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.Cid" placeholder="请选择班级">
        <el-option v-for="item in classOptions" :key="item.cname" :label="item.cname" :value="item.cid">
        </el-option>
      </el-select>
      <el-select clearable style="width: 130px" class="filter-item" v-model="listQuery.author" placeholder="请选择老师">
        <el-option v-for="item in authorOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key":label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>
      <upload-excel-component class="filter-item" v-waves @on-selected-file='selected'></upload-excel-component>
    </div>

    <el-table  :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column width="150px" align="center" :label="tableCol.title">
        <template slot-scope="scope">
          <span>{{scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" :label="tableCol.startTime">
        <template slot-scope="scope">
         <span>{{scope.row.starttime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <el-alert title="" type="info" :closable="false">{{scope.row.content }}</el-alert>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" :label="tableCol.endTime">
        <template slot-scope="scope">
          <span>{{scope.row.endtime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px"  align="center" label="班级">
        <template slot-scope="scope">
          <span >{{scope.row.cname}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px"  align="center"  :label="tableCol.author">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px"  align="center"  label="上交进度">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.submit/scope.row.sum*100" :show-text="false"></el-progress><span>{{scope.row.submit}}/{{scope.row.sum}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row.wid)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog width="850px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 80%; margin-left:50px;'>
         <el-form-item :label="tableCol.title" prop="title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
             <el-form-item :label="tableCol.author" prop="author">
              <el-select class="filter-item" v-model="temp.author" placeholder="请选择老师">
                <el-option v-for="item in  authorOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item :label="tableCol.Cid" prop="Cid">
              <el-select class="filter-item" v-model="temp.cid" placeholder="请选择班级">
                <el-option v-for="item in classOptions" :key="item.cname" :label="item.cname" :value="item.cid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">
           <el-col :span="12">
             <el-form-item :label="tableCol.startTime"  prop="startTime">
              <el-date-picker v-model="temp.starttime" type="datetime"  format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item :label="tableCol.endTime" prop="endTime">
              <el-date-picker v-model="temp.endtime"  type="datetime"  format="yyyy-MM-dd HH:mm:ss"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
           </el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
             <el-form-item :label="tableCol.annex" prop="filelist">
               <el-upload
                    ref="upload"
                    action="https://upload.qiniup.com"
                    multiple
                    :auto-upload="false"
                    :data="uptoken"
                    :file-list="temp.filelist"
                    :on-success="handleUploadSuccess" 
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    >
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="20">
            <el-col :span="24">
             <el-form-item :label="tableCol.content" prop="content">
             <textarea v-model="temp.content" rows="10" cols="80">
             </textarea>
            </el-form-item>
          </el-col>
        </el-row>
      
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { createWorkInfo, updateWorkInfo, fetchWorkInfoList, deleteWorkInfo } from '@/api/work'
import { fetchList } from '@/api/class'
import { getStatisticsByWid } from '@/api/studentwork'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import compare from '@/utils/compare'
import Tinymce from '@/components/Tinymce'
import { getToken } from '@/api/qiniu'
export default {
  name: 'complexTable',
  directives: {
    waves
  },
  components: {
    UploadExcelComponent,
    Tinymce
  },
  data() {
    return {
      uptoken: null,
      // '学号', '姓名', '性别', '班级', '生日', '地址', '系别', '入学时间', '操作', '排序规则'
      tableCol: {
        status: '状态',
        title: '标题', // 文章题目
        content: '内容', // 文章内容
        startTime: '开始时间',
        endTime: '结束时间',
        submitTime: '提交时间',
        history: '历史',
        annex: '附件',
        Cid: '班级',
        author: '作者',
        course: '课程'
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        title: undefined,
        author: undefined,
        status: undefined,
        cid: undefined
      },
      classOptions: null,
      authorOptions: ['王老师', '应老师', '曹老师'],
      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],
      showReviewer: false,
      temp: {
        title: undefined, // 文章题目
        content: undefined, // 文章内容
        startTime: undefined,
        endTime: undefined,
        filelist: undefined,
        cid: undefined,
        cname: undefined,
        author: undefined,
        sum: null,
        submit: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      downloadLoading: false,
      tableData: null,
      tableHeader: null,
      tHeader: ['title', 'starttime', 'content', 'endtime', 'cid', 'cname', 'author'],
      wid: null
    }
  },
  created() {
    this.getList()
    fetchList().then(res => {
      this.classOptions = res.data.items
    })
    // classOptions
  },
  methods: {
    handlePreview(file) {
      window.open(file.url)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    beforeUpload() {
      return getToken().then(response => {
        this.uptoken = {
          token: response.data.upToken
        }
      })
    },
    handleRemove(file, fileList) {
      this.temp.filelist = JSON.stringify(fileList)
    },
    handleUploadSuccess(response, file, fileList) {
      // p6k20rdt2.bkt.clouddn.com/FoiCdTJ3kxLZGCICyUZn7VlV9DiF?attname=123.exe
      // 获取文件名 file.name  获取hash值 response.key
      file.url = global.downloadhost + response.key + '?attname' + file.name
      this.temp.filelist = JSON.stringify(fileList)
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
          createWorkInfo(data.results[j]).then(res => {
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
      fetchWorkInfoList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].filelist = JSON.parse(this.list[i].filelist)
          if (this.list[i].filelist === null) { this.list[i].filelist = undefined }
          this.wid = this.list[i].wid
          getStatisticsByWid({ wid: this.wid }).then(response => {
            this.list[i].submit = response.data.complete
            this.list[i].sum = response.data.total
          })
        }
        console.log(this.list)
      })
    },
    handleFilter() {
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
        title: undefined, // 文章题目
        content: undefined, // 文章内容
        startTime: undefined,
        endTime: undefined,
        filelist: undefined,
        cid: undefined,
        cname: undefined,
        author: undefined
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
          for (let i = 0; i < this.classOptions.length; i++) {
            if (this.classOptions[i].cid === this.temp.cid) {
              this.temp.cname = this.classOptions[i].cname
            }
          }
          console.log(this.temp)
          createWorkInfo(this.temp).then(res => {
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
    handledatail(row) {
      this.$storage.set('workCol', row)
      this.$router.push({ path: '/workdetail/index' })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      console.log(this.temp, row)
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
          for (let i = 0; i < this.classOptions.length; i++) {
            if (this.classOptions[i].cid === this.temp.cid) {
              this.temp.cname = this.classOptions[i].cname
            }
          }
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateWorkInfo(tempData).then(() => {
            for (const v of this.list) {
              if (v.wid === this.temp.wid) {
                const index = this.list.indexOf(v)
                console.log(this.temp)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            console.log(this.list)
          })
        }
      })
    },
    handleDelete(wid) {
      this.$confirm('是否删除该作业?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteWorkInfo({ 'wid': wid }).then(res => {
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
    // sno: undefined,
    //     sname: undefined,
    //     ssex: undefined,
    //     Cid: undefined,
    //     birth: undefined,
    //     saddress: undefined,
    //     sprofession: undefined,
    //     stime: undefined
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const data = this.formatJson(this.tHeader, this.list)
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
