import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    Sname: '@cname',
    'Sno|1000000-1899999': 1899999,
    Ssex: '@boolean',
    'Sclass|100-999': 999,
    Simage: Mock.Random.dataImage('200x200', '头像'),
    studyRate1: 0,
    studyRate2: 0,
    studyRate3: 0,
    developRate1: 0,
    developRate2: 0,
    developRate3: 0,
    daliyRate1: 0,
    daliyRate2: 0,
    daliyRate3: 0,
    remark: ''
  }))
  List[i].Ssex = List[i].Ssex ? '男' : '女'
}
export default {
  getList: () => {
    return List
  }
}
