import request from '@/utils/request'

export function fetchListLeave(query) {
  return request({
    url: '/leave/list',
    method: 'get',
    params: query
  })
}

export function fetchLeave() {
  return request({
    url: '/leave/detail',
    method: 'get'
  })
}

export function createLeave(data) {
  return request({
    url: '/leave/create',
    method: 'post',
    params: data
  })
}

export function updateLeave(data) {
  return request({
    url: '/leave/update',
    method: 'post',
    params: data
  })
}
