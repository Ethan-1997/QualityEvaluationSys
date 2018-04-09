import request from '@/utils/request'

export function fetchList(query) {
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
    data
  })
}

export function updateLeave(data) {
  return request({
    url: '/leave/update',
    method: 'post',
    data
  })
}
