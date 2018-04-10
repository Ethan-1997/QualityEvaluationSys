import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import studentAPI from './student'
import workAPI from './work'
import participationAPI from './participation'
import breakRoleAPI from './breakrole'
import leaveAPI from './leave'
import otherImportantAPI from './otherImportant'
import teacherAPI from './teacher'
import announcementAPI from './announcement'
import parameterAPI from './parameter'
import userAPI from './user'
import roleAPI from './role'
import daliyTask from './daliyTask'
import informationAPI from './information'
import student from './student'

Mock.mock(/\/student\/list/, 'get', student.getList)

// Mock.setup({
//   timeout: '350-600'
// })
// 点评页面学生信息

// 日常任务
Mock.mock(/\/daliyTask\/daliyTask/, 'post', daliyTask.daliyTask)

Mock.mock(/\/studentTeam\/update/, 'post', informationAPI.updateStudentTeam)
Mock.mock(/\/information\/getList/, 'post', informationAPI.getList)

// 文章相关
Mock.mock(/\/role\/list/, 'get', roleAPI.getList)

// 伟哥
import characterAPI from './character'

import ProfessionalAPI from './Professional'

import ThinkingAPI from './Thinking'

import dailysummaryAPI from './dailysummary'

import teacherinformationAPI from './teacherinformation'

Mock.mock(/\/api\/admissionTest\/Thinking\/getList/, 'post', ThinkingAPI.getList)

Mock.mock(/\/api\/admissionTest\/Professional\/getList/, 'post', ProfessionalAPI.getList)

Mock.mock(/\/api\/admissionTest\/character\/getList/, 'post', characterAPI.getList)

Mock.mock(/\/dailysummary\/list/, 'get', dailysummaryAPI.getList)
Mock.mock(/\/teacherinformation\/updateInformation/, 'post', teacherinformationAPI.updateInformation)

Mock.mock(/\/teacherinformation\/fetchInformation/, 'post', teacherinformationAPI.getList)

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 老师相关
Mock.mock(/\/teacher\/list/, 'get', teacherAPI.getList)
Mock.mock(/\/teacher\/detail/, 'get', teacherAPI.getTeacher)
Mock.mock(/\/teacher\/create/, 'post', teacherAPI.createTeacher)
Mock.mock(/\/teacher\/update/, 'post', teacherAPI.updateTeacher)

// 文章相关
Mock.mock(/\/announcement\/list/, 'get', announcementAPI.getList)
Mock.mock(/\/announcement\/detail/, 'get', announcementAPI.getAnnouncement)
Mock.mock(/\/announcement\/create/, 'post', announcementAPI.createAnnouncement)
Mock.mock(/\/announcement\/update/, 'post', announcementAPI.updateAnnouncement)

// 违纪相关
Mock.mock(/\/breakRole\/list/, 'get', breakRoleAPI.getList)
Mock.mock(/\/breakRole\/detail/, 'get', breakRoleAPI.getBreakRole)
Mock.mock(/\/breakRole\/pv/, 'get', breakRoleAPI.getPv)
Mock.mock(/\/breakRole\/create/, 'post', breakRoleAPI.createBreakRole)
Mock.mock(/\/breakRole\/update/, 'post', breakRoleAPI.updateBreakRole)

// 其他重大事项相关
Mock.mock(/\/otherImportant\/list/, 'get', otherImportantAPI.getList)
Mock.mock(/\/otherImportant\/detail/, 'get', otherImportantAPI.getImportant)
Mock.mock(/\/otherImportant\/create/, 'post', otherImportantAPI.createImportant)
Mock.mock(/\/otherImportant\/update/, 'post', otherImportantAPI.updateImportant)

// 系统参数相关
Mock.mock(/\/parameter\/list/, 'get', parameterAPI.getList)
Mock.mock(/\/parameter\/detail/, 'get', parameterAPI.getParameter)
Mock.mock(/\/parameter\/create/, 'post', parameterAPI.createParameter)
Mock.mock(/\/parameter\/update/, 'post', parameterAPI.updateParameter)

// 用户相关
Mock.mock(/\/user\/list/, 'get', userAPI.getList)
Mock.mock(/\/user\/detail/, 'get', userAPI.getUser)
Mock.mock(/\/user\/create/, 'post', userAPI.createUser)
Mock.mock(/\/user\/update/, 'post', userAPI.updateUser)

// 请假相关
Mock.mock(/\/leave\/list/, 'get', leaveAPI.getList)
Mock.mock(/\/leave\/detail/, 'get', leaveAPI.getLeave)
Mock.mock(/\/leave\/pv/, 'get', leaveAPI.getPv)
Mock.mock(/\/leave\/create/, 'post', leaveAPI.createLeave)
Mock.mock(/\/leave\/update/, 'post', leaveAPI.updateLeave)

// 学生相关
Mock.mock(/\/student\/list/, 'get', studentAPI.getList)
Mock.mock(/\/student\/detail/, 'get', studentAPI.getArticle)
Mock.mock(/\/student\/create/, 'post', studentAPI.createArticle)
Mock.mock(/\/student\/update/, 'post', studentAPI.updateArticle)

// 出勤相关
Mock.mock(/\/participation\/list/, 'get', participationAPI.getList)
Mock.mock(/\/participation\/detail/, 'get', participationAPI.getArticle)
Mock.mock(/\/participation\/create/, 'post', participationAPI.createArticle)
Mock.mock(/\/participation\/update/, 'post', participationAPI.updateArticle)

// 作业相关
Mock.mock(/\/work\/list/, 'get', workAPI.getList)
Mock.mock(/\/work\/detail/, 'get', workAPI.getWork)
Mock.mock(/\/work\/create/, 'post', workAPI.createWork)
Mock.mock(/\/work\/update/, 'post', workAPI.updateWork)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
