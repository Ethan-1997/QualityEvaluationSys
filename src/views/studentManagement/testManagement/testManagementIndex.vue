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
                        <span>{{ scope.row.tname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型"  width="150">
                    <template slot-scope="scope">
                      日常测试
                    </template>
                </el-table-column>
                <el-table-column label="选择班级" width="250">
                  <template slot-scope="scope">
                <el-select v-model="scope.row.cid" placeholder="Select">
                  <el-option
                    v-for="item in classlist"
                    :key="item.cid"
                    :label="item.cname"
                    :value="item.cid">
                  </el-option>
                </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="创建日期" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.tdate }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="success" @click="midissue(scope.row)" v-if="scope.row.tdisplay==='false'">发布</el-button>
                        <el-button type="primary" @click="midcancel(scope.row)" v-if="scope.row.tdisplay==='true'">取消</el-button>
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
    import { deleteTest } from '@/api/testInformation'
    import { fetchListTeacherTest, updateTeacherTest } from '@/api/TeacherTest'
    import { switchDisplay } from '@/api/StudentTest'
    import { getCurrentUser } from '@/api/user'
    import { fetchList } from '@/api/class'
    export default {
      data() {
        return {
          classlist: [],
          listQuery: {
            page: 1,
            limit: 20
          },
          visible2: false,
          exams: [
          ],
          date: new Date(),
          midtest: [],
          type: '',
          radio2: '',
          Tno: ''
        }
      },
      mounted() {
        this.getList()
        console.log('in')
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
            this.$router.push({ path: '/tests/' + row.tid + '/edit', params: { tid: row.tid }})
          }
        },
        getList() {
          getCurrentUser().then(response => {
            this.Tno = response.data.user.tno
            const data = {
              Tno: this.Tno
            }
            fetchListTeacherTest(data).then(response => {
              console.log(response.data.item)
              this.exams = response.data.item
              console.log(234)
              fetchList(this.listQuery).then(response => {
                this.classlist = response.data.items
                console.log(this.classlist)
              })
            // console.log(this.list)
            })
          })
        },
        midissue(data) {
          const infor = {
            cid: data.cid,
            tid: data.tid,
            status: 1
          }
          data.tdisplay = 'true'
          switchDisplay(infor).then(res => {
            if (res.data.data === 'success') {
              this.getList()
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '发布成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '发布失败',
                type: 'error',
                duration: 2000
              })
            }
          })
          updateTeacherTest(data)
        },
        midcancel(data) {
          const infor = {
            cid: data.cid,
            tid: data.tid,
            status: 0
          }
          data.tdisplay = 'false'
          switchDisplay(infor).then(res => {
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
          updateTeacherTest(data)
        },
        cs() {
          console.log(this.$refs)
        },
        remove(data) {
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
