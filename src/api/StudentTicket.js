import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/StudentTicket/list',
    method: 'get',
    params: query
  })
}

export function fetchTeacher() {
  return request({
    url: '/StudentTicket/detail',
    method: 'get'
  })
}

export function createTeacher(data) {
  return request({
    url: '/StudentTicket/create',
    method: 'post',
    data
  })
}

export function updateTeacher(data) {
  return request({
    url: '/StudentTicket/update',
    method: 'post',
    data
  })
}
