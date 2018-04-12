import storage from '@/utils/storage'
import { param2Obj } from '@/utils'
let List = []

export default {
  getList: config => {
    List = storage.get('loglist', [])
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
  createLog: (data) => {
    List.push(JSON.parse(data.body))
    storage.set('loglist', List)
    return {
      data: 'success'
    }
  },
  updateLog: (data) => {
    console.log('in3')
    const temp = JSON.parse(data.body)
    for (const v of List) {
      if (v.id === temp.id) {
        const index = List.indexOf(v)
        console.log(temp)
        List.splice(index, 1, temp)
        break
      }
    }
    storage.set('loglist', List)
    return {
      data: 'success'
    }
  }
}

