import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/parameter/list',
    method: 'get',
    params: query
  })
}

export function fetchParameter() {
  return request({
    url: '/parameter/detail',
    method: 'get'
  })
}

export function createParameter(data) {
  return request({
    url: '/parameter/create',
    method: 'post',
    data
  })
}

export function updateParameter(data) {
  return request({
    url: '/parameter/update',
    method: 'post',
    data
  })
}
