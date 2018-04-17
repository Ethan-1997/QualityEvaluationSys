<template>
  <div class="dashboard-editor-container">
    <el-card>
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
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple2">{{arrived}}</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple4">{{askForLeave}}</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple">{{unarrived}}</div></el-col>
              <el-col :span="6" style="text-align:center"><div class="grid-content bg-purple3">{{later}}</div></el-col>
            </el-row>
            <el-table :data="dailyList" style="width:100%" >
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
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple1">违纪次数：</div></el-col>
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple">{{ breakRuleList.length }}次</div></el-col>
            </el-row>
             <el-table :data="breakRuleList"  fit highlight-current-row style="width: 100%">
            <el-table-column width="180px" align="center" label="时间" prop="time">
            </el-table-column>
            <el-table-column width="120px" align="center" label="违纪情况" prop="status">
            </el-table-column>
            <el-table-column prop="note" label="备注"> 
            </el-table-column>
            </el-table>
            
          </el-tab-pane>
          <el-tab-pane label="突出表现" name="third">
            <el-row :gutter="20">
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple1">突出表现：</div></el-col>
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple2">{{ highLightList.length }}次</div></el-col>
            </el-row>
             <el-table :data="highLightList"  fit highlight-current-row style="width: 100%">
            <el-table-column width="180px" align="center" label="时间" prop="time">
            </el-table-column>
            <el-table-column width="120px" align="center" label="突出表现" prop="title">
            </el-table-column>
            <el-table-column prop="content" label="备注"> 
            </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="重大事项" name="fourth">
            <el-row :gutter="20">
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple1">重大事件：</div></el-col>
              <el-col :span="12" style="text-align:center"><div class="grid-content bg-purple3">{{ greatList.length }}次</div></el-col>
            </el-row>
             <el-table :data="greatList"  fit highlight-current-row style="width: 100%">
            <el-table-column width="180px" align="center" label="时间" prop="time">
            </el-table-column>
            <el-table-column width="120px" align="center" label="重大事件" prop="title">
            </el-table-column>
            <el-table-column prop="content" label="备注"> 
            </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        
    </el-card>
  </div>
</template>

<script>

import { fetchListDaily } from '@/api/participation'
import { fetchListBreakRule } from '@/api/breakRole'
import { fetchListGreat } from '@/api/otherImportant'
import { fetchListHighLight } from '@/api/highlighting'
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
      dailyCount: [],
      breakRuleData: [],
      highlightData: [],
      bigThingData: [],
      firstDaily: null,
      secondDaily: null,
      thirdDaily: null,
      fourthDaily: null,
      fifthDaily: null,
      greatList: null,
      highLightList: null,
      dailyList: null,
      breakRuleList: null,
      askForLeave: 0,
      arrived: 0,
      unarrived: 0,
      later: 0
    }
  },

  methods: {
    init() {
      if (this.$storage.get('dailyList') !== null) {
        this.dailyList = this.$storage.get('dailyList')
        for (let i = 0; i < this.dailyList.length; i++) {
          switch (this.dailyList[i].status) {
            case '请假':
              this.askForLeave = this.askForLeave + 1
              break
            case '未到':
              this.unarrived = this.unarrived + 1
              break
            case '已到':
              this.arrived = this.arrived + 1
              break
            case '迟到':
              this.later = this.later + 1
              break
          }
        }
        const length = this.dailyList.length
        this.firstDaily = this.dailyList[length - 1]
        this.secondDaily = this.dailyList[length - 2]
        this.thirdDaily = this.dailyList[length - 3]
        this.fourthDaily = this.dailyList[length - 4]
        this.fifthDaily = this.dailyList[length - 5]
      } else {
        this.getListDaily()
      }
      if (this.$storage.get('breakRuleList') !== null) {
        this.breakRuleList = this.$storage.get('breakRuleList')
      } else {
        this.getListBreakRule()
      }
      if (this.$storage.get('greatList') !== null) {
        this.greatList = this.$storage.get('greatList')
      } else {
        this.getListGreat()
      }
      if (this.$storage.get('highLightList') !== null) {
        this.highLightList = this.$storage.get('highLightList')
      } else {
        this.getListHighLight()
      }
    },
    getListDaily() {
      fetchListDaily().then(response => {
        this.dailyList = response.data.items
        for (let i = 0; i < this.dailyList.length; i++) {
          switch (this.dailyList[i].status) {
            case '请假':
              this.askForLeave = this.askForLeave + 1
              break
            case '未到':
              this.unarrived = this.unarrived + 1
              break
            case '已到':
              this.arrived = this.arrived + 1
              break
            case '迟到':
              this.later = this.later + 1
              break
          }
        }
        const length = this.dailyList.length
        this.firstDaily = this.dailyList[length - 1]
        this.secondDaily = this.dailyList[length - 2]
        this.thirdDaily = this.dailyList[length - 3]
        this.fourthDaily = this.dailyList[length - 4]
        this.fifthDaily = this.dailyList[length - 5]
        console.log(1)
        console.log(this.firstDaily)
      })
    },
    getListBreakRule() {
      fetchListBreakRule(this.listQuery).then(response => {
        this.breakRuleList = response.data.items
      })
    },
    getListGreat() {
      fetchListGreat(this.listQuery).then(response => {
        this.greatList = response.data.items
      })
    },
    getListHighLight() {
      fetchListHighLight(this.listQuery).then(response => {
        this.highLightList = response.data.items
      })
    },
    filtertag(value, row) {
      console.log(row, value)
      return row.status === value
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
    this.init()
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