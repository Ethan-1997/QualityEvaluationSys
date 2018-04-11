import request from '@/utils/request'

export function fetchListBreakRule(query) {
  return request({
    url: '/breakRole/list',
    method: 'get',
    params: query
  })
}

export function fetchBreakRole() {
  return request({
    url: '/breakRole/detail',
    method: 'get'
  })
}

export function createBreakRole(data) {
  return request({
    url: '/breakRole/create',
    method: 'post',
    data
  })
}

export function updateBreakRole(data) {
  return request({
    url: '/breakRole/update',
    method: 'post',
    data
  })
}
