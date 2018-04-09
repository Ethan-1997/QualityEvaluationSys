import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params: query
  })
}

export function fetchTeacher() {
  return request({
    url: '/teacher/detail',
    method: 'get'
  })
}

export function createTeacher(data) {
  return request({
    url: '/teacher/create',
    method: 'post',
    data
  })
}

export function updateTeacher(data) {
  return request({
    url: '/teacher/update',
    method: 'post',
    data
  })
}
