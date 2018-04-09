<template>
  <div class="dashboard-editor-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="span-title"><h3>日常汇总</h3></span>
        </div>
        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="日常出勤" name="first">
            <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple1">已到:</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple1">请假:</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple1">未到:</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple1">迟到:</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple2">12次</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple4">2次</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple">3次</div></el-col>
              <el-col :span="6"><div class="grid-content bg-purple3">3次</div></el-col>
            </el-row>
            <el-table :data="tableData" style="width:100%" >
              <el-table-column
                prop="date"
                label="日期"
                width="180"
                height="50"
                >
              </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态"
                  
                  :filters="[ { text: '已到', value: '已到' }, 
              { text: '未到', value: '未到' }, 
              { text: '请假', value: '请假' }, 
              { text: '迟到', value: '迟到' }]"
                  :filter-method="filtertag"
                  filter-placement="bottom-end">
                  <template slot-scope="scope">
                     <el-alert :type="scope.row.status | statusFilter" :title="scope.row.status" show-icon :closable="false"></el-alert>
                  </template>
                </el-table-column>
            </el-table>
 
          </el-tab-pane>
          <el-tab-pane label="违纪情况" name="second">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple1">违纪次数：</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple">3&nbsp;次</div></el-col>
            </el-row>
             <el-table :data="breakrule"  fit highlight-current-row style="width: 100%">
            <el-table-column width="180px" align="center" label="时间" prop="date">
            </el-table-column>
            <el-table-column width="120px" align="center" label="违纪情况" prop="status">
            </el-table-column>
            <el-table-column prop="remark" label="备注"> 
            </el-table-column>
            </el-table>
            
          </el-tab-pane>
          <el-tab-pane label="突出表现" name="third">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple1">突出表现：</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple2">5&nbsp;次</div></el-col>
            </el-row>
             <el-table :data="extrude"  fit highlight-current-row style="width: 100%">
            <el-table-column width="180px" align="center" label="时间" prop="date">
            </el-table-column>
            <el-table-column width="120px" align="center" label="突出表现" prop="status">
            </el-table-column>
            <el-table-column prop="remark" label="备注"> 
            </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="重大事项" name="fourth">
            <el-row :gutter="20">
              <el-col :span="12"><div class="grid-content bg-purple1">重大事件：</div></el-col>
              <el-col :span="12"><div class="grid-content bg-purple3">2&nbsp;次</div></el-col>
            </el-row>
             <el-table :data="great"  fit highlight-current-row style="width: 100%">
            <el-table-column width="180px" align="center" label="时间" prop="date">
            </el-table-column>
            <el-table-column width="120px" align="center" label="重大事件" prop="status">
            </el-table-column>
            <el-table-column prop="remark" label="备注"> 
            </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        
    </el-card>
  </div>
</template>

<script>

import { fetchList } from '@/api/dailysummary'

export default {
  data() {
    return {
      tabPosition: 'left',
      activeName: 'first',
      tableData: [],
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ['fetchlist'],
      ruleForm: '',
      breakrule: [],
      extrude: [],
      great: []
    }
  },

  methods: {
    filtertag(value, row) {
      console.log(row, value)
      return row.status === value
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getlist() {
      fetchList().then(Response => {
        this.tableData = Response.data.items
        this.breakrule = Response.data.item
        this.extrude = Response.data.item1
        this.great = Response.data.item2
      })
    }

  },
  filtertag(value, row) {
    return row.status === value
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  created() {
    this.getlist()
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        已到: 'success',
        请假: 'info',
        迟到: 'warning',
        未到: 'error'
      }
      return statusMap[status]
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
}
.el-tabs--left .el-tabs__item{
  font-size:18px;
  text-align: center
  
}
.el-tabs__item{
  width:150px;
  
}

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.el-col {
    border-radius: 4px;
    text-align: center;
    line-height:50px;
}
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background:#fef0f0;
    color:#606266;
    font-size:22px;
}
.bg-purple2 {
    background:#ebffe0;
    color:#606266;
    font-size:22px;
}
.bg-purple3 {
    background:#ffefd7;
    color:#606266;
    font-size:22px;
}
.bg-purple4 {
    background:#EBEEF5;
    color:#606266;
    font-size:22px;
}
.bg-purple1 {
    font-size:22px;
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
.el-table-filter {
   left: 520px;
}
.span-title{
  text-align: center;
  font-size:23px
}
</style>