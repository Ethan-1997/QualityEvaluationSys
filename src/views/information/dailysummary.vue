<template>
  <div class="dashboard-editor-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="span-title"><h3>日常汇总</h3></span>
        </div>
        <el-tabs :tab-position="tabPosition" v-model="activeName" @tab-click="handleClick" >
          <el-tab-pane label="日常出勤" name="first" style="  font-size:18px;">
            <el-row :gutter="20">
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple1">已到:</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple1">请假:</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple1">未到:</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple1">迟到:</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple2">{{dailyCount.arrived}}</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple4">{{dailyCount.askForLeave}}</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple">{{dailyCount.unarrived}}</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple3">{{dailyCount.later}}</div></el-col>
            </el-row>
            <el-table :data="tableData" style="width:100%" >
              <el-table-column
                prop="time"
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
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple1">违纪次数：</div></el-col>
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple">{{dailyCount.breakRule}}次</div></el-col>
            </el-row>
             <el-table :data="breakRule"  fit highlight-current-row style="width: 100%">
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
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple1">突出表现：</div></el-col>
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple2">{{dailyCount.extrude}}次</div></el-col>
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
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple1">重大事件：</div></el-col>
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple3">{{dailyCount.great}}次</div></el-col>
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

import { fetchListDaily } from '@/api/participation'

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
      breakRule: [],
      extrude: [],
      great: [],
      daily: '',
      dailyCount: []

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
      fetchListDaily().then(Response => {
        this.tableData = Response.data.items
        this.dailyCount = Response.data.dailyCount
        this.breakRule = Response.data.breakRule
        this.extrude = Response.data.extrude
        this.great = Response.data.great
        console.log(this.tableData)
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

<style  rel="stylesheet/scss" lang="scss"scoped >
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
}
.el-tabs--left .el-tabs__item{
  font-size:18px;
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
  font-size:23px
}
</style>