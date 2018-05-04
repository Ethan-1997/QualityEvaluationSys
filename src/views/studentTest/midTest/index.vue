<template>
<div class="midtest-index">
  <el-card>
    <div class="text item">
        <section>
            <h2 class="box-title">专业集中测试</h2>
            <template>
                <el-table style="width: 100%" :data="professionalTest">
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
    export default {
      data() {
        return {
          visible2: false,
          midtest: [],
          professionalTest: [
            { name: '期末测试（1）', date: '2017/9/20', radio: '期末', state: '未完成' },
            { name: '期末测试（2）', date: '2017/9/20', radio: '期末', state: '未完成' },
            { name: '期末测试（3）', date: '2017/9/20', radio: '期末', state: '未完成' },
            { name: '期末测试（4）', date: '2017/9/20', radio: '期末', state: '未完成' },
            { name: '期末测试（5）', date: '2017/9/20', radio: '期末', state: '未完成' }
          ]
        }
      },
      methods: {
        goTest(row) {
          const path = '/systemTest/lastTest' + row.name.split('')[5] + '/'
          this.$router.push({ path: path })
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
