import request from '@/utils/request'

export function fetchListGreat(query) {
  return request({
    url: '/otherImportant/list',
    method: 'get',
    params: query
  })
}

export function fetchOtherImportant() {
  return request({
    url: '/otherImportant/detail',
    method: 'get'
  })
}

export function createOtherImportant(data) {
  return request({
    url: '/otherImportant/create',
    method: 'post',
    data
  })
}

export function updateOtherImportant(data) {
  return request({
    url: '/otherImportant/update',
    method: 'post',
    data
  })
}
