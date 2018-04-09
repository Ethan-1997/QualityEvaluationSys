import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i + 1,
    studentName: '@cname',
    'studentId|1000000-1899999': 1899999,
    studentSex: '@boolean',
    'studentClass|100-999': 999,
    studentImage: Mock.Random.dataImage('200x200', '头像'),

    studyRate1: null,
    studyRate2: null,
    studyRate3: null,
    developRate1: null,
    developRate2: null,
    developRate3: null,
    daliyRate1: null,
    daliyRate2: null,
    daliyRate3: null,
    remark: ''
  }))
  List[i].studentSex = List[i].studentSex ? '男' : '女'
}
export default {
  studentData: () => {
    return List
  }
}
