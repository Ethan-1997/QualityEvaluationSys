import request from '@/utils/request'

export function fetchWorkInfoList(query) {
  return request({
    url: '/workinfo/list',
    method: 'get',
    params: query
  })
}

export function fetchWorkInfo() {
  return request({
    url: '/workinfo/detail',
    method: 'get'
  })
}

export function createWorkInfo(data) {
  return request({
    url: '/workinfo/create',
    method: 'post',
    params: data
  })
}

export function updateWorkInfo(data) {
  return request({
    url: '/workinfo/update',
    method: 'post',
    params: data
  })
}
export function deleteWorkInfo(data) {
  return request({
    url: '/workinfo/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
