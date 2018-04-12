<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-card class="box-card-report">
          <div slot="header" class="clearfix">
            <span style="font-size:25px">入学评测报告</span>
          </div>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <div style="padding:0 0 16px 0;margin:0 30px 0 0;float:left">
                  <img style="width:150px;height:150px" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/>
                </div>
                <div style="float:left">
                  <el-row  :gutter="20">
                    <el-col :xs="24" :sm="24" :lg="24">
                      <div style="width:170px;line-height:37px;font-size:17px"><svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;摇滚兔子</div>
                      <div style="width:170px;line-height:37px;font-size:17px"><i class="el-icon-info"/>&nbsp;&nbsp;学号:&nbsp;&nbsp;16147131</div>
                      <div style="width:170px;line-height:37px;font-size:17px"><i class="el-icon-star-on"/>&nbsp;&nbsp;性别:&nbsp;&nbsp;男</div>
                      <div style="width:170px;line-height:37px;font-size:17px"><svg-icon icon-class="peoples" />&nbsp;&nbsp;班级:&nbsp;&nbsp;vue.js</div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col  :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20" type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;line-height:40px;font-size:20px">
                      专业能力测试
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" ju40ify="center">
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">选择题</div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{professional.single_success}}/{{professional.single_total}}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">判断题</div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;line-height:70px;font-size:30px">{{professional.judgment_success}}/{{professional.judgment_total}}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">填空题</div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;line-height:70px;font-size:30px">0/0</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">问答题</div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;line-height:70px;font-size:30px">0/0</div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="5">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:25px">总分</div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;line-height:70px;font-size:40px">{{professional.score}}</div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24">
                    <el-row justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px;">
                          性格测试
                        </div>
                      </el-col>
                      <el-col :sm="24" :lg="12">
                        <div style="width:100%;text-align:center;margin-top:20px;">
                        <pie-chart></pie-chart>
                        </div>
                      </el-col>
                      <el-col :sm="24" :lg="12">
                        <div style="margin-top:20px;" v-if="character===0">
                            <div style="width:100%;text-align:center;font-size:18px;margin-bottom:20px;">老虎型</div>
                            <div style="width:100%;text-align:left;font-size:16px;">
                              个性特点：有自信，够权威，决断力高，竞争性强，胸怀大志，喜欢评估。
                               企图心强烈，喜欢冒险，个性积极，竞争力强，有对抗性。<br/>
                              老虎泰格，具备高支配型特质，竞争力强、好胜心盛、积极自信，是个有决断力的组织者。他胸怀
                              大志、勇于冒险、分析敏锐，主动积极且具极为强烈的企图心，只要认定目标就勇往直前，不畏反抗与攻讦，誓要取得目标的家伙。<br/>
                              老虎型领导人都倾向以权威作风来进行决策，当其部属者除要高度服从外，也要有冒险犯难的勇气，为其杀敌闯关。
                            </div>
                        </div>
                            <div style="margin-top:20px;" v-if="character===1">
                            <div style="width:100%;text-align:center;font-size:18px;margin-bottom:20px;">孔雀型</div>
                            <div style="width:100%;text-align:left;font-size:16px;">
                              个性特点：很热心，够乐观，口才流畅，好交朋友，风度翩翩，诚恳热心。热情洋溢、好交朋友、口才流畅、个性乐观、表现欲强。<br/>
                              孔雀百利具有高度的表达能力，他的社交能力极强，有流畅无碍的口才和热情幽默的风度，在团体或社群中容易广结善缘、建立知名度。
                              孔雀型领导人天生具备乐观与和善的性格，有真诚的同情心和感染他人的能力，在以团队合作为主的工作环境中，会有最好的表现<br/>
                              孔雀型领导人在任何团体内，都是人缘最好的人和最受欢迎的人，是最能吹起领导号角的人物。
                            </div>
                          </div>
                          <div style="margin-top:20px;" v-if="character===2">
                            <div style="width:100%;text-align:center;font-size:18px;margin-bottom:20px;">熊猫型</div>
                            <div style="width:100%;text-align:left;font-size:16px;">
                              个性特点：很稳定，够敦厚，温和规律，不好冲突。行事稳健、强调平实，有过人的耐力，温和善良。<br/>
                              无尾熊加利具有高度的耐心。他敦厚随和，行事冷静自持；生活讲求律规但也随缘从容，面对困境，都能泰然自若。
                              无尾熊型领导人，适宜当安定内部的管理工作，在需要专业精密技巧的领域，或在气氛和谐且不具赶迫时间表等的职场环境中，他们最能发挥所长。
                              当企业的产品稳踞市场时，无尾熊型的企业领导人是极佳的总舵手。<br/>
                              无尾熊型领导人强调无为而治，能与周围的人和睦相处而不树敌，是极佳的人事领导者，适宜在企业改革后，为公司和员工重建互信的工作。
                            </div>
                          </div>
                          <div style="margin-top:20px;" v-if="character===4">
                            <div style="width:100%;text-align:center;font-size:18px;margin-bottom:20px;">变色龙型</div>
                            <div style="width:100%;text-align:left;font-size:16px;">
                              善于在工作中调整自己的角色去适应环境，具有很好的沟通能力。
                              综合老虎、孔雀、熊猫、猫头鹰的特质，看似没有凸出个性，但擅长整合内外资；  没有强烈的个人意识形态，是他们处事的价值观。<br/>
                               变色龙科尔具有高度的应变能力。他性格善变，处事极具弹性，能为了适应环境的要求而调整其决定甚至信念。<br/>
                             变色龙型的领导人既没有凸出的个性，对事也没有什么强烈的个人意识型态，事事求中立并倾向站在没有立场的位置，故在冲突的环境中，是个能游走折中的高手。
                            </div>
                          </div>
                          <div style="margin-top:20px;" v-if="character === 3">
                            <div style="width:100%;text-align:center;font-size:18px;margin-bottom:20px;">猫头鹰型</div>
                            <div style="width:100%;text-align:left;font-size:16px;">
                              个性特点：很传统，注重细节，条理分明，责任感强，重视纪律。保守、分析力强，精准度高，喜欢把细节条例化，个性拘谨含蓄。 <br/>
                              猫头鹰斯诺具有高度精确的能力，其行事风格，重规则轻情感，事事以规则为准绳，并以之为主导思想。 他性格内敛、善于以数字或规条为表达
                              工具而不大擅长以语言来沟通情感或向同事和部属等作指示。 他行事讲究条理分明、守纪律重承诺，是个完美主义者<br/>
                              猫头鹰型领导人尊重传统、重视架构、事事求据喜爱工作安定的性格，是企业安定力量的来源。
                            </div>
                          </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24">
                    <el-row>
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px;">
                          思维能力测试
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :xs="24" :sm="24" :lg="4" style="height:1px;"></el-col>
                      <el-col :xs="24" :sm="24" :lg="16">
                        <div>
                          <bar-chart></bar-chart>
                        </div>
                        <div style="font-size:20px;width:100%;text-align:center;padding:20px;">
                          你的分数为{{thinking}}分，逻辑思维能力{{results}}
                        </div>
                        <div style="font-size:14px;width:100%;text-align:center;color:gray;">
                          总分0-13分，逻辑思维能力优秀&nbsp;&nbsp;总分14-19分，逻辑思维能力良好&nbsp;&nbsp;总分20-25分，逻辑思维能力中等&nbsp;&nbsp;总分26-45分，逻辑思维能力不佳
                        </div>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="4" style="height:1px;"></el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col  :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20" type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;line-height:40px;font-size:20px">
                      专业推荐
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" ju40ify="center">
                  <div style="padding:0px 32px 16px 32px;">
                    {{ firstReport[0].title }}
                  </div>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import RaddarChart from './components/RaddarChart'
import BarChart from './components/BarChart'
import { fetchListFirstReport } from '@/api/firstReport'
export default {
  data() {
    return {
      character: 0,
      firstReport: [],
      thinking: 0,
      results: '优秀',
      professional: {
        single_success: 0,
        single_total: 0,
        judgment_success: 0,
        judgment_total: 0,
        score: 0
      }
    }
  },
  components: {
    PieChart,
    RaddarChart,
    BarChart
  },
  created() {
    this.init()
    console.log(this.professional)
    if (this.thinking < 14) {
      this.results = '优秀'
    } else if (this.thinking < 20) {
      this.results = '良好'
    } else if (this.thinking < 26) {
      this.results = '中等'
    } else {
      this.results = '不佳'
    }
  },
  methods: {
    init() {
      if (this.$storage.get('character') !== null) {
        const chara = this.$storage.get('character')
        let max = 0
        for (let i = 1; i < chara.length; i++) {
          if (max < chara[i]) {
            max = chara[i]
            this.character = i
          }
        }
      }
      console.log(this.character)
      if (this.$storage.get('thinking') !== null) {
        this.thinking = this.$storage.get('thinking')
      }
      if (this.$storage.get('professional') !== null) {
        this.professional = this.$storage.get('professional')
      }
      fetchListFirstReport().then(Response => {
        this.firstReport = Response.data.items
        console.log(this.firstReport)
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
