<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-card>
          <div slot="header" class="clearfix">
            <span style="font-size:25px">学生自评</span>
          </div>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="8">
              <el-card>
                <svg-icon icon-class="peoples" />&nbsp;班级:vue.js
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
              <el-card>
                <svg-icon icon-class="people" />&nbsp;姓名:摇滚兔子
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
              <el-card>
                <i class="el-icon-info"/>&nbsp;学号:16147131
              </el-card>
            </el-col>
          </el-row>
          <el-card>
            <el-row :gutter="20">
              <el-table :data="selfReviewData" style="width: 100%">
                <el-table-column prop="reviewProject" label="评定项目" width="150px">
                </el-table-column>
                <el-table-column prop="projectDetail" label="评定要点" >
                </el-table-column>
                <el-table-column label="自评成绩" fixed="right" align="center">
                  <template slot-scope="scope">
                    <div style="width:100%;padding:0px 10px">
                      <el-slider v-model="scope.row.projectRate" :step="10" show-stops></el-slider>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row :gutter="20">
              <el-form :model="selfReviewForm" status-icon :rules="selfReviewRules" ref="selfReviewForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="自我总结" prop="selfSummary">
                  <el-input type="textarea" v-model="selfReviewForm.selfSummary" :rows="5"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <div>&nbsp;</div>
                    </el-col>
                    <el-col :span="4">
                      <el-button type="primary" style="width:100%;height:45px" @click="saveButton">保存</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-form>
            </el-row>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      selfReviewData: [{
        reviewProject: '综合知识学习能力',
        projectDetail: '对基础知识和专业知识的接受程度，是否能深刻理解基础知识的重要性。',
        projectRate: 0
      }, {
        reviewProject: '项目开发能力',
        projectDetail: '对于项目的分析的能力，以及新项目的架构能力，并且能熟练合理的运用专业知识，大胆且谨慎的使用技术。',
        projectRate: 0
      }, {
        reviewProject: '合作沟通能力',
        projectDetail: '能快速的融入团队，能在团队中进行深刻的交流，拥有较好的交际能力。',
        projectRate: 0
      }, {
        reviewProject: '日常表现自评',
        projectDetail: '包括考勤，违纪等日常表现和每日任务及作业等学习任务的评价。',
        projectRate: 0
      }, {
        reviewProject: '素质素养自评',
        projectDetail: '对自身素质素养的评定，认为自身的素养道德如何。',
        projectRate: 0
      }],
      selfReviewForm: {
        selfSummary: ''
      },
      selfReviewRules: {
        selfSummary: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$alert('提交成功！', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            center: true
          })
        } else {
          this.$message({
            message: '请填写完整',
            type: 'warning'
          })
          return false
        }
      })
    }
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
