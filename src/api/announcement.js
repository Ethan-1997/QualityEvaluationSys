import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/announcement/list',
    method: 'get',
    params: query
  })
}

export function fetchAnnouncement() {
  return request({
    url: '/announcement/detail',
    method: 'get'
  })
}

export function createAnnouncement(data) {
  return request({
    url: '/announcement/create',
    method: 'post',
    params: data
  })
}

export function updateAnnouncement(data) {
  return request({
    url: '/announcement/update',
    method: 'post',
    params: data
  })
}
export function deleteAnnouncement(data) {
  return request({
    url: '/announcement/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
