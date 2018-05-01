<template>
  <div class="app-container calendar-list-container">
    <el-card>
    <div slot="header" class="clearfix">
      <span style="font-size:25px">突出表现管理</span>
    </div>
    <div class="filter-container">
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.Sclass" :placeholder="tableCol.Sclass">
        <el-option v-for="item in classOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" :placeholder="tableCol.Sname" v-model="listQuery.Sname">
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
      <el-table-column align="center" :label="tableCol.Sid" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.Sid}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="tableCol.Sname">
        <template slot-scope="scope">
          <span>{{scope.row.Sname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="tableCol.Sclass">
        <template slot-scope="scope">
          <span>{{scope.row.Sclass}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="tableCol.time" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" :label="tableCol.title">
        <template slot-scope="scope">
          <el-alert type="success" :closable="false">{{scope.row.title}}</el-alert>
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
        <!-- <el-form-item :label="tableCol[0]" prop="Sid">
          <el-select class="filter-item" v-model="temp.type" placeholder="Please select">
            <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="tableCol.Sname" prop="Sname">
          <el-input v-model="temp.Sname"></el-input>
        </el-form-item>
       
        <el-form-item :label="tableCol.ssex" prop="sex">
           <el-select class="filter-item" v-model="temp.ssex" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="tableCol.Sclass" prop="Sclass">
          <el-input v-model="temp.Sclass"></el-input>
        </el-form-item>
         <el-form-item :label="tableCol.time" prop="time">
          <el-date-picker v-model="temp.time"  format="yyyy-MM-dd"  placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="tableCol.title" prop="title">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item :label="tableCol.content" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 6}"
            placeholder="请输入内容"
            v-model="temp.content">
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
import { fetchListHighLight } from '@/api/highlighting'
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
        Sid: '学号',
        Sname: '姓名',
        ssex: '性别',
        Sclass: '班级',
        title: '标题',
        content: '突出表现',
        time: '时间',
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
        Sname: undefined,
        order: '+id',
        Sclass: undefined
      },
      classOptions: ['101', '102', '103', '104', '105', '106', '107', '108', '109'],
      sexOptions: ['男', '女'],
      deptOptions: ['javaweb', '大数据', '前端工程师'],

      sortOptions: [{ label: '升序排序', key: '+id' }, { label: '降序排序', key: '-id' }],

      showReviewer: false,
      temp: {
        Sid: undefined,
        Sname: undefined,
        ssex: undefined,
        Sclass: undefined,
        title: undefined,
        content: undefined,
        time: undefined
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
      oldtemp: null,
      // Sid: undefined,
      //   Sname: undefined,
      //   ssex: undefined,
      //   Sclass: undefined,
      //   title: undefined,
      //   content: undefined,
      //   time: undefined
      tHeader: ['Sid', 'Sname', 'ssex', 'Sclass', 'title', 'content', 'time']
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
    if (this.$storage.get('highLightInit') === true) {
      console.log(2)
      this.list = this.$storage.get('highLightList')
    } else {
      this.getList()
    }
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
      fetchListHighLight(this.listQuery).then(response => {
        this.list = response.data.items
        this.$storage.set('highLightInit', true)
        this.$storage.set('highLightList', response.data.items)
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
        Sid: undefined,
        Sname: undefined,
        ssex: undefined,
        Sclass: undefined,
        title: undefined,
        content: undefined,
        time: undefined
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
      if (this.temp.Sname === undefined || this.temp.ssex === undefined || this.temp.Sclass === undefined || this.temp.time === undefined || this.temp.title === undefined) {
        this.$notify({
          title: '失败',
          message: '请填写完整',
          duration: 2000
        })
      } else {
        const months = this.temp.time.getMonth() + 1
        const times = this.temp.time.getFullYear() + '.' + months + '.' + this.temp.time.getDate()
        this.list.push({
          Sid: '101',
          Sname: this.temp.Sname,
          ssex: this.temp.ssex,
          Sclass: this.temp.Sclass,
          title: this.temp.title,
          content: this.temp.content, // 已到、迟到、请假、未到
          time: times
        })
        this.$storage.set('dailyList', this.list)
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
      }
      this.dialogFormVisible = false
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.oldtemp = row
      console.log(this.temp)
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const tempData = Object.assign({}, this.temp)
      tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      const oldtempData = Object.assign({}, this.oldtemp)
      let times
      if (tempData.time !== oldtempData.time) {
        const months = tempData.time.getMonth() + 1
        times = tempData.time.getFullYear() + '.' + months + '.' + tempData.time.getDate()
      } else {
        times = oldtempData.time
      }
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].time === oldtempData.time && this.list[i].id === oldtempData.id) {
          this.list[i].Sname = this.temp.Sname
          this.list[i].time = times
          this.list[i].ssex = this.temp.ssex
          this.list[i].Sclass = this.temp.Sclass
          this.list[i].title = this.temp.title
          this.list[i].content = this.temp.content
          this.$storage.set('highLightList', this.list)
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
    },
    handleDelete(index) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.list.splice(index, 1)
        this.$storage.set('highLightList', this.list)
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
        const filterVal = ['Sid', 'Sname', 'ssex', 'Sclass', 'title', 'content', 'time']
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
