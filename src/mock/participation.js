import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    sno: '@increment',
    sname: '@cname',
    'ssex|1': ['男', '女'],
    sclass: '10' + Mock.Random.integer(1, 9),
    'sprofession|1': ['javaweb', '大数据', '前端工程师'],
    date: '@date',
    time: '@time',
    'status|1': ['已到', '迟到', '请假', '未到'],
    note: '@csentence'
  }))
}

export default {
  getList: config => {
    // sname: undefined,
    // time: undefined,
    // order: '+id',
    // sclass: undefined
    const { page = 1, limit = 20, sort, sname, time, sclass } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (sname && item.author.indexOf(sname) < 0) return false
      if (time && item.time !== time) return false
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

  getParticipation: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createParticipation: () => ({
    data: 'success'
  }),
  updateParticipation: () => ({
    data: 'success'
  })
}
