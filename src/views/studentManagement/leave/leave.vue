<template>
  <div class="app-container calendar-list-container">
    <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size:25px">请假登记</span>
    </div>
    <div class="filter-container">
      <el-date-picker class="filter-item"
        v-model="listQuery.ltime"
        type="date"
        format="yyyy-MM-dd"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sclass" :placeholder="tableCol.sclass">
        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="tableCol.sid" v-model="listQuery.sid">
      </el-input>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort" :placeholder="tableCol.order">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-upload2" @click="handleDownload">{{$t('table.export')}}</el-button>
      <upload-excel-component class="filter-item" v-waves @on-selected-file='selected'></upload-excel-component>
    </div>

    <el-table  :key='tableKey' :data="list" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center" :label="tableCol.sid" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.sid}}</span>
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
      <el-table-column width="100px"  align="center" :label="tableCol.ltime">
        <template slot-scope="scope">
          <span >{{scope.row.ltime}}</span>
        </template>
      </el-table-column>
        <el-table-column width="100px" align="center" :label="tableCol.lday">
        <template slot-scope="scope">
          <span>{{scope.row.lday}}</span>
        </template>
      </el-table-column>
      <el-table-column  :label="tableCol.lreasion" min-width="95">
        <template slot-scope="scope">
          <el-alert title="" type="info" :closable="false">{{scope.row.lreasion}}</el-alert>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="tableCol.lapprover" width="80">
        <template slot-scope="scope">
          <el-tag>{{scope.row.lapprover}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.operator" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row.lid)">{{$t('table.delete')}}
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
        <el-form-item :label="tableCol.sid" prop="sid">
          <el-input v-model="temp.sid"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.sname" prop="sname">
          <el-input v-model="temp.sname"></el-input>
        </el-form-item>
       
        
        <el-form-item :label="tableCol.sclass" prop="sclass">
          <el-input v-model="temp.sclass"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.lapprover" prop="lapprover">
          <el-input v-model="temp.lapprover"></el-input>
        </el-form-item>
         <el-form-item :label="tableCol.ltime" prop="ltime">
          <el-date-picker v-model="temp.ltime"  format="yyyy-MM-dd" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="tableCol.lday" prop="lday">
          <el-input v-model="temp.lday"></el-input>
        </el-form-item>
         <el-form-item :label="tableCol.lreasion" prop="lreasion">
            <el-input v-model="temp.lreasion"  type="textarea" :autosize="{ minRows: 5, maxRows: 4}"></el-input>
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
import { fetchListLeave, createLeave, updateLeave, deleteLeave } from '@/api/leave'
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
        sid: '学号',
        sname: '姓名',
        ssex: '性别',
        sclass: '班级',
        ltime: '请假时间',
        lday: '天数',
        lreasion: '原因',
        lapprover: '批准人',
        operator: '操作',
        order: '排序规则'
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sname: undefined,
        ltime: undefined,
        order: '+id',
        sclass: undefined
      },
      classOptions: ['vue.js', '大数据', 'javaweb'],
      sexOptions: ['男', '女'],
      deptOptions: ['javaweb', '大数据', '前端工程师'],

      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],

      showReviewer: false,
      temp: {
        sid: undefined,
        sname: undefined,
        ssex: undefined,
        sclass: undefined,
        ltime: undefined,
        lday: undefined,
        lreasion: undefined,
        lapprover: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogPvVisible: false,
      oldtemp: null,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      tableData: null,
      tableHeader: null,
      //  sid: undefined,
      //   sname: undefined,
      //   ssex: undefined,
      //   sclass: undefined,
      //   ltime: undefined,
      //   lday: undefined,
      //   lreasion: undefined,
      //   lapprover: undefined
      tHeader: ['sid', 'sname', 'sclass', 'ltime', 'lday', 'lreasion', 'lapprover']
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
        for (let j = 0; data.results[j] != null; j++) {
          // 去掉导入内容的主键
          createLeave(data.results[j]).then(res => {
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

      fetchListLeave(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        console.log(response.data.items)
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
        ltime: undefined,
        lday: undefined,
        lreasion: undefined,
        lapprover: undefined
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
          createLeave(this.temp).then(res => {
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
          updateLeave(tempData).then(() => {
            for (const v of this.list) {
              if (v.lid === this.temp.lid) {
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
    handleDelete(lid) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLeave({ 'lid': lid }).then(res => {
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
    // sid: undefined,
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
        const filterVal = ['sid', 'sname', 'sclass', 'ltime', 'lday', 'lreasion', 'lapprover']
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
