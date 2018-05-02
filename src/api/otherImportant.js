import request from '@/utils/request'

export function fetchListGreat(query) {
  return request({
    url: '/otherimportant/list',
    method: 'get',
    params: query
  })
}

export function fetchOtherImportant() {
  return request({
    url: '/otherimportant/detail',
    method: 'get'
  })
}

export function createOtherImportant(data) {
  return request({
    url: '/otherimportant/create',
    method: 'post',
    params: data
  })
}

export function updateOtherImportant(data) {
  return request({
    url: '/otherimportant/update',
    method: 'post',
    params: data
  })
}

export function deleteOtherImportant(data) {
  return request({
    url: '/otherimportant/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
