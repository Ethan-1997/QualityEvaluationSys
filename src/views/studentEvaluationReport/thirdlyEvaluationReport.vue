<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-size:25px">结业评测报告</span>
          </div>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <div style="padding:0 0 16px 0;margin:0 30px 0 0;float:left">
                  <img style="width:150px;height:150px" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/>
                </div>
                <div style="float:left">
                  <el-row  :gutter="20">
                    <el-col :xs="24" :sm="24" :lg="24">
                      <div style="width:170px;line-height:37px;font-size:17px"><svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;摇滚兔子</div>
                      <div style="width:170px;line-height:37px;font-size:17px"><i class="el-icon-info"/>&nbsp;&nbsp;学号:&nbsp;&nbsp;16147131</div>
                      <div style="width:170px;line-height:37px;font-size:17px"><i class="el-icon-star-on"/>&nbsp;&nbsp;性别:&nbsp;&nbsp;男</div>
                      <div style="width:170px;line-height:37px;font-size:17px"><svg-icon icon-class="peoples" />&nbsp;&nbsp;班级:&nbsp;&nbsp;vue.js</div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          日常出勤汇总
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>正常出勤：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="10" :percentage="arrived*10" color="#67c23a"></el-progress></div><div>&nbsp;{{arrived}}/20</div></div>
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>迟到：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="10" :percentage="later*10" color="#e6a23c"></el-progress></div><div>&nbsp;{{later}}/20</div></div>
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>未到：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="10" :percentage="unarrived*10" color="#F56C6C"></el-progress></div><div>&nbsp;{{unarrived}}/20</div></div>
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>请假：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="10" :percentage="askForLeave*10" color="#909399"></el-progress></div><div>&nbsp;{{askForLeave}}/20</div></div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          违纪、突出表现 重大事项汇总
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div>
                          <daily-performance-summary :first-data="breakRuleList.count" :second-data="highLightList.count" :thirdly-data="greatList.count" ref="barchart1"></daily-performance-summary>
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      学生作业 完成情况
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="up/(up+notup)*100"  color="#67c23a"></el-progress></div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">上交情况</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="notup/(up+notup)*100"  color="#F56C6C"></el-progress></div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">未上交情况</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;height:126px;text-align:center;margin:0px auto;line-height:126px;font-size:50px">{{agrade}}</div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">作业平均分</div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      专业知识集中测试
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="20">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="5">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:16px">第一次笔试</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{lastTestScore1.score}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="5">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:16px">第二次笔试</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{lastTestScore2.score}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="5">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:16px">第三次笔试</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{lastTestScore3.score}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="5">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:16px">第四次笔试</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{lastTestScore4.score}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="4">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:16px">第五次笔试</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{lastTestScore5.score}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="4">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:22px">平均分</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:40px">{{lastTestAvg}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      评定系统
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          教师、学生评定
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <teacher-review-results
                          :class-teacher-assessment="classTeacherAssessment"
                          :lecturer-assessment="lecturerAssessment"
                          :assistant-assessment="assistantAssessment"
                          :student-assessment="studentAssessment"
                          :self-assessment="selfAssessment">
                        </teacher-review-results>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          项目经理评定
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <project-manager-review-results :project-manager-review-results="projectManagerReviewResults"></project-manager-review-results>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          人事经理评定
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <h-r-review-results :h-r-review-results="HRReviewResults"></h-r-review-results>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      综合素质模型
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="20">
                    <comprehensive-quality-model :comprehensive-quality-data="comprehensiveQualityData"></comprehensive-quality-model>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TeacherReviewResults from './components/TeacherReviewResults'
import DailyPerformanceSummary from './components/DailyPerformanceSummary'
import ComprehensiveQualityModel from './components/ComprehensiveQualityModel'
import ProjectManagerReviewResults from './components/ProjectManagerReviewResults'
import HRReviewResults from './components/HRReviewResults'
import { fetchListDaily } from '@/api/participation'
import { getBreakRole } from '@/api/breakRole'
import { getOtherImportant } from '@/api/otherImportant'
import { getHighlighting } from '@/api/highlighting'
import { fetchListStudentGrade } from '@/api/StudentGrade'
import { getCurrentUser } from '@/api/user'
import { getAllInfoBySid, averageGrade } from '@/api/studentwork'
export default {
  data() {
    return {
      greatList: null,
      highLightList: null,
      dailyList: null,
      breakRuleList: null,
      askForLeave: 0,
      arrived: 0,
      unarrived: 0,
      later: 0,
      breakRuleNumber: 3,
      highLightingNumber: 5,
      majorIssuesNumber: 2,
      allinfo: null,
      up: 0,
      notup: 0,
      lastTestScore1: {
        score: 0
      },
      lastTestScore2: {
        score: 0
      },
      lastTestScore3: {
        score: 0
      },
      lastTestScore4: {
        score: 0
      },
      lastTestScore5: {
        score: 0
      },
      lastTestAvg: 0,
      classTeacherAssessment: [55, 80, 76, 88, 50],
      lecturerAssessment: [30, 40, 50, 40, 55],
      assistantAssessment: [55, 30, 70, 40, 55],
      studentAssessment: [80, 55, 75, 44, 77],
      selfAssessment: [60, 75, 60, 80, 50],
      dailyCount: null,
      projectManagerReviewResults: [55, 60, 50, 40, 55],
      HRReviewResults: [55, 66, 76, 88, 50, 90],

      comprehensiveQualityData: [60, 75, 50, 80, 75],

      agrade: 0
    }
  },
  components: {
    TeacherReviewResults,
    DailyPerformanceSummary,
    ComprehensiveQualityModel,
    ProjectManagerReviewResults,
    HRReviewResults
  },

  methods: {
    getList() {
      console.log(1)
      getCurrentUser().then(response => {
        const data = response.data.user.sid
        console.log(data)
        fetchListDaily({ sid: data }).then(response => {
          this.dailyList = response.data.items
          this.askForLeave = 0
          this.arrived = 0
          this.unarrived = 0
          this.later = 0
          console.log(this.dailyList.length)
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
          console.log(1)
          console.log(this.arrived)
          console.log(this.later)
        })
        getBreakRole({ sid: data }).then(response => {
          console.log(response.data)
          this.breakRuleList = response.data
        })
        getHighlighting({ sid: data }).then(response => {
          console.log(response.data)
          this.highLightList = response.data
        })
        getOtherImportant({ sid: data }).then(response => {
          this.greatList = response.data
          console.log(response.data)
        })
        averageGrade({ sid: data }).then(response => {
          this.agrade = response.data.average
        })
        fetchListStudentGrade({ sid: data }).then(response => {
          const data = response.data.items[0]
          this.lastTestScore1 = JSON.parse(data.lasttest1)
          this.lastTestScore2 = JSON.parse(data.lasttest2)
          this.lastTestScore3 = JSON.parse(data.lasttest3)
          this.lastTestScore4 = JSON.parse(data.lasttest4)
          this.lastTestScore5 = JSON.parse(data.lasttest5)
          this.lastTestAvg = (this.lastTestScore1.score + this.lastTestScore2.score + this.lastTestScore3.score + this.lastTestScore4.score + this.lastTestScore5.score) / 5
          console.log(data)
          this.init()
        })
        getAllInfoBySid({ sid: data }).then(response => {
          this.allinfo = response.data.items
          for (let i = 0; i < this.allinfo.length; i++) {
            if (this.allinfo[i].submitStatus === '已提交') {
              this.up++
            } else {
              this.notup++
            }
          }
        })
      })
    },
    init() {
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
        this.askForLeave = parseInt(this.askForLeave)
        this.unarrived = parseInt(this.unarrived)
        this.arrived = parseInt(this.arrived)
        this.later = parseInt(this.later)
        const length = this.dailyList.length
        this.firstDaily = this.dailyList[length - 1]
        this.secondDaily = this.dailyList[length - 2]
        this.thirdDaily = this.dailyList[length - 3]
        this.fourthDaily = this.dailyList[length - 4]
        this.fifthDaily = this.dailyList[length - 5]
        console.log(1)
        console.log(this.firstDaily)
      })
    }
  },
  created() {
    this.getList()
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
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
</style>
