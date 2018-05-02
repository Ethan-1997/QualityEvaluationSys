
<template>
<div class="dashboard-editor-container">
  <div>
    <el-row>
      <el-col :span="4" style="height:10px;"></el-col>
      <el-col :span="16" class="information">
        <el-row :gutter="1">
          <el-col :xl="4" :lg="8" :md="8" :sm="12">
            <div class="infor-left">
              <div style="margin:40px 0px 0px 30px">
                <img style="border-radius:90px;" width="180px" height="180px" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/>
              </div>
            </div>
          </el-col>
          <el-col :xl="10" :lg="8" :md="8" :sm="12">
            <div class="infor-name">{{List.sname}}</div>
          </el-col>
          <el-col :xl="9" :lg="7" :md="7" :sm="24" style="height:1px;">
            <el-button type="text" @click="dialogFormVisible = true" style="margin:140px 0px 0px 45px;">修改密码</el-button>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form :model="form" prop="password">
                <el-form-item label="旧密码" :label-width="formLabelWidth" type="password" name="password" placeholder="password" validateevent="true">
                  <el-input v-model="form.oldpsw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth" name="password">
                  <el-input v-model="form.newpsw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" name="password">
                  <el-input v-model="form.agnpsw" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </el-col>
          <el-col :span="1" style="height:1px;"></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">学号</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_sex" class="infor-font-right">
                    {{List.sid}}
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style=""></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">班级</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_sex" class="infor-font-right">
                    {{List.sclass}}
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style=""></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">性别</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_sex">
                    <div style="float:left;" class="infor-font-right">男</div>
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style=""></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">签名</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="18" :sm="23">
                    <div v-if="text_ssignature">
                      <div style="float:left;" class="infor-font-right">{{List.ssignature}}</div>
                      <div class="infor-font-right"><a @click="alter_ssignature_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i> 填写</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        placeholder="请输入内容"
                        v-model="input_ssignature"
                        clearable>
                      </el-input>
                      <div style="margin-top:20px;">
                        <el-button type="primary" style="float:left;" size="small" @click="alter_ssignature_hid(type)">保存</el-button>
                        <el-button size="small" @click="alter_ssignature_hid(null)">取消</el-button>
                      </div>
                    </div>
              </el-col>
              <el-col :span="2" style="height:1px;"></el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style="background:blue;"></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">出生日期</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_birth">
                    <div style="float:left;" class="infor-font-right">{{List.birth}}</div>
                    <div class="infor-font-right"><a @click="alter_birth_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i> 设置</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <div class="block">
                        <el-date-picker
                          v-model="value1"
                          type="date"
                          format="yyyy/M/d"
                          value-format="yyyy/M/d"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                      <div style="margin-top:20px;">
                        <el-button type="primary" style="float:left;" size="small" @click="alter_birth_hid(type)">保存</el-button>
                        <el-button size="small" @click="alter_birth_hid(null)">取消</el-button>
                      </div>
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style="background:blue;"></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">居住地</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_saddress">
                    <div style="float:left;" class="infor-font-right">{{List.saddress}}</div>
                    <div class="infor-font-right"><a @click="alter_saddress_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-circle-plus-outline"></i> 添加居住地</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        style="width:150px;"
                        placeholder="请输入内容"
                        v-model="input_saddress"
                        clearable>
                      </el-input>
                      <el-button type="primary" style="margin-left:10px;" size="small" @click="alter_saddress_hid(type)">保存</el-button>
                      <el-button size="small" @click="alter_saddress_hid(null)">取消</el-button>
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style="background:blue;"></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">联系方式</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_stel">
                    <div style="float:left;" class="infor-font-right">{{List.stel}}</div>
                    <div class="infor-font-right"><a @click="alter_stel_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i> 修改</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        style="width:150px;"
                        placeholder="请输入内容"
                        v-model="input_stel"
                        clearable>
                      </el-input>
                      <el-button type="primary" style="margin-left:10px;" size="small" @click="alter_stel_hid(type)">保存</el-button>
                      <el-button size="small" @click="alter_stel_hid(null)">取消</el-button>
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style="background:blue;"></el-col>
        </el-row>
        <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">职业经历</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_careerexperience">
                    <div style="float:left;" class="infor-font-right">{{List.careerexperience}}</div>
                    <div class="infor-font-right"><a @click="alter_careerexperience_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-circle-plus-outline"></i> 添加职业经历</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        style="width:200px;"
                        placeholder="请输入公司或组织名称"
                        v-model="input_company"
                        clearable>
                      </el-input>
                      <el-input
                        style="width:200px;"
                        placeholder="请输入你的职位"
                        v-model="input_position"
                        clearable>
                      </el-input>
                      <el-button type="primary" style="margin-left:10px;" size="small" @click="alter_careerexperience_hid(type)">保存</el-button>
                      <el-button size="small" @click="alter_careerexperience_hid(null)">取消</el-button>
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style="background:blue;"></el-col>
        </el-row>


        <!-- <el-row>
          <el-col :xl="5" :lg="24" style="height:1px;">
          </el-col>
          <el-col :xl="18" class="infor-fen">
            <el-row>
              <el-col :xl="4" :sm="24">
                <div class="infor-font-left">个人简介</div>
              </el-col>
              <el-col :xl="0" :sm="1" style="height:1px;"></el-col>
              <el-col :xl="20" :sm="23">
                    <div v-if="text_intro">
                    <div style="float:left;" class="infor-font-right">{{List.intro}}</div>
                    <div class="infor-font-right"><a @click="alter_intro_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i> 填写</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model="textarea_intro">
                      </el-input>
                      <div style="margin-top:20px;">
                        <el-button type="primary" style="float:left;" size="small" @click="alter_intro_hid(type)">保存</el-button>
                        <el-button size="small" @click="alter_intro_hid(null)">取消</el-button>
                      </div>
                    </div>
              </el-col>
            </el-row>
            <div></div>
          </el-col>
          <el-col :xl="1" style="background:blue;"></el-col>
        </el-row> -->


        <el-row>
          <el-col :xl="5" :lg="24" style="height:100px;">
          </el-col>
          <el-col :xl="18">
          </el-col>
          <el-col :xl="1"></el-col>
        </el-row>
      </el-col>
      <el-col :span="4" style="height:10px;"></el-col>
    </el-row>
  </div>
</div>
</template>
<script>
import PanThumb from '@/components/PanThumb'
import { getCurrentUser } from '@/api/user'
import { updateStudent } from '@/api/student'
import { mapGetters } from 'vuex'
export default {
  components: { PanThumb },
  data() {
    return {
      List: {
        ssignature: null,
        birth: null,
        saddress: null,
        stel: null,
        careerexperience: null
      },
      imageUrl: '',
      radio: '1',
      type: 'save',
      value1: '',
      text_sex: true,
      text_ssignature: true,
      text_birth: true,
      text_saddress: true,
      text_stel: true,
      text_careerexperience: true,
      // text_intro: true,
      input_ssignature: '',
      input_saddress: '',
      input_stel: '',
      input_company: '',
      input_position: '',
      // textarea_intro: '',
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        oldpsw: '',
        newpsw: '',
        agnpsw: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    alter_ssignature_show() {
      this.text_ssignature = false
      this.input_ssignature = this.List.ssignature
    },
    alter_ssignature_hid(type) {
      if (type === 'save') {
        console.log(1)
        this.List.ssignature = this.input_ssignature
        updateStudent(this.List).then(res => {
          if (res.data.data === 'success') {
            console.log('success')
          }
        })
      } else {
        this.input_ssignature = this.List.ssignature
      }
      this.text_ssignature = true
    },
    alter_birth_show() {
      this.text_birth = false
      this.value1 = this.List.birth
    },
    alter_birth_hid(type) {
      if (type === 'save') {
        if (this.input_birth === '') {
          this.input_birth = '未知'
        }
        this.List.birth = this.value1
        updateStudent(this.List).then(res => {
          if (res.data.data === 'success') {
            console.log('success')
          }
        })
      }
      this.text_birth = true
    },
    alter_saddress_show() {
      this.text_saddress = false
      this.input_saddress = this.List.saddress
    },
    alter_saddress_hid(type) {
      if (type === 'save') {
        this.List.saddress = this.input_saddress
        updateStudent(this.List).then(res => {
          if (res.data.data === 'success') {
            console.log('success')
          }
        })
      } else {
        this.input_saddress = this.List.saddress
      }
      this.text_saddress = true
    },
    alter_stel_show() {
      this.text_stel = false
      this.input_stel = this.List.stel
    },
    alter_stel_hid(type) {
      if (type === 'save') {
        console.log(1)
        this.List.stel = this.input_stel
        updateStudent(this.List).then(res => {
          if (res.data.data === 'success') {
            console.log('success')
          }
        })
      } else {
        this.input_stel = this.List.stel
      }
      this.text_stel = true
    },
    alter_careerexperience_show() {
      this.text_careerexperience = false
      this.input_company = this.List.company
      this.input_position = this.List.position
    },
    alter_careerexperience_hid(type) {
      if (type === 'save') {
        console.log(1)
        this.List.company = this.input_company
        this.List.position = this.input_position
        const careerexperience = this.List.company + '-' + this.List.position
        this.List.careerexperience = careerexperience
        updateStudent(this.List).then(res => {
          if (res.data.data === 'success') {
            console.log('success')
          }
        })
      } else {
        this.input_company = this.List.company
        this.input_position = this.List.position
      }
      this.text_careerexperience = true
    },
    // alter_intro_show() {
    //   this.text_intro = false
    //   this.textarea_intro = this.List.intro
    // },
    // alter_intro_hid(type) {
    //   if (type === 'save') {
    //     console.log(1)
    //     this.List.intro = this.textarea_intro
    //     updateInformation(this.List)
    //   } else {
    //     this.textarea_intro = this.List.intro
    //   }
    //   this.text_intro = true
    // },
    getList() {
      getCurrentUser().then(Response => {
        this.List = Response.data.user
        console.log(this.List)
      })
    },
    toindex() {
      this.$router.push({ path: '/information/index' })
    }
  }
}
</script>
<style scoped>
	.emptyGif {
		display: block;
		width: 45%;
		margin: 0 auto;
	}
.hid{
  float: left;
  display:none;
}
.show{
  float: left;
  display:block;
}
.router-font{
  color:#409EFF;
}
.infor-fen{
  border-bottom:1px solid #C0C4CC;
  padding-bottom: 30px;
}
.information{
  background:#fff;
  font-family: '微软雅黑'
}
.infor-left{
  float: left;
}
.infor-font-left{
  padding-left:20px;
  float: left;
  font-family: '微软雅黑';
  margin:40px 0px 0px 0px;
  font-size:16px;
  font-weight:bold;
}
.infor-font-right{
  font-family: '微软雅黑';
  margin:40px 0px 0px 0px;
  font-size:16px;
  float:left;
}
.infor-name{
  float: left;
  margin:140px 0px 0px 45px;
  font-size: 24px;
  font-weight:bold;
}
.infor-name-right{
  float:right;
  font-size:16px;
  margin:150px 0px 0px 0px;
}
.box-card1{
  width:100%;
}
.dashboard-editor-container{
  background-color: rgb(240, 242, 245);
  padding: 32px;

}
.avatar-uploader .el-upload {
    border: 5px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    left:10px;
    top:-20px;
  }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>