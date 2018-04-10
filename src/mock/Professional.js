import Mock from 'mockjs'
const List = []
const List2 = []
const List3 = []
const List4 = []
const List5 = []
const List6 = []
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
const ProfessionalQuestionText2 = [
  '在Java中，高优先级的可运行线程会抢占低优先级线程。',
  'Object是Java中所有类的共同父类。',
  '一个数组可以存放不同类型的数值。',
  'A final class can have instances.',
  'static关键字可以修饰成员变量，也可以修饰局部变量。',
  '数组也是对象。',
  '程序开发者必须创建一个线程去管理内存的分配。',
  '在Java程序中，可以使用protected来修饰一个类。',
  '当GUI应用程序使用边界布局管理器BorderLayout时，GUI组件可以按任何顺序添加到面板上。',
  'You can always successfully cast an instance of a superclass to a subclass.'
]
const ProfessionalQuestionText3 = [
  'java语言中不用区分字母的大写小写。',
  '如果线程死亡，它便不能运行。',
  '静态变量是被同一个类的所有实例所共享的。',
  '在Java中，高优先级的可运行线程会抢占低优先级线程。',
  'ArrayList类是线程安全的。',
  'Java中所有的I/O都是通过流来实现的。',
  'Java中数组的元素只能是简单数据类型。',
  '当GUI应用程序使用边界布局管理器BorderLayout时，GUI组件可以按任何顺序添加到面板上。',
  '类也是一种数据类型（type）。',
  '匿名类的类体中不可以声明static成员变量和static方法。'
]
const ProfessionalQuestionText4 = [
  'Java语言有三种技术平台，分别是JavaSE、JavaME、JavaEE',
  'Java是一门高级计算机语言。',
  'Java语言具体跨平台的特性',
  '在Java中，高优先级的可运行线程会抢占低优先级线程。',
  'JDK安装的时候不可以修改安装目录',
  'JDK的安装目录中，只包含bin和lib两个目录。',
  'javac命令可以运行Demo.class文件',
  '在任意命令行窗口中执行javac命令，如果都能正常地显示帮助信息，说明系统path环境变量配置成功。',
  'JDK安装成功后，可以将bin目录的路径配置在环境变量path中。',
  'JDK5以后可以不用配置classpath环境变量。'
]
const ProfessionalQuestionText5 = [
  '配置classpath环境变量时，路径后面加分号与不加分号是一样的。',
  'main()函数是java程序的执行入口。',
  '数组的遍历是指依次访问数组中的每个元素',
  'continue语句只用于循环语句中，它的作用是跳出循环。',
  'continue语句用在循环语句中，它的作用是终止本次循环，执行下一次循环',
  '数组的排序算法只有冒泡排序这一种',
  '方法的返回值类型可以定义也可以不定义',
  '比较运算符用于对两个数值或变量进行比较，其结果是一个布尔值',
  '若x=5，则表达式(x+5)/3的值是3',
  '标识符可以为关键字'
]
const ProfessionalQuestionText6 = [
  '-5%3的运算结果是2',
  '0xC5表示的是一个十六进制整数。',
  '在Java中判断方法重载的条件除了参数外，还可以通过返回值类型判断',
  '方法递归次数过多会导致内存溢出',
  '在Java中，小数会被默认是double类型的值',
  'main是Java语言中的关键字',
  '在进行赋值运算时，将运算符右边的值赋给左边的变量',
  'Java中有一种特殊的赋值运算叫做三元运算，它和if-else语句类似',
  '方法内部类是指在成员方法中定义的类，它只能在当前方法中被使用。',
  '一个类中如果没有定义构造方法，那么这个类就没有构造方法。'
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
const answer2 = [
  false, true, false, true, false, true, false, true, true, false
]
const answer3 = [
  false, true, true, false, false, true, false, true, true, true
]
const answer4 = [
  true, true, true, true, false, false, false, true, true, true
]
const answer5 = [
  false, true, true, false, true, false, false, true, true, false
]
const answer6 = [
  false, true, false, true, true, false, true, true, true, false
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
for (let i = 0; i < 10; i++) {
  List2.push(Mock.mock({
    id: i + 1,
    type: 'judgment',
    content: ProfessionalQuestionText2[i],
    options: null,
    answer: answer2[i],
    userAnswer: null
  }))
  List3.push(Mock.mock({
    id: i + 1,
    type: 'judgment',
    content: ProfessionalQuestionText3[i],
    options: null,
    answer: answer3[i],
    userAnswer: null
  }))
  List4.push(Mock.mock({
    id: i + 1,
    type: 'judgment',
    content: ProfessionalQuestionText4[i],
    options: null,
    answer: answer4[i],
    userAnswer: null
  }))
  List5.push(Mock.mock({
    id: i + 1,
    type: 'judgment',
    content: ProfessionalQuestionText5[i],
    options: null,
    answer: answer5[i],
    userAnswer: null
  }))
  List6.push(Mock.mock({
    id: i + 1,
    type: 'judgment',
    content: ProfessionalQuestionText6[i],
    options: null,
    answer: answer6[i],
    userAnswer: null
  }))
}
export default {
  getList: () => {
    return {
      items: List,
      item1: List2,
      item2: List3,
      item3: List4,
      item4: List5,
      item5: List6
    }
  }
}
