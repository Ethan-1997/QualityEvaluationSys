<template>
<div class="dashboard-editor-container">
  <el-row :gutter="20">
    <el-col :span="24">
        <template>
          <el-card>
            <div slot="header" class="clearfix">
              <span style="font-size:25px">学中综合评定(学生小组端)</span>
            </div>
            <el-button :index="index"  v-for="(buttonIndex,index) in studentFormData" :key="index" @click="setCarouselItem(index,buttonIndex.sid,buttonIndex.uno)" ref="studentSelect" style="width:9.3%;margin: 5px;line-height: 30px;text-align:center">{{buttonIndex.sname}}</el-button>
          </el-card>
        </template>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
        <template v-show="show">
          <div>
          <el-card>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-card class="box-card-1">
                      <div style="width:200px;height:200px;float:left"><img :src="image" style="width:200px;height:200px;" ></div>
                      <div style="height:200px;float:left;margin:0 0 0 18px">
                        <div style="height:50px;font-size:17px;line-height:50px"><svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;<el-tag type="info" size="medium">{{studentFormData[index].sname}}</el-tag></div>
                        <div style="height:50px;font-size:17px;line-height:50px"><i class="el-icon-info"/>&nbsp;&nbsp;学号:&nbsp;&nbsp;<el-tag type="info" size="medium">{{studentFormData[index].sid}}</el-tag></div>
                        <div style="height:50px;font-size:17px;line-height:50px"><i class="el-icon-star-on"/>&nbsp;&nbsp;性别:&nbsp;&nbsp;<el-tag type="info" size="medium">{{studentFormData[index].ssex}}</el-tag></div>
                        <div style="height:50px;font-size:17px;line-height:50px"><svg-icon icon-class="peoples" />&nbsp;&nbsp;班级:&nbsp;&nbsp;<el-tag type="info" size="medium">{{studentFormData[index].sclass}}</el-tag></div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-card>
                      <el-tabs @tab-click="clickTab">
                        <el-tab-pane label="日常表现"  style="width:100%">
                          <class-attendance :sign-in-data="signInData" :late-sign-in-data="lateSignInData" :leave-sign-in-data="leaveSignInData" :not-sign-in-data="notSignInData" ref="gradeTabsOne"></class-attendance>
                        </el-tab-pane>
                        <el-tab-pane label="作业完成情况">
                          <daliy-task-summary :head-in-data="headInData" :not-head-in-data="notHeadInData"  ref="gradeTabsTwo"></daliy-task-summary>
                        </el-tab-pane>
                        <el-tab-pane label="专业知识测试">
                          <knowledge-test-grade :grade-data="gradeData"  ref="gradeTabsThree"></knowledge-test-grade>
                        </el-tab-pane>
                      </el-tabs>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="16">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-collapse v-model="activeNames">
                      <el-collapse-item title="学习能力评价" name="1">
                        <el-row :gutter="10">
                          <el-col :span="7" :offset="1">
                            <div style="font-size:16px">基础知识学习能力：<el-rate show-text v-model="gradeList.grade1"></el-rate></div>
                          </el-col>
                          <el-col :span="8">
                            <div style="font-size:16px">专业知识学习能力：<el-rate show-text v-model="gradeList.grade2"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">综合知识学习能力：<el-rate show-text v-model="gradeList.grade3"></el-rate></div>
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames">
                      <el-collapse-item title="项目开发能力评价" name="1">
                        <el-row :gutter="10">
                          <el-col :span="7" :offset="1">
                            <div style="font-size:16px">项目分析能力：<el-rate show-text v-model="gradeList.grade4"></el-rate></div>
                          </el-col>
                          <el-col :span="8">
                            <div style="font-size:16px">合作组织沟通能力：<el-rate show-text v-model="gradeList.grade5"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">实际操作开发能力：<el-rate show-text v-model="gradeList.grade6"></el-rate></div>
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames">
                      <el-collapse-item title="日常行为评价" name="1">
                        <el-row :gutter="10">
                          <el-col :span="7" :offset="1">
                            <div style="font-size:16px">日常表现评价：<el-rate show-text v-model="gradeList.grade7"></el-rate></div>
                          </el-col>
                          <el-col :span="8">
                            <div style="font-size:16px">日常任务及作业评价：<el-rate show-text v-model="gradeList.grade8"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">综合素质素养评价：<el-rate show-text v-model="gradeList.grade9"></el-rate></div>
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-input type="textarea" :rows="8" placeholder="请输入您的评价" v-model="gradeList.text"></el-input>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="20">
                    <div>&nbsp;</div>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" style="width:100%;height:45px" @click="saveButton">保存</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </template>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getStudentByCid } from '@/api/student'
import { fetchUser } from '@/api/user'
import { fetchReviewGradeList, updateReviewGrade } from '@/api/reviewgrade'
import ClassAttendance from './components/ClassAttendance'
import DaliyTaskSummary from './components/DaliyTaskSummary'
import KnowledgeTestGrade from './components/KnowledgeTestGrade'
export default {
  data() {
    return {
      studentFormData: [{ Simage: null }],

      signInData: 10,
      lateSignInData: 8,
      leaveSignInData: 6,
      notSignInData: 4,

      headInData: 20,
      notHeadInData: 10,

      gradeData: ['10', '20', '14', '16', '8'],

      index: null,
      loading: true,
      activeNames: ['1'],
      studentImage: null,
      studentQuery: {
        Cid: 1
      },
      gradeQuery: {
        type: 'mids',
        sid: null
      },
      imageQuery: {
        uno: null
      },
      gradeList: {
        grade1: null,
        grade2: null,
        grade3: null,
        grade4: null,
        grade5: null,
        grade6: null,
        grade7: null,
        grade8: null,
        grade9: null,
        text: null,
        submitstatus: null
      },
      image: null
    }
  },
  components: {
    ClassAttendance,
    DaliyTaskSummary,
    KnowledgeTestGrade
  },
  created() {
    this.getStudentData()
    this.index = 0
    this.$nextTick(() => {
      this.$refs.gradeTabsOne.chart.resize()
      this.$refs.gradeTabsTwo.chart.resize()
      this.$refs.gradeTabsThree.chart.resize()
    })
  },
  methods: {
    clickTab() {
      this.$nextTick(() => {
        this.$refs.gradeTabsOne.chart.resize()
        this.$refs.gradeTabsTwo.chart.resize()
        this.$refs.gradeTabsThree.chart.resize()
      })
    },
    getStudentData() {
      getStudentByCid(this.studentQuery).then(response => {
        this.studentFormData = response.data.items
        this.gradeQuery.sid = response.data.items[0].sid
        this.imageQuery.uno = response.data.items[0].uno
        fetchReviewGradeList(this.gradeQuery).then(response => {
          this.gradeList = response.data.items[0]
        })
        fetchUser(this.imageQuery).then(response => {
          this.image = response.data.item.avatar
        })
      })
    },
    getStudentGrade() {
      fetchReviewGradeList(this.gradeQuery).then(response => {
        this.gradeList = response.data.items[0]
        console.log(this.gradeList)
      })
      fetchUser(this.imageQuery).then(response => {
        this.image = response.data.item.avatar
      })
    },
    setCarouselItem(buttonIndex, sid, uno) {
      this.imageQuery.uno = uno
      this.gradeQuery.sid = sid
      this.getStudentGrade()
      this.index = buttonIndex
    },
    saveButton() {
      if (
        this.gradeList.grade1 !== 0 &&
        this.gradeList.grade2 !== 0 &&
        this.gradeList.grade3 !== 0 &&
        this.gradeList.grade4 !== 0 &&
        this.gradeList.grade5 !== 0 &&
        this.gradeList.grade6 !== 0 &&
        this.gradeList.grade7 !== 0 &&
        this.gradeList.grade8 !== 0 &&
        this.gradeList.grade9 !== 0 &&
        this.gradeList.text !== ''
      ) {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        })
        this.gradeList.submitstatus = '已评定'
        updateReviewGrade(this.gradeList).then(res => {
          if (res.data.data === 'success') {
            console.log('success')
          }
        })
      } else {
        this.$alert('您还有内容未填写，请填写完整。', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
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
  .box-card-1 {
    width: 100%;
    padding:0 0 18px 0;
  }
  .box-card {
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    text-align: center;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    background: white;
  }

  .el-collapse-item__header{
    font-size: 18px;
  }
</style>