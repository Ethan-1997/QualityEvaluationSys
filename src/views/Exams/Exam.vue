<template>
<div class="exam">
  <el-card>
    <div class="text item">
        <section>
            <h2 class="box-title">我的试卷</h2>
            <template>
                <el-table style="width: 100%" :data="exams">
                <el-table-column label="试卷名称" width="130">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上传日期" width="130">
                    <template slot-scope="scope">
                        <span>{{ scope.row.year }}/{{ scope.row.month }}/{{ scope.row.day }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">
                      <el-radio-group v-model="scope.row.id" @change="typechange(scope.row.id)">
                        <el-radio :label="3">日常</el-radio>
                        <el-radio :label="6">期中</el-radio>
                        <el-radio :label="9">期末</el-radio>
                      </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="midissue(scope.row)" v-if="scope.row.display">发布</el-button>
                        <el-button type="primary" @click="midcancel(scope.row)" v-if="scope.row.display===false">取消</el-button>
                        <el-button type="warning" @click="editTest(scope.row.id)">编辑</el-button>
                        <el-button type="danger"  @click.prevent="remove(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </template>
            <!-- <ul>
                <li v-for="exam in exams">
                    {{ exam.name }}
                    <router-link :to="'/Exams/Exam/' + exam.id">查看</router-link>
                    <router-link :to="`/Exams/Exam/${exam.id}/edit`">编辑</router-link>
                    <a href="#" >删除</a>
                </li>
            </ul> -->
        </section>
        <ui-raised-button label="制作试卷" primary to="/Exams/ExamAdd" style="float:right;margin:20px;"/>
        <section>
            <h2 class="box-title">系统试卷</h2>
            <template>
                <el-table style="width: 100%" :data="system_exams_mid">
                <el-table-column label="试卷名称" width="130">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上传日期" width="130">
                    <template slot-scope="scope">
                        <span>{{ scope.row.year }}/{{ scope.row.month }}/{{ scope.row.day }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="说明">
                    <template slot-scope="scope">
                      {{ scope.row.explain }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="midissue_system(scope.row)" v-if="scope.row.display">发布</el-button>
                        <el-button type="primary" @click="midcancel_system(scope.row)" v-if="scope.row.display===false">截止</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </template>
            <!-- <ul>
                <li v-for="exam in exams">
                    {{ exam.name }}
                    <router-link :to="'/Exams/Exam/' + exam.id">查看</router-link>
                    <router-link :to="`/Exams/Exam/${exam.id}/edit`">编辑</router-link>
                    <a href="#" >删除</a>
                </li>
            </ul> -->
        </section>
    </div>
  </el-card>
</div>
</template>

<script>
    export default {
      data() {
        return {
          visible2: false,
          exams: [
          ],
          midtest: [],
          type: '',
          system_exams_mid: [
            { name: '期中测试', year: 2018, month: 4, day: 9, display: true, id: null, state: '未完成', explain: '系统随机生成一套期中试卷' },
            { name: '期末测试', year: 2018, month: 4, day: 9, display: true, id: null, state: '未完成', explain: '系统随机生成五套期末试卷' }
          ],
          radio2: ''
        }
      },
      mounted() {
        this.init()
      },
      methods: {
        typechange(row) {
          if (row !== '') {
            if (row === 3) {
              this.type = '日常'
            } else if (row === 6) {
              this.type = '期中'
            } else {
              this.type = '期末'
            }
          }
        },
        checkTest(id) {
          this.$router.push({ path: '/Exams/Exam/' + id })
        },
        editTest(id) {
          this.$router.push({ path: '/Exams/Exam/' + id + '/edit' })
        },
        init() {
          const exams = this.$storage.get('exams')
          if (this.$storage.get('system_exams_mid') !== null) {
            this.system_exams_mid = this.$storage.get('system_exams_mid')
          }
          if (exams) {
            this.exams = exams
          } else {
            this.$storage.get('exams', [])
          }
        },
        midissue(data) {
          if (this.radio2 !== '') {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            const midtest = this.$storage.get('midtest', [])
            midtest.push({
              id: data.id,
              name: data.name,
              day: data.day,
              month: data.month,
              year: data.year,
              state: data.state,
              radio: this.type
            })
            this.$storage.set('midtest', midtest)
            for (let i = 0; i < this.exams.length; i++) {
              if (this.exams[i].id === data.id) {
                this.exams[i].display = false
              }
            }
            this.$storage.set('exams', this.exams)
          } else {
            this.$message({
              message: '请选择类型',
              type: 'warning'
            })
          }
        },
        midcancel(data) {
          this.$message({
            message: '取消成功'
          })
          const midtest = this.$storage.get('midtest')
          for (let i = 0; i < midtest.length; i++) {
            if (midtest[i].id === data.id) {
              midtest.splice(i, 1)
              this.midtest.splice(i, 1)
            }
          }
          for (let i = 0; i < this.exams.length; i++) {
            console.log(this.exams[i].display)
            if (this.exams[i].id === data.id) {
              this.exams[i].display = true
            }
          }
    
          this.$storage.set('midtest', midtest)
          this.$storage.set('exams', this.exams)
          console.log(this.exams)
        },
        midissue_system(data) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          const midtest = this.$storage.get('midtest', [])
          const radio = data.name.split('', 2)[0] + data.name.split('', 2)[1]
          if (radio === '期中') {
            midtest.push({
              id: data.id,
              name: data.name,
              day: data.day,
              month: data.month,
              year: data.year,
              state: data.state,
              radio: radio
            })
          } else {
            for (let i = 0; i < 5; i++) {
              const name = '期末测试(' + (+i + +1) + ')'
              console.log(name.split('')[5])
              midtest.push({
                id: data.id,
                name: name,
                day: data.day,
                month: data.month,
                year: data.year,
                state: data.state,
                radio: radio
              })
            }
          }
          console.log()
          this.$storage.set('midtest', midtest)
          for (let i = 0; i < this.system_exams_mid.length; i++) {
            if (this.system_exams_mid[i].name === data.name) {
              this.system_exams_mid[i].display = false
            }
          }
          this.$storage.set('system_exams_mid', this.system_exams_mid)
        },
        midcancel_system(data) {
          this.$message({
            message: '截止成功'
          })
          const midtest = this.$storage.get('midtest')
          const dataname = data.name.split('', 2)[0] + data.name.split('', 2)[1]
          if (dataname === '期中') {
            for (let i = 0; i < midtest.length; i++) {
              if (midtest[i].name === data.name) {
                midtest.splice(i, 1)
                this.midtest.splice(i, 1)
              }
            }
          } else {
            for (let i = 0; i < midtest.length; i++) {
              if (midtest[i].radio === dataname) {
                midtest.splice(i, 5)
                this.midtest.splice(i, 5)
                break
              }
            }
          }
    
          for (let i = 0; i < this.system_exams_mid.length; i++) {
            if (this.system_exams_mid[i].name === data.name) {
              this.system_exams_mid[i].display = true
            }
          }
          this.$storage.set('midtest', midtest)
          this.$storage.set('system_exams_mid', this.system_exams_mid)
        },
        cs() {
          console.log(this.$refs)
        },
        remove(exam) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            const exams = this.$storage.get('exams')
            const midtest = this.$storage.get('midtest')
            for (let i = 0; i < exams.length; i++) {
              if (exams[i].id === exam.id) {
                if (midtest !== null) {
                  for (let j = 0; j < midtest.length; j++) {
                    if (midtest[j].id === exams[i].id) {
                      midtest.splice(j, 1)
                      this.midtest.splice(j, 1)
                    }
                  }
                }
                localStorage.removeItem('exam-' + exams[i].id)
                exams.splice(i, 1)
                this.exams.splice(i, 1)
              }
            }
            this.$storage.set('exams', exams)
            this.$storage.set('midtest', midtest)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      }
    }
</script>

<style scoped>
/* .exam{
  padding:32px;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  } */
</style>
