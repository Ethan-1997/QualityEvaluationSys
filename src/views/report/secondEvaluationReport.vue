<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <el-card >
          <div slot="header" class="clearfix">
            <span style="font-size:25px">学中评测报告</span>
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
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <div style="width:100%;text-align:center;font-size:20px">
                      日常出勤汇总
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <div style="width:100%;text-align:center;font-size:20px">
                      违纪、突出表现 重大事项汇总
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="12">
                    <div style="height:60px;padding:35px 0px"><div style="float:left;width:80px"><span>正常出勤：</span></div><div style="float:left;width:78%"><el-progress :text-inside="true" :stroke-width="18" :percentage="100" color="#67c23a"></el-progress></div></div>
                    <div style="height:60px;padding:35px 0px"><div style="float:left;width:80px"><span>迟到：</span></div><div style="float:left;width:78%"><el-progress :text-inside="true" :stroke-width="18" :percentage="100" color="#e6a23c"></el-progress></div></div>
                    <div style="height:60px;padding:35px 0px"><div style="float:left;width:80px"><span>未到：</span></div><div style="float:left;width:78%"><el-progress :text-inside="true" :stroke-width="18" :percentage="100" color="#F56C6C"></el-progress></div></div>
                    <div style="height:60px;padding:35px 0px"><div style="float:left;width:80px"><span>请假：</span></div><div style="float:left;width:78%"><el-progress :text-inside="true" :stroke-width="18" :percentage="100" color="#909399"></el-progress></div></div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="12">
                    <div>
                      <bar-chart ref="barchart1"></bar-chart>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      每日任务/作业完成情况
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="100"  color="#67c23a"></el-progress></div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">上交情况</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="100"  color="#F56C6C"></el-progress></div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">未上交情况</div>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="8">
                    <div style="width:100%">
                      <div style="width:126px;height:126px;text-align:center;margin:0px auto;line-height:126px;font-size:50px">100</div>
                      <div style="width:126px;text-align:center;margin:5px auto 0 auto">作业平均分</div>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      专业知识测试（智育）
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="6">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          笔试题
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="12">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">选择题</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">20/20</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="12">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">判断题</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">30/30</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="14">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          项目答辩
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="5">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:18px">自述情况</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">20/20</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:12px">回答问题情况</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">20/20</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="6">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:12px">学术或技术水平</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">50/50</div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :xs="24" :sm="24" :lg="7">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:6px">规范要求与文字表达</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:30px">50/50</div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="24" :lg="4">
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <div style="width:100%;text-align:center;font-size:20px">
                          合计
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center">
                      <el-col :xs="24" :sm="24" :lg="24">
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div class="grid-content bg-purple" style="width:100%;text-align:center;line-height:40px;font-size:22px">总分</div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" type="flex" justify="center">
                          <el-col :xs="24" :sm="24" :lg="24">
                            <div style="width:100%;text-align:center;line-height:70px;font-size:40px">150</div>
                          </el-col>
                        </el-row>
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
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      点评系统
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <raddar-chart></raddar-chart>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :lg="24">
              <el-card>
                <el-row :gutter="20">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <div style="width:100%;text-align:center;font-size:20px">
                      综合素质模型
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20"  type="flex" justify="center">
                  <el-col :xs="24" :sm="24" :lg="24">
                    <raddar-chart></raddar-chart>
                  </el-col>
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
export default {
  // data() {
  //   return {

  // }
  components: {
    PieChart,
    RaddarChart,
    BarChart
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
