<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.sclass" placeholder="请选择班级">
        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.author" placeholder="请选择老师">
        <el-option v-for="item in authorOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 150px" class="filter-item" v-model="listQuery.status" placeholder="请选择状态">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-upload2" @click="handleDownload">{{$t('table.export')}}</el-button>
      <upload-excel-component class="filter-item" v-waves @on-selected-file='selected'></upload-excel-component>
    </div>

    <el-table  :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" :label="tableCol.id" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" align="center" :label="tableCol.title">
        <template slot-scope="scope">
          <span>{{scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" :label="tableCol.startTime">
        <template slot-scope="scope">
         <span>{{scope.row.startTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" :label="tableCol.endTime">
        <template slot-scope="scope">
          <span>{{scope.row.endTime}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50px"  align="center" :label="tableCol.sclass">
        <template slot-scope="scope">
          <span >{{scope.row.sclass}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50px"  align="center" :label="tableCol.status">
        <template slot-scope="scope">
          <span >{{scope.row.status=='draft'?'草稿':'发布'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" :label="tableCol.author">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.operator" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.$index)">{{$t('table.delete')}}
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
              <el-select class="filter-item" v-model="temp.author" placeholder="请选择">
                <el-option v-for="item in  authorOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="tableCol.status" prop="status">
              <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
                <el-option v-for="item in  statusOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
         
        </el-row>
         <el-row :gutter="20">
           <el-col :span="12">
             <el-form-item :label="tableCol.startTime" prop="startTime">
              <el-date-picker v-model="temp.startTime"  format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item :label="tableCol.endTime" prop="endTime">
              <el-date-picker v-model="temp.endTime"  format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd" placeholder="请选择">
              </el-date-picker>
            </el-form-item>
           </el-col>
         
        </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
             <el-form-item :label="tableCol.annex" prop="annex">
               <el-upload
                    ref="upload"
                    action="https://upload.qiniup.com"
                    multiple
                    :auto-upload="false"
                    :data="uptoken"
                    :file-list="temp.annex"
                    :on-success="handleUploadSuccess"
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
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
      <input type="hidden"  v-model="temp.id"/>
    </el-dialog>

  </div>
</template>

<script>
import { createWork, updateWork, fetchList } from '@/api/work'
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
        id: 'id',
        startTime: '开始时间',
        endTime: '结束时间',
        submitTime: '提交时间',
        history: '历史',
        annex: '附件',
        sclass: '班级',
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
        author: undefined,
        status: undefined,
        order: '+id',
        sclass: undefined,
        course: undefined
      },
      classOptions: ['101', '102', '103', '104', '105', '106', '107', '108', '109'],
      authorOptions: ['王老师', '应老师', '曹老师'],
      statusOptions: [{ label: '草稿', key: 'draft' }, { label: '发布', key: 'published' }],
      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],
      courseOptions: ['javaweb', '大数据', '云计算'],
      showReviewer: false,
      temp: {
        status: 'draft',
        title: undefined, // 文章题目
        content: undefined, // 文章内容
        id: undefined,
        startTime: undefined,
        endTime: undefined,
        submitTime: undefined,
        history: undefined,
        annex: undefined,
        class: undefined,
        author: undefined
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
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      tableData: null,
      tableHeader: null,
      tHeader: ['status', 'title', 'content', 'id', 'startTime', 'endTime', 'submitTime', 'history', 'annex', 'class', 'author']
    }
  },
  created() {
    this.getList()
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
    handleUploadSuccess(response, file, fileList) {
      // p6k20rdt2.bkt.clouddn.com/FoiCdTJ3kxLZGCICyUZn7VlV9DiF?attname=123.exe
      // 获取文件名 file.name  获取hash值 response.key
      file.url = global.downloadhost + response.key + '?attname' + file.name
      this.temp.annex = fileList
      console.log(response, file, fileList)
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
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        let j, len
        for (j = 0, len = this.tableData.length; j < len; j++) {
          this.list.push(this.tableData[j])
        }
        this.list.concat(this.tableData)
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
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
        status: 'draft',
        title: undefined, // 文章题目
        content: undefined, // 文章内容
        id: undefined,
        startTime: undefined,
        endTime: undefined,
        submitTime: undefined,
        history: undefined,
        annex: [],
        class: undefined,
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createWork(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj

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
          updateWork(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
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
    handleDelete(index) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$storage.set('worklist', this.list)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
    //     sclass: undefined,
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
