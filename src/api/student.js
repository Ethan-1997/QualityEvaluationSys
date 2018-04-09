import request from '@/utils/request'

export function getStudentData(query) {
  return request({
    url: '/student/list',
    method: 'get',
    params: query
  })
}
export function fetchList(query) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params: query
  })
}

export function fetchStudent() {
  return request({
    url: '/teacher/detail',
    method: 'get'
  })
}

export function createStudent(data) {
  return request({
    url: '/teacher/create',
    method: 'post',
    data
  })
}

export function updateStudent(data) {
  return request({
    url: '/teacher/update',
    method: 'post',
    data
  })
}

