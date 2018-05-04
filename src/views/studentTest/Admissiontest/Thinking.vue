<template>
      <div class="dashboard-editor-container">
        <ul class="meta-list" v-if="state === 'start' || state === 'end'">
            <li class="item">开始时间：{{ startTimeStr }}</li>
            <li class="item">用时：{{ minute }} 分钟</li>
            <!--<li><div>结束时间：2018-1-5 17:50:08</div></li>-->
        </ul>
        <div class="simple-answer-card" v-if="state === 'start'">
            <h2 class="card-title">答题卡</h2>
            <ul class="answer-list">
                <li class="item" v-for="(q, index) in questions">
                    <ui-raised-button class="round-btn unknown"
                                      :class="{finish: isDone(q), current: index === questionIndex}"
                                      :label="'' + (index + 1)"
                                      @click="selectIndex(index)" />
                </li>
            </ul>
        </div>
        <div class="exam-box" v-if="state === 'start'">
            <!--<div class="index">第 {{ questionIndex + 1 }} 题</div>-->
            <ui-badge class="type" :content="type" />
            <!--<h2 class="type">{{ type }}</h2>-->
            <h3 class="title" v-if="question.type !== 'fill'" v-html="question.content"></h3>
            <ui-text-field class="input" v-model="question.userAnswer" v-if="question.type === 'aq'" />
            <div v-if="question.type === 'fill'">
                <span v-for="(content, index) in question._content">
                    <ui-text-field class="fill-input"
                                   :style="{width: (content.length * 40) + 'px'}"
                                   v-model="question['fill' + content.index]"
                                   v-if="content.type === 'blank'" />
                    <!--<input/>-->
                    <span v-else>{{ content.text }}</span>
                </span>
            </div>
            <ul class="options" v-if="question.type === 'judgment'">
                <li class="item"
                    :class="{selected: isSelected(question, true)}"
                    @click="doOption(true)">正确</li>
                <li class="item"
                    :class="{selected: isSelected(question, false)}"
                    @click="doOption(false)">错误</li>
            </ul>
            <ul class="options">
                <li class="item" v-for="(option, index) in question.options"
                    :key="option"
                    :class="{selected: isSelected(question, index)}"
                    @click="doOption(index)">{{ option }}</li>
            </ul>
            <div class="op">
                <ui-raised-button class="btn blue" label="上一题" @click="prevQuestion" :disabled="questionIndex === 0" />
                <ui-raised-button class="btn blue" label="下一题" primary @click="nextQuestion" :disabled="questionIndex === questions.length - 1" />
                <!--<ui-raised-button class="btn" label="查看答案" @click="viewAnswer" :disabled="false" />-->
                <ui-raised-button class="btn blue" label="交卷" @click="viewAnswer" :disabled="false" />
            </div>
        </div>

        <div class="answer-card" v-if="state === 'end'">
            <h2 class="card-title">答案</h2>
            <ul>
                <li class="item blueborder"
                    v-for="(q, index) in questions">
                    <h3 v-if="q.type !== 'fill'" v-html="'问题：'+q.content"></h3>
                    <h3 v-if="q.type === 'fill'">问题：{{ getFillContent(q.content) }}</h3>
                    <div v-if="q.type === 'single' || q.type === 'multiple' || q.type === 'aq'">
                        <div v-if="q.userAnswer || q.userAnswer === 0">
                            <div v-if="q.type === 'single'"> 你的回答：{{ numberToLetter(q.userAnswer) }}. {{ q.options[q.userAnswer] }}</div>
                            <div v-if="q.type === 'multiple'">
                                你的回答：
                                <div v-for="answer in q.userAnswer">
                                    {{ numberToLetter(answer) }}. {{ q.options[answer] }}
                                </div>
                            </div>
                            <div v-if="q.type === 'aq'">
                                你的回答：{{ q.userAnswer }}
                            </div>
                        </div>
                        <div v-else>你还没有回答</div>
                    </div>
                    <div v-if="q.type === 'fill'">
                        你的回答：{{ getFillUserAnswer(q).join(', ') }}
                    </div>
                    <div v-if="q.type === 'judgment'">
                        <div v-if="q.userAnswer === true || q.userAnswer === false">
                            你的回答：{{ boolToText(q.userAnswer) }}
                        </div>
                        <div v-else>你还没有回答</div>
                    </div>
                </li>
            </ul>
            <ui-raised-button class="btn blue" label="重做" primary @click="restart"/>
            <ui-raised-button class="btn blue" label="确认提交" primary @click="submit"/>
        </div>

        <ul>
            <!--请选择产生斜体字的 HTML 标签：-->
            <!--<i>-->
            <!--<italics>-->
            <!--<ii>-->

            <!--在下列的 HTML 中，哪个可以产生超链接？-->
            <!--<a url="http://www.w3school.com.cn">W3School.com.cn</a>-->
            <!--<a href="http://www.w3school.com.cn">W3School</a>-->
            <!--<a>http://www.w3school.com.cn</a>-->
            <!--<a name="http://www.w3school.com.cn">W3School.com.cn</a>-->

            <!--如何在新窗口打开链接？-->
            <!--<a href="url" new>-->
            <!--<a href="url" target="_blank">-->
            <!--<a href="url" target="new">-->


        </ul>
      </div>
</template>

<script>
    import { format } from '@/utils/time'
    import { fetchListTest } from '@/api/testInformation'
    import { getCurrentUser } from '@/api/user'
    import { updateStudentGrade, fetchListStudentGrade } from '@/api/StudentGrade'
    const FILL = '___'

    // eslint-disable-next-line
    Array.prototype.contains = function (obj) {
      var i = this.length
      while (i--) {
        if (this[i] === obj) {
          return true
        }
      }
      return false
    }

    export default {
      data() {
        return {
          questionIndex: 0,
          questions: [],
          question: {},
          state: '', // 'start', 'end',
          startTime: null,
          endTime: null,
          minute: 0,
          Sid: null
        }
      },
      computed: {
        type() {
          const types = {
            single: '单选题',
            multiple: '多选题',
            fill: '填空题',
            aq: '问答题',
            judgment: '判断题',
            join: '连线题',
            code: '编程题' // Attachment
          }
          return types[this.question.type]
        },
        startTimeStr() {
          return format(new Date(this.startTime), 'hh:mm')
        }
      },
      created() {
        this.getList()
        this.start()
      },
      destroyed() {
        clearInterval(this.timer)
      },
      methods: {
        submit() {
          this.$storage.set('name', 'character')
          this.$storage.set('ttest', true)
          this.$storage.set('percentage', this.$storage.get('percentage') + 33)
          this.$router.push({ name: 'admissionTestIndex' })
          let thinking = 0
          let success = 0
          let fail = 0
          for (const question of this.questions) {
            if (question.type === 'judgment') {
              if (question.userAnswer !== question.answer) {
                thinking++
                success++
              } else {
                fail++
              }
            }
          }
          const iitem = [
            thinking, success, fail, 45
          ]
          const data = {
            Sid: this.Sid
          }
          fetchListStudentGrade(data).then(response => {
            const s = response.data.items[0]
            s.sstatus = s.sstatus + 33
            if (s.sstatus === 99) {
              s.sstatus = 100
            } else if (s.sstatus > 100) {
              s.sstatus = 33
            }
            s.thinking = JSON.stringify(iitem)
            updateStudentGrade(s)
          })
          this.$storage.set('activeName' + this.Sid, 'character')
          this.$storage.set('disabled_thinking' + this.Sid, true)
          this.$router.push({ name: 'admissionTestIndex' })
        },
        getList() {
          getCurrentUser().then(response => {
            this.Sid = response.data.user.sid
          })
          const data = {
            Tid: 'SystemTest-THK-1'
          }
          fetchListTest(data).then(response => {
            const exam = response.data.item
            this.questions = JSON.parse(exam.tquestion)
            this.question = this.questions[this.questionIndex]
            this.init()
            console.log(this.questions, this.question)
            // console.log(this.list)
          })
        },
        init() {
          for (const question of this.questions) {
            if (question.type === 'fill') {
              const content = question.content.replace(new RegExp(FILL, 'g'), '|?|' + FILL + '|?|')
              const arr = content.split('|?|')
              const result = []
              let blankIndex = 0
              for (const item of arr) {
                if (item === FILL) {
                  result.push({
                    type: 'blank',
                    index: blankIndex,
                    length: question.answer[blankIndex].length
                  })
                  blankIndex++
                } else {
                  result.push({
                    type: 'text',
                    text: item
                  })
                }
              }
              question._content = result
            }
          }
        },
        boolToText(bool) {
          return bool ? '正确' : '错误'
        },
        getFillContent(content) {
          return content.replace(new RegExp(FILL, 'g'), '___')
        },
        getFillUserAnswer(question) {
          const answer = []
          for (let i = 0; i < question.answer.length; i++) {
            if (question['fill' + i]) {
              answer.push(question['fill' + i])
            } else {
              answer.push(null)
            }
          }
          return answer // .join(', ')
        },
        isSelected(question, index) {
          if (question.type === 'single') {
            return question.userAnswer === index
          } else if (question.type === 'multiple') {
            if (!question.userAnswer) {
              return false
            }
            for (const answer of question.userAnswer) {
              if (answer === index) {
                return true
              }
            }
            return false
          } else if (question.type === 'judgment') {
            return question.userAnswer === index
          }
          return false
        },
        isSuccess(question) {
          console.log('判断')
          if (question.type === 'single') {
            console.log('单选题' + question.userAnswer === question.answer)
            return question.userAnswer === question.answer
          }
          if (question.type !== 'fill' && !question.userAnswer) {
            return false
          }

          if (question.type === 'multiple') {
            // 少选多选不给分
            if (question.answer.length !== question.userAnswer.length) {
              return false
            }
            for (let i = 0; i < question.answer.length; i++) {
              if (question.answer[i] !== question.userAnswer[i]) {
                return false
              }
            }
            return true
          }
          if (question.type === 'aq') {
            return question.userAnswer === question.answer
          }
          if (question.type === 'fill') {
            const userAnswer = this.getFillUserAnswer(question)
            if (question.answer.length !== userAnswer.length) {
              return false
            }
            for (let i = 0; i < question.answer.length; i++) {
              if (question.answer[i] !== userAnswer[i]) {
                return false
              }
            }
            return true
          }
          if (question.type === 'judgment') {
            return question.userAnswer === question.answer
          }
          return false
        },
        isDone(question) {
          if (question.type === 'single') {
            return question.userAnswer || question.userAnswer === 0
          }
          if (question.type === 'multiple') {
            return question.userAnswer && question.userAnswer.length
          }
          if (question.type === 'aq') {
            return question.userAnswer
          }
          if (question.type === 'fill') {
            const answer = this.getFillUserAnswer(question)
            for (const item of answer) {
              if (!item) {
                return false
              }
            }
            return true
          }
          if (question.type === 'judgment') {
            return question.userAnswer === true || question.userAnswer === false
          }
          return false
        },
        doOption(index) {
          if (this.question.type === 'single') {
            this.questions[this.questionIndex].userAnswer = index
            //                    // 检查后面是否有未完成的题目
            //                    for (let i = this.questionIndex + 1; i < this.questions.length; i++) {
            //                        if (!this.questions[i].userAnswer) {
            //                            this.questionIndex = i
            //                            this.question = this.questions[this.questionIndex]
            //                            return
            //                        }
            //                    }
            //                    // 检查前面是否有未完成的题目
            //                    for (let i = 0; i < this.questionIndex; i++) {
            //                        if (!this.questions[i].userAnswer) {
            //                            this.questionIndex = i
            //                            this.question = this.questions[this.questionIndex]
            //                            return
            //                        }
            //                    }
            //                    // 遮住某个 bug
            //                    this.questionIndex++
            //                    if (this.questionIndex > this.questions.length - 1) {
            //                        this.questionIndex = 0
            //                    }
            //                    this.question = this.questions[this.questionIndex]
          } else if (this.question.type === 'multiple') {
            let userAnswer = this.questions[this.questionIndex].userAnswer
            if (!userAnswer) {
              userAnswer = []
            }
            if (userAnswer.contains(index)) {
              for (let i = 0; i < userAnswer.length; i++) {
                if (userAnswer[i] === index) {
                  userAnswer.splice(i, 1)
                  return
                }
              }
            }

            userAnswer.push(index)
            // 答案排序
            userAnswer = userAnswer.sort()
            this.questions[this.questionIndex].userAnswer = userAnswer
          } else if (this.question.type === 'judgment') {
            this.questions[this.questionIndex].userAnswer = index
          }
        },
        prevQuestion() {
          this.questionIndex--
          this.question = this.questions[this.questionIndex]
        },
        selectIndex(index) {
          this.questionIndex = index
          this.question = this.questions[this.questionIndex]
        },
        nextQuestion() {
          this.questionIndex++
          this.question = this.questions[this.questionIndex]
        },
        start() {
          this.state = 'start'
          this.startTime = new Date()
          this.timer = setInterval(this.updateTime, 60 * 1000)
        },
        updateTime() {
          const time = (new Date().getTime() - this.startTime.getTime()) / 1000 / 60
          this.minute = parseInt(time)
        },
        restart() {
          // 清空回答
          for (const question of this.questions) {
            question.userAnswer = null
          }
          this.questionIndex = 0
          this.start()
        },
        viewAnswer() {
          this.state = 'end'
          this.endTime = new Date()
          this.updateTime()
          clearInterval(this.timer)
        },
        numberToLetter(number) {
          const arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
          return arr[number]
        }
      }
    }
</script>

<style lang="scss" scoped>
.right{
  float:right;
}
.blueborder{
  border:1px solid #409EFF;
}
.blue{
   color:#fff;
   background:#409EFF;
}
.answer-card{
  background: #fff;
}
.exam-box{
  background: #fff;
}
.simple-answer-card{
  background: #fff;
}
.dashboard-editor-container{
  padding:32px;
}
    .text {
    font-size: 16px;
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

  
    .ui-medal {
        width: 282px;
        height: 375px;
        background-color: #fff;
        border: 1px solid #f00;
        text-align: center;
        .medal-content {
            width: 100%;
            position: relative;
            height: 200px;
            padding-top: 40px;
        }
        .number {
            position: absolute;
            left: 50%;
            bottom: -25px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: #fff;
            background-color: #31a56e;
            text-align: center;
            line-height: 50px;
            border: 2px solid #fff;
            margin-left: -25px;
        }
        .big {
            font-size: 30px;
        }
        .medal-img {
            width: 96px;
        }
        .medal-footer {
            width: 100%;
            height: 174px;
            padding-top: 50px;
            color: #fff;
            background-image: url("/static/img/medal-footer.png");
            background-size: 100% 100%;
            .title {
                margin-bottom: 28px;
                font-size: 18px;
            }
        }
    }
.simple-answer-card .answer-list .finish{
  background-color: rgb(102,177,255)
}
.simple-answer-card .answer-list .current{
  border:2px solid #909399;
}
.exam-box .options .item.selected {
    border: 2px solid #909399;
    font-weight: blod;
}
</style>
