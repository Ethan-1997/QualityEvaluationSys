<template>
<div class="midtest-index">
  <el-card>
    <div class="text item">
        <section>
            <h2 class="box-title">日常测试</h2>
            <template>
                <el-table style="width: 100%" :data="dailyTest">
                <el-table-column label="试卷名称" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="上传日期" width="280">
                    <template slot-scope="scope">
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.radio}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.state}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" @click="goTest(scope.row)" :disabled="scope.row.state === '已完成'">开始测试</el-button>
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
import { fetchListStudentTest } from '@/api/StudentTest'
export default {
  data() {
    return {
      visible2: false,
      dailyTest: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getList() {
      fetchListStudentTest().then(response => {
        this.dailyTest = response.data.items
      })
    },
    goTest(row) {
      this.$router.push({ path: '/tests/' + row.Tid + '/' + row.Sid })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .midtest-index{
    padding:32px;
    background-color: rgb(240, 242, 245);
  }
    .text-bottom{
    font-size: 24px;
    display:block;
    margin-top:25px;
    margin-left:20px;
  }
  .box-card {
    width: 680px;
    height:400px;
    margin:100px auto;
  }
</style>
