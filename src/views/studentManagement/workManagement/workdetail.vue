<template>
  <div class="app-container calendar-list-container">
    <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size:25px">作业提交管理</span>
    </div>
    <div class="filter-container">
      <el-date-picker class="filter-item"
        v-model="listQuery.date"
        type="date"
        format="yyyy/M/d"
        placeholder="选择日期时间"
        value-format="yyyy/M/d">
      </el-date-picker>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sclass" :placeholder="tableCol.sclass">
        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 120px;" class="filter-item" placeholder="请输入学号" v-model="listQuery.sid">
      </el-input>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort" :placeholder="tableCol.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
    </div>

    <el-table  :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" prop="date" sortable :label="tableCol.date" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="tableCol.sname">
        <template slot-scope="scope">
          <span>{{scope.row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="tableCol.sclass">
        <template slot-scope="scope">
          <span>{{scope.row.sclass}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.sid" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.sid}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" prop="time" sortable :label="tableCol.time" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" :label="tableCol.status" width="90" :filters="[{ text: '请假', value: '请假' }, { text: '已到', value: '已到' }, { text: '未到', value: '未到' }, { text: '迟到', value: '迟到' }]" :filter-method="filterTaskTag">
        <template slot-scope="scope" >
          <el-tag :type="scope.row.status === '已到' ? 'success' : scope.row.status === '未到' ? 'danger' : scope.row.status === '迟到' ? 'warning' : 'info'">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="tableCol.reason" min-width="95">
        <template slot-scope="scope">
          <el-alert title="" type="info" :closable="false">{{scope.row.reason}}</el-alert>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row.pid)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <!-- <el-form-item :label="tableCol[0]" prop="sid">
          <el-select class="filter-item" v-model="temp.type" placeholder="Please select">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="tableCol.sname" prop="sname">
          <el-input v-model="temp.sname" width="200px"  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.sid" prop="sid">
          <el-input v-model="temp.sid" width="150px"  placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.sclass" prop="sclass">
          <el-select clearable style="width: 90px" class="filter-item" v-model="temp.sclass" :placeholder="tableCol.sclass">
            <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.date" prop="date">
          <el-date-picker
            v-model="temp.date"
            type="date"
            format="yyyy/M/d"
            placeholder="选择日期时间"
            value-format="yyyy/M/d">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="tableCol.time" prop="time">
           <el-time-picker
            v-model="temp.time"
            type="datetime"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="选择时间">
          </el-time-picker>
        </el-form-item>
        <el-form-item :label="tableCol.status" prop="status">
            <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
              <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
        </el-form-item>

        
        <el-form-item :label="tableCol.reason" prop="reason">
         <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="temp.reason">
          </el-input>
        </el-form-item>
        
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
import { fetchListDaily, createParticipation, updateParticipation, deleteParticipation } from '@/api/participation'
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
        date: '日期',
        sid: '学号',
        sname: '姓名',
        ssex: '性别',
        sclass: '班级',
        sprofession: '专业',
        time: '时间',
        status: '考勤状态', // 已到、迟到、请假、未到
        reason: '备注',
        sort: '排序方式'
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sid: undefined,
        date: undefined,
        sort: '-id',
        sclass: undefined
      },
      classOptions: ['vue.js', '大数据', 'javaweb'],
      sexOptions: ['男', '女'],
      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],
      courseOptions: ['前端', '后端'],
      statusOptions: ['已到', '迟到', '请假', '未到'],
      showReviewer: false,
      temp: {
        sid: undefined,
        sname: undefined,
        ssex: undefined,
        sclass: undefined,
        sprofession: undefined,
        time: undefined,
        status: undefined, // 已到、迟到、请假、未到
        reason: undefined,
        date: undefined
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
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }

  },
  created() {
    this.getList()
    console.log(this.list)
  },
  methods: {
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
      fetchListDaily(this.listQuery).then(response => {
        this.list = response.data.items
        console.log(response.data.items)
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
        sid: undefined,
        sname: undefined,
        ssex: undefined,
        sclass: undefined,
        sprofession: undefined,
        status: undefined, // 已到、迟到、请假、未到
        reason: undefined,
        time: undefined,
        date: undefined
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
      this.temp = Object.assign({}, row) // copy obj
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
          updateParticipation(tempData).then(() => {
            for (const v of this.list) {
              if (v.pid === this.temp.pid) {
                const index = this.list.indexOf(v)
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
