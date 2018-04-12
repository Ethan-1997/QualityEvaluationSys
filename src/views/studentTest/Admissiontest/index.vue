<template>
  <div class="dashboard-editor-container-sti">
    <div style="margin-bottom:5px">
        <el-card>
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :lg="4" :md="6" :sm="6" :xs="6">
                  <div class="infor-home-pic2"><img style="border-radius:90px;margin:50px 0px 0px 20px" width="150px" height="150px" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/></div>
                </el-col>
                <el-col :lg="1" :md="1" :sm="2" :xs="6" style="height:1px;"></el-col>
                <el-col :lg="3" :md="17" :sm="16" :xs="12">
                  <el-row>
                    <el-col :span="24">
                    <span class="infor-name1">摇滚兔子</span>
                    </el-col>
                    <el-col :span="24">
                      <div class="infor-name3">学号：9527</div>
                      <div class="infor-name3">班级：Vue.js</div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :lg="1" :md="3" :sm="3"></el-col> 
                <el-col :lg="13" :md="21" :sm="21">
                </el-col>
                <el-col :span="2" class="fill-height"></el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="height:20px;"></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
    </div>
    <el-row>
      <el-col :span="18">
        <el-row style="margin-right:5px">
            <el-card>
              <el-row>
                <el-col :span="24">
                    <el-collapse v-model="activeName" accordion>
                      <el-collapse-item title="性格测试" name="character">
                        <div class="test">
                          <div>虽然从心理学的角度上来讲，性格（character）全然不同于人格（Personality），但我们日常交流中所谈论的性格的含义，</div>
                          <div>实际上是指心理学上的人格的概念。心理学家对人格的心理学含义尽管存在众多不同的看法，但在通常意义上是指一个人相对稳</div>
                          <div>定的心理特征和行为倾向。在这种意义上说，人格就是中国人通常所理解的性格。正因为如此，有的研究者为了避免引力理解上</div>
                          <div>的混乱，主张将心理学上的Personality翻译成“性格”。所以，性格测试，也即是人格测试，或叫人格测量。</div>
                        <div class="run"><el-button type="primary" @click="gochara" :disabled="this.disabled_character">开始测试</el-button></div>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="专业测试" name="professional">
                        <div class="test">
                          <div>专业是指人类社会科学技术进步、生活生产实践中，用来描述职业生涯某一阶段、某一人群，用来谋生，长时期从事的具体业务作业规范。</div>
                          <div>也指高等学校或中等专业学校根据社会专业分工的需要设立的学业类别。中国高等学校和中等专业学校，根据国家建设需要和学校性质设</div>
                          <div>置各种专业。各专业都有独立的教学计划，以实现专业的培养目标和要求。</div>
                          <div class="run"><el-button type="primary" @click="goprofe" :disabled="this.disabled_professional">开始测试</el-button></div>
                        </div>
                      </el-collapse-item>
                      <el-collapse-item title="思维测试" name="thinking">
                        <div class="test">
                          <div>思维最初是人脑借助于语言对客观事物的概括和间接的反应过程。思维以感知为基础又超越感知的界限。它探索与发现事物的</div>
                          <div>内部本质联系和规律性，是认识过程的高级阶段。</div>
                          <div>思维对事物的间接反映，是指它通过其他媒介作用认识客观事物，及借助于已有的知识和经验，已知的条件推测未知的事物。思维的概括性表</div>
                          <div>现在它对一类事物非本质属性的摒弃和对其共同本质特征的反映</div>
                          <div class="run"><el-button type="primary" @click="gothink" :disabled="this.disabled_thinking">开始测试</el-button></div>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                </el-col>
              </el-row>
            </el-card>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row>
            <el-card>
              <el-col :span="23" style="background:#fff;">
                <el-row style="padding:32px;">
                  <el-col :span="24">
                    <div class="complete">
                      <el-progress type="circle" :percentage="percentage"></el-progress>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="complete">测评完成率</div>
                  </el-col>
                  <el-col :span="24">
                    <div class="complete"></div>
                  </el-col>
                  <el-col :span="24" style="height:20px;"></el-col>
                  <el-col :span="24">
                    <div class="complete"><el-button type="primary" @click="firstEvaluationReport" :disabled="this.disabled_report">测评报告</el-button></div>
                    <!-- <div class="complete"><el-button type="primary" @click="clear">清空所有</el-button></div> -->
                  </el-col>
                </el-row>
              </el-col>
            </el-card>
        </el-row>
      </el-col>
    </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: '',
      percentage: 0,
      disabled_report: true,
      disabled_character: false,
      disabled_professional: false,
      disabled_thinking: false,
      ctest: ''
    }
  },
  created() {
    console.log(this.disabled_report)
    this.disabled_character = this.$storage.get('ctest')
    this.disabled_professional = this.$storage.get('ptest')
    this.disabled_thinking = this.$storage.get('ttest')
    this.percentage = this.$storage.get('percentage')
    this.activeName = this.$storage.get('name')
    if (this.activeName === null) this.activeName = 'character'
    console.log(this.activeName)
    if (this.percentage === 99) {
      this.percentage = 100
      this.$storage.set('percentage', this.percentage)
    }
    if (this.percentage < 100) {
      this.disabled_report = true
    } else {
      this.disabled_report = false
    }
  },
  methods: {
    // clear() {
    //   this.$storage.set('ctest', false)
    //   this.$storage.set('ptest', false)
    //   this.$storage.set('ttest', false)
    //   this.$storage.set('percentage', 0)
    // },
    alterInformation() {
      console.log(this.activeName)
    },
    firstEvaluationReport() {
      this.$router.push({ name: 'firstEvaluationReport' })
    },
    gochara() {
      this.$router.push({ path: '/Admissiontest/Character/' })
    },
    goprofe() {
      this.$router.push({ path: '/Admissiontest/Professional/' })
    },
    gothink() {
      this.$router.push({ path: '/Admissiontest/Thinking/' })
    }
  }
}
</script>

<style >
.infor-name3{
  font-size:14px;
}

.complete{
  margin:0px auto;
  text-align: center;
}
.infor{
  font-size:12px;
}
  .test{
    padding:32px;
    font-size:15px;
  }
  .run{
    float: right;
    
  }
.el-tabs__item {
  font-size:16px;
}
.el-collapse-item__header{
  font-size:16px;
}

.infor-home-pic{
  margin-left:20px;
  margin-top:40px;
  border-radius: 90px;
}
.infor-name1{
  font-weight: bold;
  display: block;
  font-size: 24px;
  margin-top:120px;
}
.dashboard-editor-container-sti{
  background-color: rgb(240, 242, 245);
  padding: 32px;
}
</style>

