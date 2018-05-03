import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function fetchUser(query) {
  return request({
    url: '/user/get',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    params: data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    params: data
  })
}

export function getCurrentUser(token) {
  return request({
    url: '/user/getCurrentUser',
    method: 'get',
    params: { token }
  })
}

