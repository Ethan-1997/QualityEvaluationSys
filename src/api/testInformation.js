import request from '@/utils/request'

export function fetchListTest(query) { // 根据Tno来查找TestInformation
  return request({
    url: '/test/list',
    method: 'get',
    params: query
  })
}

export function createTest(data) { // 往TestInformation插入数据
  return request({
    url: '/test/create',
    method: 'post',
    params: data
  })
}

export function updateTest(data) { // 更新TestInformation数据，通过Tid
  return request({
    url: '/test/update',
    method: 'post',
    params: data
  })
}
export function deleteTest(data) { // 根据Tid删除TestInformation里的数据
  return request({
    url: '/test/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
