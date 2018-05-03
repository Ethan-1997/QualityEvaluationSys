<template>
<div class="dashboard-editor-container">
  <el-row :gutter="20">
    <el-col :span="24">
        <template>
          <el-card>
            <div slot="header" class="clearfix">
              <span style="font-size:25px">人事经理面试</span>
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
                    <div>
                      <d-player :options="options"
                        @play="play"
                        ref="playerhr">
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
                        <el-row :gutter="20">
                          <el-col :span="7" :offset="3">
                            <div style="font-size:16px">职场礼仪：<el-rate show-text v-model="gradeList.grade1"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">职业生涯规划：<el-rate show-text v-model="gradeList.grade2"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">交际能力：<el-rate show-text v-model="gradeList.grade3"></el-rate></div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :span="7" :offset="3">
                            <div style="font-size:16px">思维能力：<el-rate show-text v-model="gradeList.grade4"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">责任意识：<el-rate show-text v-model="gradeList.grade5"></el-rate></div>
                          </el-col>
                          <el-col :span="7">
                            <div style="font-size:16px">素质素养：<el-rate show-text v-model="gradeList.grade6"></el-rate></div>
                          </el-col>
                        </el-row>
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
      studentFormData: [{ Simage: null }],
      index: null,
      loading: true,
      activeNames: ['1'],
      studentImage: null,
      studentQuery: {
        Cid: 1
      },
      gradeQuery: {
        type: 'hr',
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
      this.switchHandle()
    },
    switchHandle(temp) {
      this.player.switchVideo({
        url: temp
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
      this.player = this.$refs.player.dp
      this.player.switchVideo({
        url: this.studentFormData[this.index].url
      })
    },
    saveButton() {
      console.log(this.gradeList)
      if (
        this.gradeList.grade1 !== 0 &&
        this.gradeList.grade2 !== 0 &&
        this.gradeList.grade3 !== 0 &&
        this.gradeList.grade4 !== 0 &&
        this.gradeList.grade5 !== 0 &&
        this.gradeList.grade6 !== 0 &&
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