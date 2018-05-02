import request from '@/utils/request'

export function fetchListStudentTest(query) { // 通过Sid来查找StudentTest
  return request({
    url: '/StudentTest/list',
    method: 'get',
    params: query
  })
}

export function createStudentTest(data) { // 往StudentTest
  return request({
    url: '/StudentTest/create',
    method: 'post',
    params: data
  })
}

export function updateStudentTest(data) { // 更新学生试卷信息StudentTest
  return request({
    url: '/StudentTest/update',
    method: 'post',
    params: data
  })
}
export function deleteStudentTest(data) { // 根据Tid删除StudentTest整行数据
  return request({
    url: '/StudentTest/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
