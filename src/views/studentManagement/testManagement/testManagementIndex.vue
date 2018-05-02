<template>
<div class="app-container calendar-list-container">
  <el-card class="el-card-bottom">
      <div slot="header" class="clearfix">
        <span style="font-size:25px">制作试卷</span>
      </div>
        <section>
            <template>
                <el-table style="width: 100%" height="330" :data="exams">
                <el-table-column label="试卷名称" width="130">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">
                      日常测试
                    </template>
                </el-table-column>
                <el-table-column label="创建日期" width="100">
                    <template slot-scope="scope">
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template slot-scope="scope">
                        <el-button type="success" @click="midissue(scope.row)" v-if="scope.row.display">发布</el-button>
                        <el-button type="primary" @click="midcancel(scope.row)" v-if="scope.row.display===false">取消</el-button>
                        <el-button type="warning" @click="editTest(scope.row)">编辑</el-button>
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
        <ui-raised-button label="制作试卷" primary to="/tests/testAdd" style="float:right;margin:20px;"/>
      </el-card>
</div>
</template>

<script>
    import { deleteTest, updateTest } from '@/api/testInformation'
    import { fetchListTeacherTest, deleteTeacherTest } from '@/api/TeacherTest'
    import { createStudentTest, deleteStudentTest } from '@/api/StudentTest'
    export default {
      data() {
        return {
          visible2: false,
          exams: [
          ],
          date: new Date(),
          midtest: [],
          type: '',
          radio2: ''
        }
      },
      mounted() {
        this.getList()
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
        editTest(row) {
          if (row.display === false) {
            this.$notify({
              title: '失败',
              message: '请先取消发布',
              type: 'error',
              duration: 2000
            })
          } else {
            this.$router.push({ path: '/tests/' + row.Tid + '/edit' })
          }
        },
        getList() {
          fetchListTeacherTest(this.$route.params.Tno).then(response => {
            this.exams = response.data.items
            // console.log(this.list)
          })
        },
        midissue(data) {
          const infor = {
            Tid: data.Tid,
            Sid: data.Sid,
            name: data.name,
            date: data.date,
            state: '未完成',
            radio: '日常',
            gread: null
          }
          this.data.display = false
          updateTest(data)
          createStudentTest(infor).then(res => {
            if (res.data.data === 'success') {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '创建失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        },
        midcancel(data) {
          this.data.display = true
          updateTest(data)
          deleteStudentTest(data.Tid).then(res => {
            if (res.data.data === 'success') {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '取消成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '取消失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        },
        cs() {
          console.log(this.$refs)
        },
        remove(data) {
          deleteTeacherTest(data)
          deleteTest(data).then(res => {
            if (res.data.data === 'success') {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '删除失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        }
  }
    }
</script>

<style scoped>
.el-card-bottom{
  margin-bottom: 10px;
}
</style>
