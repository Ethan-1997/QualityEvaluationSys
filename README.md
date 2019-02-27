<p align="center">
  <img width="400" height="250" src="https://raw.githubusercontent.com/yingpengsha/Assets/master/student-quality-evaluation-system/student_quality_logo.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-2.5.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/apache/incubator-echarts">
    <img src="https://img.shields.io/badge/echarts-3.8.5-orange.svg" alt="echarts">
  </a>
  <a href="https://github.com/ElemeFE/element">
    <img src="https://img.shields.io/badge/element--ui-2.3.3-blue.svg" alt="element-ui">
  </a>
</p>

## 简介

[student-quality-evaluation-system](https://github.com/SoulBiuBiuBiu/QualityEvaluationSys) 学生综合素质管理系统，它基于 [vue](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)，使用了最新的前端技术栈，参与了2017年浙江省服务外包竞赛。

 <p align="center">
  <img width="900" src="https://github.com/yingpengsha/Assets/blob/master/student-quality-evaluation-system/home-page.png?raw=true">
</p>

## 技术
>&ensp;
> - **MVC开发模式**：模型(model)－视图(view)－控制器(controller)，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。将业务逻辑聚集到一个部件里面MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。
> 
> - **Spring**：是一个开源框架，一个轻量级的Java开发框架，它是为了解决企业应用开发的复杂性而创建的。Spring使用基本的JavaBean来完成以前只可能由EJB完成的事情。
> - **RESTFUL**：一个架构样式的网络系统，基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。
>
> - **Vue、ES6、Node.js**：一个在 Java VM 上使用可观测的序列来组成异步的、基于事件的程序的库。
>
> - **Token权限验证**:无状态、可扩展、支持移动设备、跨程序调用、安全，它是多用户下处理认证的最佳方式。<br>
>&ensp;

## 业务亮点
>&ensp;
> - 教师可以发起测评/下发作业，学生可以在线完成测评/作业并提交。
>
> - 多对多的方式进行，一个学生可有多名教师管理，一个教师可以管理多名学生
>
> - 即时的学生日常情况汇总，可以让学生能够即时的看到自己的日常表现，即时改正缺点
>
> - 系统可以根据不同的用户，给出不同的功能供该用户使用。<br>
>&ensp;


## 开发

```bash
# 克隆项目
git clone git@github.com:SoulBiuBiuBiu/QualityEvaluationSys.git

# 安装依赖
npm install

# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:sit

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# --report to build with bundle size analytics
npm run build:prod

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```


## 团队介绍
<p align="center">
  <img style="max-height:250px;" src="https://raw.githubusercontent.com/yingpengsha/Assets/master/student-quality-evaluation-system/fearLess-logo.png" />
</p>
<p align="center">
  <a href="https://github.com/SoulBiuBiuBiu">
    <img width="150" border="2px" style="margin:10px 15px;border-radius:3px;border-color:#264e86" src="https://avatars1.githubusercontent.com/u/14856226?s=400&v=4">
  </a>
  <a href="https://github.com/yingpengsha">
    <img width="150" border="2px" style="margin:10px 15px;border-radius:3px;border-color:#264e86" src="https://avatars2.githubusercontent.com/u/37143265?s=400&u=f975c8a0dc8cf296cb198f5eaa32b1b2c50a89ca&v=4">
  </a>
  <a href="https://github.com/caohangwei1314">
    <img width="150" border="2px" style="margin:10px 15px;border-radius:3px;border-color:#264e86"src="https://avatars0.githubusercontent.com/u/38202858?s=400&v=4">
  </a>
  <a href="https://github.com/xuyongming520">
    <img width="150" border="2px" style="margin:10px 15px;border-radius:3px;border-color:#264e86"   src="https://avatars3.githubusercontent.com/u/38202879?s=400&v=4">
  </a>
</p>
<p align="center" style="margin-top:25px;font-size:18px;color:#264e86">
  <a  href=mailto:fearless_studio@163.com>Email : fearless_studio@163.com</a>
</p>