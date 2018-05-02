import request from '@/utils/request'

export function fetchListBreakRule(query) {
  return request({
    url: '/breakrule/list',
    method: 'get',
    params: query
  })
}

export function fetchBreakRole() {
  return request({
    url: '/breakrule/detail',
    method: 'get'
  })
}

export function createBreakRole(data) {
  return request({
    url: '/breakrule/create',
    method: 'post',
    params: data
  })
}

export function updateBreakRole(data) {
  return request({
    url: '/breakrule/update',
    method: 'post',
    params: data
  })
}
export function deleteBreakRole(data) {
  return request({
    url: '/breakrule/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
