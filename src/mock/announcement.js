// import Mock from 'mockjs'
import storage from '@/utils/storage'
import { param2Obj } from '@/utils'

const announcementList = [
  {
    ano: 1,
    atitle: '开学',
    acontent: '这是第一条公告内容',
    atime: '2018-09-01'
  },
  {
    ano: 2,
    atitle: '第二天的公告',
    acontent: '这是第二条公告内容',
    atime: '2018-09-02'
  },
  {
    ano: 3,
    atitle: '第三天的公告',
    acontent: '这是第三条公告内容',
    atime: '2018-09-03'
  },
  {
    ano: 4,
    atitle: '第四天的公告',
    acontent: '这是第四条公告内容',
    atime: '2018-09-04'
  },
  {
    ano: 5,
    atitle: '第五天的公告',
    acontent: '这是第五条公告内容',
    atime: '2018-09-05'
  },
  {
    ano: 6,
    atitle: '第六天的公告',
    acontent: '这是第六条公告内容',
    atime: '2018-09-06'
  },
  {
    ano: 7,
    atitle: '第七天的公告',
    acontent: '这是第七条公告内容',
    atime: '2018-09-07'
  },
  {
    ano: 8,
    atitle: '第八天的公告',
    acontent: '这是第八条公告内容',
    atime: '2018-09-08'
  },
  {
    ano: 9,
    atitle: '第九天的公告',
    acontent: '这是第九条公告内容',
    atime: '2018-09-09'
  },
  {
    ano: 10,
    atitle: '学中',
    acontent: '这是第十条公告内容',
    atime: '2018-09-10'
  },
  {
    ano: 11,
    atitle: '第十一天的公告',
    acontent: '这是第十一条公告内容',
    atime: '2018-09-11'
  },
  {
    ano: 12,
    atitle: '第十二天的公告',
    acontent: '这是第十二条公告内容',
    atime: '2018-09-12'
  },
  {
    ano: 13,
    atitle: '第十三天的公告',
    acontent: '这是第十三条公告内容',
    atime: '2018-09-13'
  },
  {
    ano: 14,
    atitle: '第十四天的公告',
    acontent: '这是第十四条公告内容',
    atime: '2018-09-14'
  },
  {
    ano: 15,
    atitle: '第十五天的公告',
    acontent: '这是第十五条公告内容',
    atime: '2018-09-15'
  },
  {
    ano: 16,
    atitle: '第十六天的公告',
    acontent: '这是第十六条公告内容',
    atime: '2018-09-16'
  },
  {
    ano: 17,
    atitle: '第十七天的公告',
    acontent: '这是第十七条公告内容',
    atime: '2018-09-17'
  },
  {
    ano: 18,
    atitle: '第十八天的公告',
    acontent: '这是第十八条公告内容',
    atime: '2018-09-18'
  },
  {
    ano: 19,
    atitle: '第十九天的公告',
    acontent: '这是第十九条公告内容',
    atime: '2018-09-19'
  },
  {
    ano: 20,
    atitle: '结业',
    acontent: '这是第二十条公告内容',
    atime: '2018-09-20'
  }
]
let List = []

export default {
  getList: config => {
    const { page = 1, limit = 20, sort, atitle, atime } = param2Obj(config.url)
    const announcementTemp = storage.get('announcementTemp')
    if (announcementTemp !== 1) {
      storage.set('announcementList', announcementList.reverse())
      storage.set('announcementTemp', 1)
    }
    List = storage.get('announcementList')
    let mockList = List.filter(item => {
      if (atitle && item.atitle.indexOf(atitle) < 0) return false
      if (atime && item.atime !== atime) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    console.log(pageList)
    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getAnnouncement: () => ({
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
  createAnnouncement: (data) => {
    List.push(JSON.parse(data.body))
    storage.set('announcementList', List)
    return {
      data: 'success'
    }
  },
  updateAnnouncement: () => ({
    data: 'success'
  })
}
