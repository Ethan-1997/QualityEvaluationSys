import request from '@/utils/request'

export function fetchListStudentGrade(query) { // 通过Sid来查找StudentTest
  return request({
    url: '/studentgrade/get',
    method: 'get',
    params: query
  })
}

export function createStudentGrade(data) { // 往StudentTest
  return request({
    url: '/studentgrade/create',
    method: 'post',
    params: data
  })
}
export function updateStudentGrade(data) { // 更新学生试卷信息StudentTest
  return request({
    url: '/studentgrade/update',
    method: 'post',
    params: data
  })
}
export function deleteStudentGrade(data) { // 根据Tid删除StudentTest整行数据
  return request({
    url: '/studentgrade/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
