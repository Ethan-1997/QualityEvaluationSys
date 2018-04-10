<template>
  <el-card style="width:80%;margin:0 auto;">
    <el-form ref="form">
      <el-form-item label="项目标题">
        <el-input v-model="temp.title"></el-input>
      </el-form-item>
      <el-form-item label="目标">
        <el-input v-model="temp.aims"></el-input>
      </el-form-item>
        <el-form-item label="负责人">
        <el-input v-model="temp.principal"></el-input>
      </el-form-item>
       </el-form-item>
        <el-form-item label="简介" type="textarea" :autosize="{ minRows: 5, maxRows: 8}">
        <el-input v-model="temp.introduction"></el-input>
      </el-form-item>
      <el-form-item label="起止日期">
        <br/>
         <el-date-picker
          v-model="temp.startAndEndTime"
          value-format="yyyy年MM月dd日"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="项目文件上传">
         <br/>
        <el-upload
          class="upload-demo"
          drag
          :data="uptoken"
          :before-upload="beforeUpload"
          action="https://upload.qiniup.com"
          :on-success="handleUploadSuccess"
          :on-preview="handlePreview"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{status==='update'?'保存':'新建'}}</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
    </el-form>

    

  </el-card>
</template>

<script>
import { getToken } from '@/api/qiniu'
import { createProjectDefense, updateProjectDefense } from '@/api/projectDefense'
export default {
  created() {
    this.status = this.$storage.get('status', [])
    if (this.status === 'update') {
      this.temp = Object.assign({}, this.$storage.get('row', []))
    }
  },
  data() {
    return {
      status: null,
      active: 0,
      uptoken: null,
      temp: {
        title: null,
        aims: null,
        principal: null,
        startAndEndTime: null,
        introduction: null,
        annex: null
      }
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
    beforeUpload() {
      return getToken().then(response => {
        this.uptoken = {
          token: response.data.upToken
        }
      })
    },
    handlePreview(file) {
      window.open(file.url)
    },
    handleCancel() {
      this.$router.push('/projectDefense/index')
    },
    handleUploadSuccess(response, file, fileList) {
      // p6k20rdt2.bkt.clouddn.com/FoiCdTJ3kxLZGCICyUZn7VlV9DiF?attname=123.exe
      // 获取文件名 file.name  获取hash值 response.key
      file.url = global.downloadhost + response.key + '?attname' + file.name
      this.temp.annex = fileList
      console.log(response, file, fileList)
    },
    onSubmit() {
      // console.log(this.temp)
      console.log(this.status)
      if (this.status === 'create') {
        console.log('in')
        console.log(this.temp)
        createProjectDefense(this.temp).then(response => {
          this.$message({
            message: '新建成功',
            type: 'success'
          })
        })
      } else {
        updateProjectDefense(this.temp).then(response => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        })
      }

      this.$router.push('/projectDefense/index')
    }
  }
}
</script>

<style scoped>

</style>
