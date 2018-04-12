import request from '@/utils/request'

export function fetchListHighLight(query) {
  return request({
    url: '/highlighting/list',
    method: 'get',
    params: query
  })
}

export function fetchHighlighting() {
  return request({
    url: '/highlighting/detail',
    method: 'get'
  })
}

export function createHighlighting(data) {
  return request({
    url: '/highlighting/create',
    method: 'post',
    data
  })
}

export function updateHighlighting(data) {
  return request({
    url: '/highlighting/update',
    method: 'post',
    data
  })
}
