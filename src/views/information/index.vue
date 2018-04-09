<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :span="4" class="fill-height"></el-col>
      <el-col :span="16">
        <el-row style="background:#fff;">
          <el-col :span="24">
            <el-row>
              <el-col :span="4">
                <div class="infor-home-pic"><img src="../../assets/student-information/Rock-Roll-Rabbit2.png" /></div>
              </el-col>
              <el-col :span="1" style="height:1px;"></el-col>
              <el-col :span="13">
                <el-row>
                  <el-col :span="24">
                   <span class="infor-name2">摇滚兔子</span>
                  </el-col>
                  <el-col :span="24">
                    <el-collapse style="">
                    <el-collapse-item title="查看详细信息" name="1">
                      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                    </el-collapse-item>
                  </el-collapse>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="1" class="fill-height"></el-col>
              <el-col :span="4">
                <el-button @click="alterInformation" type="primary" plain class="alter-button">修改个人信息&nbsp;<i class="el-icon-arrow-right"></i></el-button>
              </el-col>
              <el-col :span="1" class="fill-height"></el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="height:20px;"></el-col>
            </el-row>
          </el-col>
          <el-col :span="19"></el-col>
          <el-col :span="5"></el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="height:10px;"></el-col>
        </el-row>
        <el-row>
          <el-col :span="18" style="background:#fff;padding:16px 32px 16px 32px;">
            <el-row>
              <el-col :span="23">
                <el-tabs>
                  <el-tab-pane label="入学测评报告" name="first">用户管理</el-tab-pane>
                  <el-tab-pane label="期中测评报告" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="期末测评报告" name="third">角色管理</el-tab-pane>
                </el-tabs>
              </el-col>
              <el-col :span="1" class="fill-height"></el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" class="fill-height"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    alterInformation() {
      this.$router.push({ path: '/information/alter' })
    }
  }
}
</script>

<style>
.el-tabs__item {
  font-size:16px;
}
.alter-button{
  margin:180px 0px 0px 0px;
}
.el-collapse-item__header{
  border-bottom:none;
  font-size:16px;
}

.infor-home-pic{
  margin-left:20px;
  margin-top:40px;
  border-radius: 90px;
}
.fill-height{
  height:1px;
}
.infor-name2{
  font-weight: bold;
  display: block;
  font-size: 24px;
  margin-top:150px;
}
.dashboard-editor-container{
  background-color: rgb(240, 242, 245);
  padding: 32px;
}
</style>

