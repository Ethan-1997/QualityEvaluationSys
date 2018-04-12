import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/log/list',
    method: 'get',
    params: query
  })
}

export function fetchLog() {
  return request({
    url: '/log/detail',
    method: 'get'
  })
}

export function createLog(data) {
  return request({
    url: '/log/create',
    method: 'post',
    data
  })
}

export function updateLog(data) {
  return request({
    url: '/log/update',
    method: 'post',
    data
  })
}
