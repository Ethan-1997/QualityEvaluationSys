const daily = {
  arrived: '13次',
  unarrived: '2次',
  leave: '3次',
  later: '3次',
  breakrule: '3次',
  extrude: '5次',
  great: '2次'
}

import Mock from 'mockjs'

const List = []
const List1 = []
const List2 = []
const List3 = []
for (let i = 0; i < 20; i++) {
  List.push(Mock.mock({
    date: '2018.9.' + +(i + 1),
    'status|1': [
      '已到',
      '迟到',
      '未到',
      '请假'
    ]
  })
  )
}
for (let i = 0; i < 3; i++) {
  List1.push(Mock.mock({
    date: '2018.9.' + +(i + 1),
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
for (let i = 0; i < 5; i++) {
  List2.push(Mock.mock({
    date: '2018.9.' + +(i + 1),
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

for (let i = 0; i < 2; i++) {
  List3.push(Mock.mock({
    date: '2018.9.' + +(i + 1),
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
export default {
  getList: () => {
    return {
      items: List,
      item: List1,
      item1: List2,
      item2: List3,
      itemd: daily
    }
  }
}
