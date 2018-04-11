import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/class/list',
    method: 'get',
    params: query
  })
}

export function createClass(data) {
  return request({
    url: '/class/create',
    method: 'post',
    data
  })
}

export function updateClass(data) {
  return request({
    url: '/class/update',
    method: 'post',
    data
  })
}
