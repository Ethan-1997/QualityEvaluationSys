<template>
<div class="dashboard-editor-container">
  <el-row :gutter="20">
    <el-col :span="24">
        <template>
          <el-card>
            <div slot="header" class="clearfix">
              <span style="font-size:25px">项目答辩评定</span>
            </div>
            <el-button :index="index" v-for="(buttonIndex,index) in studentFormData" :key="index" @click="setCarouselItem(index,buttonIndex.sid,buttonIndex.uno)" ref="studentSelect" style="width:9.3%;margin: 5px;line-height: 30px;text-align:center">{{buttonIndex.sname}}</el-button>
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
                <el-col :span="24">
                  <el-card class="box-card-1">
                    <div style="width:200px;height:200px;float:left"><img :src="image" style="width:200px;height:200px;"></div>
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
                    <div>
                      <d-player :options="options"
                        @play="play"
                        ref="player">
                      </d-player>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-card>
                        <el-table :data="reviewTableData" style="width: 100%">
                          <el-table-column prop="project" label="评定项目" width="150px">
                          </el-table-column>
                          <el-table-column prop="detail" label="评定要点" >
                          </el-table-column>
                          <el-table-column label="评定成绩" change="">
                            <template slot-scope="scope">
                              <div style="width:100%;padding:0px 10px">
                                <div style><el-slider v-model="scope.row.grade" @change="handleChange" :max="scope.row.max" show-input> </el-slider></div>
                              </div>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-card>
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
export default {
  data() {
    return {
      reviewTableData: [
        {
          project: '自述情况',
          detail: '主要评价学生在答辩过程中的表述情况，对自身项目的描述是否完整，描述的是否精彩',
          grade: 0,
          max: 30
        },
        {
          project: '回答问题情况',
          detail: '主要评价学生在答辩完后回答教师的情况，是否能及时且正确的回答出教师提出的问题',
          grade: 0,
          max: 30
        },
        {
          project: '学术或技术水平',
          detail: '主要评价学生的项目在学术和技术层面上的分数，项目的水准是否足够高',
          grade: 0,
          max: 30
        },
        {
          project: '规范要求与文字表达',
          detail: '主要评价学生的项目书是否达到了规范要求，并且是否有良好的文字表达',
          grade: 0,
          max: 10
        }
      ],
      options: {
        video: {
          url: 'http://p6k20rdt2.bkt.clouddn.com/FoiCdTJ3kxLZGCICyUZn7VlV9Di1'
        },
        autoplay: false,
        contextmenu: [
          {
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }
        ]
      },
      player: null,
      studentFormData: null,
      index: null,
      loading: true,
      activeNames: ['1'],
      studentImage: null,
      studentQuery: {
        Cid: 1
      },
      gradeQuery: {
        type: 'project',
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
        text: null,
        submitstatus: null
      },
      image: null
    }
  },
  created() {
    this.getStudentData()
    this.index = 0
  },
  methods: {
    play() {
      console.log('play callback')
    },
    getStudentData() {
      getStudentByCid(this.studentQuery).then(response => {
        this.studentFormData = response.data.items
        this.gradeQuery.sid = response.data.items[0].sid
        this.imageQuery.uno = response.data.items[0].uno
        fetchReviewGradeList(this.gradeQuery).then(response => {
          this.gradeList = response.data.items[0]
          this.reviewTableData[0].grade = this.gradeList.grade1
          this.reviewTableData[1].grade = this.gradeList.grade1
          this.reviewTableData[2].grade = this.gradeList.grade1
          this.reviewTableData[3].grade = this.gradeList.grade1
          console.log(this.gradeList)
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
      this.index = buttonIndex
      this.player = this.$refs.player.dp
      this.player.switchVideo({
        url: this.studentFormData[this.index].url
      })
    },
    handleChange(value) {
      this.examinationGrade1 = this.reviewTableData[0].grade
      this.examinationGrade2 = this.reviewTableData[1].grade
      this.examinationGrade3 = this.reviewTableData[2].grade
      this.examinationGrade4 = this.reviewTableData[3].grade
    },
    saveButton() {
      this.gradeList.grade1 = this.reviewTableData[0].grade
      this.gradeList.grade2 = this.reviewTableData[0].grade
      this.gradeList.grade3 = this.reviewTableData[0].grade
      this.gradeList.grade4 = this.reviewTableData[0].grade
      if (
        this.studentFormData[this.index].remark !== ''
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