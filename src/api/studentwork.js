import request from '@/utils/request'

export function getStatisticsByWid(query) {
  return request({
    url: '/studentwork/getStatisticsByWid',
    method: 'post',
    params: query
  })
}

export function getAllInfoBySid(query) {
  return request({
    url: '/studentwork/selectStudentInfoAndWorkInfoBySid',
    method: 'post',
    params: query
  })
}

export function fetchStudentWorkList(query) {
  return request({
    url: '/studentwork/list',
    method: 'get',
    params: query
  })
}

export function fetchStudentWork() {
  return request({
    url: '/studentwork/detail',
    method: 'get'
  })
}

export function createStudentWork(data) {
  return request({
    url: '/studentwork/create',
    method: 'post',
    params: data
  })
}

export function updateStudentWork(data) {
  return request({
    url: '/studentwork/update',
    method: 'post',
    params: data
  })
}
export function deleteStudentWork(data) {
  return request({
    url: '/studentwork/delete',
    method: 'post',
    params: data // 配置接口数据 一定要用params
  })
}
