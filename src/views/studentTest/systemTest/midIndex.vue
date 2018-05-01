<template>
  <div style="background:#fff;padding:250px 0px ;">
      <el-row>
          <el-col :span="8" :offset="8">
              <el-card>
                    <div slot="header" class="clearfix">
                        <span>考试需知</span>
                        <el-button  style="float: right; padding: 3px 0；font-size:18px;" type="text" @click="goTest">开始测试</el-button>
                    </div>
                    <div>
                        <span class="block">1.本测试由系统随机抽取题目</span>
                        <span class="block">2.考试时间为60分钟</span>
                        <span class="block">3.发现作弊直接0分</span>
                        <span class="block">4.请每个同学认真做题</span>
                    </div>
                </el-card>
          </el-col>
      </el-row>
      
  </div>
</template>
<script>
export default {
  methods: {
    goTest() {
      this.$router.push({ name: 'systemTest-midTest' })
    }
  }
}
</script>

<style scoped>

    .block{
        display: block;
        font-size: 18px;
    }
    .clearfix{
        font-size:18px;
    }
</style>


