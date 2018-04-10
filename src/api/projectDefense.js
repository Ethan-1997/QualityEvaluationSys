import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/projectDefense/list',
    method: 'get',
    params: query
  })
}

export function fetchProjectDefense() {
  return request({
    url: '/projectDefense/detail',
    method: 'get'
  })
}

export function createProjectDefense(data) {
  return request({
    url: '/projectDefense/create',
    method: 'post',
    data
  })
}

export function updateProjectDefense(data) {
  return request({
    url: '/projectDefense/update',
    method: 'post',
    data
  })
}
