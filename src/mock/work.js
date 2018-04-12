import { param2Obj } from '@/utils'
import storage from '@/utils/storage'

const workList = [
  {
    id: 1024,
    title: 'vue.js第一讲',
    startTime: '2018-09-01',
    endTime: '2018-09-05',
    sclass: 'vue',
    status: '发布',
    author: '曹老师',
    content: 'vue.js基础',
    submitStatus: '已提交',
    rowFileList: [{
      name: '演示.docx',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      status: 'finished'
    }]
  },
  {
    id: 1025,
    title: 'vue.js第二讲',
    startTime: '2018-09-05',
    endTime: '2018-09-08',
    sclass: 'vue',
    status: '发布',
    author: '曹老师',
    content: 'vue.js初级',
    submitStatus: '已提交',
    rowFileList: [{
      name: '演示.docx',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      status: 'finished'
    }]
  },
  {
    id: 1026,
    title: 'vue.js第三讲',
    startTime: '2018-09-5',
    endTime: '2018-09-10',
    sclass: 'vue',
    status: '发布',
    author: '曹老师',
    content: 'vue.js中级',
    submitStatus: '已提交',
    rowFileList: [{
      name: '演示.docx',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      status: 'finished'
    }]
  },
  {
    id: 1027,
    title: 'vue.js第四讲',
    startTime: '2018-09-10',
    endTime: '2018-09-15',
    sclass: 'vue',
    status: '发布',
    author: '王老师',
    content: 'vue.js高级',
    submitStatus: '已提交',
    rowFileList: [{
      name: '演示.docx',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      status: 'finished'
    }]
  },
  {
    id: 1028,
    title: 'vue.js第五讲',
    startTime: '2018-09-15',
    endTime: '2018-09-20',
    sclass: 'vue',
    status: '发布',
    author: '应老师',
    content: 'vue.js终级',
    submitStatus: '已提交',
    rowFileList: [{
      name: '演示.docx',
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      status: 'finished'
    }]
  }
]
let List = []

export default {
  getList: config => {
    const { page = 1, limit = 20, sort, author, sclass, status } = param2Obj(config.url)
    const workTemp = storage.get('workTemp')
    if (workTemp !== 1) {
      storage.set('worklist', workList)
      storage.set('workTemp', 1)
    }
    List = storage.get('worklist')
    let mockList = List.filter(item => {
      if (author && item.author.indexOf(author) < 0) return false
      if (sclass && item.sclass !== sclass) return false
      if (status && item.status !== status) return false
      return true
    })
    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    console.log(storage.get('worklist'))
    return {
      total: mockList.length,
      items: pageList,
      taskData: workList
    }
  },
  getWork: () => ({
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
  createWork: (data) => {
    List.push(JSON.parse(data.body))
    storage.set('worklist', List)
    return {
      data: 'success'
    }
  },
  updateWork: () => ({
    data: 'success'
  })
  // updateWork: (data) => {
  //   const temp = JSON.parse(data.body)
  //   for (const v of List) {
  //     if (v.id === temp.id) {
  //       const index = List.indexOf(v)
  //       console.log(temp)
  //       List.splice(index, 1, temp)
  //       break
  //     }
  //   }
  //   storage.set('worklist', List)
  //   return {
  //     data: 'success'
  //   }
  // }
}
