import { param2Obj } from '@/utils'
import storage from '@/utils/storage'

let List = []

export default {
  getList: config => {
    console.log(List)
    if (storage.get('projectDefenseList', []) instanceof Array) { List = storage.get('projectDefenseList', []) }
    console.log(List)
    const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  createProjectDefense: (data) => {
    debugger
    List.push(JSON.parse(data.body))
    storage.set('projectDefenseList', List)
    return {
      data: 'success'
    }
  },
  updateProjectDefense: (data) => {
    const temp = JSON.parse(data.body)
    for (const v of List) {
      if (v.id === temp.id) {
        const index = List.indexOf(v)
        console.log(temp)
        List.splice(index, 1, temp)
        break
      }
    }
    storage.set('projectDefenseList', List)
    return ({
      data: 'success'
    })
  }
}
