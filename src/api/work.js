import request from '@/utils/request'

export function fetchListWork(query) {
  return request({
    url: '/work/list',
    method: 'get',
    params: query
  })
}

export function fetchWork() {
  return request({
    url: '/work/detail',
    method: 'get'
  })
}

export function createWork(data) {
  return request({
    url: '/work/create',
    method: 'post',
    data
  })
}

export function updateWork(data) {
  return request({
    url: '/work/update',
    method: 'post',
    data
  })
}
