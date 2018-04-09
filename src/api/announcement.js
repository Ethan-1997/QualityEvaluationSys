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
    data
  })
}

export function updateAnnouncement(data) {
  return request({
    url: '/announcement/update',
    method: 'post',
    data
  })
}
