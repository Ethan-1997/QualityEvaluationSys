<template>
  <div class="errPage-container">
    <!-- <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button> -->
    <el-row>
      <el-col :span="8">
        <h1 class="text-jumbo text-ginormous">Success!</h1>
        <ul class="list-unstyled">
          <li class="link-type">
            <el-button @click="back" icon='arrow-left'  type="primary">返回测试首页</el-button>
          </li>
        </ul>
      </el-col>
      <el-col :span="16" style="margin-top:-80px;">
        <img src="https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646" width="800" height="600" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import loadGif from '@/assets/loading/loading.gif'

export default {
  name: 'page401',
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$router.push({ name: 'Admissiontest-index' })
    },
    inforalter() {
      this.$router.push({ path: '/information/alter' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .errPage-container {
    width: 800px;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #F56C6C;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
