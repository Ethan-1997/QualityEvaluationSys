import Mock from 'mockjs'

const List = {
  id: '9527',
  class: 'vue.js',
  signature: 'Rock Roll Rabbit',
  time: '1998年5月20日',
  home: '月球',
  phone: '6666666',
  company: '摇滚不死公司',
  position: 'CEO',
  pro: '摇滚不死公司-CEO',
  intro: '这个家伙没有介绍'
}
const name = []
const votes = [79, 52, 33, 95, 110, 28, 104]
const List2 = []
for (let i = 0; i < 7; i++) {
  List2.push(Mock.mock({
    id: '@increment',
    name: '@cname',
    'votes': votes[i]
  }))
}
// List.push({ signature: '未知' })
export default {
  updateInformation: function(tempList) {
    console.log(tempList)
    const temp = JSON.parse(tempList.body)
    List.signature = temp.signature
    List.time = temp.time
    List.home = temp.home
    List.phone = temp.phone
    List.company = temp.company
    List.position = temp.position
    List.pro = temp.pro
    List.intro = temp.intro
    console.log(List)
  },
  updateStudentTeam: function(tempList) {
    const temp = JSON.parse(tempList.body)
    for (let i = 0; i < 7; i++) {
      List2[i].id = temp[i].id
      List2[i].name = temp[i].name
      List2[i].votes = temp[i].votes
      console.log('success')
      console.log(List2[i].votes)
    }
  },
  getList: () => {
    return {
      items: List,
      item: name,
      ticket: List2
    }
  }
}
