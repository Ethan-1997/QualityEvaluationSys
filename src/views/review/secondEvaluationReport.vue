<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-size:25px">学中评测报告</span>
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
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>正常出勤：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="18" :percentage="x/10*100" color="#67c23a"></el-progress></div><div>&nbsp;{{x}}/10</div></div>
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>迟到：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="18" :percentage="y/10*100" color="#e6a23c"></el-progress></div><div>&nbsp;{{y}}/10</div></div>
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>未到：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="18" :percentage="f/10*100" color="#F56C6C"></el-progress></div><div>&nbsp;{{f}}/10</div></div>
                        <div style="height:60px;padding:35px 0px"><div style="float:left;width:20%"><span>请假：</span></div><div style="float:left;width:70%"><el-progress :show-text="false" :stroke-width="18" :percentage="z/10*100" color="#909399"></el-progress></div><div>&nbsp;{{z}}/10</div></div>
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
                          <daily-performance-summary :first-data="breakRuleNumber" :second-data="highLightingNumber" :thirdly-data="majorIssuesNumber" ref="barchart1"></daily-performance-summary>
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
                      每日任务/作业完成情况
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="100"  color="#67c23a"></el-progress></div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">上交情况</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="100"  color="#F56C6C"></el-progress></div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">未上交情况</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;height:126px;text-align:center;margin:0px auto;line-height:126px;font-size:50px">100</div>
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
                      专业知识测试（智育）
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          笔试题
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="12">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">选择题</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{midTest.singleSuccess}}/{{midTest.singleTotal}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="12">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">判断题</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{midTest.judgmentSuccess}}/{{midTest.judgmentTotal}}</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="14">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          项目答辩
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="5">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">自述情况</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">20/20</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:12px">回答问题情况</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">20/20</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:12px">学术或技术水平</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">50/50</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="7">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:6px">规范要求与文字表达</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">50/50</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="4">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          合计
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:22px">总分</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:40px">150</div>
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
                      点评系统
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
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
                  <el-col :xs="24" :sm="24" :lg="24">
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
export default {
  data() {
    return {
      breakRuleNumber: 1,
      highLightingNumber: 2,
      majorIssuesNumber: 1,

      classTeacherAssessment: [55, 66, 76, 88, 50],
      lecturerAssessment: [30, 40, 50, 70, 55],
      assistantAssessment: [55, 60, 70, 40, 55],
      studentAssessment: [80, 55, 75, 44, 77],
      selfAssessment: [60, 75, 60, 80, 50],

      comprehensiveQualityData: [60, 75, 60, 80, 50],
      x: 0,
      y: 0,
      z: 0,
      f: 0
    }
  },
  components: {
    TeacherReviewResults,
    DailyPerformanceSummary,
    ComprehensiveQualityModel
  },
  mounted() {

    this.x = this.$storage.get('daily_arrived')
    this.y = this.$storage.get('daily_unarrived')
    this.z = this.$storage.get('daily_leave')
    this.f = this.$storage.get('daily_later')

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
  .span-center{
    text-align: center
  }
</style>
