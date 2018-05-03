import Mock from 'mockjs'
import { createTest } from '@/api/testInformation'
const List = []
const count = 30
const characterQuestionText = [
  '你做事是一个值得信赖的人吗？',
  '你个性温和吗？',
  '你有活力吗？',
  '你善解人意吗？',
  '你独立吗？',
  '你受人爱戴吗？',
  '做事认真且正直吗？',
  '你富有同情心吗？',
  '你有说服力吗？',
  '你大胆吗？',
  '你精确吗？',
  '你适应能力强吗？',
  '你组织能力好吗？',
  '你是否积极主动？',
  '你害羞吗？',
  '你强势吗？',
  '你镇定吗？',
  '你勇于学习吗？',
  '你反应快吗？',
  '你外向吗？',
  '你注意细节吗？',
  '你爱说话吗？',
  '你的协调能力好吗？',
  '你勤劳吗？',
  '你慷慨吗？',
  '你小心翼翼吗？',
  '你令人愉快吗？',
  '你传统吗',
  '你亲切吗？',
  '你工作足够有效率吗？'
]
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i + 1,
    type: 'single',
    content: characterQuestionText[i],
    options: [
      '非常同意',
      '比较同意',
      '差不多',
      '一点同意',
      '不同意'
    ],
    answer: 1,
    userAnswer: null
  }))
}

const temp = {
  Tid: 'SystemTest-PDP-1',
  Tname: '动物性格测试PDP-1',
  Tquestion: JSON.stringify(List),
  Ttype: '性格'
}

createTest(temp)

export default {
  getList: () => {
    return {
      items: List
    }
  }
}
