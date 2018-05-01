<template>
  <div class="app-container calendar-list-container">
    <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size:25px">学生信息管理</span>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="tableCol.sname" v-model="listQuery.sname">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sdept" :placeholder="tableCol.sdept">
        <el-option v-for="item in deptOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.sclass" :placeholder="tableCol.sclass">
        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort" :placeholder="tableCol.order">
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
      <el-table-column width="100px" align="center" :label="tableCol.sname">
        <template slot-scope="scope">
          <el-tag>{{scope.row.sname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.sdept" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.sdept}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="tableCol.sclass">
        <template slot-scope="scope">
          <span>{{scope.row.sclass}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.sid" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.sid}}</span>
        </template>
      </el-table-column>
      
      <el-table-column width="50px" align="center" :label="tableCol.ssex">
        <template slot-scope="scope">
         <span>{{scope.row.ssex}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px"  align="center" :label="tableCol.birth">
        <template slot-scope="scope">
          <span >{{scope.row.birth}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="tableCol.saddress">
        <template slot-scope="scope">
          <span>{{scope.row.saddress}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="tableCol.stime" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.stime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.operator" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row.sid)">{{$t('table.delete')}}
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
          <el-input v-model="temp.sname"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.sid" prop="sid">
          <el-input v-model="temp.sid"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.ssex" prop="sid">
           <el-select class="filter-item" v-model="temp.ssex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.sclass" prop="sclass">
           <el-autocomplete
            v-model="temp.sclass"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="true"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
         <el-form-item :label="tableCol.birth" prop="birth">
          <el-date-picker v-model="temp.birth"  format="yyyy 年 MM 月 dd 日"  value-format="yyyy-MM-dd" placeholder="请选择生日">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="tableCol.saddress" prop="saddress">
          <el-input v-model="temp.saddress"></el-input>
        </el-form-item>
         <el-form-item :label="tableCol.sdept" prop="sdept">
           <el-select class="filter-item" v-model="temp.sdept" placeholder="请选择">
            <el-option v-for="item in  deptOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.stime" prop="stime">
           <el-date-picker v-model="temp.stime" format="yyyy年" value-format="yyyy">
           </el-date-picker>
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
import { getStudentData, createStudent, updateStudent, deleteStudent } from '@/api/student'
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
        birth: '生日',
        saddress: '地址',
        sdept: '专业',
        stime: '入学时间',
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
        sdept: undefined,
        sort: '+id',
        sclass: undefined
      },
      classOptions: ['vue.js'],
      sexOptions: ['男', '女'],
      deptOptions: ['前端', '后端'],

      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],

      showReviewer: false,
      temp: {
        sid: undefined,
        sname: undefined,
        ssex: undefined,
        sclass: undefined,
        birth: undefined,
        saddress: undefined,
        sdept: undefined,
        stime: undefined
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
      tHeader: ['sid', 'sname', 'ssex', 'sclass', 'birth', 'saddress', 'sdept', 'stime']
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
    querySearch(queryString, cb) {
      const classlist = this.$storage.get('classlist', [])
      const classes = []
      classlist.forEach(element => {
        classes.push({
          'value': element.name
        })
      })
      var results = queryString ? classes.filter(this.createFilter(queryString)) : classes
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
      console.log(this.tableData)
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
          createStudent(data.results[j]).then(res => {
          })
        }
        this.getList()
        this.$message({
          message: '导入成功',
          type: 'success'
        })

        // console.log(this.list)
        // console.log(this.tableData)
        // console.log(this.list.length)
        // let j, len
        // for (j = 0, len = this.tableData.length; j < len; j++) {
        //   this.list.push(this.tableData[j])
        // }
        // this.list.concat(this.tableData)
        // console.log(this.list.length)
      }
    },
    getList() {
      this.listLoading = true
      getStudentData(this.listQuery).then(response => {
        this.list = response.data.items
        console.log(this.list)
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
        birth: undefined,
        saddress: undefined,
        sdept: undefined,
        stime: undefined
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
          createStudent(this.temp).then(res => {
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
          updateStudent(tempData).then(() => {
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
    handleDelete(sid) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStudent({ 'sid': sid }).then(res => {
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
    //     sdept: undefined,
    //     stime: undefined
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['sid', 'sname', 'ssex', 'sclass', 'birth', 'saddress', 'sdept', 'stime']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel(this.tHeader, data, '学生信息')
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
