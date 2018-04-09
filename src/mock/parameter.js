import { param2Obj } from '@/utils'

const List = [
  { pno: 1, pkey: '随机题库单选题个数', pvalue: 30 },
  { pno: 2, pkey: '随机题库多选题个数', pvalue: 10 },
  { pno: 3, pkey: '随机题库填空题个数', pvalue: 10 }
]

export default {
  getList: config => {
    const { page = 1, limit = 20, sort, pkey } = param2Obj(config.url)
    console.log(123)
    console.log(List)
    let mockList = List.filter(item => {
      if (pkey && item.pkey.indexOf(pkey) < 0) return false
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
  getParameter: () => ({
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
  createParameter: () => ({
    data: 'success'
  }),
  updateParameter: () => ({
    data: 'success'
  })
}
