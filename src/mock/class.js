import { param2Obj } from '@/utils'
import storage from '@/utils/storage'
let List = []

export default {
  getList: config => {
    List = storage.get('classlist', [])
    const { page = 1, limit = 20, sort, author, status, sclass } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (author && item.author.indexOf(author) < 0) return false
      if (status && item.status !== status) return false
      if (sclass && item.sclass !== sclass) return false
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
  createClass: (data) => {
    debugger
    List.push(JSON.parse(data.body))
    storage.set('classlist', List)
    return {
      data: 'success'
    }
  },
  updateClass: (data) => {
    const temp = JSON.parse(data.body)
    for (const v of List) {
      if (v.id === temp.id) {
        const index = List.indexOf(v)
        console.log(temp)
        List.splice(index, 1, temp)
        break
      }
    }
    storage.set('classlist', List)
    return {
      data: 'success'
    }
  }
}
