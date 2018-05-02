import request from '@/utils/request'

export function fetchListDaily(query) {
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
    params: data
  })
}

export function updateParticipation(data) {
  return request({
    url: '/participation/update',
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
