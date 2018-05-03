import request from '@/utils/request'

export function fetchListDaily(query) {
  return request({
    url: '/participation/list',
    method: 'get',
    params: query
  })
}

export function fetchParticipation() {
  return request({
    url: '/participation/detail',
    method: 'get'
  })
}

export function createParticipation(data) {
  return request({
    url: '/participation/create',
    method: 'post',
    params: data
  })
}

export function updateParticipation(data) {
  return request({
    url: '/participation/update',
    method: 'post',
    params: data
  })
}
export function deleteParticipation(data) {
  return request({
    url: '/participation/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}

export function getDailysummary(query) {
  return request({
    url: '/participation/listBySid',
    method: 'get',
    params: query // 配置接口数据 一定要用params
  })
}
