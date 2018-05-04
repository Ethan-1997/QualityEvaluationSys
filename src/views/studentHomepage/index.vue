<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="9">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="24">
                    <el-card>
                        <div slot="header" class="clearfix">
                            <span><svg-icon icon-class="table" />&nbsp;系统公告</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goToAnnocument">更多</el-button>
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
                            <span><svg-icon icon-class="form" />&nbsp;学生作业</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="showStudentWork">更多</el-button>
                        </div>
                        <el-table :data="taskData" style="width: 100%" :row-class-name="tableRowClassName">
                            <el-table-column prop="title" label="作业标题">
                              
                            </el-table-column>
                            <el-table-column label="截止时间"  width="200" align="center">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span>{{scope.row.endTime}}</span>
                                </template>        
                            </el-table-column>
                            <el-table-column fixed="right" prop="submitStatus" label="提交状态" width="100" align="center" :filters="[{ text: '已提交', value: '已提交' }, { text: '未提交', value: '未提交' }]" :filter-method="filterTaskTag">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.submitStatus === '已提交' ? 'success' : 'warning'">{{scope.row.submitStatus}}</el-tag>
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
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goToDaliyReport">更多</el-button>
                        </div>
                        <el-tabs tab-position="left" style="height: 264px;"><!-- tip:静态数据 -->
                            <el-tab-pane label="日常出勤" :data="dailyList">
                                <div>
                                    <el-alert  v-for="item in dailyList" 
                                    :key="item.pid"
                                    :title="item.status"
                                    :type="item.status | statusFilter"
                                    show-icon :closable="false"
                                     style="margin: 5px 0"> 
                                     {{item.date}}&nbsp;{{item.time}}
                                    </el-alert>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="违纪情况">
                                <template>
                                        <el-table :data="breakRuleList" style="width:100%" :row-class-name="breakRuleTable">
                                            <el-table-column prop="status" label="违纪情况" > </el-table-column>
                                            <el-table-column prop="time" label="日期" width="100" align="center"> </el-table-column>
                                        </el-table>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="突出表现">
                                <template>
                                        <el-table :data="highLightList" style="width:100%" :row-class-name="highlightTable">
                                            <el-table-column prop="title" label="突出表现" > </el-table-column>
                                            <el-table-column prop="time" label="日期" width="100" align="center"> </el-table-column>
                                        </el-table>
                                </template>
                            </el-tab-pane>
                            <el-tab-pane label="重大事项">
                                <template>
                                        <el-table :data="greatList" style="width:100%" :row-class-name="bigThingTable">
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
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goToReport">更多</el-button>
                        </div>
                        <el-tabs tab-position="left" style="height:300px" @tab-click="clickTab" >
                            <el-tab-pane label="入学测评" style="width:100%">
                                <character-test-grade ref="gradeTabsOne" 
                                  :characterOneData="characterOneData"
                                  :characterTwoData="characterTwoData"
                                  :characterThreeData="characterThreeData"
                                  :characterFourData="characterFourData"
                                  :characterFiveData="characterFiveData"
                                  >
                                </character-test-grade>
                            </el-tab-pane>
                            <el-tab-pane label="学中测评">
                                <comprehensive-quality-model ref="gradeTabsTwo" :comprehensive-quality-data="midComprehensiveQualityData"></comprehensive-quality-model>
                            </el-tab-pane>
                            <el-tab-pane label="结业测评">
                                <comprehensive-quality-model ref="gradeTabsThree" :comprehensive-quality-data="finalComprehensiveQualityData"></comprehensive-quality-model>
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
                            <el-button style="float: right; padding: 3px 0" type="text" @click="goToInformation">修改个人信息</el-button>
                        </div>
                        <el-row type="flex" justify="center" :gutter="20">
                        <el-col :span="24">
                            <div style="width:100%">
                            <div style="line-height:28px;width:150px;margin:0px auto">
                                <img style="width:150px;height:150px;border-radius:75px" :src="avatar"/>
                            </div>
                            <div style="line-height:28px;width:150px;margin:0px auto">&nbsp;<svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;{{sname}}</div>
                            <div style="line-height:28px;width:150px;margin:0px auto">&nbsp;<i class="el-icon-info"/>&nbsp;&nbsp;学号:&nbsp;&nbsp;{{sid}}</div>
                            <div style="line-height:28px;width:150px;margin:0px auto">
                                <el-button type="primary" :plain="signInButton" @click="creatdata" :disabled="signIn" style="width:150px">{{signInText}}</el-button>
                            </div>
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
    import { getAllInfoBySid } from '@/api/studentwork'
    import { getCurrentUser } from '@/api/user'
    import { fetchList } from '@/api/announcement'
    import { mapGetters } from 'vuex'
    import ComprehensiveQualityModel from './components/ComprehensiveQualityModel'
    import { getDailysummary, createParticipation, fetchListDaily } from '@/api/participation'
    import { getBreakRole } from '@/api/breakRole'
    import { getOtherImportant } from '@/api/otherImportant'
    import { getHighlighting } from '@/api/highlighting'
    import CharacterTestGrade from './components/CharacterTestGrade'
    export default {
    
      data() {
        return {
          temp: {
            sid: undefined,
            sname: undefined,
            sclass: undefined,
            time: undefined,
            status: undefined, // 已到、迟到、请假、未到
            reason: undefined,
            date: undefined
          },
          content: '无',
          taskData: null,
          active: null,
          announcementData: null,
          sname: null,
          sid: null,
          sclass: null,
          statu: null,
          midComprehensiveQualityData: [60, 75, 60, 80, 50],
          finalComprehensiveQualityData: [60, 80, 50, 60, 75],

          characterOneData: null,
          characterTwoData: null,
          characterThreeData: null,
          characterFourData: null,
          characterFiveData: null,

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
          highLightList: null,
          listQuery: {
            page: 1,
            limit: 5,
            sort: '-id',
            title: undefined,
            time: undefined
          },
          breakRuleData: [],
          highlightData: [],
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
        CharacterTestGrade,
        ComprehensiveQualityModel
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
        this.getlist()
        this.getUserInfo()
        this.getAnnouncementData()
        this.$nextTick(() => {
          this.$refs.gradeTabsOne.chart.resize()
          this.$refs.gradeTabsTwo.chart.resize()
          this.$refs.gradeTabsThree.chart.resize()
        })
        this.init()
      },
      methods: {
        getlist() {
          fetchListDaily().then(response => {
            const date = new Date().getFullYear() + '/' + (+new Date().getMonth() + +1) + '/' + (+new Date().getDate())
            this.dailyList = response.data.items
            const figure = response.data.total
            console.log(date)
            for (let i = 0; i < figure; i++) {
              if (this.dailyList[i].date === date) {
                console.log(1)
                this.signIn = true
                this.signInText = '已签到'
                this.signInButton = true
              }
            }
          })
        },
        getUserInfo() {
          getCurrentUser().then(response => {
            this.sname = response.data.user.sname
            this.sid = response.data.user.sid
            this.sclass = response.data.user.sclass
            console.log(response.data.user)
            getDailysummary({ sid: this.sid, sort: '-id' }).then(response => {
              this.dailyList = [response.data.items[0], response.data.items[1], response.data.items[2], response.data.items[3], response.data.items[4]]
              console.log(this.dailyList)
            })
            getBreakRole({ sid: this.sid }).then(response => {
              this.breakRuleList = response.data.items
            })
            getHighlighting({ sid: this.sid }).then(response => {
              this.highLightList = response.data.items
            })
            getOtherImportant({ sid: this.sid }).then(response => {
              this.greatList = response.data.items
              console.log(123456)
              console.log(response.data)
            })
          })
          getAllInfoBySid({ sid: this.sid }).then(response => {
            this.taskData = [response.data.items[0], response.data.items[1], response.data.items[2], response.data.items[3], response.data.items[4]]
            console.log(response.data)
          })
        },
        clickTab() {
          this.$nextTick(() => {
            this.$refs.gradeTabsOne.chart.resize()
            this.$refs.gradeTabsTwo.chart.resize()
            this.$refs.gradeTabsThree.chart.resize()
          })
        },

        showStudentWork() {
          this.$router.push({ name: 'studentWorkIndex' })
        },
        goToAnnocument() {
          this.$router.push({ path: '/other/announcement' })
        },
        goToDaliyReport() {
          this.$router.push({ path: '/studentInformation/studentDailySummary' })
        },
        goToReport() {
          this.$router.push({ path: '/evaluationReport/admissionEvaluationReport' })
        },
        goToInformation() {
          this.$router.push({ path: '/studentInformation/studentInformation' })
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

        // open2() { // 签到弹窗
        //   this.$message({
        //     message: '签到成功!',
        //     type: 'success'
    
        //   })
        //   this.signIn = true
        //   this.signInText = '已签到'
        //   this.signInButton = true
        // },
        creatdata() {
          const date = new Date()
          if (+date.getHours() < 9) {
            this.statu = '已到'
          } else if (+date.getMinutes() === 0 && +date.getSeconds() === 0) {
            this.statu = '已到'
          } else {
            this.statu = '迟到'
          }
          const temp = {
            sid: this.sid,
            sname: this.sname,
            sclass: this.sclass,
            time: date.getHours() + ':' + (+date.getMinutes() + +1) + ':' + (+date.getSeconds() - +1),
            date: date.getFullYear() + '/' + (+date.getMonth() + +1) + '/' + (+date.getDate()),
            status: this.statu,
            reason: this.content
          }
          console.log(124124112424123124)
          console.log(temp)
          createParticipation(temp)
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
          if (row.submitStatus === '已提交') {
            return 'success-row'
          }
          return ''
        },
        filterTaskTag(value, row) {
          return row.submitStatus === value
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
