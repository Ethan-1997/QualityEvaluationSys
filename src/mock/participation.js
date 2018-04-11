import Mock from 'mockjs'
import { param2Obj } from '@/utils'
const List = []
const List1 = []
const List2 = []
const List3 = []
const datebreak = ['2018.9.5', '2018.9.11', '2018.9.19']
const dateextrude = ['2018.9.6', '2018.9.9', '2018.9.11', '2018.9.16', '2018.9.19']
const dategreat = ['2018.9.6', '2018.9.13']
const count = 20
const statu = ['请假', '未到', '已到', '已到', '已到', '已到', '请假', '已到', '请假', '迟到', '请假', '已到', '请假', '已到', '请假', '已到', '请假', '迟到', '请假', '迟到']
let askForLeave = 0
let unarrived = 0
let arrived = 0
let later = 0
const List4 = []
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    sno: 101,
    sname: '摇滚兔子',
    ssex: '男',
    sclass: '101',
    sprofession: 'Vue.js',
    time: '2018.9.' + +(i + 1),
    status: statu[i],
    note: '无'
  }))
}
let askForLeaveMid = 0
let unarrivedMid = 0
let arrivedMid = 0
let laterMid = 0
for (let i = 0; i < List.length; i++) {
  switch (statu[i]) {
    case '请假':
      askForLeave = askForLeave + 1
      break
    case '未到':
      unarrived = unarrived + 1
      break
    case '已到':
      arrived = arrived + 1
      break
    case '迟到':
      later = later + 1
      break
  }
}
for (let i = 0; i < List.length / 2; i++) {
  switch (statu[i]) {
    case '请假':
      askForLeaveMid = askForLeaveMid + 1
      break
    case '未到':
      unarrivedMid = unarrivedMid + 1
      break
    case '已到':
      arrivedMid = arrivedMid + 1
      break
    case '迟到':
      laterMid = laterMid + 1
      break
  }
}
for (let i = 0; i < 3; i++) {
  List1.push(Mock.mock({
    date: datebreak[i],
    'status|1': [
      '警告',
      '严重警告',
      '记过',
      '处分'
    ],
    'remark|1': [
      '多次上课睡觉',
      '和隔壁班学生发生争执',
      '旷课3次'
    ]
  })
  )
}
const breakRule = List1.length
const breakRuleMid = parseInt(List1.length / 2)
for (let i = 0; i < 5; i++) {
  List2.push(Mock.mock({
    date: dateextrude[i],
    'status|1': [
      '上课积极',
      '提前完成作业',
      '助人为乐'
    ],
    'remark|1': [
      '无'
    ]
  })
  )
}
const extrude = List2.length
const extrudeMid = parseInt(List2.length / 2)
for (let i = 0; i < 2; i++) {
  List3.push(Mock.mock({
    date: dategreat[i],
    'status|1': [
      '休学一学期',
      '解决社会问题'
    ],
    'remark|1': [
      '无'
    ]
  })
  )
}
for (let i = List.length - 1; i > List.length - 6; i--) {
  List4.push(Mock.mock({
    sno: List[i].sno,
    sname: List[i].sname,
    ssex: List[i].ssex,
    sclass: List[i].sclass,
    sprofession: List[i].sprofession,
    time: List[i].time,
    status: List[i].status,
    note: List[i].note
  }))
}
const great = List3.length
const greatMid = parseInt(List3.length / 2)
let dailyCount = {
  arrived,
  unarrived,
  later,
  askForLeave,
  arrivedMid,
  unarrivedMid,
  laterMid,
  askForLeaveMid,
  breakRule,
  extrude,
  great,
  breakRuleMid,
  extrudeMid,
  greatMid
}
const dailyListCount = List.length
export default {
  getList: config => {
    // sname: undefined,
    // time: undefined,
    // order: '+id',
    // sclass: undefined
    const { page = 1, limit = 20, sort, sname, time, sclass } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (sname && item.author.indexOf(sname) < 0) return false
      if (time && item.time !== time) return false
      if (sclass && item.sclass !== sclass) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList,
      item: List4,
      breakRule: List1,
      extrude: List2,
      great: List3,
      dailyCount: dailyCount,
      dailyListCount: dailyListCount
    }
  },

  getParticipation: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createParticipation: () => ({
    data: 'success'
  }),
  updateParticipation: function(tempList) {
    const temp = JSON.parse(tempList.body)
    for (let i = 0; i < 5; i++) {
      if (List4[i].time === temp.time) {
        List4[i].sno = temp.sno
        List4[i].sname = temp.sname
        List4[i].ssex = temp.ssex
        List4[i].sclass = temp.sclass
        List4[i].sprofession = temp.sprofession
        List4[i].time = temp.time
        List4[i].status = temp.status
        List4[i].note = temp.note
      }
    }
    for (let i = 0; i < List.length; i++) {
      if (List[i].time === temp.time) {
        if (List[i].status === '请假') {
          askForLeave = askForLeave - 1
        } else if (List[i].status === '迟到') {
          later = later - 1
        } else if (List[i].status === '已到') {
          arrived = arrived - 1
        } else {
          unarrived = unarrived - 1
        }
        switch (temp.status) {
          case '请假':
            askForLeave = askForLeave + 1
            break
          case '未到':
            unarrived = unarrived + 1
            break
          case '已到':
            arrived = arrived + 1
            break
          case '迟到':
            later = later + 1
            break
        }
        List[i].sno = temp.sno
        List[i].sname = temp.sname
        List[i].ssex = temp.ssex
        List[i].sclass = temp.sclass
        List[i].sprofession = temp.sprofession
        List[i].time = temp.time
        List[i].status = temp.status
        List[i].note = temp.note
      }
    }
    dailyCount = {
      arrived,
      unarrived,
      later,
      askForLeave,
      arrivedMid,
      unarrivedMid,
      laterMid,
      askForLeaveMid,
      breakRule,
      extrude,
      great,
      breakRuleMid,
      extrudeMid,
      greatMid
    }
    console.log(dailyCount)
  }
}
