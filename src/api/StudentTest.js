import request from '@/utils/request'

export function fetchListStudentTest(query) { // 通过Sid来查找StudentTest
  return request({
    url: '/studenttest/listByExample',
    method: 'get',
    params: query
  })
}

export function createStudentTest(data) { // 往StudentTest
  return request({
    url: '/studenttest/create',
    method: 'post',
    params: data
  })
}
export function switchDisplay(data) { // 更新学生试卷信息StudentTest
  return request({
    url: '/studenttest/switchDisplay',
    method: 'get',
    params: data
  })
}
export function getbysid(data) { // 更新学生试卷信息StudentTest
  return request({
    url: '/studenttest/get',
    method: 'get',
    params: data
  })
}
export function updateStudentTest(data) { // 更新学生试卷信息StudentTest
  return request({
    url: '/studenttest/update',
    method: 'post',
    params: data
  })
}
export function deleteStudentTest(data) { // 根据Tid删除StudentTest整行数据
  return request({
    url: '/studenttest/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
