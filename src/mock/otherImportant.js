import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 2
const title = ['休学一学期', '解决社会问题']
const content = ['因为身体患了重病，申请休学一学期', '好人好事：捡到一部手机并上交']
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    sno: '101',
    sname: '摇滚兔子',
    ssex: '男',
    sclass: '101',
    title: title[i],
    content: content[i],
    time: '2018.9.' + +(i + 1)
  }))
}

export default {
  getList: config => {
    const { page = 1, limit = 20, sort, sname, status, sclass } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (sname && item.sname.indexOf(sname) < 0) return false
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
  getOtherImportant: () => ({
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
  createOtherImportant: () => ({
    data: 'success'
  }),
  updateOtherImportant: () => ({
    data: 'success'
  })
}
