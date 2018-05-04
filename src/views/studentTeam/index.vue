<template>
  <div class="team-index">
    <el-row>
      <el-col :xl="4" :sm="1" class="fill-height"></el-col>
      <el-col :xl="20" :sm="23">小组投票前7名</el-col>
      <el-col :xl="4" class="fill-height"></el-col>
      <el-col :xl="16">
        <el-row>
          <el-col :span="24">
            <bar-chart></bar-chart>
          </el-col>
          <el-col :span="24" style="height:20px;"></el-col>
          <el-col :span="24">
            <template>
              <el-table
                ref="multipleTable"
                :data="tableData"
                height="400"
                style="width: 100%"
                 @select="selectChange"
                 @select-all="selectAll"
                :default-sort = "{prop: 'no', order: 'descending'}"
                >
                <el-table-column
                  type="selection"
                  width="55"
                 >
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="学号"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  sortable
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="votes"
                  label="已获得票数"
                  >
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="toggleSelection">确认投票</el-button>
                <el-button @click="cancelSelection">取消选择</el-button>
              </div>
            </template>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xl="4" class="fill-height"></el-col>
    </el-row>
  </div>
</template>
<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { fetchList } from '@/api/information'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'dashboard-admin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      tableData: [],
      lineChartData: lineChartData.newVisitis,
      copyChooseTchIds: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectChange(val, row) {
    /* 1 => add ; 0 => remove*/
      let flag = 0
      for (const i in val) {
        if (row.id === val[i].id) {
          flag = 1
          break
        }
      }
      if (flag === 1) {
        this.copyChooseTchIds.push(row)
      } else {
        for (const i in this.copyChooseTchIds) {
          if (this.copyChooseTchIds[i].id === row.id) { this.copyChooseTchIds.splice(i, 1) }
        }
      }
    },
    cancelSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    toggleSelection() {
      var v = this
      console.log(v.copyChooseTchIds.length)
      if (v.copyChooseTchIds.length > 3) {
        this.$message({
          message: '只能选择一个人投票',
          type: 'warning'
        })
      } else {
        for (const i in v.tableData) {
          for (const j in v.copyChooseTchIds) {
            if (v.copyChooseTchIds[j].id === v.tableData[i].id) {
              v.tableData[i].votes = v.tableData[i].votes + 1
              this.$storage.set('studentTeamVote', v.tableData)
              break
            }
          }
        }
        location.reload()
        this.$message({
          message: '投票成功',
          type: 'success'
        })
      }
    },

    selectAll(val) {
      var v = this
      // remove
      if (val.length === 0) {
        for (const i in v.tableData) {
          for (const j in v.copyChooseTchIds) {
            if (v.copyChooseTchIds[j].id === v.tableData[i].id) {
              v.copyChooseTchIds.splice(j, 1)
              break
            }
          }
        }
      }
      if (v.copyChooseTchIds.length === 0) {
        for (const i in val) {
          v.copyChooseTchIds.push(val[i])
        }
      } else {
        for (const i in val) {
          let flag = false
          for (const j in v.copyChooseTchIds) {
            if (v.copyChooseTchIds[j].id === val[i].id) {
              flag = true
              break
            }
          }
          if (!flag) { v.copyChooseTchIds.push(val[i]) }
        }
      }
    },
    getList() {
      const data = {
        Cid: 1
      }
      fetchList(data).then(Response => {
        this.tableData = Response.data.ticket
        this.$storage.set('studentTeamVote', Response.data.ticket)
        console.log(this.tableData)
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>
<style>
.fill-height{
  height:1px;
}
.team-index{
  padding:32px;
}
</style>
