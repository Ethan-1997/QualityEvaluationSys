import Mock from 'mockjs'

const List = []
const count = 14

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    bulletin: '@csentence',
    date: '@date'
  }))
}
export default {
  bulletin: () => {
    return List
  }
}
