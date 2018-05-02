import request from '@/utils/request'

export function getTeacherData(query) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params: query
  })
}

export function getTeacherByUid() {
  return request({
    url: '/student/get',
    method: 'post'
  })
}

export function createTeacher(data) {
  return request({
    url: '/teacher/create',
    method: 'post',
    params: data
  })
}

export function updateTeacher(data) {
  return request({
    url: '/teacher/update',
    method: 'post',
    params: data
  })
}

export function deleteTeacher(data) {
  return request({
    url: '/teacher/delete',
    method: 'post',
    params: data
  })
}
