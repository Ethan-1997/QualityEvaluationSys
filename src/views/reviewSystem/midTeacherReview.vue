<template>
<div class="dashboard-editor-container">
  <el-row :gutter="20">
    <el-col :span="24">
        <template>
          <el-card>
            <div slot="header" class="clearfix">
              <span style="font-size:25px">学中综合评定（教师端）</span>
            </div>
            <el-button :index="index" v-for="(buttonIndex,index) in studentFormData" :key="index" @click="setCarouselItem(index)" ref="studentSelect" style="width:9.3%;margin: 5px;line-height: 30px;text-align:center">{{buttonIndex.Sname}}</el-button>
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
                      <div style="width:200px;height:200px;float:left"><img :src="studentFormData[index].Simage" ></div>
                      <div style="height:200px;float:left;margin:0 0 0 18px">
                        <div style="height:50px;font-size:17px;line-height:50px"><svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;{{studentFormData[index].Sname}}</div>
                        <div style="height:50px;font-size:17px;line-height:50px"><i class="el-icon-info"/>&nbsp;&nbsp;学号:&nbsp;&nbsp;{{studentFormData[index].Sno}}</div>
                        <div style="height:50px;font-size:17px;line-height:50px"><i class="el-icon-star-on"/>&nbsp;&nbsp;性别:&nbsp;&nbsp;{{studentFormData[index].Ssex}}</div>
                        <div style="height:50px;font-size:17px;line-height:50px"><svg-icon icon-class="peoples" />&nbsp;&nbsp;班级:&nbsp;&nbsp;{{studentFormData[index].Sclass}}</div>
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
                            <div style="font-size:16px">基础知识学习能力：<el-rate show-text v-model="studentFormData[index].studyRate1"></el-rate></div>
                          </el-col>
                          <el-col :span="8">
                            <div style="font-size:16px">专业知识学习能力：<el-rate show-text v-model="studentFormData[index].studyRate2"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">综合知识学习能力：<el-rate show-text v-model="studentFormData[index].studyRate3"></el-rate></div>
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames">
                      <el-collapse-item title="项目开发能力评价" name="1">
                        <el-row :gutter="10">
                          <el-col :span="7" :offset="1">
                            <div style="font-size:16px">项目分析能力：<el-rate show-text v-model="studentFormData[index].developRate1"></el-rate></div>
                          </el-col>
                          <el-col :span="8">
                            <div style="font-size:16px">合作组织沟通能力：<el-rate show-text v-model="studentFormData[index].developRate2"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">实际操作开发能力：<el-rate show-text v-model="studentFormData[index].developRate3"></el-rate></div>
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                    <el-collapse v-model="activeNames">
                      <el-collapse-item title="日常行为评价" name="1">
                        <el-row :gutter="10">
                          <el-col :span="7" :offset="1">
                            <div style="font-size:16px">日常表现评价：<el-rate show-text v-model="studentFormData[index].daliyRate1"></el-rate></div>
                          </el-col>
                          <el-col :span="8">
                            <div style="font-size:16px">日常任务及作业评价：<el-rate show-text v-model="studentFormData[index].daliyRate2"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">综合素质素养评价：<el-rate show-text v-model="studentFormData[index].daliyRate3"></el-rate></div>
                          </el-col>
                        </el-row>
                      </el-collapse-item>
                    </el-collapse>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-input type="textarea" :rows="8" placeholder="请输入您的评价" v-model="studentFormData[index].remark"></el-input>
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
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card>
        <el-button type="primary" style="width:100%;height:50px" @click="checkData">上传所有结果<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import { getStudentData } from '@/api/student'
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
        Sclass: 1
      }
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
      getStudentData(this.studentQuery).then(response => {
        this.studentFormData = response.data.items
        console.log(response.data)
        this.$nextTick(() => {
          this.$refs.gradeTabsOne.chart.resize()
          this.$refs.gradeTabsTwo.chart.resize()
          this.$refs.gradeTabsThree.chart.resize()
        })
      })
    },
    setCarouselItem(buttonIndex) {
      this.index = buttonIndex
    },
    saveButton() {
      if (
        this.studentFormData[this.index].studyRate1.value !== 0 &&
        this.studentFormData[this.index].studyRate2.value !== 0 &&
        this.studentFormData[this.index].studyRate3.value !== 0 &&
        this.studentFormData[this.index].developRate1.value !== 0 &&
        this.studentFormData[this.index].developRate2.value !== 0 &&
        this.studentFormData[this.index].developRate3.value !== 0 &&
        this.studentFormData[this.index].daliyRate1.value !== 0 &&
        this.studentFormData[this.index].daliyRate2.value !== 0 &&
        this.studentFormData[this.index].daliyRate3.value !== 0 &&
        this.studentFormData[this.index].remark !== ''
      ) {
        this.$refs.studentSelect[this.index].type = 'primary'
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success'
        })
      } else {
        this.$alert('您还有内容未填写，请填写完整。', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        })
      }
    },
    checkData() {
      var count = 0
      for (let i = 0; i < this.studentFormData.length; i++) {
        if (
          this.studentFormData[this.index].studyRate1.value !== 0 &&
          this.studentFormData[this.index].studyRate2.value !== 0 &&
          this.studentFormData[this.index].studyRate3.value !== 0 &&
          this.studentFormData[this.index].developRate1.value !== 0 &&
          this.studentFormData[this.index].developRate2.value !== 0 &&
          this.studentFormData[this.index].developRate3.value !== 0 &&
          this.studentFormData[this.index].daliyRate1.value !== 0 &&
          this.studentFormData[this.index].daliyRate2.value !== 0 &&
          this.studentFormData[this.index].daliyRate3.value !== 0 &&
          this.studentFormData[this.index].remark !== ''
        ) { count++ }
        if (count === this.studentFormData.length) {
          this.$alert('上传成功', '成功', {
            confirmButtonText: '确定',
            type: 'success',
            center: true
          })
        } else {
          this.$alert('您还有内容未填写，请填写完整。', '警告', {
            confirmButtonText: '确定',
            type: 'error',
            center: true
          })
        }
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