<template>
<div class="dashboard-editor-container">
  <div class="body">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>入学测试简介</span>
        </div>
        <div class="text item">
          <div>1.性格测试：可随机选用动物性格测试法(五种动物类型)、性格色彩测试法、</div>
          <div>&nbsp;九型人格（Ninehouse）测试法等方法中的一个进行测试。</div>
        </div>
      </el-card>
    </div>
    <el-collapse>
      <el-collapse-item title="性格测试" name="character">
        <div class="test">
          <div>虽然从心理学的角度上来讲，性格（character）全然不同于人格（Personality），但我们日常交流中所谈论的性格的含义，</div>
          <div>实际上是指心理学上的人格的概念。心理学家对人格的心理学含义尽管存在众多不同的看法，但在通常意义上是指一个人相对稳</div>
          <div>定的心理特征和行为倾向。在这种意义上说，人格就是中国人通常所理解的性格。正因为如此，有的研究者为了避免引力理解上</div>
          <div>的混乱，主张将心理学上的Personality翻译成“性格”。所以，性格测试，也即是人格测试，或叫人格测量。</div>
        <div class="run"><el-button type="primary">开始测试</el-button></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="专业测试" name="thinking">
        <div class="test">
          <div>专业是指人类社会科学技术进步、生活生产实践中，用来描述职业生涯某一阶段、某一人群，用来谋生，长时期从事的具体业务作业规范。</div>
          <div>也指高等学校或中等专业学校根据社会专业分工的需要设立的学业类别。中国高等学校和中等专业学校，根据国家建设需要和学校性质设</div>
          <div>置各种专业。各专业都有独立的教学计划，以实现专业的培养目标和要求。</div>
          <div class="run"><el-button type="primary">开始测试</el-button></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="思维测试" name="professional">
        <div class="test">
          <div>思维最初是人脑借助于语言对客观事物的概括和间接的反应过程。思维以感知为基础又超越感知的界限。它探索与发现事物的</div>
          <div>内部本质联系和规律性，是认识过程的高级阶段。</div>
          <div>思维对事物的间接反映，是指它通过其他媒介作用认识客观事物，及借助于已有的知识和经验，已知的条件推测未知的事物。思维的概括性表</div>
          <div>现在它对一类事物非本质属性的摒弃和对其共同本质特征的反映</div>
          <div class="run"><el-button type="primary">开始测试</el-button></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</div>
</template>
<script>

</script>

<style>
  .dashboard-editor-container{
    padding:32px;
  }
    .text-bottom{
    font-size: 24px;
    display:block;
    margin-top:25px;
    margin-left:20px;
  }
  .test{
    padding:32px;
    font-size:15px;
  }
  .run{
    float: right;
    
  }
  .body{
    width:1024px;
    margin:0px auto;
  }
  .el-collapse-item__header {
    font-size:16px;
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
  }

  .box-card {
    width: 1024px;
  }
</style>
