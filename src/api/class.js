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
    params: data
  })
}

export function updateClass(data) {
  return request({
    url: '/class/update',
    method: 'post',
    params: data
  })
}
export function deleteClass(data) {
  return request({
    url: '/class/delete',
    method: 'post',
    params: data
  })
}
