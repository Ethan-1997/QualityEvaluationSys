import storage from '@/utils/storage'
import { param2Obj } from '@/utils'
let List = []

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     Sname: '@cname',
//     'Sno|1000000-1899999': 1899999,
//     Ssex: '@boolean',
//     'Sclass|100-999': 999,
//     Birth: '',
//     Saddress: '',
//     Sdept: '',
//     Stime: '',
//     Simage: Mock.Random.dataImage('200x200', '头像'),
//     studyRate1: 0,
//     studyRate2: 0,
//     studyRate3: 0,
//     developRate1: 0,
//     developRate2: 0,
//     developRate3: 0,
//     daliyRate1: 0,
//     daliyRate2: 0,
//     daliyRate3: 0,
//     remark: ''
//   }))
//   List[i].Ssex = List[i].Ssex ? '男' : '女'
// }

export default {
  getList: config => {
    List = storage.get('studentlist', [])
    const { Sprofession, Sclass, Sname, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (Sprofession && item.Sprofession !== Sprofession) return false
      if (Sclass && item.Sclass !== Sclass) return false
      if (Sname && item.Sname.indexOf(Sname) < 0) return false
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
  createStudent: (data) => {
    List.push(JSON.parse(data.body))
    storage.set('studentlist', List)
    return {
      data: 'success'
    }
  },
  updateStudent: (data) => {
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
    storage.set('studentlist', List)
    return {
      data: 'success'
    }
  }
}

