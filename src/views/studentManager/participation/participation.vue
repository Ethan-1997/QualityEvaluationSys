<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="tableCol.sname" v-model="listQuery.sname">
      </el-input>
      <el-date-picker class="filter-item"
        v-model="listQuery.time"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sclass" :placeholder="tableCol.sclass">
        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
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
      <el-table-column align="center" :label="tableCol.sno" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.sno}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="tableCol.sname">
        <template slot-scope="scope">
          <span>{{scope.row.sname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50px" :label="tableCol.ssex">
        <template slot-scope="scope">
         <span>{{scope.row.ssex}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50px" align="center" :label="tableCol.sclass">
        <template slot-scope="scope">
          <span>{{scope.row.sclass}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.sprofession" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.sprofession}}</span>
        </template>
      </el-table-column>
     <el-table-column align="center" :label="tableCol.time" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.status" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.note" min-width="95">
        <template slot-scope="scope">
          <span>{{scope.row.note}}</span>
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <!-- <el-form-item :label="tableCol[0]" prop="sno">
          <el-select class="filter-item" v-model="temp.type" placeholder="Please select">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="tableCol.sname" prop="sname">
          <el-input v-model="temp.sname"></el-input>
        </el-form-item>
       
        <el-form-item :label="tableCol.ssex" prop="sex">
           <el-select class="filter-item" v-model="temp.ssex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.sclass" prop="sclass">
          <el-input v-model="temp.sclass"></el-input>
        </el-form-item>
        
         <el-form-item :label="tableCol.sprofession" prop="sprofession">
           <el-select class="filter-item" v-model="temp.sprofession" placeholder="请选择">
            <el-option v-for="item in  courseOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
           <el-form-item :label="tableCol.status" prop="status">
            <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
              <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.time" prop="time">
           <el-date-picker
            v-model="temp.time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="tableCol.note" prop="note">
         <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="temp.note">
          </el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
      
    </el-dialog>


  </div>
</template>

<script>
import { createParticipation, updateParticipation, fetchListDaily } from '@/api/participation'
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
        sno: '学号',
        sname: '姓名',
        ssex: '性别',
        sclass: '班级',
        sprofession: '专业',
        time: '考勤时间',
        status: '考勤状态', // 已到、迟到、请假、未到
        note: '备注'
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sname: undefined,
        time: undefined,
        order: '+id',
        sclass: undefined
      },
      classOptions: ['101', '102', '103', '104', '105', '106', '107', '108', '109'],
      sexOptions: ['男', '女'],
      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],
      courseOptions: ['javaweb', '大数据', '云计算'],
      statusOptions: ['已到', '迟到', '请假', '未到'],
      showReviewer: false,
      temp: {
        sno: undefined,
        sname: undefined,
        ssex: undefined,
        sclass: undefined,
        sprofession: undefined,
        time: undefined,
        status: undefined, // 已到、迟到、请假、未到
        note: undefined
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
      // sno: undefined,
      //   sname: undefined,
      //   ssex: undefined,
      //   sclass: undefined,
      //   sprofession: undefined,
      //   time: undefined,
      //   status: undefined, // 已到、迟到、请假、未到
      //   note: undefined
      tHeader: ['sno', 'sname', 'ssex', 'sclass', 'sprofession', 'time', 'status', 'note']
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
      fetchListDaily(this.listQuery).then(response => {
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
        sno: undefined,
        sname: undefined,
        ssex: undefined,
        sclass: undefined,
        sprofession: undefined,
        time: undefined,
        status: undefined, // 已到、迟到、请假、未到
        note: undefined
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
          this.temp.author = 'vue-element-admin'
          createParticipation(this.temp).then(() => {
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
      console.log(this.temp)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // debugger
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateParticipation(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
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
    handleDelete(index) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
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

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['sno', 'sname', 'ssex', 'sclass', 'sprofession', 'time', 'status', 'note']
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
