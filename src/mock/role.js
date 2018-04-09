
import { param2Obj } from '@/utils'

const List = [
  {
    id: 1,
    pid: 0,
    gid: 1,
    path: '/studentManager',
    component: 'layout',
    redirect: 'noredirect',
    name: 'studentManager',
    meta: {
      title: '父1',
      icon: 'excel'
    }

  }, // 学生组
  {
    id: 2,
    pid: 0,
    gid: 1,
    path: 'basicInfo',
    component: 'basicInfo',
    name: 'basicInfo',
    meta: {
      title: '父2'
    }
  },
  {
    id: 3,
    pid: 1,
    gid: 1,
    path: '/studentManager',
    component: 'layout',
    redirect: 'noredirect',
    name: 'sss',
    meta: {
      title: '子1',
      icon: 'excel'
    }

  }, // 学生组
  {
    id: 4,
    pid: 2,
    gid: 1,
    path: 'basicInfo',
    component: 'basicInfo',
    name: 'ss2',
    meta: {
      title: '子2'
    }
  },
  {
    id: 5,
    pid: 4,
    gid: 1,
    path: 'basicInfo',
    component: 'basicInfo',
    name: 'ss2',
    meta: {
      title: '子3'
    }
  }
]

export default {
  getList: config => {
    const { pid, gid } = param2Obj(config.url)
    const mockList = List.filter(item => {
      if (gid && +gid !== +item.gid) return false
      if (+pid === 0) {
        if (+item.pid !== 0) return false
      } else if (pid && +item.pid !== +pid) return false
      return true
    })
    return {
      items: mockList
    }
  },
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: () => ({
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
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
