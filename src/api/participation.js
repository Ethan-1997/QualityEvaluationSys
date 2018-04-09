import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/participation/list',
    method: 'get',
    params: query
  })
}

export function fetchParticipation() {
  return request({
    url: '/participation/detail',
    method: 'get'
  })
}

export function createParticipation(data) {
  return request({
    url: '/participation/create',
    method: 'post',
    data
  })
}

export function updateParticipation(data) {
  return request({
    url: '/participation/update',
    method: 'post',
    data
  })
}
