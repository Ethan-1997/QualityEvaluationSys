import Mock from 'mockjs'

const List = []
const count = 5
const uploadtime = Mock.mock('@time')

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i + 1,
    task: '@ctitle',
    author: '@cname',
    date: uploadtime,
    detail: '@paragraph',
    'rate|1-20': 20,
    status: '@boolean'
  }))
  List[i].status = List[i].status ? '已提交' : '未提交'
  if (List[i].status === '已提交') {
    List[i].rowFileList = [{
      name: '演示.docx',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      status: 'finished'
    }]
  } else {
    List[i].rowFileList = []
  }
}
export default {
  daliyTask: () => {
    return List
  }
  // taskUpdata: function(index,detail){
  //   List[index]=
  // }
}
