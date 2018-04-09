import Mock from 'mockjs'
const List = []
const count = 45
const ProfessionalQuestionText = [
  '大象是动物，动物有腿。因此大象有腿。',
  '我的秘书还未到参加选民的年龄，我的秘书有着漂亮的头发。所以我的秘书是个未满18周岁的姑娘。',
  '这条街上的商店几乎没有霓虹灯，但这些商店都有遮蓬。所以，<span style="color:#f00;">有些商店有遮蓬没有霓虹灯。</span>',
  '这条街上的商店几乎没有霓虹灯，但这些商店都有遮蓬。所以，<span style="color:#f00;">有些商店既有遮蓬又有霓虹灯。</span>',
  '所有的A都有一只眼睛，B有一只眼睛。所以A和B是一样的。',
  '土豆比西红柿便宜，我的钱不够买两斤土豆。所以，<span style="color:#f00;">我的钱不够买一斤西红柿。</span>',
  '土豆比西红柿便宜，我的钱不够买两斤土豆。所以，<span style="color:#f00;">我的钱可能够，也可能不够买一斤西红柿。</span>',
  '韦利是个和斯坦一样强的棒球击球手，斯坦是个比大多数人都要强的棒球击球手。所以，<span style="color:#f00;">韦利应是这些选手中最出色的。</span>',
  '韦利是个和斯坦一样强的棒球击球手，斯坦是个比大多数人都要强的棒球击球手。所以，<span style="color:#f00;">斯坦应是这些选手中最出色的。</span>',
  '韦利是个和斯坦一样强的棒球击球手，斯坦是个比大多数人都要强的棒球击球手。所以，<span style="color:#f00;">韦利是个比大多数人都要强的棒球击球手。</span>',
  '水平高的音乐家演奏古典音乐，要成为水平高的音乐家就得练习演奏。所以演奏古典音乐比演奏爵士乐需要更多的练习时间。',
  '如果你的孩子被宠坏了，打他屁股会使他发怒，如果他没有被宠坏，打他屁股会使你懊悔。所以，<span style="color:#f00;">打他屁股要么使你懊悔，要么使他发怒。</span>',
  '如果你的孩子被宠坏了，打他屁股会使他发怒，如果他没有被宠坏，打他屁股会使你懊悔。所以，<span style="color:#f00;">打他屁股也许对她没有什么好处。</span>',
  '正方形是有角的图形，这个图形没有角。所以，<span style="color:#f00;">这个图形是个圆。</span>',
  '正方形是有角的图形，这个图形没有角。所以，<span style="color:#f00;">无确切结论。</span>',
  '正方形是有角的图形，这个图形没有角。所以，<span style="color:#f00;">这个图形不是正方形。</span>',
  '格林威尔在史密斯城的东北，纽约在史密斯城的东北。所以，<span style="color:#f00;">纽约比史密斯城更靠近格林威尔。</span>',
  '格林威尔在史密斯城的东北，纽约在史密斯城的东北。所以，<span style="color:#f00;">史密斯城在纽约的西南。</span>',
  '格林威尔在史密斯城的东北，纽约在史密斯城的东北。所以，<span style="color:#f00;">纽约离史密斯城不远。</span>',
  '绿色深时，红色就浅；黄色浅时，蓝色就适中；但是要么绿色深，要么黄色浅。所以，<span style="color:#f00;">蓝色适中。</span>',
  '绿色深时，红色就浅；黄色浅时，蓝色就适中；但是要么绿色深，要么黄色浅。所以，<span style="color:#f00;">黄色和红色都浅。</span>',
  '绿色深时，红色就浅；黄色浅时，蓝色就适中；但是要么绿色深，要么黄色浅。所以，<span style="color:#f00;">红色浅，或者蓝色适中。</span>',
  '如果你突然停车，那么跟在后面的一辆卡车将撞上你；如果你不这样做，你将撞到一个妇女。所以，<span style="color:#f00;">行人不应在马路上行走。</span>',
  '如果你突然停车，那么跟在后面的一辆卡车将撞上你；如果你不这样做，你将撞到一个妇女。所以，<span style="color:#f00;">那辆卡车车速太快。</span>',
  '如果你突然停车，那么跟在后面的一辆卡车将撞上你；如果你不这样做，你将撞到一个妇女。所以，<span style="color:#f00;">你要么让后面那辆卡车撞上，要么撞到那个妇女。</span>',
  '我住在农场和城市之间，农场位于城市和机场之间。所以，<span style="color:#f00;">农场到我住处比到机场要近。</span>',
  '我住在农场和城市之间，农场位于城市和机场之间。所以，<span style="color:#f00;">我住在农场和机场之间。</span>',
  '我住在农场和城市之间，农场位于城市和机场之间。所以，<span style="color:#f00;">我的住处到农场比到机场要近。</span>',
  '聪明的赌徒只有在形势对他有利时才下赌注，老练的赌徒只有在他有大利可图时才下赌注，这个赌徒有时去下赌注。所以，<span style="color:#f00;">他如果不是老练的赌徒，就是聪明的赌徒。</span>',
  '聪明的赌徒只有在形势对他有利时才下赌注，老练的赌徒只有在他有大利可图时才下赌注，这个赌徒有时去下赌注。所以，<span style="color:#f00;">他可能是个老练的赌徒，也可能不是。</span>',
  '聪明的赌徒只有在形势对他有利时才下赌注，老练的赌徒只有在他有大利可图时才下赌注，这个赌徒有时去下赌注。所以，<span style="color:#f00;">他既不是老练的赌徒，也不是聪明的赌徒。</span>',
  '当B等于Y时，A等于Z；当A不等于Z时，E要么等于Y，要么等于Z。所以，<span style="color:#f00;">当B等于Y时，E不等于Y也不等于Z。</span>',
  '当B等于Y时，A等于Z；当A不等于Z时，E要么等于Y，要么等于Z。所以，<span style="color:#f00;">当A等于Z时，Y或者Z等于E。</span>',
  '当B等于Y时，A等于Z；当A不等于Z时，E要么等于Y，要么等于Z。所以，<span style="color:#f00;">当B不等于Y时，E不等于Y也不等于Z。</span>',
  '当B大于C时，X小于C但C绝不会大于B。所以，<span style="color:#f00;">X绝不会大于B。</span>',
  '当B大于C时，X小于C但C绝不会大于B。所以，<span style="color:#f00;">X绝不会小于B。</span>',
  '当B大于C时，X小于C但C绝不会大于B。所以，<span style="color:#f00;">X绝不会小于C。</span>',
  '只要X是红色，Y就一定是绿色；只要Y不是绿色，就一定是蓝色。但是，当X是红色时，Z绝不会是蓝色。所以，<span style="color:#f00;">只要Z是蓝色，Y就可能是绿色。</span>',
  '只要X是红色，Y就一定是绿色；只要Y不是绿色，就一定是蓝色。但是，当X是红色时，Z绝不会是蓝色。所以，<span style="color:#f00;">只要X不是红色，Z就不可能是蓝色。</span>',
  '只要X是红色，Y就一定是绿色；只要Y不是绿色，就一定是蓝色。但是，当X是红色时，Z绝不会是蓝色。所以，<span style="color:#f00;">只要Y不是绿色，X就不可能是红色。</span>',
  '有时印第安人是阿拉斯加人，阿拉斯加人有时是律师。所以，<span style="color:#f00;">有时印第安人不见得一定是阿拉斯加人或律师。</span>',
  '有时印第安人是阿拉斯加人，阿拉斯加人有时是律师。所以，<span style="color:#f00;">印第安人不可能是阿拉斯加人或律师。</span>',
  '前进不见得死得光荣，后退没死也不见得是耻辱。所以，<span style="color:#f00;">后退意为死得光荣。</span>',
  '前进不见得死得光荣，后退没死也不见得是耻辱。所以，<span style="color:#f00;">前进意为不死就是耻辱。</span>',
  '前进不见得死得光荣，后退没死也不见得是耻辱。所以，<span style="color:#f00;">前进意为死得光荣。</span>'
]
const option = []
const type = []
for (let i = 0; i < 45; i++) {
  option[i] = null
  type[i] = 'judgment'
}
const answer = [
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  false
]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i + 1,
    type: type[i],
    content: ProfessionalQuestionText[i],
    options: option[i],
    answer: answer[i],
    userAnswer: null
  }))
}

export default {
  getList: () => {
    return {
      items: List
    }
  }
}
