import request from '@/utils/request'

export function fetchListLeave(query) {
  return request({
    url: '/later/list',
    method: 'get',
    params: query
  })
}

export function fetchLeave() {
  return request({
    url: '/later/detail',
    method: 'get'
  })
}

export function createLeave(data) {
  return request({
    url: '/later/create',
    method: 'post',
    params: data
  })
}

export function updateLeave(data) {
  return request({
    url: '/later/update',
    method: 'post',
    params: data
  })
}
export function deleteLeave(data) {
  return request({
    url: '/later/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
