import request from '@/utils/request'

export function getStudentData(query) {
  return request({
    url: '/student/list',
    method: 'get',
    params: query
  })
}

export function getStudentAll() {
  return request({
    url: '/student/getstudentall',
    method: 'get'
  })
}

export function getStudentByUid() {
  return request({
    url: '/student/get',
    method: 'post'
  })
}

export function getStudentByCid(query) {
  return request({
    url: '/student/getstudent',
    method: 'get',
    params: query
  })
}

export function createStudent(data) {
  return request({
    url: '/student/create',
    method: 'post',
    params: data
  })
}

export function updateStudent(data) {
  return request({
    url: '/student/update',
    method: 'post',
    params: data
  })
}

export function deleteStudent(data) {
  return request({
    url: '/student/delete',
    method: 'post',
    params: data
  })
}

