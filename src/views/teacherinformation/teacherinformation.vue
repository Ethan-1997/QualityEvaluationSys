<template>
  <div class="dashboard-editor-container">
          <el-row type="flex" justify="center">
            <el-col :lg="18" :xs="22" :sm="22">
            <el-card>
              <el-row>
                <el-col :lg="20">
                  <div style="margin:40px 0px 0px 30px;float:left">
                    <img style="border-radius:100px;" width="200px" height="200px" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/>
                  </div>
                <div class="infor-font">摇滚兔子</div></el-col>
                <el-col :lg="4">
                  <el-button type="text" @click="dialogFormVisible = true" style="margin:170px 0px 0px 0px;">修改密码</el-button>
                  <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
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
              </el-row>
              <el-row style="height:10px"></el-row> 
              <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">工号</div></el-col>
                <el-col :span="12"><div class="infor-font-right">9527</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>
               <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">任课班级</div></el-col>
                <el-col :span="12">
                <div v-if="text_classname">
                  <div style="float:left;" class="infor-font-right">{{infor.classname}}</div>
                  <div class="infor-font-right">
                    <a @click="alter_classname_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i>填写</a>
                  </div>
                </div>
                <div style="margin-top:42px;" v-else>
                      <el-input
                        placeholder="请输入内容"
                        v-model="input_classname"
                        clearable>
                      </el-input>
                      <div style="margin-top:20px;">
                        <el-button type="primary" style="float:left;" size="small" @click="alter_classname_hid(type)">保存</el-button>
                        <el-button size="small" @click="alter_classname_hid(null)">取消</el-button>
                      </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
               <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">性别</div></el-col>
                <el-col :span="12"><div class="infor-font-right">男</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
               <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">民族</div></el-col>
                <el-col :span="12"><div class="infor-font-right">汉族</div>
                  
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
               <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">政治背景</div></el-col>
                <el-col :span="12">
                  <div v-if="text_back">
                    <div style="float:left;" class="infor-font-right">{{infor.back}}</div>
                  <div class="infor-font-right">
                    <a @click="alter_back_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i>修改</a>
                  </div>
                </div>
                <div style="margin-top:42px;" v-else>
                      <el-input
                        placeholder="请输入内容"
                        v-model="input_back"
                        clearable>
                      </el-input>
                      <div style="margin-top:20px;">
                        <el-button type="primary" style="float:left;" size="small" @click="alter_back_hid(type)">保存</el-button>
                        <el-button size="small" @click="alter_back_hid(null)">取消</el-button>
                      </div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
               <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">出生日期</div></el-col>
                <el-col :span="12">
                 <div v-if="text_time">
                    <div style="float:left;" class="infor-font-right">{{infor.time}}</div>
                    <div class="infor-font-right"><a @click="alter_time_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i> 设置</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <div class="block">
                        <el-date-picker
                          v-model="value1"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </div>
                      <div style="margin-top:20px;">
                        <el-button type="primary" style="float:left;" size="small" @click="alter_time_hid(type)">保存</el-button>
                        <el-button size="small" @click="alter_time_hid(null)">取消</el-button>
                      </div>
                    </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
               <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">所在地</div></el-col>
                <el-col :span="12">
                  <div v-if="text_home">
                    <div style="float:left;" class="infor-font-right">{{infor.home}}</div>
                    <div class="infor-font-right"><a @click="alter_home_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-circle-plus-outline"></i> 添加居住地</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        style="width:150px;"
                        placeholder="请输入内容"
                        v-model="input_home"
                        clearable>
                      </el-input>
                      <el-button type="primary" style="margin-left:10px;" size="small" @click="alter_home_hid(type)">保存</el-button>
                      <el-button size="small" @click="alter_home_hid(null)">取消</el-button>
                    </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
              <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">联系方式</div></el-col>
                <el-col :span="12">
                <div v-if="text_phone">
                    <div style="float:left;" class="infor-font-right">{{infor.phone}}</div>
                    <div class="infor-font-right"><a @click="alter_phone_show" class="router-font">&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-edit"></i> 修改</a></div>
                    </div>
                    <div style="margin-top:42px;" v-else>
                      <el-input
                        style="width:150px;"
                        placeholder="请输入内容"
                        v-model="input_phone"
                        clearable>
                      </el-input>
                      <el-button type="primary" style="margin-left:10px;" size="small" @click="alter_phone_hid(type)">保存</el-button>
                      <el-button size="small" @click="alter_phone_hid(null)">取消</el-button>
                    </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
              <el-row>
                <el-col :span="6" style="height:1px;" class="infor-empty"></el-col>
                <el-col :span="4"><div class="infor-font-left">个人简介</div></el-col>
                <el-col :span="12">
                  <div v-if="text_intro">
                    <div style="float:left;" class="infor-font-right">{{infor.intro}}</div>
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
                        <el-button size="small" @click="alter_intro_hid(type)">取消</el-button>
                      </div>
                    </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6" style="height:1px;"></el-col>
                <el-col :span="18"  class="infor-fen"></el-col>
              </el-row>   
            </el-card>
          </el-col>
          </el-row>
  </div>
</template>


<script>
import { updateInformation } from '@/api/teacherinformation'
import fetchList from '@/api/teacherinformation'
export default{
  data() {
    return {
      dialogFormVisible: false,
      input_classname: '',
      text_classname: true,
      input_intro: '',
      text_intro: true,
      input_back: '',
      text_back: true,
      input_home: '',
      text_home: true,
      type: 'save',
      infor: '',
      input_phone: '',
      text_phone: true,
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
      formLabelWidth: '120px',
      value1: '',
      text_time: true
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      fetchList().then(Response => {
        this.infor = Response.data.items
        console.log(Response.data.items)
      })
      console.log(this.infor)
    },
    alter_classname_show() {
      this.text_classname = false
      console.log(this.text_classname)
    },
    alter_classname_hid(type) {
      console.log(this.input_classname)
      console.log(this.infor.classname)
      if (type === 'save') {
        if (this.input_classname === '') {
          this.input_classname = '未知'
        }
        this.infor.classname = this.input_classname
        updateInformation(this.infor)
      } else {
        this.input_classname = this.infor.classname
      }
      this.text_classname = true
    },
    alter_intro_show() {
      this.text_intro = false
    },
    alter_intro_hid(type) {
      if (type === 'save') {
        if (this.textarea_intro === '') {
          this.textarea_intro = '未知'
        }
        this.infor.intro = this.textarea_intro
        updateInformation(this.infor)
      } else {
        this.textarea_intro = this.infor.intro
      }
      this.text_intro = true
    },
    alter_back_show() {
      this.text_back = false
    },
    alter_back_hid(type) {
      if (type === 'save') {
        if (this.input_back === '') {
          this.input_back = '未知'
        }
        this.infor.back = this.input_back
        updateInformation(this.infor)
      } else {
        this.input_back = this.infor.back
      }
      this.text_back = true
    },
    alter_home_show() {
      this.text_home = false
    },
    alter_home_hid(type) {
      if (type === 'save') {
        if (this.input_home === '') {
          this.input_home = '未知'
        }
        console.log(1)
        this.infor.home = this.input_home
        updateInformation(this.infor)
      } else {
        this.input_home = this.infor.home
      }
      this.text_home = true
    },
    alter_phone_show() {
      this.text_phone = false
    },
    alter_phone_hid(type) {
      if (type === 'save') {
        if (this.input_phone === '') {
          this.input_phone = '未知'
        }
        console.log(1)
        this.infor.phone = this.input_phone
        updateInformation(this.infor)
      } else {
        this.input_phone = this.infor.phone
      }
      this.text_phone = true
    },
    alter_time_show() {
      this.text_time = false
    },
    alter_time_hid(type) {
      if (type === 'save') {
        const months = this.value1.getMonth() + 1
        const times = this.value1.getFullYear() + '年' + months + '月' + this.value1.getDate() + '日'
        if (this.value1 === '') {
          this.value1 = '未知'
        }
        console.log(2)
        this.infor.time = times
        console.log(this.infor)
        updateInformation(this.infor)
      }
      this.text_time = true
    }

  }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
  .dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .router-font{
    color:#409EFF;
  }
  .box-card {
    margin: 0 auto;    
  }
  .infor-empty{
    padding-bottom: 50px;
  }
  .infor-fen{
  border-bottom:1px solid #C0C4CC;
  padding-bottom: 50px;
}
  .infor-font{
    margin:170px 0px 0px 45px;
    font-size: 40px;
    font-weight:bold;
    float: left;
  }
  .infor-font-left{
    padding-left:20px;
    float: left;
    font-family: '微软雅黑';
    margin:45px 0px 0px 0px;
    font-size:21px;
    font-weight:bold;
  }
  .infor-font-right{
    font-family: '微软雅黑';
    margin:45px 0px 0px 0px;
    font-size:16px;
    float:left;
  }

  .shan{
    background: burlywood;
  }
</style>
