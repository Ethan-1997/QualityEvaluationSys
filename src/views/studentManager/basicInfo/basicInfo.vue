<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="tableCol.sname" v-model="listQuery.sname">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.Sprofession" :placeholder="tableCol.Sprofession">
        <el-option v-for="item in deptOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
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
      <el-table-column align="center" :label="tableCol.Sno" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.Sno}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" :label="tableCol.Sname">
        <template slot-scope="scope">
          <span>{{scope.row.Sname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50px" :label="tableCol.Ssex">
        <template slot-scope="scope">
         <span>{{scope.row.Ssex}}</span>
        </template>
      </el-table-column>
      <el-table-column width="50px" align="center" :label="tableCol.Sclass">
        <template slot-scope="scope">
          <span>{{scope.row.Sclass}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px"  align="center" :label="tableCol.birth">
        <template slot-scope="scope">
          <span >{{scope.row.birth}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="tableCol.Saddress">
        <template slot-scope="scope">
          <span>{{scope.row.Saddress}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.Sprofession" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.Sprofession}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" :label="tableCol.Stime" width="150">
        <template slot-scope="scope">
          <el-tag>{{scope.row.Stime}}</el-tag>
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
        <el-form-item :label="tableCol.Sname" prop="Sname">
          <el-input v-model="temp.Sname"></el-input>
        </el-form-item>
       
        <el-form-item :label="tableCol.Ssex" prop="Ssex">
           <el-select class="filter-item" v-model="temp.Ssex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.Sclass" prop="Sclass">
           <el-autocomplete
            v-model="temp.Sclass"
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
        <el-form-item :label="tableCol.Saddress" prop="Saddress">
          <el-input v-model="temp.Saddress"></el-input>
        </el-form-item>
         <el-form-item :label="tableCol.Sprofession" prop="Sprofession">
           <el-select class="filter-item" v-model="temp.Sprofession" placeholder="请选择">
            <el-option v-for="item in  deptOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.Stime" prop="Stime">
           <el-date-picker v-model="temp.Stime" format="yyyy年" value-format="yyyy">
           </el-date-picker>
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
import { getStudentData, createStudent, updateStudent } from '@/api/student'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import compare from '@/utils/compare'
import Mock from 'mockjs'
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
        Sno: '学号',
        Sname: '姓名',
        Ssex: '性别',
        Sclass: '班级',
        birth: '生日',
        Saddress: '地址',
        Sprofession: '专业',
        Stime: '入学时间',
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
        Sprofession: undefined,
        order: '+id',
        sclass: undefined
      },
      classOptions: ['101', '102', '103', '104', '105', '106', '107', '108', '109'],
      sexOptions: ['男', '女'],
      deptOptions: ['javaweb', '大数据', '前端工程师'],

      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],

      showReviewer: false,
      temp: {
        Sno: undefined,
        Sname: undefined,
        Ssex: undefined,
        Sclass: undefined,
        birth: undefined,
        Saddress: undefined,
        Sprofession: undefined,
        Stime: undefined
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
      tHeader: ['Sno', 'Sname', 'Ssex', 'Sclass', 'birth', 'Saddress', 'profession', 'Stime']
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
        console.log(this.list)
        console.log(this.tableData)
        console.log(this.list.length)
        let j, len
        for (j = 0, len = this.tableData.length; j < len; j++) {
          this.list.push(this.tableData[j])
        }
        this.list.concat(this.tableData)
        console.log(this.list.length)
      }
    },
    getList() {
      this.listLoading = true
      getStudentData(this.listQuery).then(response => {
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
        Sno: undefined,
        Sname: undefined,
        Ssex: undefined,
        Sclass: undefined,
        birth: undefined,
        Saddress: undefined,
        Sprofession: undefined,
        Stime: undefined
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
          this.temp.Sno = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          this.temp.Simage = Mock.Random.dataImage('200x200', '头像')
          this.temp.studyRate1 = 0
          this.temp.studyRate2 = 0
          this.temp.studyRate3 = 0
          this.temp.developRate1 = 0
          this.temp.developRate2 = 0
          this.temp.developRate3 = 0
          this.temp.daliyRate1 = 0
          this.temp.daliyRate2 = 0
          this.temp.daliyRate3 = 0
          this.temp.remark = ''
          createStudent(this.temp).then(() => {
            console.log('in')
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
    handleDelete(index) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$storage.set('studentlist', this.list)
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
    //     Sprofession: undefined,
    //     stime: undefined
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filterVal = ['Sno', 'Sname', 'Ssex', 'Sclass', 'birth', 'Saddress', 'Sprofession', 'Stime']
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
