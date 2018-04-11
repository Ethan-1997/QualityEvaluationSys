<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="9">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="table" />&nbsp;系统公告</span>
                            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                        </div>
                        <el-table :data="announcementData" style="width: 100%"  >
                            <el-table-column fit prop="atitle" label="公告">
                            
                            </el-table-column>
                            <el-table-column fixed="right" prop="atime" label="发布日期" width="100px" align="center">
                                
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="form" />&nbsp;每日任务</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="showDaliyTask">更多</el-button>
                        </div>
                        <el-table :data="taskData" style="width: 100%" :row-class-name="tableRowClassName" @row-click="showDaliyTask">
                            <el-table-column align="center" label="序号" width="65" type="index" :index="indexMethod">
                            </el-table-column>
                            <el-table-column prop="task" label="每日任务">
                            </el-table-column>
                            <el-table-column label="截止时间" width="130" align="center">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span>{{scope.row.date}}</span>
                                </template>        
                            </el-table-column>
                            <el-table-column fixed="right" prop="status" label="提交状态" width="100" align="center" :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]" :filter-method="filterTaskTag">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status === '已提交' ? 'success' : 'warning'">{{scope.row.status}}</el-tag>
                                </template>   
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="9">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="example" />&nbsp;日常表现</span>
                            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                        </div>
                        <el-tabs tab-position="left" style="height: 264px;"><!-- tip:静态数据 -->
                            <el-tab-pane label="日常出勤">
                                <div style="padding: 4px 0">
                                    <el-alert :title="firstDaily.status" 
                                    :type="firstDaily.status | statusFilter"
                                    show-icon :closable="false"> {{firstDaily.time}}
                                    </el-alert>
                                </div>
                                <div style="padding: 4px 0">
                                    <el-alert :title="secondDaily.status"
                                      :type="secondDaily.status | statusFilter" 
                                      show-icon :closable="false"> {{secondDaily.time}}
                                    </el-alert>
                                </div>
                                <div style="padding: 4px 0">
                                    <el-alert :title="thirdDaily.status"
                                      :type="thirdDaily.status | statusFilter" 
                                      show-icon :closable="false"> {{thirdDaily.time}}
                                    </el-alert>
                                </div>
                                <div style="padding: 4px 0">
                                    <el-alert :title="fourthDaily.status"
                                      :type="fourthDaily.status | statusFilter" 
                                      show-icon :closable="false"> {{fourthDaily.time}}
                                    </el-alert>
                                </div>
                                <div style="padding: 4px 0">
                                    <el-alert :title="fifthDaily.status"
                                      :type="fifthDaily.status | statusFilter" 
                                      show-icon :closable="false"> {{fifthDaily.time}}
                                    </el-alert>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="违纪情况">
                                <template>
                                        <el-table :data="breakRuleData" style="width:100%" :row-class-name="breakRuleTable">
                                            <el-table-column prop="status" label="违纪情况" > </el-table-column>
                                            <el-table-column prop="time" label="日期" width="100" align="center"> </el-table-column>
                                        </el-table>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="突出表现">
                                <template>
                                        <el-table :data="highlightData" style="width:100%" :row-class-name="highlightTable">
                                            <el-table-column prop="item" label="突出表现" > </el-table-column>
                                            <el-table-column prop="date" label="日期" width="100" align="center"> </el-table-column>
                                        </el-table>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="重大事项">
                                <template>
                                        <el-table :data="bigThingData" style="width:100%" :row-class-name="bigThingTable">
                                            <el-table-column prop="title" label="重大事件" > </el-table-column>
                                            <el-table-column prop="time" label="日期" width="100" align="center"> </el-table-column>
                                        </el-table>
                                </template>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="chart" />&nbsp;评测报告</span>
                            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                        </div>
                        <el-tabs tab-position="left" style="height:300px" @tab-click="clickTab" >
                            <el-tab-pane label="入学测评" style="width:100%">
                                <raddar-chart ref="gradeTabsOne" id="gradeTabsOne"></raddar-chart>
                            </el-tab-pane>
                            <el-tab-pane label="学中测评">
                                <pie-chart ref="gradeTabsTwo"></pie-chart>
                            </el-tab-pane>
                            <el-tab-pane label="结业测评">
                                <bar-chart ref="gradeTabsThree"></bar-chart>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="user" />&nbsp;学生信息</span>
                            <el-button style="float: right; padding: 3px 0" type="text">修改个人信息</el-button>
                        </div>
                        <el-row type="flex" justify="center" :gutter="20">
                        <el-col :span="24">
                            <div style="width:100%">
                            <div style="line-height:28px;width:150px;margin:0px auto">
                                <img style="width:150px;height:150px;border-radius:75px" :src="avatar"/>
                            </div>
                            <div style="line-height:28px;width:150px;margin:0px auto">&nbsp;<svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;摇滚兔子</div>
                            <div style="line-height:28px;width:150px;margin:0px auto">&nbsp;<i class="el-icon-info"/>&nbsp;&nbsp;学号:&nbsp;&nbsp;16147131</div>
                            <div style="line-height:28px;width:150px;margin:0px auto"><el-button type="primary" :plain="signInButton" @click="open2" :disabled="signIn" style="width:150px">{{signInText}}</el-button></div>
                            </div>
                        </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="clipboard" />&nbsp;备忘录</span>
                        </div>
                        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" class="el-tag-todoList"> {{tag}} </el-tag>
                            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" >
                            </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新 事 务</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
    import { daliyTask } from '@/api/daliyTask'
    import { fetchList } from '@/api/announcement'
    import { mapGetters } from 'vuex'
    import RaddarChart from './components/RaddarChart'
    import PieChart from './components/PieChart'
    import BarChart from './components/BarChart'
    import { fetchListDaily } from '@/api/participation'
    import { fetchListBreakRule } from '@/api/breakRole'
    import { fetchListGreat } from '@/api/otherImportant'
    export default {
    
      data() {
        return {
          taskData: null,
          active: null,
          announcementData: null,

          dynamicTags: ['晚上前提交布置的任务', '13：30理工楼101开会', '数据结构作业', '选修课作业', '前台使用的是Vue.js', '主要的是Element UI', '后台使用的是SQLserver'], // 动态编辑标签
          inputVisible: false,
          inputValue: '',
          dailyList: null,
          breakRuleList: null,
          dailyListCount: 0,
          dailyCount: null,
          signIn: false,
          signInText: '签到',
          signInButton: false,
          listQuery: {
            page: 1,
            limit: 5,
            sort: '+id',
            title: undefined,
            time: undefined
          },
          breakRuleData: [],
          highlightData: [{
            item: '突出表现',
            date: '2016-05-02'
          }, {
            item: '突出表现',
            date: '2016-05-02'
          }, {
            item: '突出表现',
            date: '2016-05-02'
          }, {
            item: '突出表现',
            date: '2016-05-02'
          }, {
            item: '突出表现',
            date: '2016-05-02'
          }],
          bigThingData: [],
          firstDaily: null,
          secondDaily: null,
          thirdDaily: null,
          fourthDaily: null,
          fifthDaily: null,
          greatList: null
        }
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
  },
      components: {
        RaddarChart,
        PieChart,
        BarChart
      },
      computed: {
        ...mapGetters([
          'avatar'
        ])
    
      },
      updated() {
        this.$refs.gradeTabsOne.chart.resize()
        this.$refs.gradeTabsTwo.chart.resize()
        this.$refs.gradeTabsThree.chart.resize()
      },
      created() {
        this.getTaskData()
        this.getAnnouncementData()
        this.$nextTick(() => {
          this.$refs.gradeTabsOne.chart.resize()
          this.$refs.gradeTabsTwo.chart.resize()
          this.$refs.gradeTabsThree.chart.resize()
        })
        if (this.$storage.get('dailyList') !== null) {
          this.dailyList = this.$storage.get('dailyList')
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
          const length = this.breakRuleList.length
          this.breakRuleData = []
          if (length > 5) {
            for (let i = 1; i <= 5; i++) {
              this.breakRuleData[i - 1] = this.breakRuleList[length - i]
            }
          } else {
            for (let i = 1; i <= length; i++) {
              this.breakRuleData[i - 1] = this.breakRuleList[length - i]
            }
          }
    
          console.log(this.breakRuleData)
        } else {
          this.getListBreakRule()
        }
        if (this.$storage.get('greatList') !== null) {
          this.greatList = this.$storage.get('greatList')
          const length = this.greatList.length
          this.bigThingData = []
          if (length > 5) {
            for (let i = 1; i <= 5; i++) {
              this.bigThingData[i - 1] = this.greatList[length - i]
            }
          } else {
            for (let i = 1; i <= length; i++) {
              this.bigThingData[i - 1] = this.greatList[length - i]
            }
          }
        } else {
          this.getListGreat()
        }
      },
      methods: {
        getListDaily() {
          fetchListDaily().then(response => {
            this.dailyList = response.data.item
            this.firstDaily = this.dailyList[0]
            this.secondDaily = this.dailyList[1]
            this.thirdDaily = this.dailyList[2]
            this.fourthDaily = this.dailyList[3]
            this.fifthDaily = this.dailyList[4]
          })
        },
        getListBreakRule() {
          fetchListBreakRule(this.listQuery).then(response => {
            this.breakRuleList = response.data.items
            const length = this.breakRuleList.length
            this.breakRuleData = []
            if (length > 5) {
              for (let i = 1; i <= 5; i++) {
                this.breakRuleData[i - 1] = this.breakRuleList[length - i]
              }
            } else {
              for (let i = 1; i <= length; i++) {
                this.breakRuleData[i - 1] = this.breakRuleList[length - i]
              }
            }
          })
        },
        getListGreat() {
          fetchListGreat(this.listQuery).then(response => {
            this.greatList = response.data.items
            const length = this.greatList.length
            this.bigThingData = []
            if (length > 5) {
              for (let i = 1; i <= 5; i++) {
                this.bigThingData[i - 1] = this.greatList[length - i]
              }
            } else {
              for (let i = 1; i <= length; i++) {
                this.bigThingData[i - 1] = this.greatList[length - i]
              }
            }
          })
        },
        clickTab() {
          this.$nextTick(() => {
            this.$refs.gradeTabsOne.chart.resize()
            this.$refs.gradeTabsTwo.chart.resize()
            this.$refs.gradeTabsThree.chart.resize()
          })
        },

        showDaliyTask() {
          this.$router.push({ name: 'daliyTask' })
        },

        handleClose(tag) { // 动态编辑标签
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
          this.inputVisible = true
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
        },

        handleInputConfirm() {
          const inputValue = this.inputValue
          if (inputValue) {
            this.dynamicTags.push(inputValue)
          }
          this.inputVisible = false
          this.inputValue = ''
        },

        open2() { // 签到弹窗
          this.$message({
            message: '签到成功!',
            type: 'success'
          })
          this.signIn = true
          this.signInText = '已签到'
          this.signInButton = true
        },

        breakRuleTable({ row, rowIndex }) {
          return 'danger-row'
        },
        highlightTable({ row, rowIndex }) {
          return 'success-row'
        },
        bigThingTable({ row, rowIndex }) {
          return 'warning-row'
        },

        tableRowClassName({ row, rowIndex }) {
          if (row.status === '已提交') {
            return 'success-row'
          }
          return ''
        },

        getTaskData() {
          daliyTask().then(response => {
            this.taskData = response.data
          })
        },
        filterTaskTag(value, row) {
          return row.status === value
        },

        getAnnouncementData() {
          fetchList(this.listQuery).then(response => {
            this.announcementData = response.data.items
          })
        },

        indexMethod(index) {
          return index + 1
        }
      }
    }
  </script>


<style rel="stylesheet/scss" lang="scss">
    .el-tag-todoList {//动态编辑标签
        margin: 5px;
        line-height: 30px;
        height: 30px;
        font-size: 16px;
        color: black;
    }
    .button-new-tag {
        margin: 5px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
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

    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
    }

    .el-table .danger-row{
        background: rgb(248, 240, 240);
        color:rgb(255, 0, 0);
    }
    .el-table .warning-row{
        background: rgb(253, 246, 236);
        color:rgb(220, 162, 60);
    }
    .el-table .success-row{
        background: rgb(240, 249, 235);
        color:rgb(103, 194, 58);
    }

    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
</style>
