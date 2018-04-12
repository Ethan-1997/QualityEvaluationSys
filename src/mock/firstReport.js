import Mock from 'mockjs'
// import { param2Obj } from '@/utils'

const List = []
const count = 3
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'title|1': [
      'Java Web，是用Java技术来解决相关web互联网领域的技术总和。web包括：web服务器和web客户端两部分。Java在客户端的应用有java applet，不过使用得很少，Java在服务器端的应用非常的丰富，比如Servlet，JSP和第三方框架等等。Java技术对Web领域的发展注入了强大的动力。',
      '大数据（big data），指无法在一定时间范围内用常规软件工具进行捕捉、管理和处理的数据集合，是需要新处理模式才能具有更强的决策力、洞察发现力和流程优化能力的海量、高增长率和多样化的信息资产。一种规模大到在获取、存储、管理、分析方面大大超出了传统数据库软件工具能力范围的数据集合，具有海量的数据规模、快速的数据流转、多样的数据类型和价值密度低四大特征。',
      '云计算（cloud computing）是基于互联网的相关服务的增加、使用和交付模式，通常涉及通过互联网来提供动态易扩展且经常是虚拟化的资源。云是网络、互联网的一种比喻说法。过去在图中往往用云来表示电信网，后来也用来表示互联网和底层基础设施的抽象。因此，云计算甚至可以让你体验每秒10万亿次的运算能力，拥有这么强大的计算能力可以模拟核爆炸、预测气候变化和市场发展趋势。用户通过电脑、笔记本、手机等方式接入数据中心，按自己的需求进行运算。'
    ]
  }))
}

export default {
  getList: config => {
    // const { page = 1, limit = 20, sort, sname, status, sclass } = param2Obj(config.url)

    // let mockList = List.filter(item => {
    //   if (sname && item.sname.indexOf(sname) < 0) return false
    //   if (status && item.status !== status) return false
    //   if (sclass && item.sclass !== sclass) return false
    //   return true
    // })

    // if (sort === '-id') {
    //   mockList = mockList.reverse()
    // }

    // const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      // total: mockList.length,
      items: List
    }
  }
  // getHighlighting: () => ({
  //   id: 120000000001,
  //   author: { key: 'mockPan' },
  //   source_name: '原创作者',
  //   category_item: [{ key: 'global', name: '全球' }],
  //   comment_disabled: true,
  //   content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
  //   content_short: '我是测试数据',
  //   display_time: +new Date(),
  //   image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
  //   platforms: ['a-platform'],
  //   source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
  //   status: 'published',
  //   tags: [],
  //   title: 'vue-element-admin'
  // }),
  // createHighlighting: () => ({
  //   data: 'success'
  // }),
  // updateHighlighting: () => ({
  //   data: 'success'
  // })
}
