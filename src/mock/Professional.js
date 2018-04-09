import Mock from 'mockjs'
const List = []
const count = 25
const ProfessionalQuestionText = [
  '在Java中，执行下面的语句后，c的值为' + '<br/>' + 'String s= "Jessica ";' + '<br/>' + 'char c=s.charAt(6);',
  '在JAVA中下面哪一行代码不出现编译警告或错误',
  '在Java中，调用Math.random() 方法可能返回的结果是',
  '给定java代码片段，如下' + '<br/>' + 'Integer a = new Integer(3);' + '<br/>' + 'Integer b = new Integer(3);' + '<br/>' + 'System.out.println(a==b);',
  '下面是Java程序中的一些声明，选项中能够通过编译的一项是' + '<br/>' + 'String s1=new String(“Hello”);' + '<br/>' + 'String s2=new String(“there”);' + '<br/>' + 'String s3=new String();',
  '在JAVA中,()关键字用来终止循环语句',
  '下面哪个是Java语言中正确的标识符',
  '下面哪个语句（初始化数组）是不正确的',
  '下述概念中不属于面向对象方法的是',
  '下面哪条语句把方法声明为抽象的公共方法?',
  '下面关于java中类的说法哪个是不正确的',
  '容器被重新设置大小后，哪种布局管理器的容器中的组件大小不随容器大小 的变化而改变？',
  '下列哪个用户图形界面组件在软件安装程序中是常见的?',
  'Java中哪个类提供了随机访问文件的功能。',
  'Java语言具有许多优点和特点，下列选项中，哪个反映了Java程序并行机制的特点',
  '数组也是对象。',
  '一个数组可以存放不同类型的数值。',
  '在Java中，高优先级的可运行线程会抢占低优先级线程。',
  'Object是Java中所有类的共同父类。',
  '一个数组可以存放不同类型的数值。',
  'static关键字可以修饰成员变量，也可以修饰局部变量。',
  '在Java中，高优先级的可运行线程会抢占低优先级线程。',
  'ArrayList类是线程安全的。',
  'Java中所有的I/O都是通过流来实现的。',
  'Java中数组的元素只能是简单数据类型。'
]
const option = [
  ['"c "', '"a "', '\'c \'', '\'a \''],
  ['float f=1.3;', 'char c="a";', 'byte b=257;', 'int i=10;'],
  ['132.34', '0.342', '29.34E10', '1.0009'],
  ['True', 'False', '0', '1'],
  ['s3=s1+s2', 's3=s1&s2', 's3=s1||s2', 's3=s1&&s2'],
  ['Return', 'Continue', 'Break', 'Exit'],
  ['3com', 'import', 'that  ', 'this'],
  ['int x[] = {1,2,3}', 'int x[3] = {1,2,3}', 'int[] x = {1,2,3}', 'int x[] = new int[]{1,2,3}'],
  ['对象、消息', '继承、多态', '类、封装', '过程调用'],
  ['public abstract method();', 'public abstract void method();', 'public abstract void method(){}', 'public void method() extends abstract;'],
  ['类体中只能有变量定义和成员方法的定义，不能有其他语句。', '构造函数是类中的特殊方法。', '类一定要声明为public的，才可以执行。', '一个java文件中可以有多个class定义。'],
  ['CardLayout', 'FlowLayout', 'BorderLayout', 'GridLayout'],
  ['滑块', '进度条', '按钮', '标签'],
  ['RandomAccessFile类', 'RandomFile类', 'File类', 'AccessFile类'],
  ['安全性', '多线程', '跨平台', '可移植'],
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
]
const answer = [
  3,
  3,
  1,
  1,
  0,
  1,
  2,
  1,
  3,
  1,
  2,
  1,
  2,
  0,
  1,
  true,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  false
]
const type = [
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'single',
  'judgment',
  'judgment',
  'judgment',
  'judgment',
  'judgment',
  'judgment',
  'judgment',
  'judgment',
  'judgment',
  'judgment'
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
